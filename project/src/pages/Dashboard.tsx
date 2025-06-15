import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, DollarSign, TrendingUp, AlertCircle, Clock, CheckCircle, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const statsData = [
  { name: 'Total Patients', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
  { name: 'Today\'s Appointments', value: '24', change: '+3', icon: Calendar, color: 'green' },
  { name: 'Prescriptions', value: '1,234', change: '+8%', icon: FileText, color: 'purple' },
  { name: 'Revenue', value: '₹87,500', change: '+15%', icon: DollarSign, color: 'yellow' },
];

const monthlyData = [
  { month: 'Jan', patients: 210, revenue: 65000 },
  { month: 'Feb', patients: 185, revenue: 59000 },
  { month: 'Mar', patients: 245, revenue: 78000 },
  { month: 'Apr', patients: 280, revenue: 85000 },
  { month: 'May', patients: 320, revenue: 92000 },
  { month: 'Jun', patients: 298, revenue: 87500 },
];

const diagnosisData = [
  { name: 'Hypertension', value: 25, color: '#3B82F6' },
  { name: 'Diabetes', value: 20, color: '#10B981' },
  { name: 'Common Cold', value: 15, color: '#F59E0B' },
  { name: 'Arthritis', value: 12, color: '#EF4444' },
  { name: 'Others', value: 28, color: '#8B5CF6' },
];

const recentAppointments = [
  { id: 1, patient: 'John Doe', time: '09:00 AM', status: 'confirmed', type: 'Follow-up' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', status: 'pending', type: 'New Patient' },
  { id: 3, patient: 'Robert Johnson', time: '11:15 AM', status: 'confirmed', type: 'Consultation' },
  { id: 4, patient: 'Mary Williams', time: '02:00 PM', status: 'completed', type: 'Check-up' },
];

const quickActions = [
  { name: 'New Prescription', href: '/prescriptions/new', icon: FileText, color: 'bg-blue-500' },
  { name: 'Add Patient', href: '/patients?new=true', icon: Users, color: 'bg-green-500' },
  { name: 'Schedule Appointment', href: '/appointments?new=true', icon: Calendar, color: 'bg-purple-500' },
];

export const Dashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Good morning, Dr. Sarah!</h1>
        <p className="text-blue-100">You have 24 appointments today and 3 pending prescriptions to review.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`h-10 w-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.name}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-4"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={action.name} to={action.href}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">{action.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
          <Link to="/appointments" className="text-blue-600 text-sm font-medium">View all</Link>
        </div>
        <div className="space-y-3">
          {recentAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Patient Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Diagnoses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Diagnoses</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={diagnosisData}
                cx="50%"
                cy="50%"
                outerRadius={80}
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
        </motion.div>
      </div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-xl border border-gray-200 p-4"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">Drug recall alert</p>
              <p className="text-xs text-red-600">2 medications affected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Pending follow-ups</p>
              <p className="text-xs text-yellow-600">5 patients due</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">System update</p>
              <p className="text-xs text-green-600">Successfully installed</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};