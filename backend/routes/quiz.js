import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUIZ_PATH = path.join(__dirname, "..", "data", "quiz.json");

const router = Router();

function loadQuiz() {
  const raw = fs.readFileSync(QUIZ_PATH, "utf-8");
  return JSON.parse(raw);
}

// GET /api/quiz — question set WITHOUT correct answers exposed
router.get("/", (req, res) => {
  const { questions } = loadQuiz();
  const safeQuestions = questions.map(({ id, prompt, options }) => ({ id, prompt, options }));
  res.json({ questions: safeQuestions });
});

// POST /api/quiz/submit — score answers server-side
router.post("/submit", (req, res) => {
  const { answers } = req.body || {};
  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "answers array is required" });
  }

  const { questions } = loadQuiz();
  let score = 0;
  const tips = [];

  for (const a of answers) {
    const q = questions.find((q) => q.id === a.questionId);
    if (!q) continue;
    if (q.correctOptionId === a.selectedOptionId) {
      score++;
    } else {
      tips.push(q.explanation);
    }
  }

  const total = questions.length;
  const ratio = total ? score / total : 0;
  let rating = "beginner";
  if (ratio >= 0.8) rating = "vigilant";
  else if (ratio >= 0.5) rating = "aware";

  res.json({ score, total, rating, tips });
});

export default router;
