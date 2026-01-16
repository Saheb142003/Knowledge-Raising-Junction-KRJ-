import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  Briefcase, 
  ArrowRight,
  Lock,
  ShieldCheck
} from "lucide-react";

// Updated data structure to use IDs that match Login.js state
const LOGIN_TYPES = [
  {
    id: "student", // Matches 'student' in Login.js
    role: "Student",
    description: "Access your dashboard, recorded lectures, and test series.",
    icon: <GraduationCap size={32} />,
    color: "blue"
  },
  {
    id: "ecom", // Matches 'ecom' in Login.js (For Parents/Course Buyers)
    role: "Parent / Course User",
    description: "Track attendance, exam results, and purchased courses.",
    icon: <Users size={32} />,
    color: "emerald"
  },
  {
    id: "faculty", // Matches 'faculty' in Login.js
    role: "Faculty / Staff",
    description: "Manage batches, upload content, and mark attendance.",
    icon: <Briefcase size={32} />,
    color: "purple"
  }
];

// 1. Accept the onSelect prop
const LoginPortal = ({ onSelect }) => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center font-sans">
      
      <div className="relative z-10 w-full max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="mx-auto w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-6 shadow-2xl">
              <ShieldCheck size={24} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Login to <span className="text-blue-500">KRJ Space.</span>
            </h1>
            <p className="text-slate-400 text-lg font-light">
              Select the login option that applies to you.
            </p>
        </div>

        {/* Login Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOGIN_TYPES.map((type, idx) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              // 2. Add onClick Handler
              onClick={() => onSelect(type.id)} 
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              
              <div className={`absolute inset-0 bg-${type.color}-500/0 group-hover:bg-${type.color}-500/5 rounded-2xl transition-colors duration-500`} />

              <div className={`w-14 h-14 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-${type.color}-400 mb-6 group-hover:scale-110 group-hover:border-${type.color}-500/50 transition-all duration-300 shadow-lg`}>
                {type.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {type.role}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow">
                {type.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-500 group-hover:text-white transition-colors mt-auto">
                Proceed Securely <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* 3. Update Hidden Admin Trigger */}
      <button 
        onClick={() => onSelect('admin')} 
        className="mt-12 p-2 text-slate-800 hover:text-slate-600 transition-colors opacity-50 hover:opacity-100"
        title="Admin Access"
      >
        <Lock size={16} />
      </button>

    </section>
  );
};

export default LoginPortal;