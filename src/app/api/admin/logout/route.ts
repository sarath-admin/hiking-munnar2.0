/**
 * POST /api/admin/logout
 *
 * Clears the admin session cookie.
 */

import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/adminAuth';

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,       // expire immediately
    path: '/',
  });

  return res;
}
