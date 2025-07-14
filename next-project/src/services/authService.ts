import { SafeUser } from "@/types/user";

// src/services/authService.ts
export async function login(username: string, password: string) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || 'Login failed');
  }

  return res.json(); // { username, role }
}


export async function getUserFromToken(): Promise<SafeUser | undefined> {
  try {
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!res.ok) throw new Error('unauthorized');
    return (await res.json()) as SafeUser;
  } catch {
    window.location.href = '/login';
  }
}

export async function logout() {
  document.cookie = 'token=; Max-Age=0; path=/;';
  window.location.href = '/login';
}