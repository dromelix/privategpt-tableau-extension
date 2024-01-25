import { useEffect, useState } from 'react'
import './App.css'
import { Conversation, DataSource, DataSourceType } from './types'
import HeadBar from './components/HeadBar'
import ConversationsBar from './components/ConversationsBar'
import DatasourcesBar from './components/DatasourcesBar'
import ChatArea from './components/ChatArea'

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<number>(0)
  const [datasources, setDatasources] = useState<DataSource[]>([
    {name: 'Tableau'},
    {name: 'Extension'},
    {name: 'Running'},
  ])

  const createNewConversation = () => {
    const newId = conversations.length == 0 ? 0 : conversations[conversations.length - 1].id + 1;
    setConversations([...conversations, {
      id: newId,
      name: `Conversation ${newId}`,
      messages: [],
      datasourceType: 'summary'
    }])
    setCurrentConversationId(newId)
  }

  useEffect(() => {
    createNewConversation()
  }, [])

  const findConversationById = (id: number) => {
    const filtered = conversations.filter((conversation: Conversation) => conversation.id == id)
    return filtered.length > 0 ? filtered[0] : null;
  }

  const currentConversation = findConversationById(currentConversationId)

  const clearConversation = () => {
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

  const changeConversationName = (convId: number, newName: string) => {
    setConversations(conversations.map((conversation: Conversation) => (
      conversation.id == convId ? {
        ...conversation,
        name: newName
      } : conversation
    )))
  }

  const removeConversation = (convId: number) => {
    setConversations(conversations.filter((conversation: Conversation) => conversation.id != convId))
  }

  const findDatasourceByName = (name: string) => {
    const filtered = datasources.filter((datasource: DataSource) => datasource.name == name)
    return filtered.length > 0 ? filtered[0] : null;
  }

  const changeDatasource = (newDatasourceName: string, newDatasourceType: DataSourceType) => {
    const datasource = findDatasourceByName(newDatasourceName)
    if (!datasource) return
    setConversations(conversations.map((conversation: Conversation) => (
      conversation.id == currentConversationId ? {
        ...conversation,
        datasource: datasource,
        datasourceType: newDatasourceType
      } : conversation
    )))
  }

  return (
    <div className='h-screen'>
      <div className='flex flex-col h-full'>
        <HeadBar title={currentConversation?.name || ''} onClearConversation={clearConversation}></HeadBar>
        <ChatArea conversation={currentConversation}></ChatArea>
      </div>
      <ConversationsBar conversations={conversations} currentConversationId={currentConversationId} onNewConversation={createNewConversation}
        onClickConversation={setCurrentConversationId} onChangeConversationName={changeConversationName} onRemoveConversation={removeConversation}></ConversationsBar>
      <DatasourcesBar datasources={datasources} selectedDatasourceName={currentConversation?.datasource?.name || ''}
        selectedDatasourceType={currentConversation?.datasourceType || 'summary'} onChangeDataSource={changeDatasource}></DatasourcesBar>
    </div>
  )
}

export default App
