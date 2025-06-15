import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Save, Printer, Send, Plus, Trash2, 
  User, Calendar, FileText, Pill, AlertCircle,
  Palette, Layout, Type, Image, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  chiefComplaint: string;
  diagnosis: string;
  medications: Medication[];
  advice: string;
  followUp: string;
}

const prescriptionLayouts = [
  { id: 'classic', name: 'Classic', preview: 'bg-white border-2 border-gray-300' },
  { id: 'modern', name: 'Modern', preview: 'bg-gradient-to-br from-blue-50 to-white border border-blue-200' },
  { id: 'minimal', name: 'Minimal', preview: 'bg-gray-50 border border-gray-200' },
  { id: 'professional', name: 'Professional', preview: 'bg-white border-l-4 border-l-blue-600 border border-gray-300' },
];

const colorThemes = [
  { id: 'blue', name: 'Blue', color: 'bg-blue-600' },
  { id: 'green', name: 'Green', color: 'bg-green-600' },
  { id: 'purple', name: 'Purple', color: 'bg-purple-600' },
  { id: 'red', name: 'Red', color: 'bg-red-600' },
  { id: 'orange', name: 'Orange', color: 'bg-orange-600' },
  { id: 'gray', name: 'Gray', color: 'bg-gray-600' },
];

export const PrescriptionEditor: React.FC = () => {
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionData>({
    patientName: '',
    patientAge: '',
    patientGender: '',
    chiefComplaint: '',
    diagnosis: '',
    medications: [{ id: '1', name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    advice: '',
    followUp: ''
  });

  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState('classic');
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [showPreview, setShowPreview] = useState(false);

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    };
    setPrescriptionData({
      ...prescriptionData,
      medications: [...prescriptionData.medications, newMedication]
    });
  };

  const removeMedication = (id: string) => {
    setPrescriptionData({
      ...prescriptionData,
      medications: prescriptionData.medications.filter(med => med.id !== id)
    });
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setPrescriptionData({
      ...prescriptionData,
      medications: prescriptionData.medications.map(med =>
        med.id === id ? { ...med, [field]: value } : med
      )
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/prescriptions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Prescription</h1>
            <p className="text-gray-600 text-sm">Create a new prescription for your patient</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustomization(true)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <Palette className="h-5 w-5 text-gray-600" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Preview
          </motion.button>
        </div>
      </div>

      {/* Patient Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-4"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <User className="h-5 w-5 text-blue-600" />
          <span>Patient Information</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
            <input
              type="text"
              value={prescriptionData.patientName}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, patientName: e.target.value })}
              placeholder="Enter patient name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="text"
              value={prescriptionData.patientAge}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, patientAge: e.target.value })}
              placeholder="Age"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={prescriptionData.patientGender}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, patientGender: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Clinical Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 p-4"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-green-600" />
          <span>Clinical Information</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chief Complaint</label>
            <textarea
              value={prescriptionData.chiefComplaint}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, chiefComplaint: e.target.value })}
              placeholder="Patient's main concern or symptoms"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
            <input
              type="text"
              value={prescriptionData.diagnosis}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, diagnosis: e.target.value })}
              placeholder="Primary diagnosis"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Medications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Pill className="h-5 w-5 text-purple-600" />
            <span>Medications</span>
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addMedication}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Medication</span>
          </motion.button>
        </div>
        
        <div className="space-y-4">
          <AnimatePresence>
            {prescriptionData.medications.map((medication, index) => (
              <motion.div
                key={medication.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Medication {index + 1}</span>
                  {prescriptionData.medications.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeMedication(medication.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Medication name"
                    value={medication.name}
                    onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <input
                    type="text"
                    placeholder="Dosage (e.g., 500mg)"
                    value={medication.dosage}
                    onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <input
                    type="text"
                    placeholder="Frequency (e.g., TID)"
                    value={medication.frequency}
                    onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <input
                    type="text"
                    placeholder="Duration (e.g., 7 days)"
                    value={medication.duration}
                    onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <textarea
                  placeholder="Special instructions for this medication"
                  value={medication.instructions}
                  onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Advice & Follow-up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 p-4"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <span>Advice & Follow-up</span>
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">General Advice</label>
            <textarea
              value={prescriptionData.advice}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, advice: e.target.value })}
              placeholder="Lifestyle advice, dietary recommendations, precautions..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Instructions</label>
            <input
              type="text"
              value={prescriptionData.followUp}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, followUp: e.target.value })}
              placeholder="e.g., Follow up in 1 week, Return if symptoms worsen"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex space-x-3"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Save Prescription</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
        >
          <Printer className="h-5 w-5" />
          <span>Print</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
        >
          <Send className="h-5 w-5" />
          <span>Send</span>
        </motion.button>
      </motion.div>

      {/* Customization Modal */}
      <AnimatePresence>
        {showCustomization && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Customize Prescription</h2>
                
                {/* Layout Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Layout className="h-5 w-5" />
                    <span>Layout Style</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {prescriptionLayouts.map((layout) => (
                      <motion.button
                        key={layout.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedLayout(layout.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedLayout === layout.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`h-20 ${layout.preview} rounded mb-2`} />
                        <span className="text-sm font-medium">{layout.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Color Theme */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Color Theme</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {colorThemes.map((theme) => (
                      <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`w-12 h-12 rounded-lg ${theme.color} flex items-center justify-center ${
                          selectedTheme === theme.id ? 'ring-4 ring-offset-2 ring-blue-500' : ''
                        }`}
                      >
                        {selectedTheme === theme.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Font Options */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Type className="h-5 w-5" />
                    <span>Font Style</span>
                  </h3>
                  <div className="space-y-2">
                    {['Arial', 'Times New Roman', 'Helvetica', 'Georgia'].map((font) => (
                      <button
                        key={font}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                        style={{ fontFamily: font }}
                      >
                        {font} - The quick brown fox jumps over the lazy dog
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCustomization(false)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    Apply Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCustomization(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Prescription Preview</h2>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Download className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Printer className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Prescription Preview Content */}
                <div className="bg-white border border-gray-300 rounded-lg p-6 space-y-4">
                  <div className="text-center border-b pb-4">
                    <h3 className="text-xl font-bold text-blue-600">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600">General Medicine</p>
                    <p className="text-sm text-gray-500">Johnson Medical Center</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Patient:</strong> {prescriptionData.patientName || 'Patient Name'}
                    </div>
                    <div>
                      <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Age:</strong> {prescriptionData.patientAge || 'Age'}
                    </div>
                    <div>
                      <strong>Gender:</strong> {prescriptionData.patientGender || 'Gender'}
                    </div>
                  </div>
                  
                  {prescriptionData.chiefComplaint && (
                    <div>
                      <strong>Chief Complaint:</strong>
                      <p className="text-gray-700 mt-1">{prescriptionData.chiefComplaint}</p>
                    </div>
                  )}
                  
                  {prescriptionData.diagnosis && (
                    <div>
                      <strong>Diagnosis:</strong>
                      <p className="text-gray-700 mt-1">{prescriptionData.diagnosis}</p>
                    </div>
                  )}
                  
                  <div>
                    <strong>Medications:</strong>
                    <div className="mt-2 space-y-2">
                      {prescriptionData.medications.map((med, index) => (
                        <div key={med.id} className="border-l-2 border-blue-500 pl-3">
                          <div className="font-medium">{index + 1}. {med.name || 'Medication Name'}</div>
                          <div className="text-sm text-gray-600">
                            {med.dosage} - {med.frequency} - {med.duration}
                          </div>
                          {med.instructions && (
                            <div className="text-sm text-gray-500 italic">{med.instructions}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {prescriptionData.advice && (
                    <div>
                      <strong>Advice:</strong>
                      <p className="text-gray-700 mt-1">{prescriptionData.advice}</p>
                    </div>
                  )}
                  
                  {prescriptionData.followUp && (
                    <div>
                      <strong>Follow-up:</strong>
                      <p className="text-gray-700 mt-1">{prescriptionData.followUp}</p>
                    </div>
                  )}
                  
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-gray-500">Dr. Sarah Johnson</p>
                    <p className="text-xs text-gray-400">License: MED123456789</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPreview(false)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    Close Preview
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};