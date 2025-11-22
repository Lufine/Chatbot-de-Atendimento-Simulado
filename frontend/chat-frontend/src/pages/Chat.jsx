import React, { useEffect, useState, useRef } from 'react'
import MessageBubble from '../components/MessageBubble'

const API = 'http://127.0.0.1:8000/api/messages/'

export default function Chat({ activeUser }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const boxRef = useRef()

  useEffect(() => {
    if (!activeUser) {
      setMessages([])
      return
    }
    fetchAll()

  }, [activeUser])

  async function fetchAll() {
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error('erro ao buscar mensagens')
      const all = await res.json()

      const sorted = all.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

      const filtered = []
      let lastNonSysSender = null

      for (const m of sorted) {
        if (m.sender === 'SYS') {

          if (lastNonSysSender === activeUser) {
            filtered.push(m)

          } else {

          }
        } else {

          lastNonSysSender = m.sender
          if (m.sender === activeUser) {
            filtered.push(m)
          } else {
            // mensagem de outro usuário, ignora
          }
        }
      }

      setMessages(filtered)
      scrollToBottom()
    } catch (e) {
      console.error(e)
    }
  }

  // handleSend: posta a mensagem, mostra "digitando" por 2s e depois atualiza da API
  async function handleSend(e) {
    e && e.preventDefault()
    if (!input.trim() || !activeUser) return

    const typedText = input.trim()

    // adiciona a mensagem do usuário localmente (para resposta imediata visual)
    const localUserMsg = {
      id: Date.now(),
      sender: activeUser,
      content: typedText,
      created_at: new Date().toISOString()
    }
    setMessages(prev => [...prev, localUserMsg])
    setInput('')
    scrollToBottom()

    // envia para backend. Backend criará a resposta SYS.
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: activeUser, content: typedText })
    }).catch(err => console.error(err))

    // mostra animação de digitando por 2s
    setIsTyping(true)
    scrollToBottom()

    await new Promise(res => setTimeout(res, 1500))

    // depois do delay, busca novamente as mensagens do backend (que já devem incluir a resposta SYS)
    setIsTyping(false)
    await fetchAll()
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight
    }, 120)
  }

  return (
    <div className="card">
      <div className="chat-header">
        <h3>Chat — Usuário {activeUser || '—'}</h3>
      </div>

      <div className="chat-box" ref={boxRef}>
        {messages.length === 0 && <div className="muted">Sem mensagens. Envie a primeira!</div>}

        {messages.map(m => (
          <MessageBubble key={m.id} message={m} activeUser={activeUser} />
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={activeUser ? 'Escreva uma mensagem...' : 'Escolha um usuário na tela de login'}
        />
        <button className="btn" type="submit" disabled={!activeUser}>Enviar</button>
      </form>
    </div>
  )
}
