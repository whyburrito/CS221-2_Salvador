# Project Rules (AGENTS.md)

## Overview

This is a full-stack MERN application (MongoDB, Express, React, Node.js).
This project uses two specialized agents: **Backend Dev** and **Frontend Dev**.
When assigning tasks, use `@backend-dev` or `@frontend-dev`.

---

## Project Stack

### Backend (API)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **API Prefix**: `/api`

**Required Endpoints:**

- `GET /api/products` - Fetch all products.
- `POST /api/users/login` - Authenticate user.
- `POST /api/orders` - Create a new order.

### Frontend (UI)

- **Framework**: React 19 + Vite
- **Routing**: `react-router-dom` v6
- **State Management**: React Context API (for Shopping Cart & Auth)
- **Styling**: Modern, creative CSS (Glassmorphism, fluid animations)

---

## Agent-Specific Rules

Each agent has its own rules file under `.opencode/agents/`:

- Backend: `.opencode/agents/backend-dev.md`
- Frontend: `.opencode/agents/frontend-dev.md`

**Core Directives for All Agents:**

- You are permitted to write complex, production-ready code. Do NOT use elementary syntax.
- Do NOT use the Socratic method. Provide complete, working code solutions.
- Ensure strict separation of concerns between Client and Server.
