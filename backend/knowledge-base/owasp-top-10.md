# OWASP Top 10 (Web Application Security Risks) — Summary for Chatbot Grounding

Tags: owasp, web-security, vulnerabilities

## 1. Broken Access Control
Occurs when users can act outside their intended permissions — e.g. viewing or editing another user's data by changing a URL parameter. Prevention: enforce access checks server-side on every request, deny by default.

## 2. Cryptographic Failures
Sensitive data (passwords, card numbers, personal info) exposed due to weak or missing encryption, both in transit and at rest. Prevention: use HTTPS everywhere, strong encryption algorithms, never store passwords in plain text (use hashing like bcrypt/argon2).

## 3. Injection
Untrusted input is interpreted as code/commands (SQL injection, command injection). Prevention: use parameterized queries, input validation, avoid building queries via string concatenation.

## 4. Insecure Design
Security flaws baked into the architecture itself, not just implementation bugs. Prevention: threat modeling during design, secure design patterns from the start.

## 5. Security Misconfiguration
Default credentials left unchanged, unnecessary features enabled, verbose error messages leaking internal details. Prevention: harden configurations, disable unused features, keep software patched.

## 6. Vulnerable and Outdated Components
Using libraries/frameworks with known vulnerabilities. Prevention: keep dependencies updated, monitor for CVEs, remove unused dependencies.

## 7. Identification and Authentication Failures
Weak password policies, missing multi-factor authentication, session tokens that don't expire. Prevention: enforce strong passwords, implement MFA, secure session management.

## 8. Software and Data Integrity Failures
Trusting code/updates from untrusted sources without verification (e.g. unsigned software updates, insecure CI/CD pipelines). Prevention: verify digital signatures, secure the software supply chain.

## 9. Security Logging and Monitoring Failures
Attacks go undetected because systems don't log or monitor suspicious activity. Prevention: log authentication attempts and critical actions, set up alerting for anomalies.

## 10. Server-Side Request Forgery (SSRF)
An attacker tricks a server into making requests to unintended destinations (e.g. internal systems). Prevention: validate and sanitize all URLs the server fetches, restrict outbound network access.
