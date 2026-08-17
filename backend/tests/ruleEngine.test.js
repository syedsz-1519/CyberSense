import { checkUrl, checkPassword } from "../services/ruleEngine.js";

describe("checkUrl", () => {
  test("flags a raw IP address as high risk", () => {
    const result = checkUrl("http://192.168.1.1/login");
    expect(result.riskLevel).toBe("high");
    expect(result.flags.some((f) => f.includes("IP address"))).toBe(true);
  });

  test("flags a URL shortener", () => {
    const result = checkUrl("https://bit.ly/3xample");
    expect(result.flags.some((f) => f.includes("shortener"))).toBe(true);
  });

  test("does not flag a clean, ordinary HTTPS URL", () => {
    const result = checkUrl("https://www.wikipedia.org/wiki/Cybersecurity");
    expect(result.riskLevel).toBe("low");
    expect(result.flags.length).toBe(0);
  });

  test("flags non-HTTPS URLs", () => {
    const result = checkUrl("http://example.com/login");
    expect(result.flags.some((f) => f.includes("HTTPS"))).toBe(true);
  });
});

describe("checkPassword", () => {
  test("flags a common password as weak", () => {
    const result = checkPassword("123456");
    expect(result.strength).toBe("weak");
    expect(result.issues.length).toBeGreaterThan(0);
  });

  test("flags a short password as too short", () => {
    const result = checkPassword("abc1");
    expect(result.issues.some((i) => i.includes("short"))).toBe(true);
  });

  test("rates a long random passphrase as strong", () => {
    const result = checkPassword("Xk9#mQ2$vLp7@Rz4wT!bN8");
    expect(result.strength).toBe("strong");
  });

  test("flags keyboard/sequential patterns", () => {
    const result = checkPassword("qwerty12345678");
    expect(result.issues.some((i) => i.includes("pattern"))).toBe(true);
  });
});
