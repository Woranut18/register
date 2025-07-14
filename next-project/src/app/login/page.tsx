'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Stethoscope, User, Users } from 'lucide-react';
import { login } from '@/services/authService';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await login(username, password);

      // ✅ เช็ค role แล้ว redirect
      if (res.role === 'doctor') {
        router.push('/doctor-home');
      } else if (res.role === 'staff') {
        router.push('/staff-dashboard');
      } else {
        alert('บทบาทไม่ถูกต้อง');
      }
      console.log(res)
    } catch (err: any) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">ระบบจัดการยาและอุปกรณ์</h2>
          <p className="mt-2 text-sm text-gray-600">เข้าสู่ระบบ</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          {/* เลือกประเภทผู้ใช้ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">เลือกประเภทผู้ใช้</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={selectedRole === 'doctor'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-sm">หมอผู้เบิกยา/อุปกรณ์</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="staff"
                  checked={selectedRole === 'staff'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm">เจ้าหน้าที่ผู้เติมยา</span>
              </label>
            </div>
          </div>

          {/* ช่อง Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
            <div className="relative mt-1">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md"
                placeholder="กรอกชื่อผู้ใช้"
              />
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* ช่อง Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <div className="relative mt-1">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md"
                placeholder="กรอกรหัสผ่าน"
              />
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* ปุ่ม Login */}
          <button
            onClick={handleLogin}
            disabled={!selectedRole}
            className={`w-full py-2 rounded-md transition-colors ${
              selectedRole
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </div>
  );
}
