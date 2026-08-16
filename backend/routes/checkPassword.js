import { Router } from "express";
import { checkPassword } from "../services/ruleEngine.js";
import { generateResponse } from "../services/llmService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { password } = req.body || {};
  if (!password || typeof password !== "string") {
    return res.status(400).json({ error: "password is required" });
  }
  if (password.length > 200) {
    return res.status(400).json({ error: "password too long" });
  }

  // NOTE: the password itself is never logged or persisted anywhere below.
  const { strength, score, issues } = checkPassword(password);

  let explanation = issues.length
    ? "This password has patterns that make it easier to guess or crack."
    : "This password looks reasonably strong based on length and pattern checks.";
  let suggestions = [
    "Use a longer passphrase of 4+ random unrelated words",
    "Avoid personal information and common patterns",
    "Use a password manager to generate and store unique passwords",
  ];

  try {
    const systemPrompt = `You are a cybersecurity assistant. A password was analyzed with strength="${strength}" and these issues: ${
      issues.length ? issues.join("; ") : "none"
    }. Do NOT repeat the password itself. In 2-3 sentences, explain in plain language why it's rated this way and give one concrete tip to improve it.`;
    explanation = await generateResponse(systemPrompt, `strength=${strength}, issues=${issues.join(",")}`);
  } catch (err) {
    console.error("LLM explanation unavailable, falling back to rule-based summary:", err.message);
  }

  res.json({ strength, score, issues, explanation, suggestions });
});

export default router;
