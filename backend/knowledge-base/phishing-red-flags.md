# Phishing Red Flags — Knowledge Base for Chatbot Grounding

Tags: phishing, email-security, url-security, social-engineering

## What is phishing?
Phishing is a social engineering attack where an attacker impersonates a trustworthy entity (a bank, company, colleague, or service) to trick a victim into revealing sensitive information (passwords, card numbers) or installing malware, typically via email, text message (smishing), or fake websites.

## Common red flags in emails
- **Urgency/fear tactics**: "Your account will be suspended in 24 hours," "Unusual login detected — act now."
- **Generic greetings**: "Dear Customer" instead of your actual name.
- **Mismatched sender domain**: The display name says "PayPal Support" but the actual email address is from an unrelated domain.
- **Requests for sensitive info**: Legitimate organizations rarely ask for passwords, OTPs, or full card numbers via email.
- **Suspicious attachments**: Unexpected `.exe`, `.zip`, or macro-enabled Office files.
- **Poor grammar/spelling**: Though modern phishing (especially AI-assisted) is increasingly well-written, so this alone isn't reliable anymore.

## Common red flags in URLs
- **URL shorteners** (bit.ly, tinyurl) hiding the real destination.
- **Domain typosquatting**: `paypa1.com`, `arnazon.com`, `micros0ft-support.com` — character substitution to mimic a real brand.
- **IP address instead of domain name**: e.g. `http://192.168.1.1/login` instead of a proper domain.
- **Excessive subdomains**: `secure-login.paypal.com.verify-account.net` — the real domain is `verify-account.net`, not PayPal.
- **Mismatched display text vs actual link**: The visible text says "www.bank.com" but the actual `href` points elsewhere.
- **No HTTPS / invalid certificate** on a page asking for login credentials.
- **Newly registered domains** (WHOIS lookup shows the domain was created very recently) are more likely to be malicious.

## What to do if you suspect phishing
1. Don't click any links or download attachments.
2. Verify by contacting the organization directly through a known official channel (not the contact info in the suspicious message).
3. Hover over links (on desktop) to preview the actual destination before clicking.
4. Report the message (most email providers have a "Report phishing" option).
5. If you already clicked or entered credentials, change your password immediately and enable multi-factor authentication.

## Why phishing works
Phishing exploits psychological triggers: urgency, authority, fear, and curiosity. Attackers count on people acting quickly without careful verification, especially when the message appears to come from a trusted source (boss, bank, well-known service).
