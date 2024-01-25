import { Conversation, Message } from "../types";

interface ChatAreaProps {
    conversation: Conversation
}

const ChatArea: React.FC<ChatAreaProps> = ({conversation}) => {
    return (
        <>
            {conversation.messages.map((message: Message) => (
                <>
                    Role: {message.role}<br/>
                    Message: {message.content}<br/><br/>
                </>
            ))}
        </>
    )
}

export default ChatArea;
