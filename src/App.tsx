import { useEffect, useState } from 'react'
import './App.css'
import { Conversation } from './types'
import HeadBar from './components/HeadBar'
import ConversationsBar from './components/ConversationsBar'
import DatasourcesBar from './components/DatasourcesBar'
import ChatArea from './components/ChatArea'

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<number>(0)

  const createNewConversation = () => {
    const newId = conversations[conversations.length - 1].id + 1;
    setConversations([...conversations, {
      id: newId,
      name: `Conversation ${newId}`,
      messages: [],
      datasourceType: 'summary'
    }])
  }

  useEffect(() => {
    createNewConversation()
  })

  return (
    <>
      <HeadBar></HeadBar>
      <ConversationsBar></ConversationsBar>
      <DatasourcesBar></DatasourcesBar>
      <ChatArea></ChatArea>
    </>
  )
}

export default App
