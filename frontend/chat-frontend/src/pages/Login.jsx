import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ activeUser, setActiveUser }) {
    const navigate = useNavigate()

    function handleChoose(user) {
        setActiveUser(user)

        localStorage.setItem('activeUser', user)
        navigate('/chat')
    }

    return (
        <div className="card center-card">
            <h2>Entrar no Chatbot de Atendimento Simulado</h2>
            <p className="muted">Escolha um perfil para iniciar (login simulado)</p>

            <div className="user-buttons">
                <button className="btn btn-primary" onClick={() => handleChoose('A')}>Entrar como Usuário A</button>
                <button className="btn btn-secondary" onClick={() => handleChoose('B')}>Entrar como Usuário B</button>
            </div>

        </div>
    )
}