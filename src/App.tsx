import { useEffect, useState } from 'react'
import './App.css'
import { Conversation, DataSource, DataSourceType } from './types'
import HeadBar from './components/HeadBar'
import ConversationsBar from './components/ConversationsBar'
import DatasourcesBar from './components/DatasourcesBar'
import ChatArea from './components/ChatArea'

const API_URL = 'http://localhost:8001/v1'
const ChatCompletionUrl = API_URL + '/chat/completions'

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<number>(1)
  const [datasources, setDatasources] = useState<DataSource[]>([
    {name: 'Tableau'},
    {name: 'Extension'},
    {name: 'Running'},
  ])
  const [loadingDB, setLoadingDB] = useState<boolean>(false)
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false)

  const createNewConversation = () => {
    const newId = conversations.length == 0 ? 1 : conversations[conversations.length - 1].id + 1;
    setConversations(conversations => [...conversations, {
      id: newId,
      name: `Conversation ${newId}`,
      messages: [
        {
          role: 'system',
          content: `Answer to user's questions`
        },
      ],
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
    setConversations(conversations => conversations.map((conversation: Conversation) => {
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
    setConversations(conversations => conversations.map((conversation: Conversation) => (
      conversation.id == convId ? {
        ...conversation,
        name: newName
      } : conversation
    )))
  }

  const removeConversation = (convId: number) => {
    setConversations(conversations => conversations.filter((conversation: Conversation) => conversation.id != convId))
  }

  const findDatasourceByName = (name: string) => {
    const filtered = datasources.filter((datasource: DataSource) => datasource.name == name)
    return filtered.length > 0 ? filtered[0] : null;
  }

  const changeDatasource = (newDatasourceName: string, newDatasourceType: DataSourceType) => {
    const datasource = findDatasourceByName(newDatasourceName)
    if (!datasource) return
    setConversations(conversations => conversations.map((conversation: Conversation) => (
      conversation.id == currentConversationId ? {
        ...conversation,
        datasource: datasource,
        datasourceType: newDatasourceType
      } : conversation
    )))
  }

  const newUserMessage = async (message: string) => {
    const old_messages = JSON.parse(JSON.stringify(currentConversation?.messages));
    const convId = currentConversationId;

    setConversations((conversations: Conversation[]) => conversations.map((conversation: Conversation) => (
      conversation.id == convId ? {
        ...conversation,
        messages: [
          ...conversation.messages,
          {
            role: 'user',
            content: message
          }
        ]
      } : conversation
    )))

    setLoadingResponse(true)
    
    const response = await fetch(ChatCompletionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "messages": [
          ...old_messages,
          {
            role: 'user',
            content: message
          }
        ],
        // "use_context": true,
        // "context_filter": {
        //     "docs_ids": [
        //         "41b37c67-ac5c-494e-94e9-5bcc398559e1"
        //     ]
        // },
        // "include_sources": false,
        "stream": true
      })
    })
    
    if (!response.ok || !response.body) {
      throw response.statusText;
    }
  
    // Here we start prepping for the streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const loopRunner = true;
  
    while (loopRunner) {
      // Here we start reading the stream, until its done.
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      const chunks = decodedChunk.split('data: ');
      for (let chunk of chunks) {
        chunk = chunk.trim()
        if (!chunk) continue
        if (chunk == '[DONE]') {
          setLoadingResponse(false)
        } else {
          chunk = JSON.parse(chunk)
          // @ts-ignore
          let answer = chunk.choices[0].delta.content
          
          setConversations((conversations: Conversation[]) => conversations.map((conversation: Conversation) => {
            if (conversation.id != convId) return conversation
            const old_messages = conversation.messages
            let new_messages;
            if (old_messages.length > 0 && old_messages[old_messages.length - 1].role == 'assistant') {
              new_messages = [...old_messages.slice(0, -1), {role: 'assistant', content: old_messages[old_messages.length - 1].content + answer}]
            } else {
              new_messages = [...old_messages, {role: 'assistant', content: answer}]
            }
            return {...conversation, messages: new_messages}
          }))
        }
      }
    }
  }

  return (
    <>
      <div className='h-screen lg:pl-52 w-screen flex flex-col h-screen'>
        <HeadBar title={currentConversation?.name || ''} onClearConversation={clearConversation}></HeadBar>
        <ChatArea conversation={currentConversation} loading={loadingDB || loadingResponse} onNewMessage={newUserMessage}></ChatArea>
      </div>
      <ConversationsBar conversations={conversations} currentConversationId={currentConversationId} onNewConversation={createNewConversation}
        onClickConversation={setCurrentConversationId} onChangeConversationName={changeConversationName} onRemoveConversation={removeConversation}></ConversationsBar>
      <DatasourcesBar datasources={datasources} selectedDatasourceName={currentConversation?.datasource?.name || ''}
        selectedDatasourceType={currentConversation?.datasourceType || 'summary'} onChangeDataSource={changeDatasource}></DatasourcesBar>
    </>
  )
}

export default App
