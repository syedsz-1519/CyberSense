# Design & UI/UX Document
## AI-Powered Cybersecurity Awareness Chatbot

### 1. Design Principles
- **Trustworthy, not alarming** — security tools should feel calm and reassuring, not scary. Avoid aggressive red/warning colors everywhere; reserve alert colors for genuine risk states.
- **Clarity over cleverness** — plain-language explanations, minimal jargon, short sentences.
- **Fast feedback** — every check (URL, password, quiz answer) gives an immediate, visible result state.
- **Accessible by default** — legible contrast, readable font sizes, keyboard-navigable forms.

### 2. Color Palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary (brand) | Deep blue | `#1E3A8A` | Header, primary buttons, links |
| Secondary | Teal | `#0F766E` | Secondary actions, highlights |
| Background | Off-white | `#F8FAFC` | Page background |
| Surface | White | `#FFFFFF` | Cards, chat bubbles |
| Text primary | Slate 900 | `#0F172A` | Body text |
| Text secondary | Slate 500 | `#64748B` | Captions, hints |
| Success (safe/strong) | Green | `#16A34A` | Safe URL, strong password |
| Warning (caution) | Amber | `#D97706` | Medium risk |
| Danger (risk/weak) | Red | `#DC2626` | Phishing detected, weak password |
| Border | Slate 200 | `#E2E8F0` | Card borders, dividers |

> Rule: color is never the *only* signal for risk level — always pair with an icon and text label (e.g. "High risk" + red + warning icon) for accessibility.

### 3. Typography
| Use | Font | Weight | Size |
|---|---|---|---|
| Headings | Inter or system-ui | 600 | 24–32px |
| Body text | Inter or system-ui | 400 | 15–16px |
| Chat messages | Inter | 400 | 15px |
| Code/technical snippets | JetBrains Mono / monospace | 400 | 13–14px |
| Buttons/labels | Inter | 500 | 14px |

Line height: 1.5–1.7 for body text, 1.3 for headings. Avoid font sizes below 12px anywhere in the UI.

### 4. Layout Structure

**Main pages/views:**
1. **Landing/Home** — brief intro, quick links to the 4 modules (Chat, URL Checker, Password Analyzer, Quiz).
2. **Chat view** — standard chat UI: message list (user right-aligned, bot left-aligned), input box with send button, source citations shown as small tags under bot replies.
3. **URL/Email Checker view** — input textarea, "Check" button, result card showing risk level, flags list, and explanation.
4. **Password Analyzer view** — password input (with show/hide toggle), live strength meter bar, explanation panel below.
5. **Quiz view** — one question at a time, progress indicator (e.g. "Question 3 of 8"), result screen with score + tips at the end.

**Navigation:** simple top nav bar or sidebar with 4 icons (chat, link, lock, quiz) — single-page app, no deep navigation needed.

### 5. Key UI Components
- **Chat bubble**: rounded corners (12px), max-width 75% of container, subtle shadow-free flat surface with border.
- **Risk result card**: colored left-border (4px) matching risk level (green/amber/red), icon + label + explanation text.
- **Strength meter**: horizontal segmented bar (weak/moderate/strong), animates on input change.
- **Quiz option buttons**: full-width, clear selected state, disabled after submission with correct/incorrect highlighting.
- **Buttons**: primary (filled blue), secondary (outlined), consistent 8px border radius, 44px min height for tap targets.

### 6. Responsive Behavior
- **Desktop (≥1024px)**: sidebar navigation + main content area.
- **Tablet (768–1023px)**: collapsible sidebar or top nav.
- **Mobile (<768px)**: bottom tab bar for the 4 modules, single-column layout, chat input pinned to bottom of viewport.

### 7. Accessibility Checklist
- Minimum WCAG AA contrast ratio (4.5:1) for text.
- All interactive elements reachable via keyboard (Tab/Enter).
- Form inputs have visible labels (not placeholder-only).
- Risk/status information conveyed with icon + text + color (not color alone).
- Focus states visible on all buttons/inputs.

### 8. Tone of Voice (for chatbot responses and UI copy)
- Friendly but professional — like a helpful IT-savvy senior, not a stiff corporate manual.
- Never shame the user for a weak password or a clicked phishing link — always frame feedback constructively.
- Avoid excessive technical jargon; define terms briefly when used (e.g. "two-factor authentication (2FA) — a second login step").
