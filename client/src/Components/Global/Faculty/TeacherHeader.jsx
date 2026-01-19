import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle,
  Calendar,
  Briefcase,
  ChevronDown,
  Clock,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo/Logo';
// Adjust import path

// --- MOCK TEACHER CONTEXT ---
const TEACHER_INFO = {
  name: "Dr. Anjali Verma",
  id: "FAC-PHY-004",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  subject: "Senior Physics",
  batchesToday: 3,
  nextSession: "Class 12 (Optics) @ 2:00 PM"
};

const TeacherHeader = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 md:px-6 font-sans">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">

        {/* --- 1. LEFT: Logo & Sidebar Toggle --- */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="scale-90 origin-left cursor-pointer">
            <Logo /> 
          </div>
        </div>

        {/* --- 2. CENTER: Operational Context (The Work Load) --- */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-4 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
            
            {/* Subject Identity */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Briefcase size={14} className="text-purple-600" />
              <span>{TEACHER_INFO.subject}</span>
            </div>

            <div className="w-px h-3 bg-slate-300" />

            {/* Daily Load */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
              <BookOpen size={12} />
              <span>{TEACHER_INFO.batchesToday} Batches Today</span>
            </div>

            <div className="w-px h-3 bg-slate-300" />

            {/* Next Session Timer */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <Clock size={14} className="text-slate-400" />
              <span>Next: <span className="text-slate-900 font-bold">{TEACHER_INFO.nextSession}</span></span>
            </div>

          </div>
        </div>

        {/* --- 3. RIGHT: Actions --- */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Notifications (Admin + Academic) */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-white"></span>
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden origin-top-right"
                >
                  <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Staff Updates</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-2">
                    <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                          <Calendar size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Meeting Alert</p>
                          <p className="text-xs text-slate-500 mt-1">HOD Meeting at 4:00 PM in Conference Room A.</p>
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
                src={TEACHER_INFO.avatar} 
                alt="Profile" 
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-bold text-slate-700 leading-none mb-0.5">
                  {TEACHER_INFO.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {TEACHER_INFO.id}
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden md:block" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden origin-top-right"
                >
                  <div className="md:hidden px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900">{TEACHER_INFO.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{TEACHER_INFO.id}</p>
                  </div>

                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <User size={16} /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Calendar size={16} /> Teaching Schedule
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <HelpCircle size={16} /> IT Support
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

export default TeacherHeader;