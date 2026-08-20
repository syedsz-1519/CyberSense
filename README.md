# CyberSense
### AI-Powered Cybersecurity Awareness Chatbot

[![Backend CI](https://github.com/syedsz-1519/CyberSense/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/syedsz-1519/CyberSense/actions/workflows/backend-ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Python](https://img.shields.io/badge/python-3.9%2B-blue)

> A final year B.Tech (AI & ML) project that teaches everyday users how to protect themselves online — through a grounded AI chatbot, a phishing/URL checker, a password strength analyzer, and a scenario-based awareness quiz.

---

## Table of Contents
- [Introduction](#introduction)
- [Why This Project](#why-this-project)
- [What We Are Building](#what-we-are-building)
- [Who It's For](#who-its-for)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Getting Started](#getting-started)
- [Project Status](#project-status)
- [License](#license)

---

## Introduction

Cybersecurity awareness is one of the biggest gaps in everyday digital safety — most people aren't attacked because of some advanced exploit; they're attacked because they click a suspicious link, reuse a weak password, or don't recognize a scam message when they see one. **CyberSense** was built to close that gap in a practical, hands-on way: instead of another static PDF or slide deck nobody reads, it's an interactive AI assistant that answers real questions, checks real inputs (a URL, a password), and tests real understanding through a quiz — all grounded in actual security best practices (OWASP guidelines, verified phishing patterns, password research) rather than generic AI guesses.

This project was undertaken as a **final year major project** to demonstrate practical, end-to-end integration of AI (specifically Retrieval-Augmented Generation) into a real-world security-education tool — combining backend engineering, frontend design, applied AI, and cybersecurity domain knowledge into one working system.

## Why This Project

- **The problem is real**: phishing and weak passwords remain among the top causes of account compromise and data breaches, and most users don't get accessible, engaging security education.
- **Existing training doesn't work well**: most corporate/academic security-awareness material is static, one-directional, and easy to skip through without actually learning anything (see [`docs/literature-review.md`](./docs/literature-review.md) for a detailed comparison).
- **AI can genuinely help here**: a conversational interface lets a user ask exactly what they're confused about, in their own words, and get an answer grounded in real security knowledge rather than a rigid script.
- **It's a strong final year project**: it combines full-stack development, applied AI/NLP (RAG + LLM integration), and a genuine cybersecurity domain — technically substantial and easy for an evaluation panel to understand and test live.

## What We Are Building

Four core modules, all reachable from one simple web interface:

| Module | What it does |
|---|---|
| Chat | Ask any cybersecurity question by typing **or speaking**; answers are grounded in a curated knowledge base (OWASP Top 10, phishing patterns, password hygiene, safe browsing) instead of relying purely on the AI's general knowledge. Supports voice input (speech-to-text) and optional spoken replies (text-to-speech), via the browser's built-in Web Speech API — no extra service or cost |
| URL / Email Checker | Paste a suspicious link or email text; the system runs heuristic checks (typosquatting, URL shorteners, IP-based links, mismatched domains) and explains the risk in plain language |
| Password Analyzer | Enter a password (never stored or logged) and get a strength rating plus a clear explanation of why it's weak or strong, with concrete tips to improve it |
| Security Quiz | A scenario-based quiz (phishing emails, social engineering calls, public Wi-Fi risks, etc.) that scores the user and gives personalized tips based on what they got wrong |

Full requirements are documented in [`docs/prd.md`](./docs/prd.md); the system design is in [`docs/architecture.md`](./docs/architecture.md) and [`docs/diagrams.md`](./docs/diagrams.md).

## Who It's For

- **Primary audience**: college students and young professionals — people who are online constantly but were never formally taught digital safety basics.
- **Secondary audience**: general/non-technical users who want quick, judgment-free answers to security questions instead of technical jargon.
- **Evaluation audience**: the academic panel reviewing this as a final year project — the codebase, documentation, and testing plan are structured to make the AI integration, architecture decisions, and evaluation results easy to walk through and defend.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), plain CSS with a defined design system |
| Backend | Node.js, Express.js |
| AI / NLP | LLM API (Anthropic Claude / OpenAI, provider-abstracted) + a lightweight RAG (Retrieval-Augmented Generation) layer |
| Data | Markdown-based knowledge base, JSON quiz bank — no database required for the MVP |
| Semantic retrieval (RAG) | Python + scikit-learn (TF-IDF + cosine similarity), served via a small Flask microservice |
| Testing | Jest, Supertest |
| Deployment (planned) | Vercel/Netlify (frontend), Render/Railway (backend) |

Full justification for each choice is in [`docs/tech-stack.md`](./docs/tech-stack.md).

**Languages used in this repo**: JavaScript (Node.js backend + React frontend), Python (semantic RAG microservice), JSON (data), Markdown (documentation and AI knowledge base content), CSS (styling).

## Project Structure

```
.
├── frontend/                      # React (Vite) application
│   └── src/
│       ├── App.jsx                  # Tab navigation shell
│       ├── main.jsx                 # React entry point
│       ├── index.css                # Design system (colors, typography, components)
│       └── views/
│           ├── ChatView.jsx           # AI chat interface (voice input + spoken replies)
│           ├── UrlCheckerView.jsx     # Phishing/URL checker UI
│           ├── PasswordCheckerView.jsx # Password analyzer UI
│           └── QuizView.jsx           # Security awareness quiz UI
│
├── backend/                       # Node.js / Express API
│   ├── server.js                    # App entry point, middleware, route mounting
│   ├── routes/
│   │   ├── chat.js                    # POST /api/chat
│   │   ├── checkUrl.js                 # POST /api/check-url
│   │   ├── checkPassword.js            # POST /api/check-password
│   │   └── quiz.js                     # GET /api/quiz, POST /api/quiz/submit
│   ├── services/
│   │   ├── llmService.js               # LLM provider abstraction
│   │   ├── ragService.js               # Calls the Python RAG service; falls back to JS keyword search
│   │   └── ruleEngine.js               # Offline heuristic checks (URL + password)
│   ├── knowledge-base/                # Curated grounding content for the chatbot
│   │   ├── owasp-top-10.md
│   │   ├── phishing-red-flags.md
│   │   ├── password-hygiene.md
│   │   └── safe-browsing-general.md
│   └── data/
│       └── quiz.json                  # Quiz question bank
│
├── python/                        # Python semantic RAG microservice
│   ├── rag_service.py                # Flask app: TF-IDF + cosine similarity retrieval (scikit-learn)
│   ├── requirements.txt
│   └── README.md                     # Setup, API, and upgrade path (embeddings/vector DB)
│
├── docs/                           # Full project documentation
│   ├── prd.md                        # Product Requirements Document
│   ├── trd.md                        # Technical Requirements Document
│   ├── architecture.md               # System architecture
│   ├── diagrams.md                   # Use case, DFD, sequence, ER diagrams (Mermaid)
│   ├── tech-stack.md                 # Technology choices and justification
│   ├── design-ui-ux.md               # Colors, typography, layout, accessibility
│   ├── literature-review.md          # Comparison with existing tools/approaches
│   ├── testing-plan.md               # Testing and evaluation methodology
│   ├── phases.md                     # Week-by-week project timeline
│   ├── roadmap.md                    # Milestones, current status, future scope
│   ├── major-project-checklist.md    # Everything a final year project typically needs
│   └── memory.md                     # Full project context in one file
│
├── .env.example                    # Environment variable template
└── README.md                       # This file
```

## Documentation

Everything about this project — requirements, architecture, design, testing, and timeline — is documented in [`docs/`](./docs):

| Document | Purpose |
|---|---|
| [`prd.md`](./docs/prd.md) | What we're building, for whom, and why — full product requirements |
| [`trd.md`](./docs/trd.md) | API specs, data models, technical implementation details |
| [`architecture.md`](./docs/architecture.md) | System components, data flow, deployment view |
| [`diagrams.md`](./docs/diagrams.md) | Use case, DFD, sequence, and ER diagrams |
| [`tech-stack.md`](./docs/tech-stack.md) | Every technology used, and why it was chosen |
| [`design-ui-ux.md`](./docs/design-ui-ux.md) | Colors, typography, layout, and accessibility rules |
| [`literature-review.md`](./docs/literature-review.md) | How this compares to existing tools and research |
| [`testing-plan.md`](./docs/testing-plan.md) | How every module — including the AI — is tested and evaluated |
| [`phases.md`](./docs/phases.md) | Week-by-week breakdown of the full project timeline (~16 weeks) |
| [`roadmap.md`](./docs/roadmap.md) | Milestones, current status, and future scope beyond submission |
| [`major-project-checklist.md`](./docs/major-project-checklist.md) | Everything a final year major project typically requires, with a gap analysis |
| [`memory.md`](./docs/memory.md) | One-file summary of the entire project — useful for quickly restoring context |

## Getting Started

**Requirements**: Node.js (LTS), Python 3.9+, an API key from an LLM provider (Anthropic or OpenAI).

```bash
# 1. Python RAG microservice (start first)
cd python
pip install -r requirements.txt
python rag_service.py            # runs on http://localhost:8001

# 2. Backend (in a separate terminal)
cd backend
npm install
cp ../.env.example .env          # then fill in LLM_API_KEY
npm run dev                      # runs on http://localhost:5000

# 3. Frontend (in a separate terminal)
cd frontend
npm install
npm run dev                      # runs on http://localhost:5173
```

The frontend's dev server proxies `/api` requests to the backend automatically — no extra config needed. The backend calls the Python RAG microservice for semantic retrieval and **automatically falls back** to a built-in JS keyword search if that service isn't running, so steps 2-3 work fine even without step 1. If `LLM_API_KEY` isn't set, the app still works: URL and password checks fall back to their rule-based results, and the chat module will report that AI is temporarily unavailable.

## Project Status

Currently in **Phase 2** (Core AI Chat) — documentation and full application skeleton (frontend + backend) are complete and verified working; live LLM integration and knowledge-base tuning are in progress. See [`docs/roadmap.md`](./docs/roadmap.md) for the full milestone tracker.

## License

Academic project — license to be decided (MIT recommended if open-sourcing after submission).
