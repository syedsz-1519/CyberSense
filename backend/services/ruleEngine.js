// ruleEngine.js
// Deterministic, offline heuristic checks — no LLM required.
// These run first so the app still gives useful results even if the LLM API is down.

const SUSPICIOUS_TLDS = ["zip", "top", "xyz", "click", "country", "gq", "tk"];
const SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly"];

export function checkUrl(input) {
  const flags = [];
  let riskScore = 0;

  const lower = input.toLowerCase();

  if (SHORTENERS.some((s) => lower.includes(s))) {
    flags.push("Uses a URL shortener, hiding the real destination");
    riskScore += 2;
  }

  if (/^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(lower)) {
    flags.push("Uses a raw IP address instead of a domain name");
    riskScore += 3;
  }

  const tldMatch = lower.match(/\.([a-z]{2,10})(\/|$|\?)/);
  if (tldMatch && SUSPICIOUS_TLDS.includes(tldMatch[1])) {
    flags.push(`Uses an uncommon top-level domain (.${tldMatch[1]}) sometimes associated with spam`);
    riskScore += 1;
  }

  const subdomainCount = (lower.match(/\./g) || []).length;
  if (subdomainCount >= 4) {
    flags.push("Unusually many subdomains — may be disguising the real domain");
    riskScore += 2;
  }

  if (!lower.startsWith("https://") && lower.startsWith("http://")) {
    flags.push("Not using HTTPS");
    riskScore += 1;
  }

  let riskLevel = "low";
  if (riskScore >= 4) riskLevel = "high";
  else if (riskScore >= 2) riskLevel = "medium";

  return { riskLevel, score: riskScore, flags };
}

const COMMON_PASSWORDS = new Set([
  "123456", "password", "123456789", "qwerty", "12345678",
  "111111", "abc123", "1234567", "admin", "letmein",
]);

export function checkPassword(password) {
  const issues = [];
  let score = 0;

  if (password.length < 8) {
    issues.push("Too short (under 8 characters)");
  } else {
    score += Math.min(password.length, 20) / 4;
  }

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    issues.push("This is one of the most commonly used passwords");
    score = 0;
  }

  if (/^[a-zA-Z]+$/.test(password) || /^[0-9]+$/.test(password)) {
    issues.push("Uses only one character type (letters or digits only)");
  } else {
    score += 2;
  }

  if (/(.)\1{2,}/.test(password)) {
    issues.push("Contains repeated characters (e.g. 'aaa')");
    score -= 1;
  }

  if (/012|123|234|345|456|567|678|789|qwerty|asdf/i.test(password)) {
    issues.push("Contains a predictable sequence or keyboard pattern");
    score -= 1;
  }

  let strength = "weak";
  if (score >= 6) strength = "strong";
  else if (score >= 3) strength = "moderate";

  return { strength, score: Math.max(score, 0), issues };
}
