"use client";
import {
    AssistantRuntimeProvider,
    Thread,
    useEdgeRuntime,
    useLocalRuntime,
    useThreadComposer
} from "@assistant-ui/react";
import React from "react";
import ChatAssistant from "./ChatAssistant";
import MyModelAdapter from "./AIAssistant/RuntimeProvider";

const ChatAssistantTab = () => {
    // const runtime = useEdgeRuntime({api: "https://api.openai.com/v1/chat"});
    const runtime = useLocalRuntime(MyModelAdapter);
    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <ChatAssistant></ChatAssistant>
        </AssistantRuntimeProvider>
    )
}

export default ChatAssistantTab;
