import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Key, 
  ArrowRight, 
  ShieldAlert,
  Fingerprint
} from "lucide-react";

const FacultyLogin = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md mx-auto">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        
        {/* Authority Top Strip */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-600" />

        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-500 mx-auto mb-4 border border-purple-500/20 shadow-inner">
            <Briefcase size={22} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Faculty & Staff</h2>
          <p className="text-sm text-slate-400">
            Secure login for KRJ employees and academic staff.
          </p>
        </div>

        {/* --- FORM --- */}
        <form className="space-y-5">
          
          {/* Employee ID Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Employee ID</label>
            <div className="relative group">
              <Fingerprint size={18} className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type="text" 
                value={empId}
                onChange={(e) => setEmpId(e.target.value.toUpperCase())}
                placeholder="EMP-0000"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all uppercase tracking-wide font-mono"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative group">
              <Key size={18} className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Primary Action */}
          <button 
            type="button" // Change to submit in production
            className="w-full py-3.5 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 mt-4 group"
          >
            <span>Secure Login</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </form>

        {/* --- SECURITY WARNING --- */}
        <div className="mt-8 p-4 rounded-xl bg-red-900/10 border border-red-500/10 flex gap-3">
          <div className="shrink-0 text-red-500 mt-0.5">
            <ShieldAlert size={16} />
          </div>
          <p className="text-[11px] text-red-300/80 leading-relaxed font-medium">
            <strong>Restricted Area:</strong> This portal is for authorized KRJ personnel only. All access attempts are logged. Unauthorized access is a punishable offense.
          </p>
        </div>

        {/* IT Support Link */}
        <div className="mt-6 text-center">
          <a href="#" className="text-xs text-slate-500 hover:text-purple-400 transition-colors flex items-center justify-center gap-1">
            Trouble logging in? Contact IT Admin
          </a>
        </div>

      </motion.div>
      
    </div>
  );
};

export default FacultyLogin;