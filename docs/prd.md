# Product Requirements Document (PRD)
## AI-Powered Cybersecurity Awareness Chatbot

### 1. Purpose
To build an AI-driven web application that improves cybersecurity awareness among students and general users by combining conversational AI guidance with practical, actionable security tools (phishing detection, password analysis, and a scenario-based quiz).

### 2. Problem Statement
Most users lack awareness of basic cybersecurity hygiene — they cannot easily identify phishing attempts, use weak passwords, and have no accessible, judgment-free way to ask security questions. Traditional awareness training (PDFs, slide decks) is static, unengaging, and not personalized.

### 3. Target Users
- College students (primary — for demo/evaluation audience)
- Non-technical employees/general public (secondary, for real-world relevance)

### 4. Goals & Objectives
- G1: Provide instant, understandable answers to cybersecurity questions.
- G2: Let users check if a URL/email looks like phishing, with plain-language reasoning.
- G3: Let users evaluate password strength with actionable, AI-explained feedback.
- G4: Assess and improve user awareness through an interactive quiz with a score.
- G5: Demonstrate practical integration of AI (RAG + LLM) into a security tool for academic evaluation.

### 5. Scope

**In scope (MVP):**
- Conversational chatbot grounded in a curated security knowledge base
- URL/email phishing heuristic checker with AI-generated explanation
- Password strength analyzer with AI-generated explanation
- Scenario-based security awareness quiz with scoring
- Simple, responsive web UI

**Out of scope (future work):**
- Real-time network/traffic monitoring
- Browser extension integration
- Multi-language support
- User accounts / persistent history across sessions (unless time permits)
- Mobile native app

### 6. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR1 | User can chat with the AI and receive grounded cybersecurity answers | Must |
| FR2 | User can submit a URL/email text and receive a phishing risk assessment + explanation | Must |
| FR3 | User can submit a password and receive a strength score + AI explanation | Must |
| FR4 | User can take a multi-question security quiz and receive a score | Must |
| FR5 | System gives personalized tips based on quiz mistakes | Should |
| FR6 | Chat maintains context within a single session | Should |
| FR7 | Dashboard shows history of checks performed in current session | Could |

### 7. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR1 | Response time for chat/API calls under 5 seconds (typical) |
| NFR2 | No sensitive user data (passwords, URLs) persisted to disk/DB |
| NFR3 | UI must be responsive (desktop + mobile browser) |
| NFR4 | System should degrade gracefully if LLM API is unavailable (show rule-based result only) |
| NFR5 | Codebase should be modular enough to demo each feature independently |

### 8. Success Metrics (for evaluation/report)
- Chatbot answer relevance (manual evaluation against a test question set)
- Phishing checker accuracy against a labeled sample set of URLs/emails
- Quiz completion rate and score distribution (usability testing with peers)
- Qualitative feedback from a small user test group (e.g., 10-15 classmates)

### 9. Assumptions & Constraints
- Single developer/small team, academic timeline (one semester)
- Free-tier or low-cost LLM API usage (cost/rate limits considered)
- No dedicated production infrastructure - deployable on free-tier hosting for demo

### 10. Milestones (suggested)
1. Core chatbot with RAG grounding - working demo
2. Phishing checker module integrated
3. Password analyzer module integrated
4. Quiz module integrated
5. UI polish + evaluation data collected
6. Final report + presentation prepared
