/**
 * GET /api/admin/me
 *
 * Returns 200 if the session cookie is valid, 401 otherwise.
 * Used by the login page to detect an existing session and skip the form.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const valid = await verifySessionToken(token);
  if (!valid) return NextResponse.json({ error: 'Session expired' }, { status: 401 });

  return NextResponse.json({ ok: true });
}
