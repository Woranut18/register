'use client';

import React from 'react';
import { Pill, Stethoscope, AlertCircle, Package } from 'lucide-react';

const StaffDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">คำขอเบิกยา</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
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
              <p className="text-2xl font-bold text-gray-900">0</p>
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
              <p className="text-2xl font-bold text-gray-900">0</p>
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
              <p className="text-2xl font-bold text-gray-900">0</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ประเภท</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หมอ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รายการ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* คุณสามารถ map request data ตรงนี้ */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ยา</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. John</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Paracetamol</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 tablets</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-07-14</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">อนุมัติ</button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">ปฏิเสธ</button>
                  </div>
                </td>
              </tr>
              {/* ... */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
