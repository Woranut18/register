import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    const role = payload.role;

    const pathname = request.nextUrl.pathname;

    // 🔒 ตรวจ role ตามเส้นทาง
    if (pathname.startsWith('/doctor-home') && role !== 'doctor') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/staff-dashboard') && role !== 'staff') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Token invalid:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}


export const config = {
  matcher: ['/doctor-home/:path*', '/staff-dashboard/:path*'],
}

