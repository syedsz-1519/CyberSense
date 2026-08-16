import { Router } from "express";
import { checkUrl } from "../services/ruleEngine.js";
import { generateResponse } from "../services/llmService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { input, type } = req.body || {};
  if (!input || typeof input !== "string" || input.trim().length === 0) {
    return res.status(400).json({ error: "input is required" });
  }
  if (input.length > 3000) {
    return res.status(400).json({ error: "input too long" });
  }

  const { riskLevel, score, flags } = checkUrl(input);

  let explanation = flags.length
    ? "This shows signs commonly associated with phishing attempts."
    : "No obvious red flags were detected by the heuristic checks.";

  try {
    const systemPrompt = `You are a cybersecurity assistant. Explain in 2-3 plain-language sentences why the following ${
      type === "email_text" ? "email" : "URL"
    } was flagged (or not) as risky, based on these detected signals: ${
      flags.length ? flags.join("; ") : "none detected"
    }. Be concrete and non-alarming.`;
    explanation = await generateResponse(systemPrompt, input);
  } catch (err) {
    console.error("LLM explanation unavailable, falling back to rule-based summary:", err.message);
  }

  res.json({ riskLevel, score, flags, explanation });
});

export default router;
