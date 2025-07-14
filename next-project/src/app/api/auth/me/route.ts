// src/app/api/auth/me/route.ts
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

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
