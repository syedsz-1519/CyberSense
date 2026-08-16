"""
rag_service.py — Python-based semantic retrieval microservice for CyberSense.

Why this exists:
The Node.js backend (backend/services/ragService.js) does simple keyword-overlap
retrieval, which is fast and dependency-free but not truly "semantic" — it can't
tell that a question about "someone pretending to be tech support on a phone call"
is related to a knowledge-base section about "vishing" if the words don't overlap.

This service replaces that with TF-IDF + cosine similarity (scikit-learn), which
represents each knowledge-base chunk and each query as a weighted vector and
retrieves the closest ones by meaning-bearing term overlap — a lightweight,
CPU-only approximation of embedding-based semantic search, appropriate for an
academic project's scale (no GPU / heavy model download required).

Upgrade path (documented in docs/tech-stack.md and docs/roadmap.md): swap the
TfidfVectorizer below for a sentence-transformer embedding model + a vector store
(e.g. Chroma) for true dense semantic embeddings, without changing the API.

Run:
    pip install -r requirements.txt
    python rag_service.py

Then the Node backend can call this service instead of (or alongside) its own
keyword-based retrieval:
    POST http://localhost:8001/retrieve   { "query": "...", "top_n": 3 }
"""

import os
import re
import glob

from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

KB_DIR = os.path.join(os.path.dirname(__file__), "..", "backend", "knowledge-base")

_chunks = []          # list of {"source": filename, "content": text}
_vectorizer = None
_matrix = None


def load_and_index_knowledge_base():
    """Read every markdown file in the knowledge base, split into sections,
    and build a TF-IDF matrix over all sections."""
    global _chunks, _vectorizer, _matrix

    _chunks = []
    for filepath in glob.glob(os.path.join(KB_DIR, "*.md")):
        with open(filepath, "r", encoding="utf-8") as f:
            raw = f.read()
        # Split on level-2 markdown headings, same convention as the Node RAG service
        sections = re.split(r"\n(?=## )", raw)
        for section in sections:
            section = section.strip()
            if len(section) < 20:
                continue
            _chunks.append({
                "source": os.path.basename(filepath),
                "content": section,
            })

    if not _chunks:
        _vectorizer = None
        _matrix = None
        return

    texts = [c["content"] for c in _chunks]
    _vectorizer = TfidfVectorizer(stop_words="english", max_features=2000)
    _matrix = _vectorizer.fit_transform(texts)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "chunks_indexed": len(_chunks)})


@app.route("/retrieve", methods=["POST"])
def retrieve():
    data = request.get_json(force=True) or {}
    query = (data.get("query") or "").strip()
    top_n = int(data.get("top_n", 3))

    if not query:
        return jsonify({"error": "query is required"}), 400
    if _vectorizer is None or _matrix is None:
        return jsonify({"error": "knowledge base not indexed"}), 503

    query_vec = _vectorizer.transform([query])
    scores = cosine_similarity(query_vec, _matrix)[0]

    ranked_indices = scores.argsort()[::-1][:top_n]
    results = []
    for idx in ranked_indices:
        if scores[idx] <= 0:
            continue
        results.append({
            "source": _chunks[idx]["source"],
            "content": _chunks[idx]["content"],
            "score": round(float(scores[idx]), 4),
        })

    return jsonify({"query": query, "results": results})


@app.route("/reindex", methods=["POST"])
def reindex():
    """Re-scan the knowledge-base folder — call this after editing/adding .md files."""
    load_and_index_knowledge_base()
    return jsonify({"status": "reindexed", "chunks_indexed": len(_chunks)})


if __name__ == "__main__":
    load_and_index_knowledge_base()
    print(f"Indexed {len(_chunks)} knowledge-base chunks from {KB_DIR}")
    app.run(host="0.0.0.0", port=8001, debug=False)
