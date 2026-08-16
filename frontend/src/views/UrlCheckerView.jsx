import { useState } from "react";

export default function UrlCheckerView() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/check-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, type: "url" }),
      });
      setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <label>Paste a URL or suspicious email text</label>
      <textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="primary" onClick={check} disabled={loading}>
        {loading ? "Checking..." : "Check"}
      </button>

      {result && (
        <div className={`result-card ${result.riskLevel}`}>
          <strong>Risk level: {result.riskLevel}</strong>
          {result.flags?.length > 0 && (
            <ul>
              {result.flags.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  );
}
