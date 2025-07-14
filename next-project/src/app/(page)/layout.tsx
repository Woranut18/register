'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { getUserFromToken, logout } from '@/services/authService';
import type { SafeUser } from '@/types/user';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [user, setUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserFromToken();
      if (userData) setUser(userData);
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="p-10 text-center text-gray-600">กำลังโหลดข้อมูลผู้ใช้...</div>;
  }

  const roleLabel = user.role === 'doctor' ? 'หมอ' : 'เจ้าหน้าที่';

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={user.role} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          user={{ username: user.username, role: user.role }}
          currentPage={currentPage}
          setSidebarOpen={setSidebarOpen}
          onLogout={logout}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
