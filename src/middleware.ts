/**
 * middleware.ts  —  Runs on the Edge before every request.
 *
 * Protects all /admin/** routes (except /admin/login and /api/admin/login).
 * Reads the HttpOnly session cookie and verifies it server-side.
 * Unauthenticated requests are redirected to /admin/login.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/adminAuth';

const PUBLIC_ADMIN_PATHS = ['/admin/login', '/api/admin/login', '/api/admin/logout'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes
  const isAdminRoute =
    pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  if (!isAdminRoute) return NextResponse.next();

  // Allow the login page and auth API routes through without a token
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '?'))) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const valid = await verifySessionToken(token);

  if (!valid) {
    // Token expired or tampered — clear cookie and redirect
    const loginUrl = new URL('/admin/login', req.url);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all admin and api/admin paths
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
