import { NextResponse, type NextRequest } from 'next/server'

import { cookies } from 'next/headers'
export async function middleware(request: NextRequest) {

  // if (request.nextUrl.pathname.startsWith('/public-landing')) {
  //   const isLoggedIn = cookies().get('__userSession__');
  //   if (!isLoggedIn) {
  //     return NextResponse.next()
  //   }

  //   return NextResponse.redirect(new URL('/home', request.nextUrl.clone()))
  // }


  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   const isLoggedIn = cookies().get('__userSession__');
  //   if (!isLoggedIn) {
  //     return NextResponse.next()
  //   }

  //   return NextResponse.redirect(new URL('/home', request.nextUrl.clone()))
  // }

  // if (request.nextUrl.pathname.startsWith('/read-story')) {
  //   const isLoggedIn = cookies().get('__userSession__');
  //   if (!isLoggedIn) {
      
  //     return NextResponse.next()
  //   }


  //   return NextResponse.redirect(new URL('/home', request.nextUrl.clone()))
  // }

  // if (request.nextUrl.pathname.startsWith('/login')) {
  //   const isLoggedIn = cookies().get('__userSession__');
  //   if (!isLoggedIn) {
  //     return NextResponse.next()
  //   }

  //   return NextResponse.redirect(new URL('/home', request.nextUrl.clone()))
  // }


  // if (request.nextUrl.pathname.startsWith('/signup')) {
  //   const isLoggedIn = cookies().get('__userSession__');
  //   if (!isLoggedIn) {
  //     return NextResponse.next()
  //   }

  //   return NextResponse.redirect(new URL('/home', request.nextUrl.clone()))
  // }

  // if (request.nextUrl.pathname.startsWith('/home')) {
  //   const isLoggedIn = cookies().get('__userSession__');
  //   if (isLoggedIn) {
  //     return NextResponse.next()
  //   }

  //   return NextResponse.redirect(new URL('/public-landing', request.nextUrl.clone()))
  // }

  // if (request.nextUrl.pathname.startsWith('/writepost')) {
  //   const isLoggedIn = cookies().get('__userSession__');
  //   if (isLoggedIn) {
  //     return NextResponse.next()
  //   }

  //   return NextResponse.redirect(new URL('/public-landing', request.nextUrl.clone()))
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/public-landing', '/about', '/read-story/:path*', '/signup', '/home','/writepost','/api/auth/logout'],
}

