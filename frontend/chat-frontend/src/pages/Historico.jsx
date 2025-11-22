import React, { useEffect, useState } from 'react'

const API = 'http://127.0.0.1:8000/api/messages/'

export default function Historico({ activeUser }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (!activeUser) return
        fetchHistory()
    }, [activeUser])

    async function fetchHistory() {
        try {
            const res = await fetch(API)
            const all = await res.json()

            const filtered = all.filter(m =>
                m.sender === activeUser ||
                (m.sender === "SYS" && m.reply_to_sender === activeUser)
            )
            setMessages(filtered)
        } catch (e) { console.error(e) }
    }

    return (
        <div className="card">
            <h3>Histórico — Usuário {activeUser}</h3>
            <div className="history-list">
                {messages.length === 0 && <div className="muted">Nenhuma mensagem encontrada para esse usuário.</div>}
                {messages.map(m => (
                    <div key={m.id} className="history-item">
                        <div className="history-meta"><strong>{m.sender}</strong> • {new Date(m.created_at).toLocaleString()}</div>
                        <div>{m.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
