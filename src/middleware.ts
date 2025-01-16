import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default auth((request) => {
  const isLogged = !!request.auth;
  const { pathname } = request.nextUrl;

  const isPrivate = pathname.startsWith('/dash');

  if (isLogged && !isPrivate) {
    return NextResponse.redirect(new URL('/dash', request.url));
  }

  if (!isLogged && isPrivate) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
});

export const config = {
  matcher: ['/login', '/register', '/dash', '/dash/:path*'],
};
