# Technical Requirements Document (TRD)
## SecureMate — AI-Powered Cybersecurity Awareness Chatbot

**Version:** 1.0
**Related doc:** prd.md, architecture.md, tech-stack.md

---

## 1. Purpose

This document translates the product requirements into concrete technical specifications: APIs, data models, integrations, and non-functional targets.

## 2. System Overview

SecureMate is a client-server web application. The React frontend communicates with a Node/Express backend over REST APIs. The backend orchestrates calls to an LLM API and a local knowledge base to power four modules: chat, URL/email checker, password analyzer, and quiz.

## 3. API Specification (v1)

### 3.1 `POST /api/chat`
Send a user message and receive a grounded assistant reply.

**Request:**
```json
{
  "sessionId": "string",
  "message": "string"
}
```
**Response:**
```json
{
  "reply": "string",
  "sources": ["OWASP Top 10 - Broken Authentication", "..."]
}
```

### 3.2 `POST /api/check-url`
Analyze a URL or raw email text for phishing indicators.

**Request:**
```json
{
  "input": "string",
  "type": "url | email_text"
}
```
**Response:**
```json
{
  "riskLevel": "low | medium | high",
  "score": 0,
  "flags": ["mismatched domain", "url shortener used"],
  "explanation": "string"
}
```

### 3.3 `POST /api/check-password`
Evaluate password strength.

**Request:**
```json
{ "password": "string" }
```
**Response:**
```json
{
  "strength": "weak | moderate | strong",
  "score": 0,
  "issues": ["too short", "common pattern detected"],
  "explanation": "string",
  "suggestions": ["string"]
}
```
> Note: the raw password is processed in-memory only and never persisted or logged.

### 3.4 `GET /api/quiz`
Fetch a quiz set (5–10 questions).

**Response:**
```json
{
  "questions": [
    {
      "id": "q1",
      "prompt": "string",
      "options": [{"id": "a", "text": "string"}],
      "correctOptionId": "a"
    }
  ]
}
```

### 3.5 `POST /api/quiz/submit`
Submit answers and receive score + tips.

**Request:**
```json
{ "answers": [{"questionId": "q1", "selectedOptionId": "a"}] }
```
**Response:**
```json
{
  "score": 0,
  "total": 10,
  "rating": "beginner | aware | vigilant",
  "tips": ["string"]
}
```

## 4. Data Model

### 4.1 KnowledgeChunk (knowledge base entries)
| Field | Type | Notes |
|---|---|---|
| id | string | unique identifier |
| topic | string | e.g. "phishing", "passwords", "OWASP-A01" |
| content | text | source material chunk |
| tags | string[] | for retrieval filtering |

### 4.2 ChatSession (in-memory or lightweight store)
| Field | Type | Notes |
|---|---|---|
| sessionId | string | random UUID, client-side generated or cookie |
| messages | array | role + content pairs |
| createdAt | timestamp | |

### 4.3 QuizQuestion
| Field | Type | Notes |
|---|---|---|
| id | string | |
| prompt | text | scenario description |
| options | array | 3–4 choices |
| correctOptionId | string | |
| explanation | text | shown after answering |

No permanent user accounts or PII storage required for v1 — sessions can be ephemeral (in-memory or short-TTL store).

## 5. AI / RAG Integration

- **Knowledge base:** curated markdown/JSON files (OWASP Top 10 summaries, phishing red flags, password hygiene rules) chunked into `KnowledgeChunk` entries.
- **Retrieval:** simple keyword/embedding-based similarity search over chunks (a lightweight vector store or even TF-IDF is sufficient at this scale — no need for a heavy vector DB).
- **Prompt construction:** retrieved chunks are inserted into the LLM system/context prompt before the user's question, so answers stay grounded in the curated material rather than the model's unconstrained knowledge.
- **LLM provider:** abstracted behind a single service module (`llmService.js`) so the provider (Claude, GPT, etc.) can be swapped without touching business logic.

## 6. Security & Privacy Requirements

- Passwords submitted to the analyzer are processed in-memory only; never logged or stored.
- All API keys (LLM provider) live server-side in environment variables — never exposed to the frontend.
- Input sanitization on all endpoints to prevent injection into LLM prompts (prompt injection guardrails: strip/escape control sequences, cap input length).
- Rate limiting on public endpoints to prevent abuse of the LLM API quota.
- HTTPS enforced in any deployed environment.

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Chat/checker responses return within ~3s under normal load |
| Availability | Single-instance deployment acceptable for academic demo; no HA requirement |
| Scalability | Not a hard requirement; architecture should not block future scaling (stateless backend) |
| Usability | Mobile-responsive, WCAG AA color contrast minimum |
| Maintainability | Modular backend (separate service per feature module) |
| Portability | Deployable on common free-tier hosting (Render/Vercel/Railway) |

## 8. Testing Requirements

- Unit tests for heuristic checkers (URL pattern matching, password rule engine).
- Integration tests for each API endpoint (happy path + invalid input).
- Manual evaluation set for phishing detection accuracy (curated list of known-phishing vs. legitimate URLs).
- UI testing across at least 2 breakpoints (mobile, desktop).

## 9. Tooling & Environment

See `tech-stack.md` for the full stack. Development uses `.env` files for secrets (never committed), and a `.env.example` template is included in the repo.
