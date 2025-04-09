// MyModelAdapter.js
const OPENAI_API_KEY = "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"

const OpenAIModelAdapter = {
    /**
     * An async generator that yields incremental updates as they're streamed
     * from OpenAI.
     *
     * @param {Object} params
     * @param {Array} params.messages - Array of ChatGPT-like messages [{role, content}, ...]
     * @param {AbortSignal} params.abortSignal - Signal used to cancel the request
     * @param {any} [params.context] - Additional context if needed
     */
    async* run({messages, abortSignal, context}) {

        // 1. Get the text from the DOM element #content
        let systemPrompt = "No content found on the page.";
        if (typeof document !== "undefined") {
            const contentNode = document.querySelector("#content");
            if (contentNode) {
                // You could use .textContent, .innerText, etc.
                systemPrompt = contentNode.innerText.trim();
            }
        }

        // 2. Prepend the system prompt to the messages array
        //    so OpenAI sees it as system context.
        const finalMessages = [
            {role: "system", content: "Tu es un assistant virtuel aidant les utilisateurs sur ce site web. Ton nom est Alfred."},
            {role: "system", content: systemPrompt},
            ...messages,
        ];


        // 1. Make a streaming request to OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: finalMessages,
                stream: true
            }),
            signal: abortSignal,
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            const errMsg = errorBody?.error?.message || JSON.stringify(errorBody);
            throw new Error(`OpenAI returned status ${response.status}: ${errMsg}`);
        }

        // 2. Read the response as a stream of data
        const reader = response.body.getReader();
        const textDecoder = new TextDecoder("utf-8");

        // We'll accumulate text as new tokens arrive
        let accumulatedText = "";

        // 3. Continuously read chunks from the stream
        let done = false;
        let leftover = "";

        while (!done) {
            // read() returns { value (Uint8Array), done (boolean) }
            const {value, done: isDone} = await reader.read();
            done = isDone;
            if (!value) continue;

            // Decode the chunk into a string
            const chunk = textDecoder.decode(value, {stream: true});

            // Prepend any leftover from previous chunk parsing
            const combined = leftover + chunk;

            // Split on newlines to process each "data:" line
            const lines = combined.split("\n");

            // We'll process all but the last line. The last may be partial, so we save it.
            leftover = lines.pop() || "";

            for (const line of lines) {
                // Each line starts with "data: " (we ignore possible blank lines)
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith("data: ")) {
                    continue;
                }

                const jsonStr = trimmed.substring("data: ".length).trim();
                if (jsonStr === "[DONE]") {
                    // [DONE] indicates the stream has finished
                    return; // we can break/return here to end the generator
                }

                // Attempt to parse the JSON data
                try {
                    const parsed = JSON.parse(jsonStr);
                    // The token (if any) is in parsed.choices[0].delta.content
                    const token = parsed?.choices?.[0]?.delta?.content;
                    if (token) {
                        // Append the new token to our accumulated text
                        accumulatedText += token;

                        // Yield the partial content so the UI can update live
                        yield {
                            content: [
                                {
                                    type: "text",
                                    text: accumulatedText,
                                },
                            ],
                        };
                    }
                } catch (err) {
                    // If parse fails, skip or handle the error
                    console.warn("Could not parse line", line, err);
                }
            }
        }

        // 4. If the loop finishes without receiving [DONE],
        //    we don't have more data to read, so just return.
        return;
    },
};

export default OpenAIModelAdapter;
