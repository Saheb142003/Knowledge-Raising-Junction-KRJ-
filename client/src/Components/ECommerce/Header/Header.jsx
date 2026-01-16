import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Package, 
  PlayCircle, 
  BookOpen,
  Settings,
  MonitorPlay
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming Router usage

// --- MOCK DATA ---
const MOCK_USER = {
  name: "Rahul Verma",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
};

const EComHeader = ({ cartItemCount = 2 }) => {
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
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-lg">
              K
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">
              KRJ<span className="text-blue-600">.Learn</span>
            </span>
          </Link>

          {/* --- 2. CENTER: Navigation & Search (Desktop) --- */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8 px-8">
            
            {/* Nav Links */}
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="relative w-full max-w-xs lg:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                placeholder="Search for courses, exams..."
              />
            </div>
          </div>

          {/* --- 3. RIGHT: Actions --- */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Search Toggle (Mobile Only) */}
            <button className="md:hidden text-slate-600">
              <Search size={22} />
            </button>

            {/* Cart (Conditional Visibility) */}
            {cartItemCount > 0 && (
              <Link to="/cart" className="relative text-slate-600 hover:text-blue-600 transition-colors p-1">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                  {cartItemCount}
                </span>
              </Link>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img 
                  src={MOCK_USER.avatar} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 hover:border-blue-200 transition-colors"
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-sm font-bold text-slate-900">{MOCK_USER.name}</p>
                      <p className="text-xs text-slate-500">Learner Account</p>
                    </div>

                    <Link to="/my-learning" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <PlayCircle size={16} /> My Learning
                    </Link>
                    <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Package size={16} /> Purchase History
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      <Settings size={16} /> Account Settings
                    </Link>
                    
                    <div className="border-t border-slate-50 mt-1 pt-1">
                      <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left">
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
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-6 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-slate-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-slate-100 rounded-full">
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Mobile Links */}
              <div className="space-y-2 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Bottom Actions */}
              <div className="pt-6 border-t border-slate-100">
                <Link to="/my-learning" className="flex items-center gap-3 px-4 py-3 text-slate-900 font-bold mb-2">
                  <PlayCircle size={20} className="text-blue-600" /> My Learning
                </Link>
                <button className="w-full py-3 text-rose-600 font-bold flex items-center justify-center gap-2 rounded-xl hover:bg-rose-50 transition-colors">
                  <LogOut size={18} /> Log Out
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to push content below fixed header */}
      <div className="h-20" />
    </>
  );
};

export default EComHeader;