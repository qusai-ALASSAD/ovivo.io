import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.headers.set('Content-Security-Policy', "object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
  // Never index preview hosts or internal application areas.
  const host = (req.headers.get('host') || '').split(':')[0].toLowerCase();
  const preview = host !== 'ovivo.io' && host !== 'www.ovivo.io';
  const internal = /^\/(?:api|admin|login|request|chat|business-plan|marketing-plan|case-studies|blog)(?:\/|$)/.test(req.nextUrl.pathname)
    || /^\/(?:en|ar)\/(?:request|blog)(?:\/|$)/.test(req.nextUrl.pathname);
  if (preview || internal) res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.svg|.*\\.ico).*)'],
};
