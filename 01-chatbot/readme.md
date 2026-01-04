# 🧠 Local AI Chatbot (ChatGPT-like) — Node.js + React + Ollama

A **fully local, zero-cost AI chatbot** that streams responses like ChatGPT using **local LLMs (Ollama)**.  
Built with **Node.js, React, Docker**, and designed to scale to **Kubernetes**.

This project demonstrates **real-world AI streaming**, **SSE**, and **production-safe backend/frontend architecture**.

---

## 🎯 Project Goals

- Run AI models **locally** (no OpenAI / no API keys)
- Stream AI responses **token-by-token**
- ChatGPT-like user experience
- Clean separation of frontend & backend
- Dockerized & Kubernetes-ready
- 100% free tools

---

## 🧱 Tech Stack

### Backend
- Node.js (ES Modules)
- Express
- Axios (server-side streaming)
- Ollama (local LLM runtime)
- SSE (Server-Sent Events)

### Frontend
- React (Vite)
- Fetch API (ReadableStream)
- Material UI (or minimal HTML)

### Infra
- Docker
- Docker Compose (optional)
- Kubernetes (minikube / kind)

