import React from 'react'

export default function MessageBubble({ message, activeUser }) {
    const mine = message.sender === activeUser
    const isSys = message.sender === 'SYS'
    const isTyping = message.typing === true

    return (
        <div className={`message-row ${mine ? 'mine' : (isSys ? 'sys' : '')}`}>
            <div className="message-content">

                <div className="message-sender">
                    {isSys ? 'Sistema' : `Usuário ${message.sender}`}
                </div>

                {/* SE FOR UMA MENSAGEM DE DIGITANDO */}
                {isTyping ? (
                    <div className="typing-indicator-bubble">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                    </div>
                ) : (
                    <div className="message-text">{message.content}</div>
                )}

                {/* Oculta horário quando é digitando */}
                {!isTyping && (
                    <div className="message-time">
                        {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                )}
            </div>
        </div>
    )
}
