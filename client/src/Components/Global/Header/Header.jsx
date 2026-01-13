import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Sun,
  Moon,
  User,
  MapPin,
  Mail,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Logo from "../Logo/Logo"; // Using your actual Logo component

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About KRJ", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Faculty", href: "/faculty" },
    { name: "Student Zone", href: "/student-zone" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const themeOrange = "#FF7F50"; // Centralized color for reference

  return (
    <>
      {/* --- TOP BAR (Clean White) --- */}
      <div className="hidden lg:block bg-white border-b border-gray-100 py-2 text-xs font-medium tracking-wide z-50 relative">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors cursor-pointer">
              <Mail size={14} color={themeOrange} /> admissions@krj.edu
            </span>
            <span className="flex items-center gap-2 hover:text-[#FF7F50] transition-colors cursor-pointer">
              <MapPin size={14} color={themeOrange} /> New Delhi, India
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Have any questions?</span>
            <a href="tel:+919876543210" className="font-bold text-gray-800 hover:text-[#FF7F50] transition-colors">
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* --- MAIN HEADER (Sticky) --- */}
      <motion.header
        className={`fixed top-0 lg:top-auto left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white shadow-md py-2"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div onClick={() => navigate("/")} className="cursor-pointer z-50 relative">
              <Logo />
            </div>

            {/* Desktop Nav - ORANGE CONTAINER */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#FF7F50] p-1.5 rounded-full shadow-lg shadow-orange-500/20">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-out ${
                      isActive 
                        ? "bg-white text-[#FF7F50] shadow-sm" // Active State
                        : "text-white hover:bg-white hover:text-[#FF7F50]" // Hover State
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-5">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-gray-400 hover:text-[#FF7F50] hover:bg-orange-50 rounded-full transition-all"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="flex items-center gap-4 border-l border-gray-100 pl-4">
                <button 
                  onClick={() => navigate("/login")}
                  className="text-sm font-bold text-gray-600 hover:text-[#FF7F50] transition-colors flex items-center gap-1"
                >
                  <User size={18} /> Login
                </button>
                
                {/* ENQUIRY BUTTON (Matching Nav Style) */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border border-[#FF7F50] bg-[#FF7F50] text-white hover:bg-white hover:text-[#FF7F50] shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    Enquiry <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-4 z-50">
               <button className="text-[#FF7F50] p-2 bg-orange-50 rounded-full">
                  <Phone size={20} />
               </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 p-2 text-gray-800"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X size={28} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu size={28} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* --- MOBILE FULL SCREEN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-30 lg:hidden pt-24 px-6 pb-6 flex flex-col overflow-y-auto"
          >
            <div className="flex-1 flex flex-col space-y-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-xl hover:bg-orange-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-800 group-hover:text-[#FF7F50]">
                    {link.name}
                  </span>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-[#FF7F50]" />
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 space-y-4"
            >
               <button 
                  onClick={() => navigate("/login")}
                  className="w-full py-4 rounded-xl border-2 border-gray-100 font-bold text-gray-700 hover:border-[#FF7F50] hover:text-[#FF7F50] transition-colors flex items-center justify-center gap-2"
                >
                  <User size={20} /> Student Login
                </button>
                <button className="w-full py-4 rounded-xl bg-[#FF7F50] text-white font-bold shadow-lg shadow-orange-500/30 active:scale-95 transition-transform">
                  Book Free Counselling
                </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;