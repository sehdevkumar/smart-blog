import {type NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {


  if(request.nextUrl.pathname.startsWith('/')) {
   
  }

  if (request.nextUrl.pathname.startsWith('/create-po')) {
            
  }

  if (request.nextUrl.pathname.startsWith('/live')) {
     
  }


  if (request.nextUrl.pathname.startsWith('/reports')) {
     
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/live', '/create-po', '/','/ray-runtime','/reports'],
}

