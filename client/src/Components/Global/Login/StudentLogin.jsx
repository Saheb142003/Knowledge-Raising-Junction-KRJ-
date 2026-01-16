import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Lock, 
  ArrowRight, 
  ShieldCheck,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentPortalLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md mx-auto">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        
        {/* Institutional Top Strip */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />

        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mx-auto mb-4 border border-blue-500/20 shadow-inner">
            <CreditCard size={22} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Student Portal</h2>
          <p className="text-sm text-slate-400">
            Enter your Roll Number to access the dashboard.
          </p>
        </div>

        {/* --- FORM --- */}
        <form className="space-y-5">
          
          {/* Student ID Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Student ID / Roll No.</label>
            <div className="relative group">
              <CreditCard size={18} className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                placeholder="KRJ-202X-0000"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all uppercase tracking-wide font-mono"
              />
            </div>
            {/* Helper Text */}
            <div className="flex items-center gap-1.5 ml-1">
              <Info size={12} className="text-slate-600" />
              <span className="text-[10px] text-slate-500">
                You can find this on your KRJ ID Card.
              </span>
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Primary Action */}
          <button 
            type="button" // Change to submit in production
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4 group"
          >
            <ShieldCheck size={18} />
            <span>Access Dashboard</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </form>

        {/* --- INSTITUTIONAL NOTE --- */}
        <div className="mt-8 p-4 rounded-xl bg-blue-900/10 border border-blue-500/10 flex gap-3">
          <div className="shrink-0 text-blue-400 mt-0.5">
            <Info size={16} />
          </div>
          <p className="text-xs text-blue-300/80 leading-relaxed">
            <strong>First time login?</strong> Please use the default password provided in your admission kit. You will be asked to reset it upon entry.
          </p>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Forgot Password? Contact Center Admin
          </a>
        </div>

      </motion.div>
      
    </div>
  );
};

export default StudentPortalLogin;