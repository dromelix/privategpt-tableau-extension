import { useState } from "react"
import { Conversation } from "../types"

const ChatIcon = () => <svg className="w-4 h-4 min-w-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.6 8.5h8m-8 3.5H12m7.1-7H5c-.2 0-.5 0-.6.3-.2.1-.3.3-.3.6V15c0 .3 0 .5.3.6.1.2.4.3.6.3h4l3 4 3-4h4.1c.2 0 .5 0 .6-.3.2-.1.3-.3.3-.6V6c0-.3 0-.5-.3-.6a.9.9 0 0 0-.6-.3Z" />
</svg>

const EditIcon = () => <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2" />
</svg>

const RemoveIcon = () => <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
</svg>

const CheckIcon = () => <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9" />
</svg>

const CancelIcon = () => <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
</svg>

interface ConversationItemInterface {
    conversation: Conversation;
    onClickConv: any;
    onChangeName: any;
    onRemove: any;
    active: boolean;
}

const ConversationItem: React.FC<ConversationItemInterface> = ({ conversation, onClickConv, onChangeName, onRemove, active }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>('');

    const onClickEdit = () => {
        setEditName(conversation.name)
        setEditMode(true)
    }

    const onClickRemove = () => {
        onRemove(conversation.id)
    }

    const onCheckEdit = () => {
        if (!editName) return
        onChangeName(conversation.id, editName)
        setEditMode(false)
    }

    const onCancelEdit = () => {
        setEditMode(false)
    }

    return (
        <div onClick={() => onClickConv(conversation.id)} className={"flex px-1 py-1 items-center rounded-sm text-gray-900 dark:text-white hover:bg-gray-200 " +
        "dark:hover:bg-gray-700 group " + (active ? 'bg-gray-200' : '')}>
            <ChatIcon />
            {editMode ? (
                <>
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                    className="w-full mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block
                    p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" 
                    placeholder="Conversation Name" required></input>
                    <button type="button" onClick={onCheckEdit} className="inline-flex items-center p-0 mr-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <CheckIcon />
                    </button>
                    <button type="button" onClick={onCancelEdit} className="inline-flex items-center p-0 text-sm text-gray-500 rounded-lg hover:bg-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <CancelIcon />
                    </button>
                </>
            ) : (
                <>
                    <span className="mx-1 truncate flex-1">{conversation.name}</span>
                    <button type="button" onClick={onClickEdit} className="inline-flex items-center p-0 mr-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none 
                    focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <EditIcon />
                    </button>
                    <button type="button" onClick={onClickRemove} className="inline-flex items-center p-0 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none
                     focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <RemoveIcon />
                    </button>
                </>
            )}
        </div>
    )
}

export default ConversationItem;
