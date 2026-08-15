# Roadmap
## AI-Powered Cybersecurity Awareness Chatbot

A high-level view of where the project is headed — MVP milestones for the final year submission, plus future scope beyond the academic deadline. For the detailed week-by-week breakdown, see `phases.md`.

---

## Current Status
📍 **Documentation phase complete** — PRD, TRD, Architecture, Tech Stack, Design, Testing Plan, and Phases finalized. Repo initialized and pushed to GitHub. Implementation not yet started.

---

## Milestone Roadmap

### 🎯 Milestone 1 — Foundation
- [ ] Repo structure finalized
- [ ] React frontend + Node/Express backend scaffolded and connected
- [ ] Environment/secrets setup (`.env`)

### 🎯 Milestone 2 — Core AI Chat (MVP Demo #1)
- [ ] Knowledge base curated (OWASP, phishing, password hygiene content)
- [ ] RAG retrieval implemented
- [ ] LLM API integrated
- [ ] Chat UI functional and grounded answers verified

> This milestone alone is a demoable product — treat it as the safety-net deliverable.

### 🎯 Milestone 3 — Security Tools
- [ ] URL/phishing checker (rules + AI explanation)
- [ ] Password strength analyzer (rules + AI explanation)
- [ ] Security awareness quiz (scoring + tips)

### 🎯 Milestone 4 — Full Product (MVP Demo #2)
- [ ] All 4 modules integrated into one cohesive app
- [ ] Design system applied consistently
- [ ] Responsive across devices

### 🎯 Milestone 5 — Validated & Tested
- [ ] Unit + integration tests passing
- [ ] Evaluation results collected (chatbot relevance, phishing accuracy, usability feedback)

### 🎯 Milestone 6 — Deployed & Documented
- [ ] Live deployment (frontend + backend)
- [ ] Final report written
- [ ] Presentation/demo rehearsed

### 🎯 Milestone 7 — Submission
- [ ] Final code + report submitted
- [ ] Viva/presentation completed

---

## Future Scope (post-submission / stretch goals)
These are **not required for the academic submission** but strengthen the project if time allows, and make good talking points in the report's "Future Work" section:

- Upgrade retrieval from keyword/TF-IDF to a proper vector database (Chroma/Pinecone) for true semantic search
- Add user accounts with persistent history and progress tracking across sessions
- Multi-language support (Hindi/Urdu/regional languages) for wider accessibility
- Browser extension version of the phishing checker for real-time protection while browsing
- Mobile app version (React Native)
- Admin dashboard to update/expand the knowledge base and quiz bank without code changes
- Integration with real threat-intelligence feeds (e.g. VirusTotal, PhishTank APIs) for more accurate URL checks
- Gamification of the quiz module (badges, leaderboards) to improve engagement
- Organization/enterprise mode — bulk awareness training and reporting for teams

---

## Risks to Watch
| Risk | Mitigation |
|---|---|
| LLM API rate limits/cost during heavy demo/testing | Cache common responses, use a free-tier-friendly provider, keep test volume controlled |
| RAG grounding not accurate enough | Keep knowledge base small and well-curated rather than broad; manually verify test answers |
| Running out of time before all 4 modules are done | Chat engine (Milestone 2) is the priority — it alone is demoable; other modules can ship in reduced form if needed |
| Live deployment breaking during evaluation | Always have a local backup demo ready |
