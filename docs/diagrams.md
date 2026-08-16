# Diagrams
## AI-Powered Cybersecurity Awareness Chatbot

All diagrams below use [Mermaid](https://mermaid.js.org/) syntax, which renders automatically in GitHub markdown previews. For the final report (usually a Word/PDF document), export each diagram as an image: paste the code into the [Mermaid Live Editor](https://mermaid.live), then export as PNG/SVG and embed it in the report.

---

## 1. Use Case Diagram

```mermaid
graph TD
  User((User))
  UC1[Ask a security question]
  UC2[Check a URL / email for phishing]
  UC3[Check password strength]
  UC4[Take security awareness quiz]
  UC5[View quiz score and tips]

  User --> UC1
  User --> UC2
  User --> UC3
  User --> UC4
  User --> UC5

  UC1 -.includes.-> RAG[Retrieve grounded context]
  UC2 -.includes.-> RAG
  UC3 -.includes.-> LLM[Call LLM for explanation]
  UC1 -.includes.-> LLM
  UC2 -.includes.-> LLM
```

**Actors**: User (primary; no separate admin/system actor required for MVP scope).
**Use cases**: Ask a question, check a URL/email, check a password, take the quiz, view results.

---

## 2. Data Flow Diagram (DFD) — Level 0 (Context Diagram)

```mermaid
graph LR
  U((User)) -->|question / URL / password / quiz answers| S[Cybersecurity Awareness Chatbot System]
  S -->|answers / risk results / scores| U
  S -->|retrieval query| KB[(Knowledge Base)]
  KB -->|relevant content| S
  S -->|prompt| LLM[External LLM API]
  LLM -->|generated response| S
```

---

## 3. Data Flow Diagram (DFD) — Level 1

```mermaid
graph TD
  U((User)) --> FE[React Frontend]
  FE --> P1[1.0 Process chat message]
  FE --> P2[2.0 Process URL/email check]
  FE --> P3[3.0 Process password check]
  FE --> P4[4.0 Process quiz]

  P1 --> KB[(Knowledge Base)]
  P1 --> LLM[(LLM API)]
  P2 --> RULES[(Heuristic Rules)]
  P2 --> LLM
  P3 --> RULES
  P3 --> LLM
  P4 --> QB[(Quiz Question Bank)]

  P1 --> FE
  P2 --> FE
  P3 --> FE
  P4 --> FE
```

---

## 4. Sequence Diagram — Chat Request Flow

```mermaid
sequenceDiagram
  participant U as User
  participant FE as React Frontend
  participant BE as Express Backend
  participant KB as Knowledge Base
  participant LLM as LLM API

  U->>FE: Types a security question
  FE->>BE: POST /api/chat { message }
  BE->>KB: Retrieve relevant chunks (keyword/TF-IDF search)
  KB-->>BE: Top matching content chunks
  BE->>LLM: Send prompt (user question + retrieved context)
  LLM-->>BE: Generated grounded answer
  BE-->>FE: { reply, sources }
  FE-->>U: Display answer with source tags
```

---

## 5. Sequence Diagram — URL/Phishing Check Flow

```mermaid
sequenceDiagram
  participant U as User
  participant FE as React Frontend
  participant BE as Express Backend
  participant R as Rule Engine
  participant LLM as LLM API

  U->>FE: Pastes URL or email text
  FE->>BE: POST /api/check-url { input, type }
  BE->>R: Run heuristic checks (domain, shortener, TLD, etc.)
  R-->>BE: Risk flags + preliminary score
  BE->>LLM: Ask for plain-language explanation of flags
  LLM-->>BE: Explanation text
  BE-->>FE: { riskLevel, score, flags, explanation }
  FE-->>U: Show result card (color-coded risk level)
```

---

## 6. Entity-Relationship (ER) Diagram

The system is intentionally kept lightweight (no persistent user accounts for MVP), but the following entities model the knowledge base and quiz content that do exist as structured data.

```mermaid
erDiagram
  KNOWLEDGE_CHUNK {
    string id PK
    string topic
    text content
    string tags
  }
  QUIZ_QUESTION {
    string id PK
    text prompt
    text explanation
  }
  QUIZ_OPTION {
    string id PK
    string questionId FK
    text text
    boolean isCorrect
  }
  CHAT_SESSION {
    string sessionId PK
    timestamp createdAt
  }
  CHAT_MESSAGE {
    string id PK
    string sessionId FK
    string role
    text content
  }

  QUIZ_QUESTION ||--o{ QUIZ_OPTION : has
  CHAT_SESSION ||--o{ CHAT_MESSAGE : contains
```

> Note: `KNOWLEDGE_CHUNK` is the RAG grounding data (stored as flat files for MVP, modeled here as an entity for report completeness). `CHAT_SESSION`/`CHAT_MESSAGE` can be in-memory for MVP; the ER model shows the logical structure regardless of physical storage.

---

## 7. Flowchart — Password Strength Check Logic

```mermaid
flowchart TD
  A[User submits password] --> B{Length >= 8?}
  B -- No --> W1[Flag: too short]
  B -- Yes --> C{Common password / dictionary word?}
  C -- Yes --> W2[Flag: common pattern]
  C -- No --> D{Contains keyboard pattern or repeated chars?}
  D -- Yes --> W3[Flag: predictable pattern]
  D -- No --> E[Calculate entropy score]
  W1 --> E
  W2 --> E
  W3 --> E
  E --> F{Score threshold}
  F -- Low --> G[Label: Weak]
  F -- Medium --> H[Label: Moderate]
  F -- High --> I[Label: Strong]
  G --> J[Send flags + score to LLM for explanation]
  H --> J
  I --> J
  J --> K[Return strength + explanation + suggestions]
```
