import { useState } from "react";
import ChatView from "./views/ChatView.jsx";
import UrlCheckerView from "./views/UrlCheckerView.jsx";
import PasswordCheckerView from "./views/PasswordCheckerView.jsx";
import QuizView from "./views/QuizView.jsx";

const TABS = [
  { id: "chat", label: "Chat" },
  { id: "url", label: "URL Checker" },
  { id: "password", label: "Password" },
  { id: "quiz", label: "Quiz" },
];

export default function App() {
  const [tab, setTab] = useState("chat");

  return (
    <div className="app-shell">
      <h1>CyberSense</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>
        AI-powered cybersecurity awareness assistant
      </p>

      <nav className="nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "chat" && <ChatView />}
      {tab === "url" && <UrlCheckerView />}
      {tab === "password" && <PasswordCheckerView />}
      {tab === "quiz" && <QuizView />}
    </div>
  );
}
