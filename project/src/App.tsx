import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MobileLayout } from './components/MobileLayout';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { PatientDetail } from './pages/PatientDetail';
import { Prescriptions } from './pages/Prescriptions';
import { PrescriptionEditor } from './pages/PrescriptionEditor';
import { Appointments } from './pages/Appointments';
import { Settings } from './pages/Settings';
import { PrescriptionTemplates } from './pages/PrescriptionTemplates';

interface DoctorProfile {
  name: string;
  specialization: string;
  clinicName: string;
  licenseNumber: string;
  phone: string;
  email: string;
}

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const savedProfile = localStorage.getItem('doctorProfile');
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    
    if (savedProfile && onboardingComplete) {
      setDoctorProfile(JSON.parse(savedProfile));
      setIsOnboarded(true);
    }
    
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (profile: DoctorProfile) => {
    setDoctorProfile(profile);
    setIsOnboarded(true);
    localStorage.setItem('doctorProfile', JSON.stringify(profile));
    localStorage.setItem('onboardingComplete', 'true');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Loading PrescribePro...</h2>
        </motion.div>
      </div>
    );
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <MobileLayout doctorProfile={doctorProfile}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/prescriptions/new" element={<PrescriptionEditor />} />
            <Route path="/prescriptions/edit/:id" element={<PrescriptionEditor />} />
            <Route path="/prescription-templates" element={<PrescriptionTemplates />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/settings" element={<Settings doctorProfile={doctorProfile} setDoctorProfile={setDoctorProfile} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </MobileLayout>
    </Router>
  );
}

export default App;