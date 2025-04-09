"use client";
import {
    Thread,
    useEdgeRuntime,
    useComposerRuntime,
    useThreadRuntime,
    useAssistantRuntime,
    useThreadListItemRuntime
} from "@assistant-ui/react";
import React from "react";
import {makeMarkdownText} from "@assistant-ui/react-markdown";

const MarkdownText = makeMarkdownText();
const ChatAssistant = () => {

    const thread = useThreadRuntime();
    console.log(thread);
    const threadListRuntime = useAssistantRuntime().threadList;
    const threadListItemRuntime = useThreadListItemRuntime();
    return (
        <>
        {/*<button onClick={() => threadListItemRuntime.delete()} className="bg-blue-500 text-white p-2 rounded-lg">*/}
        {/*    Reset*/}
        {/*</button>*/}
        <Thread
            assistantMessage={{components: {Text: MarkdownText}}}
            welcome={{ message: "Comment puis-je vous aider aujourd'hui ?" }}
            strings={{ composer: {
                    input: { placeholder: "Tapez votre message ici" },
                    send: { tooltip: "Envoyer" }
                }}}
        />
        </>
    )
}

export default ChatAssistant;
