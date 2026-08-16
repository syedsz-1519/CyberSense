import { useState } from "react";

export default function PasswordCheckerView() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!password) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/check-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <label>Enter a password to analyze (not stored or logged)</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="primary" onClick={check} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className={`result-card ${result.strength}`}>
          <strong>Strength: {result.strength}</strong>
          {result.issues?.length > 0 && (
            <ul>
              {result.issues.map((f, i) => (
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
