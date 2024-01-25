import { Conversation, Message } from "../types";

interface ChatAreaProps {
    conversation: Conversation | null
}

const ChatArea: React.FC<ChatAreaProps> = ({conversation}) => {
    if (!conversation) return <div className="flex-1"></div>
    return (
        <div className="flex-1">
            {conversation.messages.map((message: Message) => (
                <>
                    Role: {message.role}<br/>
                    Message: {message.content}<br/><br/>
                </>
            ))}
        </div>
    )
}

export default ChatArea;
