import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, User, Building, Phone, Mail, FileText, 
  ChevronRight, ChevronLeft, Check, Sparkles 
} from 'lucide-react';

interface DoctorProfile {
  name: string;
  specialization: string;
  clinicName: string;
  licenseNumber: string;
  phone: string;
  email: string;
}

interface OnboardingFlowProps {
  onComplete: (profile: DoctorProfile) => void;
}

const specializations = [
  'General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics', 
  'Orthopedics', 'Gynecology', 'Neurology', 'Psychiatry',
  'ENT', 'Ophthalmology', 'Dentistry', 'Other'
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<DoctorProfile>({
    name: '',
    specialization: '',
    clinicName: '',
    licenseNumber: '',
    phone: '',
    email: ''
  });

  const steps = [
    {
      title: 'Welcome to PrescribePro',
      subtitle: 'Your digital healthcare companion',
      icon: Stethoscope,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Tell us about yourself',
      subtitle: 'Basic information',
      icon: User,
      color: 'from-green-500 to-blue-500'
    },
    {
      title: 'Your specialization',
      subtitle: 'What type of doctor are you?',
      icon: FileText,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Clinic details',
      subtitle: 'Where do you practice?',
      icon: Building,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Contact information',
      subtitle: 'How can patients reach you?',
      icon: Phone,
      color: 'from-teal-500 to-green-500'
    },
    {
      title: 'All set!',
      subtitle: 'Ready to start prescribing',
      icon: Sparkles,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profile.name.trim() !== '';
      case 2:
        return profile.specialization !== '';
      case 3:
        return profile.clinicName.trim() !== '' && profile.licenseNumber.trim() !== '';
      case 4:
        return profile.phone.trim() !== '' && profile.email.trim() !== '';
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg"
            >
              <Stethoscope className="w-12 h-12 text-blue-600" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to PrescribePro</h2>
              <p className="text-blue-100">Your complete digital healthcare solution</p>
            </div>
            <div className="space-y-3 text-left">
              {[
                'Create digital prescriptions',
                'Manage patient records',
                'Schedule appointments',
                'Generate reports'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-3 text-blue-100"
                >
                  <Check className="w-5 h-5 text-green-400" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <User className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
              <p className="text-green-100">Let's get your profile set up</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Dr. John Smith"
                  className="w-full px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <FileText className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Your specialization</h2>
              <p className="text-purple-100">What type of doctor are you?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {specializations.map((spec) => (
                <motion.button
                  key={spec}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfile({ ...profile, specialization: spec })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    profile.specialization === spec
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {spec}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Building className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Clinic details</h2>
              <p className="text-orange-100">Where do you practice?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Clinic Name *</label>
                <input
                  type="text"
                  value={profile.clinicName}
                  onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                  placeholder="Smith Medical Center"
                  className="w-full px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">License Number *</label>
                <input
                  type="text"
                  value={profile.licenseNumber}
                  onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                  placeholder="MED123456789"
                  className="w-full px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <Phone className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Contact information</h2>
              <p className="text-teal-100">How can patients reach you?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="dr.smith@email.com"
                  className="w-full px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg"
            >
              <Sparkles className="w-12 h-12 text-indigo-600" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">All set, Dr. {profile.name.split(' ')[1] || profile.name}!</h2>
              <p className="text-indigo-100">Your PrescribePro account is ready</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left space-y-2">
              <div className="text-white/90 text-sm">
                <strong>Clinic:</strong> {profile.clinicName}
              </div>
              <div className="text-white/90 text-sm">
                <strong>Specialization:</strong> {profile.specialization}
              </div>
              <div className="text-white/90 text-sm">
                <strong>License:</strong> {profile.licenseNumber}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress bar */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-white/80 text-sm">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-br ${steps[currentStep].color} rounded-2xl p-6 shadow-2xl`}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 0
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
              isStepValid()
                ? 'bg-white text-gray-800 hover:bg-white/90 shadow-lg'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};