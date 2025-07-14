import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/database';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    client.release();

    const user = result.rows[0];
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    // ✅ สร้าง token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // ✅ สร้าง response แล้ว set cookie
    const response = NextResponse.json({ role: user.role }, { status: 200 });
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new Error('No token');

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    return Response.json(payload); // คืน user ที่อยู่ใน payload
  } catch (err) {
    return new Response('Unauthorized', { status: 401 });
  }
}

