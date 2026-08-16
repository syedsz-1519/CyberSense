// ragService.js
// Lightweight retrieval over the curated knowledge-base markdown files.
// Uses simple keyword overlap scoring — sufficient at this project's scale.
// Can be upgraded to embeddings/vector search later without changing callers.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_DIR = path.join(__dirname, "..", "knowledge-base");

let chunks = null;

function loadChunks() {
  if (chunks) return chunks;
  chunks = [];
  const files = fs.readdirSync(KB_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(KB_DIR, file), "utf-8");
    // Split on level-2 headings ("## ") so each section becomes its own chunk
    const sections = raw.split(/\n(?=## )/g);
    for (const section of sections) {
      if (section.trim().length < 20) continue;
      chunks.push({ source: file, content: section.trim() });
    }
  }
  return chunks;
}

function score(text, query) {
  const words = query.toLowerCase().match(/[a-z0-9]+/g) || [];
  const lowerText = text.toLowerCase();
  let matches = 0;
  for (const w of words) {
    if (w.length < 3) continue;
    if (lowerText.includes(w)) matches++;
  }
  return matches;
}

function retrieveKeyword(query, topN = 3) {
  const all = loadChunks();
  return all
    .map((c) => ({ ...c, _score: score(c.content, query) }))
    .filter((c) => c._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, topN);
}

const PY_RAG_URL = process.env.PY_RAG_URL || "http://localhost:8001";

/**
 * Retrieve the top-N most relevant knowledge-base chunks for a query.
 *
 * Tries the Python TF-IDF semantic retrieval microservice first (see
 * /python/rag_service.py) for better-than-keyword relevance. If that service
 * isn't running (e.g. during quick local dev, or if it crashes), falls back
 * automatically to the built-in JS keyword-overlap search below, so the app
 * never breaks because of the optional Python component.
 *
 * @param {string} query
 * @param {number} topN
 * @returns {Promise<{source: string, content: string}[]>}
 */
export async function retrieve(query, topN = 3) {
  try {
    const res = await fetch(`${PY_RAG_URL}/retrieve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, top_n: topN }),
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) throw new Error(`Python RAG service returned ${res.status}`);
    const data = await res.json();
    return data.results.map((r) => ({ source: r.source, content: r.content }));
  } catch (err) {
    console.warn("Python RAG service unavailable, falling back to JS keyword search:", err.message);
    return retrieveKeyword(query, topN);
  }
}
