import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

// Import your components
import LoginPortal from '../../../Components/Global/Login/LoginPortal'
import EComLogin from '../../../Components/Global/Login/EComLogin'
import StudentPortalLogin from '../../../Components/Global/Login/StudentLogin'
import FacultyLogin from '../../../Components/Global/Login/FacultyLogin'
import AdminLogin from '../../../Components/Global/Login/AdminLogin'
import LoginHelpFooter from '../../../Components/Global/Login/LoginHelpFooter'

const Login = () => {
  // State to track which view is active
  const [currentView, setCurrentView] = useState('gateway');

  // Function to return to the main menu
  const handleBack = () => setCurrentView('gateway');

  return (
    // ✨ ADDED pt-32 (128px) TO CLEAR THE HEADER
    // Changed justify-center to justify-start to ensure consistent top spacing
    <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 pb-12 px-4">
      
      {/* Global Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(to right, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- BACK BUTTON (Visible only when NOT in gateway) --- */}
      {/* Positioned relative to the container now, so it respects the padding */}
      {currentView !== 'gateway' && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="absolute top-28 left-6 z-50 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft size={16} /> Back to Menu
        </motion.button>
      )}

      {/* --- CONDITIONAL RENDERING --- */}
      <div className="w-full z-10 mt-8"> {/* Added mt-8 for extra breathing room below back button */}
        <AnimatePresence mode="wait">
          
          {/* 1. GATEWAY (The Menu) */}
          {currentView === 'gateway' && (
            <motion.div
              key="gateway"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            >
              <LoginPortal onSelect={(view) => setCurrentView(view)} />
            </motion.div>
          )}

          {/* 2. E-COMMERCE LOGIN */}
          {currentView === 'ecom' && (
            <motion.div
              key="ecom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EComLogin />
            </motion.div>
          )}

          {/* 3. STUDENT PORTAL */}
          {currentView === 'student' && (
            <motion.div
              key="student"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StudentPortalLogin />
            </motion.div>
          )}

          {/* 4. FACULTY LOGIN */}
          {currentView === 'faculty' && (
            <motion.div
              key="faculty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FacultyLogin />
            </motion.div>
          )}

          {/* 5. ADMIN LOGIN */}
          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <AdminLogin />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <LoginHelpFooter />
      
    </div>
  )
}

export default Login