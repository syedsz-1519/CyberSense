# Final Year Major Project — Requirements Checklist
## What a typical evaluation panel/college expects

This is a general-purpose checklist covering what's usually required across the lifecycle of a final year major project in India (synopsis → mid-review → final review → viva), mapped to what this project already has and what's still pending.

---

## 1. Academic/Administrative Requirements

| Item | Typically required? | Status for this project |
|---|---|---|
| Project synopsis/abstract (1-2 pages) | Yes, early submission | Not yet written — can be adapted from `prd.md` |
| Guide/mentor allocation and sign-off | Yes | Depends on your department process |
| Group formation (if team project) | Depends | Confirm if solo or group |
| Plagiarism/originality declaration | Often required | Prepare before final submission |
| Turnitin/similarity report (for report document) | Sometimes required | Check with department |
| Project title approval | Yes | "AI-Powered Cybersecurity Awareness Chatbot" — confirm/finalize |

## 2. Documentation Requirements (what panels look for)

| Document | Have it? |
|---|---|
| Abstract/Synopsis | Can adapt from `prd.md` |
| Problem statement & motivation | In `prd.md` |
| Literature survey / existing systems comparison | ❌ Not yet done — needs 3-5 references |
| Requirements (functional + non-functional) | ✅ `prd.md` |
| System architecture & design diagrams | ✅ `architecture.md` + generated diagram |
| Technical/API specification | ✅ `trd.md` |
| UI/UX design | ✅ `design-ui-ux.md` |
| Implementation details | ⏳ Pending (write during/after coding) |
| Testing & evaluation results | ✅ Plan ready (`testing-plan.md`), results pending actual testing |
| Timeline/Gantt chart | ✅ `phases.md` |
| Future scope / limitations | ✅ In `roadmap.md` |
| Conclusion | ⏳ Write after project completion |
| References/bibliography | ❌ Not yet compiled |
| Appendix (code snippets, screenshots) | ⏳ Pending |

## 3. Literature Review — Still Needed
Most panels require you to show awareness of existing work. Suggested approach:
- Find 3-5 existing tools/research papers on: AI chatbots for security awareness, phishing detection using ML, password strength analysis tools
- For each: summarize what it does, its limitation, and how your project differs/improves
- Add this as a section early in the final report (right after the problem statement)

## 4. Diagrams Usually Expected in the Report
- [x] System architecture diagram (have one)
- [ ] Use case diagram (actors: User; use cases: Chat, Check URL, Check password, Take quiz)
- [ ] Data flow diagram (DFD Level 0 and Level 1)
- [ ] ER diagram (if any persistent data model exists — even a simple one for KnowledgeChunk/QuizQuestion helps)
- [ ] Sequence diagram (e.g. for the chat request → RAG retrieval → LLM call → response flow)
- [ ] Flowchart of the phishing-check or password-check logic

## 5. Implementation Requirements
- [ ] Source code hosted on GitHub (✅ repo created: CyberSense)
- [ ] Clean, commented code
- [ ] `.env.example` for configuration (✅ already added)
- [ ] README with setup instructions (✅ already added)
- [ ] requirements/dependencies clearly listed (`package.json` for both frontend and backend)

## 6. Testing & Evaluation (panels weight this heavily)
- [ ] Test cases documented with expected vs actual results
- [ ] Screenshots of the working application
- [ ] Accuracy/performance metrics where applicable (phishing detection accuracy, response time)
- [ ] User feedback/usability results (even a small sample, e.g. 10 classmates, is valued)

## 7. Presentation/Viva Preparation
- [ ] Slide deck (10-15 slides): title, problem, objectives, architecture, tech stack, modules demo, results, conclusion, future scope
- [ ] Live demo script (rehearsed, with a backup plan if live demo fails — screen recording as fallback)
- [ ] Anticipate common panel questions:
  - "Why did you choose RAG instead of just calling the LLM directly?"
  - "How do you prevent the chatbot from giving wrong/harmful security advice?"
  - "How accurate is your phishing detector — how did you test it?"
  - "What happens if the LLM API is down?"
  - "How is user data (like passwords) kept secure in your own app?"
  - "What would you do differently with more time?"
  - "What's novel/original about your project vs. existing tools?"

## 8. Common Panel Concerns Specific to This Project (prepare answers)
- **"Isn't this just a ChatGPT wrapper?"** → Emphasize the RAG grounding (curated knowledge base, not just raw LLM), the rule-based heuristic layers (URL/password checks run independent of the LLM), and the structured evaluation you performed.
- **"How do you ensure the AI doesn't hallucinate wrong security advice?"** → Explain grounding + optionally a disclaimer in the UI + the manual evaluation process.
- **"Is this secure itself?"** → Point to the security considerations in `architecture.md`/`trd.md` (API key handling, no password logging, input sanitization, rate limiting).

## 9. Final Submission Package (typical)
- [ ] Final report (PDF, following college format — usually has a required template)
- [ ] Source code (zip or GitHub link)
- [ ] Presentation slides
- [ ] Any required forms (plagiarism declaration, completion certificate, guide approval)
- [ ] Demo video (backup, 3-5 min screen recording) — highly recommended even if not mandatory

---

## Quick Gap Summary (as of now)
**Already done**: PRD, TRD, Architecture, Tech Stack, Design, Testing Plan, Phases, Roadmap, GitHub repo.
**Still needed before final submission**: Literature review, use case/DFD/sequence/ER diagrams, actual implementation, real test results, report write-up in college format, slides, demo video, and required administrative forms.
