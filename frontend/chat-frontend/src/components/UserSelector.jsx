import React from 'react'

export default function UserSelector({ activeUser, setActiveUser }){
  return (
    <div>
      <label style={{marginRight:8}}>Usuário:</label>
      <select value={activeUser} onChange={(e)=>setActiveUser(e.target.value)}>
        <option value="A">Usuário A</option>
        <option value="B">Usuário B</option>
      </select>
    </div>
  )
}
