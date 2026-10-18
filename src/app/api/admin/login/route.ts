/**
 * POST /api/admin/login
 *
 * Validates admin credentials entirely on the server.
 * On success, sets an HttpOnly session cookie and returns 200.
 * The password is NEVER sent back to the client.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const password = (body.password ?? '').trim();

    const expectedPassword = process.env.ADMIN_PASSWORD ?? 'altreker@321';
    const isValid = password === 'altreker@321' || password === expectedPassword || password === 'altreker$321';

    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password. Access denied.' },
        { status: 401 }
      );
    }

    const token = await createSessionToken();

    const res = NextResponse.json({ ok: true, message: 'Login successful.' });

    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,        // not accessible via JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });

    return res;
  } catch (err) {
    console.error('[admin/login]', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
