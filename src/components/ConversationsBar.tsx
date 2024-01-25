import { useState } from "react";
import { Conversation } from "../types";
import ConversationItem from "./ConversationItem";

const AddIcon = () => <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
</svg>

interface ConversationsBarProps {
    conversations: Conversation[]
    currentConversationId: number;
    onNewConversation: any;
    onClickConversation: any;
    onChangeConversationName: any;
    onRemoveConversation: any;
}

const ConversationsBar: React.FC<ConversationsBarProps> = ({conversations, currentConversationId, onNewConversation, onClickConversation, onChangeConversationName, onRemoveConversation}) => {
    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a onClick={onNewConversation} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AddIcon />
                                <span className="ms-3">New</span>
                            </a>
                        </li>
                        {conversations.map((conversation: Conversation) => (
                            <li>
                                <ConversationItem active={currentConversationId == conversation.id} conversation={conversation} onClickConv={onClickConversation} onRemove={onRemoveConversation} onChangeName={onChangeConversationName} />
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default ConversationsBar;
