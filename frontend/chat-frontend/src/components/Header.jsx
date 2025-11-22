import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Header({ activeUser, setActiveUser }) {
    const navigate = useNavigate()
    function handleLogout() {
        setActiveUser('')
        localStorage.removeItem('activeUser')
        navigate('/')
    }

    return (
        <header className="topbar">
            <div className="brand">Protótipo Chat</div>
            <nav>
                <Link to="/chat">Chat</Link>
                <Link to="/historico">Histórico</Link>
            </nav>
            <div className="user-area">
                <span className="small-muted">Ativo:</span>
                <strong className="user-badge">{activeUser || '—'}</strong>
                {activeUser && <button className="btn-link" onClick={handleLogout}>Sair</button>}
            </div>
        </header>
    )
}