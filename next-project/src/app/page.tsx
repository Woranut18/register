'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Pill, 
  Stethoscope, 
  Package, 
  History, 
  Menu, 
  X, 
  User, 
  Lock,
  Search,
  Plus,
  Edit3,
  Trash2,
  Download,
  Filter,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  ShoppingCart,
  RefreshCw,
  UserCheck,
  Users
} from 'lucide-react';

interface UserType {
  name: string;
  role: 'doctor' | 'staff';
  roleLabel: string;
}

interface DrugRequest {
  id: number;
  doctorName: string;
  drugName: string;
  quantity: number;
  unit: string;
  date: string;
  status: string;
}

interface EquipmentRequest {
  id: number;
  doctorName: string;
  equipmentName: string;
  quantity: number;
  date: string;
  status: string;
}

interface DrugInventory {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiry: string;
  category: string;
  minStock: number;
}

interface EquipmentInventory {
  id: string;
  name: string;
  quantity: number;
  category: string;
  minStock: number;
}

const HospitalManagementSystem = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [selectedRole, setSelectedRole] = useState('');

  // Sample data
  const drugRequests: DrugRequest[] = [
    { id: 1, doctorName: 'Dr. Smith', drugName: 'Paracetamol', quantity: 50, unit: 'tablets', date: '2024-07-05', status: 'pending' },
    { id: 2, doctorName: 'Dr. Johnson', drugName: 'Amoxicillin', quantity: 25, unit: 'capsules', date: '2024-07-05', status: 'approved' },
    { id: 3, doctorName: 'Dr. Brown', drugName: 'Insulin', quantity: 10, unit: 'vials', date: '2024-07-04', status: 'completed' },
  ];

  const equipmentRequests: EquipmentRequest[] = [
    { id: 1, doctorName: 'Dr. Wilson', equipmentName: 'Stethoscope', quantity: 2, date: '2024-07-05', status: 'pending' },
    { id: 2, doctorName: 'Dr. Davis', equipmentName: 'Blood Pressure Monitor', quantity: 1, date: '2024-07-04', status: 'approved' },
  ];

  const drugInventory: DrugInventory[] = [
    { id: 'D001', name: 'Paracetamol', quantity: 500, unit: 'tablets', expiry: '2025-12-31', category: 'Analgesic', minStock: 100 },
    { id: 'D002', name: 'Amoxicillin', quantity: 250, unit: 'capsules', expiry: '2025-08-15', category: 'Antibiotic', minStock: 50 },
    { id: 'D003', name: 'Insulin', quantity: 45, unit: 'vials', expiry: '2025-03-20', category: 'Hormone', minStock: 20 },
    { id: 'D004', name: 'Ibuprofen', quantity: 320, unit: 'tablets', expiry: '2025-11-10', category: 'Anti-inflammatory', minStock: 80 },
  ];

  const equipmentInventory: EquipmentInventory[] = [
    { id: 'E001', name: 'Stethoscope', quantity: 25, category: 'Diagnostic', minStock: 5 },
    { id: 'E002', name: 'Blood Pressure Monitor', quantity: 15, category: 'Monitoring', minStock: 3 },
    { id: 'E003', name: 'Thermometer', quantity: 50, category: 'Diagnostic', minStock: 10 },
    { id: 'E004', name: 'Syringe', quantity: 200, category: 'Consumable', minStock: 50 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleLogin = () => {
    if (selectedRole === 'doctor') {
      setUser({ name: 'Dr. John Smith', role: 'doctor', roleLabel: 'หมอ' });
      setCurrentPage('doctor-home');
    } else if (selectedRole === 'staff') {
      setUser({ name: 'Nurse Sarah Johnson', role: 'staff', roleLabel: 'เจ้าหน้าที่' });
      setCurrentPage('staff-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setSelectedRole('');
  };

  const getDoctorSidebarItems = () => [
    { id: 'doctor-home', label: 'หน้าหลัก', icon: LayoutDashboard },
    { id: 'request-drugs', label: 'เบิกยา', icon: Pill },
    { id: 'request-equipment', label: 'เบิกอุปกรณ์', icon: Stethoscope },
    { id: 'drug-history', label: 'ประวัติการเบิกยา', icon: History },
    { id: 'equipment-history', label: 'ประวัติการเบิกอุปกรณ์', icon: Package }
  ];

  const getStaffSidebarItems = () => [
    { id: 'staff-dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
    { id: 'refill-drugs', label: 'เติมยา', icon: Pill },
    { id: 'refill-equipment', label: 'เติมอุปกรณ์', icon: Package },
    { id: 'drug-history', label: 'ประวัติการเบิกยา', icon: History },
    { id: 'equipment-history', label: 'ประวัติการเบิกอุปกรณ์', icon: Stethoscope }
  ];

  const LoginPage = () => (
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เลือกประเภทผู้ใช้
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={selectedRole === 'doctor'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">หมอผู้เบิกยา/อุปกรณ์</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="staff"
                  checked={selectedRole === 'staff'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">เจ้าหน้าที่ผู้เติมยา</span>
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              ชื่อผู้ใช้
            </label>
            <div className="mt-1 relative">
              <input
                id="username"
                name="username"
                type="text"
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="กรอกชื่อผู้ใช้"
              />
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              รหัสผ่าน
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="กรอกรหัสผ่าน"
              />
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={!selectedRole}
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
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

  const Sidebar = () => {
    const sidebarItems = user?.role === 'doctor' ? getDoctorSidebarItems() : getStaffSidebarItems();
    
    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">MedSys</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
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

  const Header = () => {
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
              <span className="font-medium">{user?.name}</span>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {user?.roleLabel}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>
    );
  };

  // Doctor Pages
  const DoctorHomePage = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">คำขอเบิกยา</p>
              <p className="text-2xl font-bold text-gray-900">
                {drugRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">คำขอเบิกอุปกรณ์</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipmentRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ยาที่ได้รับ</p>
              <p className="text-2xl font-bold text-gray-900">
                {drugRequests.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">อุปกรณ์ที่ได้รับ</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipmentRequests.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">สถานะคำขอล่าสุด</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รายการ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...drugRequests.slice(0, 3), ...equipmentRequests.slice(0, 2)].map((request: any, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.drugName ? 'ยา' : 'อุปกรณ์'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.drugName || request.equipmentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.quantity} {request.unit || 'ชิ้น'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span>
                        {request.status === 'pending' ? 'รอดำเนินการ' : 
                         request.status === 'approved' ? 'อนุมัติ' : 
                         request.status === 'completed' ? 'เสร็จสิ้น' : 'ปฏิเสธ'}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const RequestDrugsPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เบิกยา</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">เลือกยา</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>เลือกยา</option>
              {drugInventory.map(drug => (
                <option key={drug.id} value={drug.id}>{drug.name} (คงเหลือ: {drug.quantity} {drug.unit})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">จำนวน</label>
            <input type="number" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">หมายเหตุ</label>
            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
          </div>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            ส่งคำขอเบิกยา
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">รายการยาที่มี</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่อยา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หมวดหมู่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวนคงเหลือ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันหมดอายุ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drugInventory.map((drug) => (
                <tr key={drug.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {drug.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {drug.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={drug.quantity <= drug.minStock ? 'text-red-600 font-medium' : ''}>
                      {drug.quantity} {drug.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {drug.expiry}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const RequestEquipmentPage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เบิกอุปกรณ์</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">เลือกอุปกรณ์</label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>เลือกอุปกรณ์</option>
              {equipmentInventory.map(equipment => (
                <option key={equipment.id} value={equipment.id}>{equipment.name} (คงเหลือ: {equipment.quantity} ชิ้น)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">จำนวน</label>
            <input type="number" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">หมายเหตุ</label>
            <textarea className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
          </div>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            ส่งคำขอเบิกอุปกรณ์
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">รายการอุปกรณ์ที่มี</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่ออุปกรณ์
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หมวดหมู่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวนคงเหลือ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipmentInventory.map((equipment) => (
                <tr key={equipment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {equipment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={equipment.quantity <= equipment.minStock ? 'text-red-600 font-medium' : ''}>
                      {equipment.quantity} ชิ้น
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const StaffDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">คำขอเบิกยา</p>
              <p className="text-2xl font-bold text-gray-900">
                {drugRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">คำขอเบิกอุปกรณ์</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipmentRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ยาใกล้หมดสต็อก</p>
              <p className="text-2xl font-bold text-gray-900">
                {drugInventory.filter(d => d.quantity <= d.minStock).length}
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">อุปกรณ์ใกล้หมดสต็อก</p>
              <p className="text-2xl font-bold text-gray-900">
                {equipmentInventory.filter(e => e.quantity <= e.minStock).length}
              </p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">คำขอที่รอดำเนินการ</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หมอ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รายการ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การดำเนินการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...drugRequests.filter(r => r.status === 'pending'), ...equipmentRequests.filter(r => r.status === 'pending')].map((request: any, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.drugName ? 'ยา' : 'อุปกรณ์'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.drugName || request.equipmentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.quantity} {request.unit || 'ชิ้น'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                        อนุมัติ
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                        ปฏิเสธ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    if (currentPage === 'login') {
      return <LoginPage />;
    }

    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-64">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {currentPage === 'doctor-home' && <DoctorHomePage />}
            {currentPage === 'request-drugs' && <RequestDrugsPage />}
            {currentPage === 'request-equipment' && <RequestEquipmentPage />}
            {currentPage === 'staff-dashboard' && <StaffDashboard />}
          </main>
        </div>
      </div>
    );
  };

  return renderCurrentPage();
};

export default HospitalManagementSystem;