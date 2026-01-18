import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  LogOut, 
  Package, 
  PlayCircle, 
  BookOpen,
  Settings,
  MonitorPlay,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import Logo from './Logo'; // Adjust path as needed

// --- MOCK USER DATA ---
const USER_INFO = {
  name: "Rahul Verma",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
  cartCount: 2
};

const EComUserHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const NAV_LINKS = [
    { label: "Browse Courses", href: "/courses", icon: <BookOpen size={18} /> },
    { label: "Live Batches", href: "/batches", icon: <MonitorPlay size={18} /> },
    { label: "Demo Classes", href: "/demos", icon: <PlayCircle size={18} /> },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200 z-50 px-4 md:px-8 font-sans">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">

          {/* --- 1. LEFT: Logo (Redirects to My Learning) --- */}
          <Link to="/my-learning" className="flex items-center gap-2 shrink-0">
            <div className="scale-90 origin-left">
              <Logo />
            </div>
          </Link>

          {/* --- 2. CENTER: Discovery Engine (Desktop) --- */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-12 px-4">
            
            {/* Nav Links */}
            <nav className="flex items-center gap-6 shrink-0">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href}
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Global Search Bar */}
            <div className="relative w-full max-w-sm lg:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                placeholder="Search for courses, exams, faculty..."
              />
            </div>
          </div>

          {/* --- 3. RIGHT: Actions (Cart & Profile) --- */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Mobile Search Trigger */}
            <button className="md:hidden text-slate-600">
              <Search size={22} />
            </button>

            {/* Shopping Cart */}
            <Link to="/cart" className="relative text-slate-600 hover:text-blue-600 transition-colors p-1 group">
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
              {USER_INFO.cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                  {USER_INFO.cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none pl-1 pr-2 py-1 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
              >
                <img 
                  src={USER_INFO.avatar} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-sm font-bold text-slate-900">{USER_INFO.name}</p>
                      <p className="text-xs text-slate-500">Course Learner</p>
                    </div>

                    <div className="p-1">
                      <Link to="/my-learning" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
                        <PlayCircle size={16} /> My Learning
                      </Link>
                      <Link to="/orders" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
                        <Package size={16} /> Purchase History
                      </Link>
                      <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
                        <Settings size={16} /> Account Settings
                      </Link>
                    </div>
                    
                    <div className="border-t border-slate-50 mt-1 pt-1 p-1">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left font-medium">
                        <LogOut size={16} /> Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-slate-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER (Slide Over) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/20 z-[60] backdrop-blur-sm md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-6 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-slate-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-medium"
                />
              </div>

              {/* Mobile Links */}
              <div className="space-y-1 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-3 px-4 py-3.5 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-bold"
                  >
                    <div className="text-slate-400">{link.icon}</div>
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Bottom Actions */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-6 px-2">
                  <img src={USER_INFO.avatar} alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{USER_INFO.name}</p>
                    <Link to="/my-learning" className="text-xs text-blue-600 font-medium">View Profile</Link>
                  </div>
                </div>
                <button className="w-full py-3 text-rose-600 font-bold flex items-center justify-center gap-2 rounded-xl hover:bg-rose-50 transition-colors">
                  <LogOut size={18} /> Log Out
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EComUserHeader;