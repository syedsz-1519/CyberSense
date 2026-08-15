# Project Documentation Index
## AI-Powered Cybersecurity Awareness Chatbot — Final Year Project

This folder contains the complete documentation set for the project. Suggested reading order:

1. **prd.md** — Product Requirements Document: what the product is, who it's for, what it must do.
2. **trd.md** — Technical Requirements Document: API specs, data models, AI/RAG integration details.
3. **architecture.md** — System architecture: components, data flow, deployment view.
4. **tech-stack.md** — Chosen technologies and justification for each layer.
5. **design-ui-ux.md** — Visual design system: colors, typography, layout, accessibility.
6. **testing-plan.md** — How each module (including the AI components) will be tested and evaluated.
7. **phases.md** — Week-by-week phase breakdown for the whole project timeline.
8. **roadmap.md** — Milestone-level roadmap, current status, and future scope.
9. **major-project-checklist.md** — Everything typically required for a final year major project (documentation, diagrams, viva prep, submission package) with a gap analysis against what's already done.
10. **memory.md** — Full project context in one file, for quickly restoring context in a new session.

### Suggested repo structure
```
project-root/
├── frontend/           # React app
├── backend/             # Node/Express API
│   ├── routes/
│   ├── services/         # llmService.js, ragService.js, ruleEngine.js
│   ├── knowledge-base/   # Markdown/JSON grounding content
│   └── data/quiz.json
├── docs/                 # This documentation set
│   ├── prd.md
│   ├── trd.md
│   ├── architecture.md
│   ├── tech-stack.md
│   ├── design-ui-ux.md
│   └── testing-plan.md
├── .env.example
└── README.md             # Top-level project README (setup instructions)
```

### Notes for the final report
Most college evaluation rubrics expect: Problem statement → Literature/existing solutions → Proposed system (architecture + design) → Implementation → Testing & results → Conclusion & future scope. This documentation set maps directly onto those sections, so it can largely be adapted into report chapters rather than rewritten from scratch.
