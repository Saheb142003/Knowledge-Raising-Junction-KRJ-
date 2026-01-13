import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  ArrowRight, 
  Users, 
  BookOpen, 
  ShoppingBag,
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CourseShowcase from "../../ECommerce/Carousel/CourseShowcase"; 

const Hero = () => {
  const navigate = useNavigate();
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);

  // Dropdown Animation Variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    // FIX 1: Added pt-24 md:pt-32 to push content below the fixed header
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans selection:bg-[#FF7F50] selection:text-white pt-24 md:pt-32 pb-20">
      
      {/* --- 1. HERO MAIN: COURSE SHOWCASE --- */}
      {/* z-0 ensures this stays behind the dropdown menu */}
      <div className="relative w-full z-0 px-2 md:px-4">
        <CourseShowcase />
      </div>

      {/* --- 2. RECTANGULAR ACTION BOX (Marketing + Login Dropdown) --- */}
      {/* z-10 ensures the dropdown floats ON TOP of the carousel */}
      {/* --- 2. RECTANGULAR ACTION BOX (Marketing + Login Dropdown) --- */}
{/* FIX: Changed -mt (negative margin) to mt (positive margin) to separate them completely */}
<div className="relative z-10 px-4 lg:px-8 max-w-7xl mx-auto mt-6 md:mt-10">
  
  <motion.div 
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    // overflow-visible is crucial for the dropdown to extend outside the box
    className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-6 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-visible"
  >
    
    {/* LEFT SIDE: Marketing Pitch */}
    <div className="flex-1 w-full">
       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[#FF7F50] text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>Admissions Open 2026</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-orange-400">Potential.</span>
        </h1>
        
        <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
          From foundation courses to competitive exam mastery. We build the roadmap for your academic success.
        </p>
    </div>

    {/* RIGHT SIDE: Interactive Login Dropdown */}
    <div className="relative w-full lg:w-auto">
      
      {/* The Trigger Button */}
      <button 
        onClick={() => setIsLoginMenuOpen(!isLoginMenuOpen)}
        className={`w-full lg:w-auto flex items-center justify-between gap-4 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 ${
          isLoginMenuOpen 
            ? "bg-slate-900 text-white shadow-lg" 
            : "bg-[#FF7F50] hover:bg-[#ff6b3d] text-white shadow-xl shadow-orange-500/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <GraduationCap size={24} />
          <span>Portal Login / Access</span>
        </div>
        {isLoginMenuOpen ? <X size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* The Dropdown Menu */}
      <AnimatePresence>
        {isLoginMenuOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-[120%] w-full lg:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 origin-top-right"
          >
            
            <div className="space-y-2">
              {/* Header inside dropdown */}
              <div className="px-4 py-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Role</span>
              </div>

              {/* 1. Student */}
              <button 
                onClick={() => navigate("/login/student")}
                className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users size={20} />
                </div>
                <div className="text-left flex-1">
                  <span className="block text-slate-900 font-bold">Student Login</span>
                  <span className="block text-slate-500 text-xs">Dashboard & Classes</span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
              </button>

              {/* 2. Faculty */}
              <button 
                onClick={() => navigate("/login/teacher")}
                className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <BookOpen size={20} />
                </div>
                <div className="text-left flex-1">
                  <span className="block text-slate-900 font-bold">Faculty Login</span>
                  <span className="block text-slate-500 text-xs">Academic Management</span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
              </button>

              {/* 3. Guest */}
              <button 
                onClick={() => navigate("/login/guest")}
                className="w-full group flex items-center gap-4 p-3 rounded-xl hover:bg-orange-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <ShoppingBag size={20} />
                </div>
                <div className="text-left flex-1">
                  <span className="block text-slate-900 font-bold">New User / Guest</span>
                  <span className="block text-slate-500 text-xs">Buy Courses & Explore</span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
              </button>

              {/* Footer: Admin */}
              <div className="mt-2 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => navigate("/login/admin")}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 py-2"
                >
                  <ShieldCheck size={12} /> Admin Access
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>

    {/* Background Gradient Mesh for the Box */}
    <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-slate-50 to-transparent -z-10 rounded-r-[2rem]" />
    
  </motion.div>
</div>

    </div>
  );
};

export default Hero;