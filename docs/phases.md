# Project Phases
## AI-Powered Cybersecurity Awareness Chatbot

Assumes a typical final year project timeline of **14-16 weeks** (one semester). Adjust week numbers based on your actual college deadline calendar (synopsis submission, mid-review, final review dates).

---

### Phase 0: Planning & Documentation (Week 1-2)
**Goal**: Lock down scope, requirements, and design before writing code.
- Finalize problem statement and project title
- Complete PRD, TRD, Architecture, Tech Stack, Design docs (done)
- Literature review / study of 3-5 existing similar tools or research papers
- Prepare and submit project synopsis/abstract for guide approval
- Set up GitHub repo, project board (Trello/GitHub Projects/Notion)

**Deliverable**: Approved synopsis, complete documentation set, repo initialized.

---

### Phase 1: Environment & Skeleton Setup (Week 3)
**Goal**: Working scaffold, nothing functional yet.
- Initialize React frontend (Vite) and Node/Express backend
- Set up folder structure, environment variables, `.env.example`
- Set up basic routing (empty endpoints returning mock data)
- Connect frontend to backend with a health-check call
- Push to GitHub, confirm CI/basic scripts run

**Deliverable**: Frontend and backend running locally, talking to each other.

---

### Phase 2: Knowledge Base + Core Chat Engine (Week 4-6)
**Goal**: The RAG-grounded chatbot works end-to-end.
- Curate knowledge base content (OWASP Top 10 summaries, phishing red flags, password hygiene rules, safe browsing tips)
- Implement retrieval logic (keyword/TF-IDF or lightweight embeddings)
- Integrate LLM API via `llmService.js`
- Build `/api/chat` endpoint with context-grounded prompting
- Build chat UI in React (message list, input, source citations)
- Test with 15-20 sample questions and refine prompt/grounding

**Deliverable**: Working chatbot demo — this becomes your "safe fallback" demo if later modules run late.

**Suggested milestone: Mid-semester review target.**

---

### Phase 3: URL/Phishing Checker Module (Week 7-8)
- Build heuristic rule engine (domain mismatch, URL shorteners, suspicious TLDs, etc.)
- Build `/api/check-url` endpoint combining rules + LLM explanation
- Build checker UI (input, result card with risk level + flags)
- Test against a labeled sample set of phishing vs. legitimate URLs

**Deliverable**: Working phishing checker with accuracy numbers ready for the report.

---

### Phase 4: Password Analyzer Module (Week 9)
- Integrate strength library (zxcvbn) or custom entropy rules
- Build `/api/check-password` endpoint with AI-generated explanation
- Build analyzer UI (strength meter, suggestions)
- Test against weak/medium/strong password samples

**Deliverable**: Working password analyzer.

---

### Phase 5: Security Quiz Module (Week 10)
- Write 10-15 scenario-based quiz questions with explanations
- Build `/api/quiz` and `/api/quiz/submit` endpoints
- Build quiz UI (question flow, progress indicator, score screen)
- Add personalized tips logic based on missed questions

**Deliverable**: Working quiz module — all 4 core features now complete.

---

### Phase 6: Integration, UI Polish & Testing (Week 11-12)
- Apply the design system (colors, typography, spacing) consistently across all views
- Make the app responsive (mobile/tablet/desktop)
- Write unit tests (Jest) for rule engines, integration tests (Supertest) for APIs
- Run the full evaluation plan (chatbot relevance scoring, phishing accuracy, usability testing with 10-15 peers)
- Fix bugs found during testing

**Deliverable**: Feature-complete, tested, polished application.

---

### Phase 7: Deployment (Week 13)
- Deploy frontend (Vercel/Netlify) and backend (Render/Railway)
- Set environment variables/secrets on hosting platform
- Smoke-test the live deployed version
- Prepare a backup local demo (in case live deployment fails during evaluation)

**Deliverable**: Live, publicly accessible demo link.

---

### Phase 8: Report Writing & Presentation Prep (Week 14-15)
- Write the final project report (see `major-project-checklist.md` for required sections)
- Prepare slide deck for viva/presentation
- Prepare a 5-7 minute live demo script
- Rehearse answers to likely panel questions (architecture choices, why RAG, security of the app itself, evaluation results)
- Collect screenshots, diagrams, and result tables for the report/slides

**Deliverable**: Final report, slides, and rehearsed demo.

---

### Phase 9: Buffer & Final Review (Week 16)
- Buffer for unexpected delays, guide's final feedback, last-minute fixes
- Final submission (code + report + any required forms)

---

## Summary Timeline Table

| Phase | Weeks | Focus |
|---|---|---|
| 0 | 1-2 | Planning & documentation |
| 1 | 3 | Skeleton setup |
| 2 | 4-6 | Chat engine (RAG) |
| 3 | 7-8 | Phishing checker |
| 4 | 9 | Password analyzer |
| 5 | 10 | Security quiz |
| 6 | 11-12 | Integration, polish, testing |
| 7 | 13 | Deployment |
| 8 | 14-15 | Report + presentation |
| 9 | 16 | Buffer + final submission |

> Tip: Phase 2 (chat engine) is intentionally scheduled early and given the most time — it's the technical core of the project and the safest thing to demo if later phases slip.
