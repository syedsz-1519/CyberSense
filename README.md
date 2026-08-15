# AI-Powered Cybersecurity Awareness Chatbot

Final year project — an AI-driven web app combining a RAG-grounded chatbot with practical security tools: URL/phishing checker, password strength analyzer, and a scenario-based security awareness quiz.

## Full documentation
See the [`docs/`](./docs) folder:
- [PRD](./docs/prd.md) — product requirements
- [TRD](./docs/trd.md) — technical requirements, API specs, data models
- [Architecture](./docs/architecture.md) — system design
- [Tech Stack](./docs/tech-stack.md) — technologies used and why
- [Design & UI/UX](./docs/design-ui-ux.md) — colors, fonts, layout
- [Testing Plan](./docs/testing-plan.md) — evaluation approach
- [Project Memory](./docs/memory.md) — full project context in one file

## Project structure
```
.
├── frontend/           # React app (to be built)
├── backend/
│   ├── routes/           # Express route handlers
│   ├── services/          # llmService.js, ragService.js, ruleEngine.js
│   ├── knowledge-base/    # Curated grounding content (OWASP, phishing, password hygiene)
│   └── data/quiz.json      # Quiz question bank
├── docs/                  # Full documentation set
└── .env.example
```

## Status
Documentation phase complete. Implementation not yet started.

## Setup (once implementation begins)
```bash
# backend
cd backend && npm install && npm run dev

# frontend
cd frontend && npm install && npm run dev
```
