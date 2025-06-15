import React, { useState } from 'react';
import { Calendar, Download, Filter, BarChart3, TrendingUp, Users, FileText, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const monthlyRevenueData = [
  { month: 'Jan', revenue: 65000, patients: 210, appointments: 280 },
  {month: 'Feb', revenue: 59000, patients: 185, appointments: 245 },
  { month: 'Mar', revenue: 78000, patients: 245, appointments: 320 },
  { month: 'Apr', revenue: 85000, patients: 280, appointments: 365 },
  { month: 'May', revenue: 92000, patients: 320, appointments: 410 },
  { month: 'Jun', revenue: 87500, patients: 298, appointments: 385 },
];

const diagnosisData = [
  { name: 'Hypertension', value: 25, color: '#3B82F6' },
  { name: 'Diabetes', value: 20, color: '#10B981' },
  { name: 'Common Cold', value: 15, color: '#F59E0B' },
  { name: 'Arthritis', value: 12, color: '#EF4444' },
  { name: 'Migraine', value: 10, color: '#8B5CF6' },
  { name: 'Others', value: 18, color: '#6B7280' },
];

const ageGroupData = [
  { ageGroup: '0-18', patients: 45, percentage: 15 },
  { ageGroup: '19-35', patients: 120, percentage: 40 },
  { ageGroup: '36-50', patients: 90, percentage: 30 },
  { ageGroup: '51-65', patients: 35, percentage: 12 },
  { ageGroup: '65+', patients: 10, percentage: 3 },
];

const appointmentTrendsData = [
  { day: 'Mon', appointments: 28, completed: 25, cancelled: 3 },
  { day: 'Tue', appointments: 32, completed: 30, cancelled: 2 },
  { day: 'Wed', appointments: 25, completed: 22, cancelled: 3 },
  { day: 'Thu', appointments: 35, completed: 33, cancelled: 2 },
  { day: 'Fri', appointments: 30, completed: 28, cancelled: 2 },
  { day: 'Sat', appointments: 20, completed: 18, cancelled: 2 },
  { day: 'Sun', appointments: 15, completed: 14, cancelled: 1 },
];

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'financial', name: 'Financial', icon: DollarSign },
    { id: 'patients', name: 'Patient Analytics', icon: Users },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your practice</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="quarterly">This Quarter</option>
            <option value="yearly">This Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    selectedReport === type.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {type.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedReport === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">₹87,500</div>
                      <div className="text-blue-100">Monthly Revenue</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-200" />
                  </div>
                  <div className="mt-2 text-sm text-blue-100">+15% from last month</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">298</div>
                      <div className="text-green-100">Patients Treated</div>
                    </div>
                    <Users className="h-8 w-8 text-green-200" />
                  </div>
                  <div className="mt-2 text-sm text-green-100">+8% from last month</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">385</div>
                      <div className="text-purple-100">Appointments</div>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-200" />
                  </div>
                  <div className="mt-2 text-sm text-purple-100">+12% from last month</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-yellow-100">Prescriptions</div>
                    </div>
                    <FileText className="h-8 w-8 text-yellow-200" />
                  </div>
                  <div className="mt-2 text-sm text-yellow-100">+5% from last month</div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Diagnoses</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={diagnosisData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {diagnosisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'financial' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹87,500</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                  <div className="text-xs text-green-600 mt-1">+15% vs last month</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">₹12,500</div>
                  <div className="text-sm text-gray-600">Pending Payments</div>
                  <div className="text-xs text-yellow-600 mt-1">5 invoices</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">₹3,850</div>
                  <div className="text-sm text-gray-600">Overdue Amount</div>
                  <div className="text-xs text-red-600 mt-1">2 invoices</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Breakdown</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedReport === 'patients' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Age Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ageGroupData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ageGroup" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="patients" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Growth</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="patients" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Demographics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Age Groups</h4>
                    <div className="space-y-2">
                      {ageGroupData.map((group, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{group.ageGroup}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${group.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{group.patients}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Common Conditions</h4>
                    <div className="space-y-2">
                      {diagnosisData.slice(0, 5).map((diagnosis, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{diagnosis.name}</span>
                          <span className="text-sm font-medium">{diagnosis.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'appointments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">385</div>
                  <div className="text-sm text-gray-600">Total Appointments</div>
                  <div className="text-xs text-blue-600 mt-1">This month</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                  <div className="text-xs text-green-600 mt-1">354 completed</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">8%</div>
                  <div className="text-sm text-gray-600">Cancellation Rate</div>
                  <div className="text-xs text-red-600 mt-1">31 cancelled</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Appointment Trends</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={appointmentTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                    <Bar dataKey="cancelled" fill="#EF4444" name="Cancelled" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm font-medium">Follow-up</span>
                      <span className="text-sm text-gray-600">45%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm font-medium">New Patient</span>
                      <span className="text-sm text-gray-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm font-medium">Consultation</span>
                      <span className="text-sm text-gray-600">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm font-medium">Check-up</span>
                      <span className="text-sm text-gray-600">10%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">Peak Hours</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>10:00 AM - 11:00 AM</span>
                        <span className="font-medium">28 appointments</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>02:00 PM - 03:00 PM</span>
                        <span className="font-medium">25 appointments</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>11:00 AM - 12:00 PM</span>
                        <span className="font-medium">22 appointments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};