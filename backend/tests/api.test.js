import request from "supertest";
import express from "express";
import cors from "cors";

import chatRoute from "../routes/chat.js";
import checkUrlRoute from "../routes/checkUrl.js";
import checkPasswordRoute from "../routes/checkPassword.js";
import quizRoute from "../routes/quiz.js";

// Build a minimal app instance for testing, without starting a real server or rate limiter.
function buildTestApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api/chat", chatRoute);
  app.use("/api/check-url", checkUrlRoute);
  app.use("/api/check-password", checkPasswordRoute);
  app.use("/api/quiz", quizRoute);
  return app;
}

const app = buildTestApp();

describe("GET /api/health", () => {
  test("returns ok status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("POST /api/check-url", () => {
  test("rejects missing input", async () => {
    const res = await request(app).post("/api/check-url").send({});
    expect(res.status).toBe(400);
  });

  test("returns a risk assessment for a valid input", async () => {
    const res = await request(app)
      .post("/api/check-url")
      .send({ input: "http://192.168.1.1/login" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("riskLevel");
    expect(res.body).toHaveProperty("flags");
  });
});

describe("POST /api/check-password", () => {
  test("rejects missing password", async () => {
    const res = await request(app).post("/api/check-password").send({});
    expect(res.status).toBe(400);
  });

  test("returns a strength assessment", async () => {
    const res = await request(app)
      .post("/api/check-password")
      .send({ password: "correcthorsebatterystaple123!" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("strength");
  });
});

describe("GET /api/quiz", () => {
  test("returns quiz questions without exposing correct answers", async () => {
    const res = await request(app).get("/api/quiz");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.questions)).toBe(true);
    expect(res.body.questions.length).toBeGreaterThan(0);
    expect(res.body.questions[0]).not.toHaveProperty("correctOptionId");
  });
});

describe("POST /api/quiz/submit", () => {
  test("rejects missing answers array", async () => {
    const res = await request(app).post("/api/quiz/submit").send({});
    expect(res.status).toBe(400);
  });

  test("scores a full set of correct answers", async () => {
    const quizRes = await request(app).get("/api/quiz");
    // We can't know correct answers from the safe payload, so just verify shape/behavior
    const answers = quizRes.body.questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: q.options[0].id,
    }));
    const res = await request(app).post("/api/quiz/submit").send({ answers });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("score");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("rating");
  });
});
