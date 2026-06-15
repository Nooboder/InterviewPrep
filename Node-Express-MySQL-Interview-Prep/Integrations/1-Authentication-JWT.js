/**
 * AUTHENTICATION & JWT - Interview Prep
 * Big4/MNC Frequency: ⭐⭐⭐⭐⭐ (Asked in almost every fullstack round)
 *
 * Topics: JWT, OAuth 2.0, RBAC, Refresh Tokens, bcrypt, Session vs Token
 */

// ============================================================
// Q1: What is JWT? How does it work?
// ============================================================
/*
JWT (JSON Web Token) has 3 base64url-encoded parts:
  header.payload.signature

Header: { alg: "HS256", typ: "JWT" }
Payload: { userId, role, iat, exp }
Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)

Key points:
- Stateless — server doesn't need to store sessions
- Verified by re-computing the signature with the secret
- NEVER store sensitive data in payload (it is base64 decoded, not encrypted)
- Use HTTPS always — JWT in transit is readable
*/

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET; // never hardcode
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Access token: short-lived (15min)
function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
}

// Refresh token: long-lived (7d), stored in DB or Redis
function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

// ============================================================
// Q2: Implement secure login with bcrypt + JWT
// ============================================================
const express = require('express');
const router = express.Router();

// Registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Input validation (never skip)
    if (!email || !password || password.length < 8) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Check duplicate
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    // Hash password — cost factor 12 is the Big4 standard
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, name, password: hashedPassword });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token hash in DB (not plain)
    await user.update({ refreshToken: await bcrypt.hash(refreshToken, 10) });

    // Refresh token in httpOnly cookie (XSS safe), access token in body
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken, user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Use same error message for both cases to prevent user enumeration
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await user.update({ refreshToken: await bcrypt.hash(refreshToken, 10) });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================
// Q3: Implement refresh token rotation (most asked security question)
// ============================================================
/*
Refresh Token Rotation:
- Each time a refresh token is used, issue a NEW refresh token and invalidate the old one
- If an old token is reused → token theft detected → revoke ALL user tokens
*/
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.refreshToken) {
      // Token reuse detected — invalidate everything
      if (user) await user.update({ refreshToken: null });
      return res.status(401).json({ error: 'Token reuse detected. Please login again.' });
    }

    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid) return res.status(401).json({ error: 'Invalid refresh token' });

    // Rotate: issue new pair
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await user.update({ refreshToken: await bcrypt.hash(newRefreshToken, 10) });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});

// Logout — invalidate refresh token
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      await User.update({ refreshToken: null }, { where: { id: decoded.userId } });
    } catch (_) { /* ignore expired tokens on logout */ }
  }
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

// ============================================================
// Q4: JWT Middleware — protect routes
// ============================================================
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, email, role, iat, exp }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ============================================================
// Q5: Role-Based Access Control (RBAC)
// ============================================================
/*
RBAC Hierarchy: admin > manager > user
Big4 uses RBAC extensively in enterprise systems
*/
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage
router.delete('/users/:id', authenticate, authorize('admin'), async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'User deleted' });
});

// ============================================================
// Q6: OAuth 2.0 Authorization Code Flow (PKCE)
// ============================================================
/*
OAuth 2.0 flows you MUST know:
1. Authorization Code + PKCE (SPA/mobile — most common today)
2. Client Credentials (machine-to-machine)
3. Implicit (deprecated — don't use)

Authorization Code + PKCE flow:
1. App generates code_verifier (random string) + code_challenge = SHA256(code_verifier)
2. Redirect user to /authorize?code_challenge=...&code_challenge_method=S256
3. Auth server returns authorization code
4. App exchanges code + code_verifier for access_token
5. Auth server verifies SHA256(code_verifier) === code_challenge

Why PKCE? Prevents authorization code interception attacks on public clients.
*/

const crypto = require('crypto');

// Step 1: Generate PKCE pair
function generatePKCE() {
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
  return { codeVerifier, codeChallenge };
}

// Step 2: Build authorization URL
function buildAuthURL(clientId, redirectUri, codeChallenge, state) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state, // CSRF protection
    scope: 'openid profile email',
  });
  return `https://auth-server.com/authorize?${params}`;
}

// ============================================================
// Q7: Session vs JWT — when to use each?
// ============================================================
/*
SESSIONS:
+ Server controls invalidation (logout works immediately)
+ Smaller cookie (just session ID)
- Requires session store (Redis/DB) — stateful
- Horizontal scaling needs sticky sessions or shared store
USE WHEN: traditional web apps, critical security (banking), short sessions

JWT:
+ Stateless — scales horizontally without shared store
+ Can contain claims (role, permissions) reducing DB lookups
- Cannot invalidate before expiry (unless using a blacklist)
- Larger token (puts load on every request header)
USE WHEN: microservices, APIs, mobile apps, short-lived access tokens

BIG4 ANSWER: Use short-lived JWTs (15min) for access + httpOnly refresh tokens
stored in DB for revocability. Best of both worlds.
*/

// ============================================================
// Q8: Common Auth vulnerabilities
// ============================================================
/*
1. JWT Algorithm Confusion: Never accept "alg: none" — validate algorithm explicitly
   jwt.verify(token, secret, { algorithms: ['HS256'] })

2. Weak JWT Secret: Use 256-bit random secret, never a password/phrase
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

3. User Enumeration: Return same error for "user not found" and "wrong password"

4. Timing Attacks: Use bcrypt.compare() — constant time comparison

5. Storing JWT in localStorage: Vulnerable to XSS. Use httpOnly cookies for refresh tokens.

6. Missing expiry: Always set exp on access tokens

7. Privilege Escalation: Never trust client-sent role claims — always load from DB or encode in JWT at login
*/

// INTERVIEW QUESTIONS (Big4 level):
/*
Q: What happens if JWT secret is compromised?
A: All tokens are compromised. Rotate secret, force all users to re-login (invalidate refresh tokens in DB).

Q: How do you implement "remember me" functionality securely?
A: Extend refresh token expiry (30 days) but use token families. Each family invalidated on suspicious use.

Q: What's the difference between authentication and authorization?
A: Authentication = who are you? (identity). Authorization = what can you do? (permissions).

Q: Why is bcrypt better than SHA-256 for passwords?
A: bcrypt is intentionally slow (adjustable cost factor), has built-in salt, designed for password hashing.
   SHA-256 is fast — enables brute-force attacks. Never use MD5/SHA for passwords.

Q: How do you handle token invalidation at scale?
A: Maintain a Redis blacklist of invalidated token JTI (JWT ID) claims.
   Check blacklist on every request. TTL on Redis key = token expiry time.
*/
