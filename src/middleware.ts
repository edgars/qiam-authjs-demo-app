import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest) {
  // Skip middleware for auth routes, API routes, and static files
  const { pathname } = request.nextUrl
  
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.includes('favicon.ico')
  ) {
    return NextResponse.next()
  }
  
  // For all other routes, let NextAuth handle authentication in the page components
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}