# Chat Projeto – Sistema de Mensagens (Django + React)

Este projeto é uma aplicação simples de troca de mensagens entre dois usuários (“A” e “B”), com respostas automáticas enviadas pelo sistema (“SYS”).  
Ele foi desenvolvido utilizando **Django + Django REST Framework** no backend e **React** no frontend.

---

# Sobre o Projeto

Este repositório contém uma aplicação full stack composta por:

**Backend:** Django + Django REST Framework

**Frontend:** React (Vite ou Create React App – conforme seu setup)

**Comunicação:** API REST em /api/messages/

O objetivo é demonstrar um chatbot básico onde Usuário A e Usuário B enviam mensagens, e o sistema registra todas as interações separadamente.
A tela de histórico exibe apenas as mensagens do usuário atualmente selecionado.

# Tecnologias utilizadas

### 🔹 Backend
- Python
- Django
- Django REST Framework
- SQLite (banco padrão do Django)

### 🔹 Frontend
- React
- JavaScript
- Fetch API

---

# Estrutura do Repositório

O projeto é dividido em duas partes independentes: backend (Django) e frontend (React).
Abaixo está a estrutura simplificada do repositório:

```bash
/backend
└── chatprojeto/
    ├── chat/               # App principal (models, views, serializers)
    ├── chatprojeto/        # Configurações Django
    ├── manage.py

/frontend
└── chat-frontend/
    ├── src/                # Código React
    ├── package.json
    ├── package-lock.json
    ├── index.html
```

---

# Como rodar o projeto localmente

A seguir estão as instruções simples e diretas para rodar o backend e o frontend.

---

# **1. Backend – Django + Django REST Framework**

### 1.1 Acesse o diretório:

```bash
/backend/chatprojeto
```

### 1.2 Instalar dependências

Execute:

```bash
pip install -r requirements.txt
```

### 1.3 Rodar migrações

```bash
python manage.py migrate
```

### 1.4 Iniciar servidor Django
```bash
python manage.py runserver
```

O backend estará disponível em:
```cpp
http://127.0.0.1:8000/
```

# **2 Frontend (React)**

### 2.1 Acesse o diretório:

```bash
/frontend/chat-frontend
```

### 2.2 Instalar dependências

```bash
npm install
```

### 2.3 Execute o frontend:
```bash
npm run dev
```

O frontend abrirá automaticamente em:
```cpp
http://localhost:3000/
```

# 3. Comunicação entre Frontend e Backend

O frontend se comunica com o backend Django através de uma requisição HTTP:

```javascript
axios.post("http://127.0.0.1:8000/api/messages/", {
  sender,
  content
});
```

# 4. Endpoint da API

**POST /api/messages/**

Envia uma mensagem do usuário e recebe a resposta automática do sistema.

Exemplo de envio:

```json
{
    "sender": "A",
    "content": "Olá!"
}
```

Exemplo de resposta:

```json
{
    "sent": {
        "id": 1,
        "sender": "A",
        "content": "Olá",
        "created_at": "2025-11-22T19:09:19.996947Z"
    },
    "reply": {
        "id": 2,
        "sender": "SYS",
        "content": "Obrigado por seu contato Usuário A! Em breve responderemos.",
        "created_at": "2025-11-22T19:09:20.012942Z"
    }
}
```

**GET /api/messages/?sender=A**

Retorna somente o histórico do Usuário A.

# 5. Decisões Técnicas

**Backend – Django**

- Criei um model Message contendo:

    - sender → "A", "B" ou "SYS"

    - content

    - reply_to_user → usado para identificar respostas automáticas

    - created_at → ordenação cronológica

- A lógica do chatbot está no método post() da View MessageListCreate.

- A separação de histórico por usuário é feita pelo parâmetro GET:

```bash
/api/messages/?sender=A
```

- Simplicidade e clareza foram prioridade, mantendo apenas o necessário para demonstração.

---

**Frontend – React**

- A aplicação React foi organizada da forma mais simples possível:

    - Um campo de texto para enviar mensagens

    - Botões para alternar entre Usuário A e Usuário B

    - Uma lista que exibe o histórico filtrado do usuário selecionado

- O estado é controlado via useState e useEffect.

- Sempre que o usuário alterna entre A/B, o frontend consulta o backend:

```bash
axios.get(`/api/messages/?sender=${usuarioSelecionado}`)
```

- A interface foi feita com foco didático e funcional.