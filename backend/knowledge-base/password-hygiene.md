# Password Hygiene — Knowledge Base for Chatbot Grounding

Tags: passwords, authentication, account-security

## What makes a password weak?
- **Short length** (under 8-10 characters) — easier to brute-force.
- **Common passwords**: "123456", "password", "qwerty", "admin" — these appear in breach databases and are tried first by attackers (credential stuffing).
- **Personal information**: names, birthdates, pet names — easily guessed or found via social media (used in targeted/dictionary attacks).
- **Keyboard patterns**: "qwerty123", "asdfgh" — predictable and included in cracking dictionaries.
- **Reused passwords**: using the same password across multiple sites means one breach compromises all of them (credential stuffing attacks rely on this).

## What makes a password strong?
- **Length matters more than complexity**: a long passphrase ("correct-horse-battery-staple" style, 16+ characters) is often stronger and easier to remember than a short complex string.
- **Uniqueness**: a different password for every important account.
- **Unpredictability**: not based on personal info or dictionary words in predictable order.
- **Use of a password manager**: allows genuinely random, unique passwords per site without needing to memorize them.

## Multi-Factor Authentication (MFA/2FA)
Even a strong password can be stolen (phishing, data breaches). MFA adds a second verification step (a code from an authenticator app, SMS, or a hardware key), so a stolen password alone isn't enough to access the account. Authenticator apps (TOTP) are generally more secure than SMS-based 2FA, which is vulnerable to SIM-swapping attacks.

## Password strength estimation approaches
- **Naive rule-based**: length + character class requirements (uppercase, lowercase, digit, symbol) — easy to implement but poorly correlated with actual crackability (e.g. "P@ssw0rd1" satisfies most rule sets but is a well-known weak pattern).
- **Pattern-aware estimation** (e.g. zxcvbn-style): checks against dictionaries, common substitutions (@ for a, 0 for o), keyboard walks, and repeated/sequential patterns, giving a more realistic strength estimate.
- **Entropy-based**: estimates the search space an attacker would need to brute-force, based on character set size and length.

## Practical tips to give users
1. Use a password manager to generate and store unique passwords.
2. Enable MFA wherever available, especially for email, banking, and social accounts (email is often the recovery point for everything else).
3. Never reuse your email account's password anywhere else.
4. Change passwords immediately if a service you use reports a data breach.
5. Avoid writing passwords in plain text notes or unencrypted files.
