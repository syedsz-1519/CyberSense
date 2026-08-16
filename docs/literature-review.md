# Literature Review
## AI-Powered Cybersecurity Awareness Chatbot

This section surveys existing tools and approaches relevant to the project's three core areas — AI chatbots for security education, phishing/URL detection, and password strength analysis — and positions this project relative to them. Use this as the basis for the "Literature Survey" chapter of the final report; add real citations (paper titles, authors, years) once specific sources are selected from your college's library/IEEE/Google Scholar access.

---

### 1. AI Chatbots for Security Awareness Training

**Existing approach**: Most organizational security-awareness training today is delivered through static slide decks, PDF handbooks, or scripted e-learning modules (e.g. annual compliance training). Some newer commercial platforms (e.g. KnowBe4, Proofpoint Security Awareness Training) offer simulated phishing campaigns and video-based modules, but these are largely one-directional — they don't let users ask follow-up questions in natural language.

**Limitation**: Static content doesn't adapt to what a specific user doesn't understand; users often skip through mandatory training without real engagement or retention.

**How this project differs**: Uses a conversational, on-demand interface — users ask questions in their own words and get grounded, contextual answers, rather than being pushed through a fixed curriculum. Retrieval-Augmented Generation (RAG) keeps answers accurate and scoped to vetted security content instead of relying purely on the LLM's general (and sometimes outdated or generic) knowledge.

---

### 2. AI/ML-Based Phishing Detection

**Existing approaches**: Academic and industry work on phishing detection generally falls into three categories:
- **Blacklist-based** (e.g. Google Safe Browsing) — fast but reactive; only catches known-bad URLs, misses new ("zero-hour") phishing sites.
- **Heuristic/rule-based** — checks features like domain age, use of IP addresses instead of domain names, URL length, presence of `@` symbols, HTTPS usage, and typosquatting patterns.
- **ML-based classifiers** — trained on labeled datasets (e.g. PhishTank, UCI Phishing Websites dataset) using features like lexical URL structure, WHOIS data, and page content, with algorithms such as Random Forest, SVM, or neural networks reported in multiple studies to achieve high (90%+) detection accuracy on benchmark datasets.

**Limitation**: Pure ML classifiers are often "black boxes" — they output a risk score without an explanation a non-technical user can understand, which limits their educational value.

**How this project differs**: Combines lightweight heuristic rules (fast, explainable, no training data required) with an LLM-generated plain-language explanation of *why* something looks suspicious — prioritizing user understanding over maximizing raw classification accuracy, which fits the project's educational goal better than a pure ML pipeline within a one-semester scope.

---

### 3. Password Strength Analysis

**Existing approaches**: The most widely referenced tool is **zxcvbn** (developed by Dropbox), which estimates password strength using pattern matching (dictionary words, common substitutions, keyboard patterns, dates) rather than naive length/character-class rules, and has been shown in usability studies to give more realistic strength estimates than traditional NIST-style composition rules. Many websites still use simplistic rule-based meters (length + uppercase + digit + symbol), which research has repeatedly shown correlates poorly with actual crackability.

**Limitation**: Even good strength estimators (like zxcvbn) present a score or bar, but rarely explain the reasoning in a way that teaches the user better habits going forward.

**How this project differs**: Layers an AI-generated explanation on top of a strength-estimation engine, turning a one-time score into a teaching moment (e.g. explaining *why* a password is weak and suggesting a concretely better alternative pattern).

---

### 4. Retrieval-Augmented Generation (RAG) — Relevant Background
RAG is a technique where a language model's response is grounded by retrieving relevant chunks from a curated knowledge source before generation, rather than relying solely on the model's parametric (training-time) knowledge. This reduces hallucination and keeps answers scoped to vetted material — first popularized in NLP research around 2020 and now widely used in production AI assistants for domain-specific accuracy. This project applies RAG at a lightweight scale (keyword/TF-IDF retrieval over a small curated knowledge base) appropriate for an academic project, rather than a full production-grade vector database pipeline.

---

### 5. Summary — Positioning of This Project

| Aspect | Existing tools | This project |
|---|---|---|
| Security training | Static, one-directional | Conversational, on-demand, grounded |
| Phishing detection | Blacklist or opaque ML score | Explainable heuristics + AI-generated reasoning |
| Password analysis | Score/bar only | Score + plain-language explanation + suggestions |
| Underlying AI technique | Varies (rules, classical ML) | LLM + RAG for grounded, explainable output |

**Note for report**: Replace the general statements above with 3-5 specific cited sources (research papers or well-known tools) once you've done your library/database search — this draft is structured so you can drop in citations without changing the overall argument.
