# Testing & Evaluation Plan
## AI-Powered Cybersecurity Awareness Chatbot

### 1. Purpose
Defines how each module will be tested and evaluated — required for the final year project report's evaluation/results section.

### 2. Test Levels

| Level | Scope | Tooling |
|---|---|---|
| Unit tests | Rule-based logic (URL heuristics, password rules) | Jest |
| Integration tests | API endpoints end-to-end (request → response) | Jest + Supertest |
| Manual functional tests | Full user flows in the browser | Manual checklist |
| AI evaluation | Chatbot answer quality, phishing detection accuracy | Curated test sets + manual scoring |
| Usability tests | Real users interacting with the app | 10–15 peer testers |

### 3. AI/Model Evaluation Approach

**Chatbot answer quality:**
- Prepare 15–20 representative cybersecurity questions (e.g. "What is phishing?", "How do I create a strong password?").
- Manually rate each response 1–5 on relevance, accuracy, and clarity.
- Report average score and 2–3 example transcripts in the final report.

**Phishing/URL checker accuracy:**
- Curate a labeled test set: ~20 known-phishing URLs/emails (from public phishing databases or textbook examples) + ~20 legitimate URLs.
- Run each through the checker, record predicted risk level vs. actual label.
- Report accuracy, false positive rate, false negative rate.

**Password analyzer:**
- Test against a spread of passwords (common weak passwords, medium, strong/random) and verify strength labels align with expected entropy.

**Quiz module:**
- Verify scoring logic against manually computed expected scores for sample answer sets.

### 4. Sample Test Cases (illustrative)

| Module | Test case | Expected result |
|---|---|---|
| URL Checker | Legitimate domain (e.g. a known bank's real URL) | Low risk |
| URL Checker | URL with shortener + mismatched display text | High risk, flags listed |
| Password Analyzer | `123456` | Weak, common pattern flag |
| Password Analyzer | Long random passphrase | Strong |
| Quiz | All correct answers | Score = total, "vigilant" rating |
| Chat | Off-topic question (e.g. "write me a poem") | Politely redirects to cybersecurity scope |

### 5. Non-Functional Testing
- Response time logging for each API call (target: under ~3–5s).
- Basic load check: simulate 5–10 concurrent requests, confirm no crashes (acceptable for academic scope).
- Cross-browser check: Chrome, Firefox, mobile Chrome.

### 6. Reporting
All results (accuracy tables, sample transcripts, screenshots) should be compiled into the final project report's "Testing & Results" chapter, since evaluation panels weight demonstrated evaluation heavily.
