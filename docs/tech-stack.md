# Tech Stack Document
## AI-Powered Cybersecurity Awareness Chatbot

### 1. Frontend
| Layer | Choice | Notes |
|---|---|---|
| Framework | React (Vite) | Fast dev server, simple build |
| Styling | Tailwind CSS | Rapid, consistent UI styling |
| State management | React Context / useState | No need for Redux at this scale |
| HTTP client | fetch / axios | Talks to Express backend |
| Icons | Lucide React or Tabler icons | Lightweight, consistent icon set |
| Charts (quiz score, dashboard) | Recharts | Simple score visualizations |
| Voice interaction | Web Speech API (`SpeechRecognition` + `speechSynthesis`) | Browser-native speech-to-text and text-to-speech — no extra service, API key, or cost; gracefully degrades to text-only in unsupported browsers |

### 2. Backend
| Layer | Choice | Notes |
|---|---|---|
| Runtime | Node.js (LTS) | |
| Framework | Express.js | Minimal REST API framework |
| Validation | Zod or Joi | Input validation on all routes |
| Rate limiting | express-rate-limit | Protects LLM API quota |
| Env management | dotenv | Keeps API keys out of source |
| Password rule engine | zxcvbn (npm) or custom regex rules | Entropy/pattern-based strength check |

### 3. AI / LLM Integration
| Component | Choice | Notes |
|---|---|---|
| LLM Provider | Groq (free, no credit card) by default — Anthropic Claude also supported | Provider abstracted behind `llmService.js`; Groq's free tier (no billing setup) makes the project runnable at zero cost for demo/evaluation |
| Retrieval approach | Python microservice (scikit-learn TF-IDF + cosine similarity) | Real vectorized semantic retrieval, run as a separate Flask service (`/python`) |
| Retrieval fallback | JS keyword-overlap search (Node) | Used automatically if the Python service is unreachable, so the app degrades gracefully |
| Knowledge base format | Markdown chunks | Easy to curate and version-control; shared by both retrieval implementations |
| Optional vector store (stretch goal) | Chroma / sentence-transformer embeddings | Drop-in upgrade to the Python service without changing its API or the Node integration |

### 4. Data / Storage
| Need | Choice | Notes |
|---|---|---|
| Session data | In-memory store or short-TTL (no DB required for MVP) | No PII persistence |
| Knowledge base | Flat files in repo | No database dependency needed |
| Quiz question bank | Static JSON file | Easy to expand |

### 5. DevOps / Deployment
| Need | Choice | Notes |
|---|---|---|
| Frontend hosting | Vercel or Netlify | Free tier, auto-deploy from GitHub |
| Backend hosting | Render or Railway | Free tier suitable for demo |
| Version control | Git + GitHub | Also used for report/documentation history |
| CI (optional/stretch) | GitHub Actions (lint + basic test run) | Nice-to-have for report credibility |

### 6. Testing
| Need | Choice | Notes |
|---|---|---|
| Backend unit/integration tests | Jest + Supertest | Test heuristic engines and API routes |
| Frontend testing (optional) | React Testing Library | Basic component tests |

### 7. Why this stack (for report justification)
- **React + Node/Express** is a widely understood, well-documented full-stack combination — appropriate for a final year project scope and easy to explain to an evaluation panel.
- **No heavy database or vector DB required** for the MVP — reduces setup complexity and infrastructure risk within a semester timeline.
- **LLM provider abstraction** (single service module) means the demo isn't locked into one vendor and keeps the "AI integration" cleanly separated from business logic for code review.
- **Free-tier deployment** keeps the project reproducible and demoable without ongoing cost.
