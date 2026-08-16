import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import chatRoute from "./routes/chat.js";
import checkUrlRoute from "./routes/checkUrl.js";
import checkPasswordRoute from "./routes/checkPassword.js";
import quizRoute from "./routes/quiz.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50kb" }));

// Basic rate limiting to protect the LLM API quota
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/chat", chatRoute);
app.use("/api/check-url", checkUrlRoute);
app.use("/api/check-password", checkPasswordRoute);
app.use("/api/quiz", quizRoute);

// Central error handler — never leak internals to the client
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong. Please try again." });
});

app.listen(PORT, () => {
  console.log(`CyberSense backend running on port ${PORT}`);
});
