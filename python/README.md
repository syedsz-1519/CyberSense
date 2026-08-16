# Python RAG Microservice

Semantic (TF-IDF + cosine similarity) retrieval over the shared knowledge base, using scikit-learn. This is the AI/ML-native retrieval component of the project's RAG pipeline, separate from the lightweight keyword-based fallback built into the Node backend (`backend/services/ragService.js`).

## Why a separate Python service?
- Demonstrates real applied ML (vectorization + similarity search) rather than only calling an external LLM API — relevant for an AI & ML branch final year project.
- Keeps the retrieval logic upgradeable independently (e.g. swapping TF-IDF for sentence-transformer embeddings later) without touching the Node/React application code.
- The Node backend calls this service over HTTP and automatically falls back to its own keyword search if this service isn't running — so the app never breaks if you're not running Python locally.

## Setup
```bash
cd python
python -m venv venv
source venv/bin/activate        # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python rag_service.py
```
Runs on `http://localhost:8001`.

## Endpoints
| Method | Path | Description |
|---|---|---|
| GET | `/health` | Service status + number of indexed chunks |
| POST | `/retrieve` | `{ "query": "...", "top_n": 3 }` → ranked matching knowledge-base sections with similarity scores |
| POST | `/reindex` | Re-scans `backend/knowledge-base/*.md` (call after editing knowledge base content) |

## How it works
1. On startup, reads every `.md` file in `../backend/knowledge-base/`, splitting each into sections by `## ` headings (same chunking convention as the Node RAG service).
2. Builds a TF-IDF matrix across all sections using `scikit-learn`'s `TfidfVectorizer`.
3. On a `/retrieve` request, vectorizes the query the same way and ranks chunks by cosine similarity.

## Connecting it to the backend
Set `PY_RAG_URL` in `backend/.env` if running this service on a different host/port (defaults to `http://localhost:8001`). Start this service *before* the Node backend for best results — otherwise the first few chat requests will use the JS fallback until this service becomes reachable.

## Upgrade path (future work)
Swap `TfidfVectorizer` for a proper embedding model (e.g. `sentence-transformers`) and add a vector index (e.g. Chroma or FAISS) for true dense semantic search at scale — the `/retrieve` API contract stays the same, so no changes would be needed in the Node backend or frontend.
