import { useEffect, useState } from 'react'
import './App.css'
import { Conversation } from './types'
import HeadBar from './components/HeadBar'
import ConversationsBar from './components/ConversationsBar'
import DatasourcesBar from './components/DatasourcesBar'
import ChatArea from './components/ChatArea'

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<number>(0)

  const createNewConversation = () => {
    const newId = conversations[conversations.length - 1].id + 1;
    setConversations([...conversations, {
      id: newId,
      name: `Conversation ${newId}`,
      messages: [],
      datasourceType: 'summary'
    }])
    setCurrentConversationId(currentConversationId)
  }

  useEffect(() => {
    createNewConversation()
  })

  const _conversation = conversations.filter((conversation: Conversation) => conversation.id == currentConversationId)
  const currentConversation = _conversation.length > 0 ? _conversation[0] : null;

  const onClearConversation = () => {
    setConversations(conversations.map((conversation: Conversation) => {
      if (conversation.id == currentConversationId) {
        return {
          ...conversation,
          messages: []
        }
      } else {
        return conversation
      }
    }))
  }

  return (
    <>
      <HeadBar title={currentConversation?.name || ''} onClearConversation={onClearConversation}></HeadBar>
      <ConversationsBar ></ConversationsBar>
      <DatasourcesBar></DatasourcesBar>
      <ChatArea></ChatArea>
    </>
  )
}

export default App
