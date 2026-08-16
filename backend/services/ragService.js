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

/**
 * Retrieve the top-N most relevant knowledge-base chunks for a query.
 * @param {string} query
 * @param {number} topN
 * @returns {{source: string, content: string}[]}
 */
export function retrieve(query, topN = 3) {
  const all = loadChunks();
  return all
    .map((c) => ({ ...c, _score: score(c.content, query) }))
    .filter((c) => c._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, topN);
}
