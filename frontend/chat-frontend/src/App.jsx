import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Historico from './pages/Historico'
import Header from './components/Header'

export default function App() {
    const [activeUser, setActiveUser] = useState(() => localStorage.getItem('activeUser') || '')
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('activeUser', activeUser)
    }, [activeUser])

    return (
        <div className="app-root">
            <Header activeUser={activeUser} setActiveUser={setActiveUser} />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Login activeUser={activeUser} setActiveUser={setActiveUser} navigate={navigate} />} />
                    <Route path="/chat" element={<Chat activeUser={activeUser} />} />
                    <Route path="/historico" element={<Historico activeUser={activeUser} />} />
                </Routes>
            </main>
        </div>
    )
}