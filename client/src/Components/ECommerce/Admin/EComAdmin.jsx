import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  ChevronDown,
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../Global/Logo/Logo';
// Adjust import path

// --- MOCK COMMERCE ADMIN CONTEXT ---
const ADMIN_INFO = {
  name: "Sanya Kapoor",
  role: "Sales Manager",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
  // Live Snapshot
  ordersToday: 42,
  revenueToday: "1.24L",
  isTrendingUp: true
};

const EComAdminHeader = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 md:px-6 font-sans">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">

        {/* --- 1. LEFT: Logo & Commerce Badge --- */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="scale-90 origin-left">
              <Logo /> 
            </div>
            {/* Context Badge */}
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
              Commerce
            </span>
          </div>
        </div>

        {/* --- 2. CENTER: Financial Snapshot (The "Shopify" Pulse) --- */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center bg-white border border-slate-200 rounded-full shadow-sm">
            
            {/* Orders Ticker */}
            <div className="flex items-center gap-2 px-4 py-1.5 border-r border-slate-100">
              <div className="p-1 bg-blue-50 text-blue-600 rounded-full">
                <ShoppingBag size={12} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Orders</span>
                <span className="text-xs font-bold text-slate-800">{ADMIN_INFO.ordersToday} Today</span>
              </div>
            </div>

            {/* Revenue Ticker */}
            <div className="flex items-center gap-2 px-4 py-1.5">
              <div className="p-1 bg-emerald-50 text-emerald-600 rounded-full">
                <IndianRupee size={12} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Revenue</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-emerald-700">₹{ADMIN_INFO.revenueToday}</span>
                  {ADMIN_INFO.isTrendingUp && (
                    <TrendingUp size={10} className="text-emerald-500" />
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- 3. RIGHT: Actions --- */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* Notifications (Order Alerts) */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
            >
              <Bell size={20} />
              {/* Green Dot for Sales Alerts */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden origin-top-right"
                >
                  <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50 flex justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Order Alerts</span>
                    <span className="text-[10px] font-bold text-emerald-600">3 New</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-2">
                    <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                          <ShoppingBag size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">New Order #8921</p>
                          <p className="text-xs text-slate-500 mt-1">₹4,999 • Class 10 Science Bundle</p>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap ml-auto">2m ago</span>
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
                src={ADMIN_INFO.avatar} 
                alt="Profile" 
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-bold text-slate-700 leading-none mb-0.5">
                  {ADMIN_INFO.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {ADMIN_INFO.role}
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
                    <p className="text-sm font-bold text-slate-900">{ADMIN_INFO.name}</p>
                    <p className="text-xs text-slate-500">{ADMIN_INFO.role}</p>
                  </div>

                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <User size={16} /> Admin Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Store size={16} /> Store Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Settings size={16} /> Payment Gateways
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

export default EComAdminHeader;