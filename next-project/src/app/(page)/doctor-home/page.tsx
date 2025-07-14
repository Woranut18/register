'use client';

import React, { JSX } from 'react';
import { Pill, Stethoscope, CheckCircle, Package, Clock, X } from 'lucide-react';

interface Request {
  drugName?: string;
  equipmentName?: string;
  quantity: number;
  unit?: string;
  date: string;
  status: string;
}

const drugRequests: Request[] = [
  { drugName: 'Paracetamol', quantity: 50, unit: 'เม็ด', date: '2024-07-05', status: 'pending' },
  { drugName: 'Amoxicillin', quantity: 25, unit: 'แคปซูล', date: '2024-07-04', status: 'completed' },
];

const equipmentRequests: Request[] = [
  { equipmentName: 'Stethoscope', quantity: 2, date: '2024-07-05', status: 'completed' },
  { equipmentName: 'Thermometer', quantity: 1, date: '2024-07-03', status: 'pending' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'approved': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <Clock className="w-4 h-4" />;
    case 'approved': return <CheckCircle className="w-4 h-4" />;
    case 'completed': return <CheckCircle className="w-4 h-4" />;
    case 'rejected': return <X className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const DoctorHomePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard
          title="คำขอเบิกยา"
          count={drugRequests.filter(r => r.status === 'pending').length}
          icon={<Pill className="h-6 w-6 text-blue-600" />}
          bg="bg-blue-100"
        />
        <InfoCard
          title="คำขอเบิกอุปกรณ์"
          count={equipmentRequests.filter(r => r.status === 'pending').length}
          icon={<Stethoscope className="h-6 w-6 text-green-600" />}
          bg="bg-green-100"
        />
        <InfoCard
          title="ยาที่ได้รับ"
          count={drugRequests.filter(r => r.status === 'completed').length}
          icon={<CheckCircle className="h-6 w-6 text-yellow-600" />}
          bg="bg-yellow-100"
        />
        <InfoCard
          title="อุปกรณ์ที่ได้รับ"
          count={equipmentRequests.filter(r => r.status === 'completed').length}
          icon={<Package className="h-6 w-6 text-purple-600" />}
          bg="bg-purple-100"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">สถานะคำขอล่าสุด</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <Th>ประเภท</Th>
                <Th>รายการ</Th>
                <Th>จำนวน</Th>
                <Th>วันที่</Th>
                <Th>สถานะ</Th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...drugRequests.slice(0, 3), ...equipmentRequests.slice(0, 2)].map((request, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <Td>{request.drugName ? 'ยา' : 'อุปกรณ์'}</Td>
                  <Td>{request.drugName || request.equipmentName}</Td>
                  <Td>{request.quantity} {request.unit || 'ชิ้น'}</Td>
                  <Td>{request.date}</Td>
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
};

const InfoCard = ({ title, count, icon, bg }: { title: string; count: number; icon: JSX.Element; bg: string }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
      <div className={`h-12 w-12 ${bg} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>
);

export default DoctorHomePage;
