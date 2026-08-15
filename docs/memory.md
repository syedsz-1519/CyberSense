# Project Memory
## AI-Powered Cybersecurity Awareness Chatbot — Final Year Project

Purpose of this file: a single reference document capturing everything decided about this project so far. Meant to be pasted into a new AI chat session, a README, or a report draft to quickly restore full context without re-explaining the project from scratch.

---

## 1. Project Identity
- **Type**: Final year B.Tech project (AI + ML branch)
- **Domain**: Cybersecurity + AI integration
- **Core idea**: An AI-powered security awareness chatbot that educates users on cybersecurity best practices, combined with three practical tools — phishing/URL checker, password strength analyzer, and a scenario-based security quiz.
- **Why this idea**: Broad "cybersecurity + AI" scope was narrowed down to this because it's technically strong (NLP + RAG + rule-based logic), demo-friendly, and easy for an evaluation panel to understand compared to narrower/riskier ML projects (e.g. pure intrusion detection).

## 2. Decisions Made So Far
| Decision point | Choice made |
|---|---|
| Project type/theme | Cybersecurity + AI security awareness chatbot |
| Purpose | Final year project |
| Frontend | React |
| Backend | Node.js + Express |
| AI integration | LLM API (Claude/GPT — provider abstracted) + RAG grounding |
| Feature scope | All 4 modules in a basic/MVP version: Chat, URL/phishing checker, Password analyzer, Security quiz |
| Database | None required for MVP — knowledge base as static files, sessions in-memory |
| Hosting | Free-tier (Vercel/Netlify for frontend, Render/Railway for backend) |

## 3. System Architecture (summary)
Three-layer architecture:
1. **React frontend** — chat UI and module-specific views (URL checker, password analyzer, quiz)
2. **Node/Express backend** — contains 4 modules:
   - Chat engine (RAG) — grounded conversational answers
   - URL/email checker — heuristic rules + AI-generated explanation
   - Password analyzer — strength scoring + AI-generated explanation
   - Security quiz — scenario questions, scoring, personalized tips
3. **External dependencies** — a curated knowledge base (OWASP Top 10, phishing patterns, password hygiene content) for retrieval, and an external LLM API for generation

Flow: User → React UI → Express API → rule-based check (fast, offline) → knowledge base retrieval (RAG) → LLM API call → response back to UI.

A full architecture diagram was generated during planning (component boxes: User → React frontend → Node/Express backend containing the 4 modules → Knowledge base + LLM API).

## 4. Product Requirements (summary)
- **Problem**: Users lack accessible, engaging ways to learn cybersecurity hygiene; can't easily spot phishing; use weak passwords; static training materials (PDFs/slides) don't work well.
- **Target users**: College students (primary, for demo), general/non-technical users (secondary, real-world relevance)
- **Must-have features (MVP)**: grounded chat, URL/email phishing check with explanation, password strength check with explanation, scenario quiz with score
- **Explicitly out of scope**: real-time network monitoring, browser extension, multi-language support, persistent user accounts, native mobile app
- **Success metrics**: chatbot answer relevance (manual scoring against test questions), phishing checker accuracy (labeled test set), quiz usability testing with peers

## 5. Technical Requirements (summary)
Key API endpoints planned:
- `POST /api/chat` — chat message in, grounded reply + sources out
- `POST /api/check-url` — URL/email text in, risk level + flags + explanation out
- `POST /api/check-password` — password in (never logged/stored), strength + explanation + suggestions out
- `GET /api/quiz` — fetch quiz questions
- `POST /api/quiz/submit` — submit answers, get score + rating + tips

Data models: `KnowledgeChunk` (id, topic, content, tags), `ChatSession` (sessionId, messages, createdAt), `QuizQuestion` (id, prompt, options, correctOptionId, explanation). No permanent DB/PII storage needed for v1.

RAG approach: knowledge base as markdown/JSON chunks; retrieval via keyword search or lightweight embeddings (TF-IDF sufficient at this scale, no heavy vector DB needed); LLM provider abstracted behind a single `llmService.js` module.

## 6. Tech Stack (summary)
- **Frontend**: React (Vite), Tailwind CSS, React Context for state, Recharts for score visuals, Lucide/Tabler icons
- **Backend**: Node.js + Express, Zod/Joi for validation, express-rate-limit, dotenv, zxcvbn (or custom rules) for password entropy
- **AI**: Anthropic Claude API or OpenAI API (one, abstracted), TF-IDF/lightweight embeddings for retrieval, optional Chroma as a stretch goal
- **Testing**: Jest + Supertest (backend), React Testing Library (optional, frontend)
- **Deployment**: Vercel/Netlify (frontend), Render/Railway (backend), GitHub for version control

## 7. Design System (summary)
- **Principle**: trustworthy and calm, not alarming; plain language; fast feedback; accessible by default
- **Colors**: Primary deep blue `#1E3A8A`, secondary teal `#0F766E`, background off-white `#F8FAFC`, success green `#16A34A`, warning amber `#D97706`, danger red `#DC2626`
- **Typography**: Inter/system-ui for UI text, JetBrains Mono for code/technical snippets; body 15-16px, headings 24-32px
- **Key views**: Landing/home, Chat view, URL/Email checker view, Password analyzer view, Quiz view — simple nav (top bar or sidebar), 4 icons for the 4 modules
- **Accessibility**: WCAG AA contrast, risk info never conveyed by color alone (always icon + text + color)

## 8. Testing & Evaluation Plan (summary)
- Unit tests (Jest) for rule-based logic (URL heuristics, password rules)
- Integration tests (Jest + Supertest) for all API endpoints
- AI evaluation: 15-20 test questions for chatbot answer quality (manual 1-5 rating); ~20 phishing + ~20 legitimate URLs for checker accuracy (accuracy/false positive/false negative rates)
- Usability testing with 10-15 peer testers
- All results compiled into the report's "Testing & Results" chapter

## 9. Documentation Set Produced
Delivered as a `docs/` folder with:
- `prd.md` — Product Requirements Document
- `trd.md` — Technical Requirements Document (note: internally titled project "SecureMate" in trd.md's header — not yet confirmed as the final project name)
- `architecture.md` — Architecture Document
- `tech-stack.md` — Tech Stack Document
- `design-ui-ux.md` — Design & UI/UX Document
- `testing-plan.md` — Testing & Evaluation Plan
- `README.md` — index tying the docs together + suggested repo structure

Suggested repo structure (from README.md):
```
project-root/
├── frontend/           # React app
├── backend/             # Node/Express API
│   ├── routes/
│   ├── services/         # llmService.js, ragService.js, ruleEngine.js
│   ├── knowledge-base/   # Markdown/JSON grounding content
│   └── data/quiz.json
├── docs/
├── .env.example
└── README.md
```

## 10. Open Items / Not Yet Decided
- Final project name (trd.md used a placeholder "SecureMate" — needs confirmation or change)
- Which LLM provider to actually use (Claude vs GPT vs other) — currently left abstracted/undecided
- Whether to build skeleton code next, or prepare knowledge base content first
- Actual knowledge base source content (OWASP text, phishing examples, password rules) not yet curated
- Quiz question bank not yet written

