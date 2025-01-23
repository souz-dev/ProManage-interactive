import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default auth((request) => {
  const isLogged = !!request.auth;
  const { pathname } = request.nextUrl;
  console.log(pathname);

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dash', request.url));
  }
  const privateRoutes = ['/dash', '/projects'];
  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

  if (isLogged && !isPrivate) {
    return NextResponse.redirect(new URL('/dash', request.url));
  }

  if (!isLogged && isPrivate) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/', '/login', '/register', '/dash', '/dash/:path*', '/projects', '/projects/:path*'],
};
