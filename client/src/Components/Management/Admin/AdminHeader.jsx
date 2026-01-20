import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Building2, 
  CalendarRange,
  ChevronDown,
  Database,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../Global/Logo/Logo';
 // Adjust import path

// --- MOCK ADMIN CONTEXT ---
const ADMIN_INFO = {
  name: "Vikram Malhotra",
  role: "Operations Head",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
  currentCenter: "Nagpur (Head Office)",
  currentSession: "2025 – 2026"
};

const AdminHeader = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 md:px-6 font-sans">
      <div className="h-full max-w-[1600px] mx-auto flex items-center justify-between">

        {/* --- 1. LEFT: Logo (Monochrome) & Sidebar --- */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Grayscale Logo for "System" feel */}
          <div className="scale-90 origin-left cursor-pointer grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <Logo /> 
          </div>
        </div>

        {/* --- 2. CENTER: System Context (The Control Panel) --- */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-md overflow-hidden">
            
            {/* Active Center */}
            <div className="flex items-center gap-2 px-4 py-1.5 border-r border-slate-200">
              <Building2 size={14} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {ADMIN_INFO.currentCenter}
              </span>
            </div>

            {/* Academic Session */}
            <div className="flex items-center gap-2 px-4 py-1.5">
              <CalendarRange size={14} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Session: {ADMIN_INFO.currentSession}
              </span>
            </div>

          </div>
        </div>

        {/* --- 3. RIGHT: Admin Tools --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Quick Actions (Gear) */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              title="System Config"
            >
              <Settings size={20} />
            </button>
            {/* Quick Action Dropdown */}
            <AnimatePresence>
              {isQuickActionOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden origin-top-right z-50"
                >
                  <div className="p-1">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded text-left">
                      <Database size={14} /> Backup Database
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded text-left">
                      <Lock size={14} /> Access Logs
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* System Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell size={20} />
              {/* Alert Dot (Orange for Warning) */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

          {/* Admin Profile */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-1 pr-1 md:pr-2 py-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 focus:outline-none"
            >
              <div className="relative">
                <img 
                  src={ADMIN_INFO.avatar} 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 grayscale-[0.5]"
                />
                <div className="absolute -bottom-0.5 -right-0.5 bg-slate-800 text-white rounded-full p-0.5 border border-white">
                  <Shield size={8} />
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-bold text-slate-800 leading-none mb-0.5">
                  {ADMIN_INFO.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {ADMIN_INFO.role}
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
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden origin-top-right"
                >
                  <div className="md:hidden px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-bold text-slate-900">{ADMIN_INFO.name}</p>
                    <p className="text-xs text-slate-500">{ADMIN_INFO.role}</p>
                  </div>

                  <div className="p-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors text-left">
                      <Shield size={16} /> Permissions
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors text-left">
                      <User size={16} /> Edit Profile
                    </button>
                  </div>
                  
                  <div className="p-1 border-t border-slate-100">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors text-left font-medium">
                      <LogOut size={16} /> Secure Logout
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

export default AdminHeader;