import { Router } from "express";
import { retrieve } from "../services/ragService.js";
import { generateResponse } from "../services/llmService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "message is required" });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "message too long" });
  }

  const contextChunks = retrieve(message, 3);
  const contextText = contextChunks.map((c) => c.content).join("\n\n");

  const systemPrompt = `You are a friendly cybersecurity awareness assistant. Answer the user's question in plain, non-technical language using ONLY the context provided below when relevant. If the context doesn't cover the question, answer using general well-known cybersecurity best practices, and say so.

Context:
${contextText || "(no specific context found — answer from general cybersecurity best practices)"}`;

  try {
    const reply = await generateResponse(systemPrompt, message);
    res.json({
      reply,
      sources: contextChunks.map((c) => c.source),
    });
  } catch (err) {
    console.error(err);
    res.status(503).json({
      error: "AI service unavailable right now. Please try again shortly.",
    });
  }
});

export default router;
