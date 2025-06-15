import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, Heart, 
  FileText, Pill, AlertTriangle, Plus, Printer, Download,
  User, Activity, Clock
} from 'lucide-react';

const patientData = {
  id: 1,
  name: 'John Doe',
  age: 35,
  gender: 'Male',
  phone: '+91 98765 43210',
  email: 'john.doe@email.com',
  bloodGroup: 'O+',
  address: '123 Main Street, Mumbai, Maharashtra, 400001',
  emergencyContact: 'Jane Doe - +91 98765 43211',
  dateOfBirth: '1988-05-15',
  occupation: 'Software Engineer',
  maritalStatus: 'Married',
  allergies: ['Penicillin', 'Shellfish'],
  chronicConditions: ['Hypertension', 'Diabetes Type 2'],
  lastVisit: '2024-01-15',
  nextAppointment: '2024-02-15'
};

const visitHistory = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'Follow-up',
    chiefComplaint: 'Routine diabetes check-up',
    diagnosis: 'Diabetes Type 2 - Well controlled',
    prescription: 'Metformin 500mg twice daily',
    notes: 'Blood sugar levels stable. Continue current medication.',
    doctor: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    date: '2023-12-10',
    type: 'Consultation',
    chiefComplaint: 'Chest pain and shortness of breath',
    diagnosis: 'Hypertension',
    prescription: 'Amlodipine 5mg once daily',
    notes: 'BP elevated. Started on antihypertensive therapy.',
    doctor: 'Dr. Sarah Johnson'
  },
];

const labResults = [
  {
    id: 1,
    date: '2024-01-15',
    test: 'HbA1c',
    result: '7.2%',
    normalRange: '< 7.0%',
    status: 'High'
  },
  {
    id: 2,
    date: '2024-01-15',
    test: 'Fasting Glucose',
    result: '125 mg/dL',
    normalRange: '70-100 mg/dL',
    status: 'High'
  },
];

export const PatientDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FileText },
    { id: 'history', name: 'History', icon: Clock },
    { id: 'prescriptions', name: 'Prescriptions', icon: Pill },
    { id: 'lab-results', name: 'Lab Results', icon: Activity },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/patients">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patientData.name}</h1>
            <p className="text-gray-600 text-sm">Patient ID: #{patientData.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to="/prescriptions/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Prescription</span>
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </motion.button>
        </div>
      </div>

      {/* Patient Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
            {patientData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="ml-2 font-medium">{patientData.age} years</span>
              </div>
              <div>
                <span className="text-gray-600">Gender:</span>
                <span className="ml-2 font-medium">{patientData.gender}</span>
              </div>
              <div>
                <span className="text-gray-600">Blood Group:</span>
                <span className="ml-2 font-medium">{patientData.bloodGroup}</span>
              </div>
              <div>
                <span className="text-gray-600">Last Visit:</span>
                <span className="ml-2 font-medium">{new Date(patientData.lastVisit).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{patientData.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{patientData.email}</span>
          </div>
          <div className="flex items-start space-x-2 md:col-span-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span>{patientData.address}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Allergies</h4>
              <div className="flex flex-wrap gap-1">
                {patientData.allergies.map((allergy, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center space-x-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>{allergy}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Chronic Conditions</h4>
              <div className="flex flex-wrap gap-1">
                {patientData.chronicConditions.map((condition, index) => (
                  <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{new Date(patientData.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupation:</span>
                        <span className="font-medium">{patientData.occupation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marital Status:</span>
                        <span className="font-medium">{patientData.maritalStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Emergency Contact:</span>
                        <span className="font-medium">{patientData.emergencyContact}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Known Allergies</div>
                        <div className="flex flex-wrap gap-1">
                          {patientData.allergies.map((allergy, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              {allergy}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Chronic Conditions</div>
                        <div className="flex flex-wrap gap-1">
                          {patientData.chronicConditions.map((condition, index) => (
                            <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Visit History</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Add Visit
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {visitHistory.map((visit, index) => (
                    <motion.div
                      key={visit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-gray-900">{visit.type}</div>
                          <div className="text-sm text-gray-600">{new Date(visit.date).toLocaleDateString()} - {visit.doctor}</div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Printer className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-600 hover:text-gray-800 p-1"
                          >
                            <Download className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700">Chief Complaint</div>
                          <div className="text-gray-600">{visit.chiefComplaint}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Diagnosis</div>
                          <div className="text-gray-600">{visit.diagnosis}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Prescription</div>
                          <div className="text-gray-600">{visit.prescription}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Notes</div>
                          <div className="text-gray-600">{visit.notes}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'prescriptions' && (
              <motion.div
                key="prescriptions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Current Prescriptions</h3>
                  <Link to="/prescriptions/new">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      New Prescription
                    </motion.button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'Metformin 500mg', dosage: 'Twice daily with meals', duration: 'Ongoing', prescribed: 'Jan 15, 2024', condition: 'Diabetes Type 2' },
                    { name: 'Amlodipine 5mg', dosage: 'Once daily in morning', duration: 'Ongoing', prescribed: 'Dec 10, 2023', condition: 'Hypertension' }
                  ].map((prescription, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-gray-900">{prescription.name}</div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Dosage: {prescription.dosage}</div>
                        <div>Duration: {prescription.duration}</div>
                        <div>Prescribed: {prescription.prescribed}</div>
                        <div>For: {prescription.condition}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'lab-results' && (
              <motion.div
                key="lab-results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Lab Results</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Order Tests
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {labResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-900">{result.test}</div>
                          <div className="text-sm text-gray-600">{new Date(result.date).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{result.result}</div>
                          <div className="text-sm text-gray-500">Normal: {result.normalRange}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            result.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {result.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};