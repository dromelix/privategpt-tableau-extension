import { useState } from "react";
import { Conversation } from "../types";
import ConversationItem from "./ConversationItem";

const AddIcon = () => <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
</svg>

interface ConversationsBarProps {
    conversations: Conversation[]
    currentConversationId: number;
    onNewConversation: any;
    onClickConversation: any;
    onChangeConversationName: any;
    onRemoveConversation: any;
}

const ConversationsBar: React.FC<ConversationsBarProps> = ({ conversations, currentConversationId, onNewConversation, onClickConversation, onChangeConversationName, onRemoveConversation }) => {
    const closeSideBar = () => {
        document.getElementById("conversations-bar-toggler")?.click()
    }
    
    return (
        <div id="conversations-bar" onClick={closeSideBar} 
         className="fixed top-0 left-0 z-40 w-screen lg:w-52 h-screen transition-transform -translate-x-full lg:translate-x-0 bg-gray-500 bg-opacity-50" aria-label="Sidebar">
            <div className="w-52 lg:w-full h-full" onClick={(e) => {e.stopPropagation()}}>
                <div className="h-full px-2 py-2 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-0 font-medium">
                        <li className="border-b border-gray-300 mb-1">
                            <button onClick={onNewConversation} className="w-full flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none
                                hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-2 py-1 me-2 mb-1 dark:bg-gray-800 dark:text-white 
                                dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                <AddIcon />
                                <span className="ms-1">New Conversation</span>
                            </button>
                        </li>
                        {conversations.map((conversation: Conversation) => (
                            <li key={conversation.id} className="text-sm">
                                <ConversationItem active={currentConversationId == conversation.id} conversation={conversation} 
                                onClickConv={(v: any) => {closeSideBar(); onClickConversation(v)}} onRemove={onRemoveConversation} onChangeName={onChangeConversationName} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ConversationsBar;
