'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import type { SafeUser } from '@/types/user';

interface HeaderProps {
  user: SafeUser;
  currentPage: string;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

const Header = ({ user, currentPage, setSidebarOpen, onLogout }: HeaderProps) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'doctor-home': return 'หน้าหลัก';
      case 'request-drugs': return 'เบิกยา';
      case 'request-equipment': return 'เบิกอุปกรณ์';
      case 'staff-dashboard': return 'แดชบอร์ด';
      case 'refill-drugs': return 'เติมยา';
      case 'refill-equipment': return 'เติมอุปกรณ์';
      case 'drug-history': return 'ประวัติการเบิกยา';
      case 'equipment-history': return 'ประวัติการเบิกอุปกรณ์';
      default: return 'ระบบจัดการ';
    }
  };

  const roleLabel = user.role === 'doctor' ? 'หมอ' : 'เจ้าหน้าที่';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{user.username}</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {roleLabel}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
