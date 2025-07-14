export type UserRole = 'doctor' | 'staff';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

export interface SafeUser {
  username: string;
  role: UserRole;
}
