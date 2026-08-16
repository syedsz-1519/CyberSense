import { useState } from "react";

export default function ChatView() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "bot", content: data.reply || data.error || "No response" },
      ]);
    } catch (e) {
      setMessages((m) => [...m, { role: "bot", content: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="chat-log">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="bubble bot">Thinking…</div>}
      </div>
      <textarea
        rows={2}
        placeholder="Ask a cybersecurity question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <button className="primary" onClick={sendMessage} disabled={loading}>
        Send
      </button>
    </div>
  );
}
