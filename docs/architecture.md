# Architecture Document
## AI-Powered Cybersecurity Awareness Chatbot

### 1. Overview
This document describes the system architecture of the AI-Powered Cybersecurity Awareness Chatbot, a final year project that combines a conversational AI interface with rule-based security-analysis modules to educate users on cybersecurity best practices.

### 2. Architecture Style
The system follows a **layered client-server architecture** with a clear separation between:
- **Presentation layer** — React single-page application
- **Application layer** — Node.js/Express REST API
- **Intelligence layer** — LLM API integration with Retrieval-Augmented Generation (RAG)
- **Data layer** — Static/curated knowledge base + session storage

### 3. High-Level Components

| Component | Responsibility | Technology |
|---|---|---|
| React Frontend | Chat UI, forms, quiz UI, dashboards | React, Tailwind/CSS |
| Express Backend | Routing, business logic, orchestration | Node.js, Express |
| Chat Engine (RAG) | Grounded conversational answers | LLM API + retrieval logic |
| URL/Email Checker | Heuristic phishing analysis + AI explanation | Node.js rules + LLM API |
| Password Analyzer | Strength scoring + AI-generated reasoning | Node.js (zxcvbn or custom rules) + LLM API |
| Quiz Engine | Scenario-based awareness assessment | Node.js + static/dynamic question bank |
| Knowledge Base | Grounding content for RAG (OWASP, phishing patterns, password hygiene) | Markdown/JSON files or lightweight vector store |
| LLM API | Natural language generation and reasoning | External provider (Claude/GPT/etc.) |

### 4. Component Interaction Flow
1. User sends a message or submits data (URL, password, quiz answer) via the React frontend.
2. Frontend calls the appropriate Express API route (`/chat`, `/check-url`, `/check-password`, `/quiz`).
3. Backend applies deterministic rule-based checks first (fast, offline, no API cost).
4. Backend retrieves relevant context from the knowledge base (RAG step) when the query is educational/conversational.
5. Backend constructs a prompt combining user input + retrieved context + rule-based findings, and calls the LLM API.
6. LLM response is returned to the frontend and rendered in the chat/result UI.

### 5. Deployment View
- **Frontend**: Static build deployed on Vercel/Netlify (or served via Express in dev).
- **Backend**: Node/Express server deployed on Render/Railway/AWS EC2, or run locally for demo purposes.
- **Secrets**: LLM API key stored server-side only (`.env`), never exposed to the client.
- **Knowledge base**: Bundled as static files within the backend repo (no external DB required for MVP).

### 6. Data Flow Diagram (textual)
```
User → React UI → Express API → [Rule Engine] → [Knowledge Base Retrieval] → LLM API → Express API → React UI → User
```

### 7. Security Considerations for the System Itself
- API key never exposed to client (server-side proxy pattern).
- Input sanitization on all user-submitted text (prevent prompt injection into LLM calls).
- Rate limiting on API routes to prevent abuse.
- No storage of sensitive user data (passwords analyzed are never logged or persisted).
- HTTPS enforced in production deployment.

### 8. Scalability Notes (for report/future work section)
- Knowledge base can be upgraded from static files to a vector database (e.g., Pinecone, Chroma) for true semantic RAG at scale.
- Stateless backend design allows horizontal scaling behind a load balancer.
- Caching layer (Redis) could reduce repeated LLM calls for common queries.
