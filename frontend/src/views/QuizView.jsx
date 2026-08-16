import { useEffect, useState } from "react";

export default function QuizView() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quiz")
      .then((r) => r.json())
      .then((data) => setQuestions(data.questions || []))
      .finally(() => setLoading(false));
  }, []);

  function selectOption(questionId, optionId) {
    setAnswers((a) => ({ ...a, [questionId]: optionId }));
  }

  async function submit() {
    const payload = {
      answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId,
      })),
    };
    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setResult(await res.json());
  }

  if (loading) return <div className="card">Loading quiz…</div>;

  if (result) {
    return (
      <div className="card">
        <h3>
          Score: {result.score} / {result.total} — {result.rating}
        </h3>
        {result.tips?.length > 0 && (
          <>
            <p>Tips based on missed questions:</p>
            <ul>
              {result.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      {questions.map((q, idx) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p>
            <strong>
              {idx + 1}. {q.prompt}
            </strong>
          </p>
          {q.options.map((opt) => (
            <label key={opt.id} style={{ display: "block", marginBottom: 4 }}>
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === opt.id}
                onChange={() => selectOption(q.id, opt.id)}
              />{" "}
              {opt.text}
            </label>
          ))}
        </div>
      ))}
      <button className="primary" onClick={submit}>
        Submit Quiz
      </button>
    </div>
  );
}
