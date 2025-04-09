"use client";
import {Tab} from "@headlessui/react";


import React, {useState, useEffect, useRef} from 'react';
import ChatAssistantTab from "../ChatAssistantTab";
import {classNames} from "../utils";
import CheckingTab from "../CheckingTab";

const Tabs = () => {


    return (
        <div className="bg-gray-100 rounded-b-xl">
            {/* Tabs Group */}
            <Tab.Group className="min-h-full flex flex-col">
                {/* Tabs (headers) */}
                <Tab.List className="flex space-x-1 py-4 px-4 p-1">
                    {["Chat", "Vérifications", "Paramètres"].map((tab) => (
                        <Tab
                            key={tab}
                            className={({selected}) =>
                                classNames(
                                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-800",
                                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                                    selected
                                        ? "bg-white shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-700"
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>

                {/* Tabs Content */}
                <Tab.Panels className="flex flex-col flex-1">

                    {/* Tab Panel #1 */}
                    <Tab.Panel
                        unmount={false}
                        id={"aui-chat-root"}
                        className={classNames(
                            "bg-white border-t border-gray-200  p-4 rounded-b-xl overflow-y-auto h-[680px]",
                        )}
                    >
                        <ChatAssistantTab></ChatAssistantTab>
                    </Tab.Panel>

                    {/* Tab Panel #2 */}
                    <Tab.Panel
                        className={classNames(
                            "bg-white border-t border-gray-200  p-4 rounded-b-xl overflow-y-auto h-[680px]"
                        )}
                    >
                        <CheckingTab></CheckingTab>
                    </Tab.Panel>

                    {/* Tab Panel #3 */}
                    <Tab.Panel
                        className={classNames(
                            "bg-white border-t border-gray-200  p-4 rounded-b-xl overflow-y-auto h-[680px]"
                        )}
                    >

                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default Tabs;
