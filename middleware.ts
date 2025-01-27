import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './app/lib/utils/jwtUtils';

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const publicRoutes = ['/api/login', '/api/register', '/api/auth/password-forgot', '/api/auth/password-reset', '/api/auth/change-password'];
  const token = req.cookies.get('jwt')?.value; // Get JWT from cookies

  // If no token is found, redirect to login
  if (!token) {
    console.log("No token found, redirecting to login" + token);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the JWT token
    if (publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }
    verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification error:', error);

    // If JWT is invalid or expired, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/api/auth/logout'],  
};
