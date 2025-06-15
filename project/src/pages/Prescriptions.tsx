import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Eye, Download, Printer, Calendar, User, FileText, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';

const prescriptionsData = [
  {
    id: 1,
    patient: 'John Doe',
    patientId: 'P001',
    date: '2024-01-15',
    medications: [
      { name: 'Metformin 500mg', dosage: 'Twice daily', duration: '30 days' },
      { name: 'Lisinopril 10mg', dosage: 'Once daily', duration: '30 days' }
    ],
    diagnosis: 'Diabetes Type 2, Hypertension',
    status: 'Active',
    doctor: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    patient: 'Jane Smith',
    patientId: 'P002',
    date: '2024-01-14',
    medications: [
      { name: 'Amoxicillin 500mg', dosage: 'Three times daily', duration: '7 days' },
      { name: 'Paracetamol 500mg', dosage: 'As needed for fever', duration: '7 days' }
    ],
    diagnosis: 'Upper Respiratory Infection',
    status: 'Completed',
    doctor: 'Dr. Sarah Johnson'
  },
  {
    id: 3,
    patient: 'Robert Johnson',
    patientId: 'P003',
    date: '2024-01-13',
    medications: [
      { name: 'Ibuprofen 400mg', dosage: 'Twice daily', duration: '14 days' },
      { name: 'Omeprazole 20mg', dosage: 'Once daily before breakfast', duration: '14 days' }
    ],
    diagnosis: 'Arthritis',
    status: 'Active',
    doctor: 'Dr. Sarah Johnson'
  },
];

export const Prescriptions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredPrescriptions = prescriptionsData.filter(prescription => {
    const matchesSearch = prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || prescription.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 text-sm mt-1">Manage and track patient prescriptions</p>
        </div>
        <Link to="/prescriptions/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>New Prescription</span>
          </motion.button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name, ID, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {['all', 'active', 'completed', 'cancelled'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Prescription Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Prescriptions', value: '1,234', icon: FileText, color: 'blue' },
          { label: 'Active Prescriptions', value: '856', icon: Pill, color: 'green' },
          { label: 'Today\'s Prescriptions', value: '24', icon: Calendar, color: 'purple' },
          { label: 'Completed This Month', value: '378', icon: User, color: 'yellow' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredPrescriptions.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {prescription.patient.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{prescription.patient}</h3>
                    <p className="text-sm text-gray-600">ID: {prescription.patientId} • {new Date(prescription.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    prescription.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {prescription.status}
                  </span>
                  
                  <div className="flex space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Printer className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Download className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Diagnosis</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">{prescription.diagnosis}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                    <Pill className="h-4 w-4" />
                    <span>Medications ({prescription.medications.length})</span>
                  </h4>
                  <div className="space-y-1">
                    {prescription.medications.slice(0, 2).map((med, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <div className="font-medium">{med.name}</div>
                        <div className="text-xs text-gray-500">{med.dosage} • {med.duration}</div>
                      </div>
                    ))}
                    {prescription.medications.length > 2 && (
                      <div className="text-xs text-gray-500 text-center py-1">
                        +{prescription.medications.length - 2} more medications
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 pt-2 border-t border-gray-100">
                  Prescribed by: <span className="font-medium">{prescription.doctor}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPrescriptions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
          <p className="text-gray-600 mb-4">Create your first prescription to get started</p>
          <Link to="/prescriptions/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Create Prescription
            </motion.button>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};