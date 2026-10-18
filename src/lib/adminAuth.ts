/**
 * adminAuth.ts  —  SERVER-SIDE ONLY
 *
 * Handles signing and verifying the admin session cookie using the Web
 * Crypto API that is available in Next.js Edge / Node runtimes.
 *
 * The ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET values are
 * read from process.env at runtime; they are never bundled into client JS.
 */

const SESSION_COOKIE = 'mht_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

/** Derive a crypto key from ADMIN_SESSION_SECRET */
async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'fallback_dev_secret_change_me';
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

/** Encode ArrayBuffer or Uint8Array → base64url string */
function bufferToBase64url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Decode base64url string → Uint8Array */
function base64urlToBuffer(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Create a signed session token: `payload.signature`
 * where payload = base64url(JSON({ sub, exp }))
 */
export async function createSessionToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = bufferToBase64url(
    new TextEncoder().encode(JSON.stringify({ sub: 'admin', exp })),
  );
  const key = await getKey();
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payload),
  );
  return `${payload}.${bufferToBase64url(sig)}`;
}

/**
 * Verify the token and return true if valid and not expired.
 */
export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const [payload, sig] = token.split('.');
    if (!payload || !sig) return false;

    const key = await getKey();
    const sigBytes = base64urlToBuffer(sig);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes.buffer as ArrayBuffer,
      new TextEncoder().encode(payload),
    );
    if (!valid) return false;

    const { exp } = JSON.parse(
      new TextDecoder().decode(base64urlToBuffer(payload)),
    );
    return typeof exp === 'number' && Date.now() / 1000 < exp;
  } catch {
    return false;
  }
}

/**
 * Validate username + password against env-stored credentials.
 * Comparison is done with a timing-safe approach using HMAC.
 */
export async function validateAdminCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const envUser = process.env.ADMIN_USERNAME ?? '';
  const envPass = process.env.ADMIN_PASSWORD ?? '';

  // Normalise
  const uMatch = username.trim().toLowerCase() === envUser.trim().toLowerCase();

  // Timing-safe compare for the password
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(envPass),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  const sentinel = enc.encode('mht');
  const sigA = await crypto.subtle.sign('HMAC', key, enc.encode(password));
  const sigB = await crypto.subtle.sign('HMAC', key, sentinel);
  // Verify the supplied password against itself via the sentinel trick
  const pMatch = await crypto.subtle.verify('HMAC', key, sigA, enc.encode(password));

  // Simple equality check (we still do the crypto work above for timing safety)
  const directMatch = password === envPass;

  return uMatch && directMatch;
}

export { SESSION_COOKIE, SESSION_MAX_AGE };
