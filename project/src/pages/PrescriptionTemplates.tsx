import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit, Trash2, Copy, Star, 
  FileText, Pill, Heart, Brain, Bone, Eye,
  Stethoscope, Baby, Users, Filter
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  instructions: string;
  isFavorite: boolean;
  usageCount: number;
  lastUsed: string;
}

const templateCategories = [
  { id: 'all', name: 'All Templates', icon: FileText, color: 'bg-gray-500' },
  { id: 'general', name: 'General Medicine', icon: Stethoscope, color: 'bg-blue-500' },
  { id: 'cardiology', name: 'Cardiology', icon: Heart, color: 'bg-red-500' },
  { id: 'neurology', name: 'Neurology', icon: Brain, color: 'bg-purple-500' },
  { id: 'orthopedics', name: 'Orthopedics', icon: Bone, color: 'bg-orange-500' },
  { id: 'pediatrics', name: 'Pediatrics', icon: Baby, color: 'bg-green-500' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye, color: 'bg-indigo-500' },
];

const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'Common Cold Treatment',
    category: 'general',
    description: 'Standard treatment for viral upper respiratory infection',
    medications: [
      { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'TID', duration: '5 days' },
      { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'OD', duration: '5 days' },
      { name: 'Vitamin C 500mg', dosage: '1 tablet', frequency: 'OD', duration: '7 days' }
    ],
    instructions: 'Take adequate rest, drink plenty of fluids, avoid cold foods. Return if symptoms worsen or fever persists beyond 3 days.',
    isFavorite: true,
    usageCount: 45,
    lastUsed: '2024-01-15'
  },
  {
    id: '2',
    name: 'Hypertension Management',
    category: 'cardiology',
    description: 'Standard antihypertensive therapy for mild to moderate hypertension',
    medications: [
      { name: 'Amlodipine 5mg', dosage: '1 tablet', frequency: 'OD', duration: '30 days' },
      { name: 'Metoprolol 25mg', dosage: '1 tablet', frequency: 'BD', duration: '30 days' }
    ],
    instructions: 'Monitor BP regularly, maintain low salt diet, regular exercise, weight control. Follow up in 2 weeks.',
    isFavorite: true,
    usageCount: 32,
    lastUsed: '2024-01-14'
  },
  {
    id: '3',
    name: 'Diabetes Type 2 - Initial',
    category: 'general',
    description: 'Initial management for newly diagnosed Type 2 diabetes',
    medications: [
      { name: 'Metformin 500mg', dosage: '1 tablet', frequency: 'BD', duration: '30 days' },
      { name: 'Glimepiride 1mg', dosage: '1 tablet', frequency: 'OD', duration: '30 days' }
    ],
    instructions: 'Check blood sugar fasting and post-meal. Diet control, regular exercise. Avoid sweets and refined carbs.',
    isFavorite: false,
    usageCount: 28,
    lastUsed: '2024-01-13'
  },
  {
    id: '4',
    name: 'Migraine Relief',
    category: 'neurology',
    description: 'Acute migraine treatment protocol',
    medications: [
      { name: 'Sumatriptan 50mg', dosage: '1 tablet', frequency: 'SOS', duration: 'As needed' },
      { name: 'Domperidone 10mg', dosage: '1 tablet', frequency: 'TID', duration: '3 days' }
    ],
    instructions: 'Take medication at onset of headache. Rest in dark, quiet room. Avoid triggers like stress, certain foods.',
    isFavorite: false,
    usageCount: 18,
    lastUsed: '2024-01-12'
  },
  {
    id: '5',
    name: 'Pediatric Fever',
    category: 'pediatrics',
    description: 'Fever management in children (2-12 years)',
    medications: [
      { name: 'Paracetamol Syrup', dosage: '5ml', frequency: 'QID', duration: '3 days' },
      { name: 'ORS Solution', dosage: '200ml', frequency: 'After each loose stool', duration: 'As needed' }
    ],
    instructions: 'Give plenty of fluids, sponge with lukewarm water if fever >101°F. Return immediately if child becomes lethargic.',
    isFavorite: true,
    usageCount: 22,
    lastUsed: '2024-01-11'
  }
];

export const PrescriptionTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(sampleTemplates);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (templateId: string) => {
    setTemplates(templates.map(template =>
      template.id === templateId
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  const duplicateTemplate = (template: Template) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      usageCount: 0,
      lastUsed: new Date().toISOString().split('T')[0]
    };
    setTemplates([newTemplate, ...templates]);
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(template => template.id !== templateId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Templates</h1>
          <p className="text-gray-600 text-sm mt-1">Create and manage reusable prescription templates</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto space-x-3 pb-2">
        {templateCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    {template.isFavorite && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Used {template.usageCount} times</span>
                    <span>Last used: {new Date(template.lastUsed).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(template.id)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Star className={`h-4 w-4 ${template.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => duplicateTemplate(template)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Copy className="h-4 w-4 text-gray-400" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEditingTemplate(template)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4 text-gray-400" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTemplate(template.id)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </motion.button>
                </div>
              </div>

              {/* Medications Preview */}
              <div className="space-y-2 mb-3">
                <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                  <Pill className="h-4 w-4" />
                  <span>Medications ({template.medications.length})</span>
                </h4>
                <div className="space-y-1">
                  {template.medications.slice(0, 2).map((med, index) => (
                    <div key={index} className="text-xs bg-gray-50 rounded-lg p-2">
                      <span className="font-medium">{med.name}</span> - {med.dosage} {med.frequency} for {med.duration}
                    </div>
                  ))}
                  {template.medications.length > 2 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{template.medications.length - 2} more medications
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions Preview */}
              <div className="border-t border-gray-100 pt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Instructions</h4>
                <p className="text-xs text-gray-600 line-clamp-2">{template.instructions}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                >
                  Use Template
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Preview
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">Create your first prescription template to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            Create Template
          </motion.button>
        </motion.div>
      )}

      {/* Create/Edit Template Modal */}
      <AnimatePresence>
        {(showCreateModal || editingTemplate) && (
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
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {editingTemplate ? 'Edit Template' : 'Create New Template'}
                </h2>
                
                {/* Template Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Common Cold Treatment"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      {templateCategories.slice(1).map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      placeholder="Brief description of when to use this template"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Medication name" className="px-3 py-2 border border-gray-300 rounded-lg" />
                        <input type="text" placeholder="Dosage" className="px-3 py-2 border border-gray-300 rounded-lg" />
                        <input type="text" placeholder="Frequency" className="px-3 py-2 border border-gray-300 rounded-lg" />
                        <input type="text" placeholder="Duration" className="px-3 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <button className="text-blue-600 text-sm flex items-center space-x-1">
                        <Plus className="h-4 w-4" />
                        <span>Add another medication</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructions & Advice</label>
                    <textarea
                      placeholder="Patient instructions, lifestyle advice, follow-up recommendations..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    {editingTemplate ? 'Update Template' : 'Create Template'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingTemplate(null);
                    }}
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
    </motion.div>
  );
};