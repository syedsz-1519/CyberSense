import { useEffect, useRef, useState } from "react";

// Web Speech API is browser-native (Chrome, Edge, Safari) — no extra backend or API cost.
const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function ChatView() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(false);
  const recognitionRef = useRef(null);
  const chatLogRef = useRef(null);

  const speechSupported = Boolean(SpeechRecognition);
  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!speechSupported) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
  }, [speechSupported]);

  useEffect(() => {
    chatLogRef.current?.scrollTo({ top: chatLogRef.current.scrollHeight });
  }, [messages, loading]);

  function toggleListening() {
    if (!speechSupported) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  }

  function speak(text) {
    if (!ttsSupported || !voiceReplies) return;
    window.speechSynthesis.cancel(); // stop any prior speech before starting new
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }

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
      const replyText = data.reply || data.error || "No response";
      setMessages((m) => [...m, { role: "bot", content: replyText }]);
      speak(replyText);
    } catch (e) {
      const errText = "Something went wrong.";
      setMessages((m) => [...m, { role: "bot", content: errText }]);
      speak(errText);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="chat-toolbar">
        {ttsSupported && (
          <label className="voice-toggle">
            <input
              type="checkbox"
              checked={voiceReplies}
              onChange={(e) => {
                setVoiceReplies(e.target.checked);
                if (!e.target.checked) window.speechSynthesis.cancel();
              }}
            />
            🔊 Speak replies aloud
          </label>
        )}
      </div>

      <div className="chat-log" ref={chatLogRef}>
        {messages.length === 0 && (
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
            Ask a cybersecurity question by typing, or tap the mic to speak.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="bubble bot">Thinking…</div>}
      </div>

      <div className="chat-input-row">
        <textarea
          rows={2}
          placeholder={listening ? "Listening…" : "Ask a cybersecurity question..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        {speechSupported && (
          <button
            type="button"
            className={`mic-btn ${listening ? "listening" : ""}`}
            onClick={toggleListening}
            title={listening ? "Stop listening" : "Speak your question"}
            aria-label={listening ? "Stop voice input" : "Start voice input"}
          >
            {listening ? "⏹" : "🎤"}
          </button>
        )}
      </div>

      {!speechSupported && (
        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 6 }}>
          Voice input isn't supported in this browser — try Chrome or Edge. Text chat still works normally.
        </p>
      )}

      <button className="primary" onClick={sendMessage} disabled={loading}>
        Send
      </button>
    </div>
  );
}
