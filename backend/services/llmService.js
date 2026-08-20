// llmService.js
// Thin abstraction over whichever LLM provider is configured, so routes/services
// never call a specific vendor SDK directly. Swap the implementation here only.

import dotenv from "dotenv";
dotenv.config();

const PROVIDER = process.env.LLM_PROVIDER || "groq";
const API_KEY = process.env.LLM_API_KEY;

/**
 * Send a prompt (with optional grounding context) to the configured LLM
 * and return the generated text.
 * @param {string} systemPrompt - instructions + retrieved context
 * @param {string} userMessage - the user's actual question/input
 * @returns {Promise<string>}
 */
export async function generateResponse(systemPrompt, userMessage) {
  if (!API_KEY) {
    // Fail gracefully — callers should catch this and show a rule-based-only result
    throw new Error("LLM_API_KEY not configured");
  }

  if (PROVIDER === "anthropic") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });
    if (!res.ok) throw new Error(`LLM API error: ${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text ?? "";
  }

  if (PROVIDER === "groq") {
    // Groq: free tier, no credit card required. OpenAI-compatible endpoint.
    // Get a key at https://console.groq.com/keys
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });
    if (!res.ok) throw new Error(`LLM API error: ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? "";
  }

  // Add other providers (openai, etc.) here as needed.
  throw new Error(`Unsupported LLM_PROVIDER: ${PROVIDER}`);
}
