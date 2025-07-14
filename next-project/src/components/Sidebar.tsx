'use client';

import { useState } from 'react';
import { LayoutDashboard, Pill, Package, Stethoscope, History, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = ({ role, setCurrentPage }: { role: string, setCurrentPage: (page: string) => void }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const items = role === 'doctor'
    ? [
        { id: 'doctor-home', label: 'หน้าหลัก', icon: LayoutDashboard },
        { id: 'request-drugs', label: 'เบิกยา', icon: Pill },
        { id: 'request-equipment', label: 'เบิกอุปกรณ์', icon: Stethoscope },
        { id: 'drug-history', label: 'ประวัติการเบิกยา', icon: History },
        { id: 'equipment-history', label: 'ประวัติการเบิกอุปกรณ์', icon: Package }
      ]
    : [
        { id: 'staff-dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
        { id: 'refill-drugs', label: 'เติมยา', icon: Pill },
        { id: 'refill-equipment', label: 'เติมอุปกรณ์', icon: Package },
        { id: 'drug-history', label: 'ประวัติการเบิกยา', icon: History },
        { id: 'equipment-history', label: 'ประวัติการเบิกอุปกรณ์', icon: Stethoscope }
      ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">MedSys</span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                router.push(`/${item.id}`);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                pathname.includes(item.id) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
