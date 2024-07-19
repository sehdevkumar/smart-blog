/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NextResponse, type NextRequest } from 'next/server'

import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = cookies().get('__userSession__');

  // Routes that require login
  if (
    pathname.startsWith('/home') ||
    pathname.startsWith('/writepost')) {

    if (!isLoggedIn) {
      // Redirect non-logged-in users to /public-landing
      return NextResponse.redirect(new URL('/public-landing', request.nextUrl));
    }

    // Allow logged-in users to proceed
    return NextResponse.next();
  }

  // Public routes
  if (pathname.startsWith('/public-landing') ||
    pathname.startsWith('/read-story') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/login')) {

    if (!isLoggedIn) {
      // Allow non-logged-in users to proceed
      return NextResponse.next();
    }

    // Redirect logged-in users to /home
    return NextResponse.redirect(new URL('/home', request.nextUrl));
  }

  // Default behavior for other routes
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/public-landing', '/about', '/read-story/:path*', '/signup', '/home', '/writepost', '/api/auth/logout'],
}

