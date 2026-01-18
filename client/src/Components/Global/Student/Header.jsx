import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle,
  Calendar,
  BookOpen,
  ChevronDown,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo/Logo';
 // Adjust import path as needed

// --- MOCK STUDENT CONTEXT ---
const STUDENT_INFO = {
  name: "Aditya Kumar",
  id: "KRJ-2024-0512",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100",
  batch: "Class 10 — Target Boards 2025",
  mode: "Online",
  nextClass: "Physics (Optics) @ 5:00 PM"
};

const StudentHeader = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 md:px-6 font-sans">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">

        {/* --- 1. LEFT: Logo & Sidebar Toggle --- */}
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Trigger */}
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Brand Logo (Redirects to Dashboard) */}
          <div className="scale-90 origin-left cursor-pointer">
            <Logo /> 
          </div>
        </div>

        {/* --- 2. CENTER: Academic Context (The Core Feature) --- */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-4 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
            
            {/* Active Batch */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <BookOpen size={14} className="text-blue-600" />
              <span>{STUDENT_INFO.batch}</span>
            </div>

            {/* Separator */}
            <div className="w-px h-3 bg-slate-300" />

            {/* Mode Badge */}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
              STUDENT_INFO.mode === 'Online' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {STUDENT_INFO.mode}
            </span>

            {/* Separator */}
            <div className="w-px h-3 bg-slate-300" />

            {/* Today's Class Indicator */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span>{STUDENT_INFO.nextClass}</span>
            </div>

          </div>
        </div>

        {/* --- 3. RIGHT: Notifications & Profile --- */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
            >
              <Bell size={20} />
              {/* Unread Dot */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden origin-top-right"
                >
                  <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Academic Updates</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-2">
                    <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                          <Calendar size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Test Rescheduled</p>
                          <p className="text-xs text-slate-500 mt-1">Physics Minor Test is moved to Sunday.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-1 pr-1 md:pr-2 py-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 focus:outline-none"
            >
              <img 
                src={STUDENT_INFO.avatar} 
                alt="Profile" 
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-bold text-slate-700 leading-none mb-0.5">
                  {STUDENT_INFO.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {STUDENT_INFO.id}
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden md:block" />
            </button>

            {/* Profile Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden origin-top-right"
                >
                  {/* Mobile User Info inside dropdown */}
                  <div className="md:hidden px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900">{STUDENT_INFO.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{STUDENT_INFO.id}</p>
                  </div>

                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <User size={16} /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Settings size={16} /> Change Password
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <HelpCircle size={16} /> Help & Support
                    </button>
                  </div>
                  
                  <div className="p-2 border-t border-slate-100">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left font-medium">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </header>
  );
};

export default StudentHeader;