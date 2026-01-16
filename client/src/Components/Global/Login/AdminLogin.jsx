import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  Lock, 
  Server, 
  Eye, 
  EyeOff, 
  Activity,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen w-full bg-black flex items-center justify-center font-mono p-4">
      
      {/* Background Grid - Very faint, tech-like */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(to right, #333 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden"
      >
        
        {/* Top Hazard Strip */}
        <div className="h-1 w-full bg-red-600/70" />

        <div className="p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="text-red-500">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg tracking-tight">SYSTEM ADMIN</h1>
                <p className="text-neutral-500 text-xs">Level 5 Access Required</p>
              </div>
            </div>
            {/* Mock Server Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-neutral-600 text-[10px]">ONLINE</span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            
            {/* Admin ID */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Administrator ID</label>
              <div className="relative">
                <Server size={14} className="absolute left-3 top-3.5 text-neutral-500" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="ROOT_USER"
                  className="w-full bg-black border border-neutral-700 text-white text-sm py-3 pl-9 pr-4 rounded focus:border-red-500 focus:ring-1 focus:ring-red-900 outline-none transition-all placeholder:text-neutral-700"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Passkey</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-3.5 text-neutral-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••"
                  className="w-full bg-black border border-neutral-700 text-white text-sm py-3 pl-9 pr-10 rounded focus:border-red-500 focus:ring-1 focus:ring-red-900 outline-none transition-all placeholder:text-neutral-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-600 hover:text-neutral-400"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* 2FA Code */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex justify-between">
                <span>2FA / OTP</span>
                <span className="text-red-500/80">Required</span>
              </label>
              <input 
                type="text" 
                maxLength={6}
                placeholder="000-000"
                className="w-full bg-black border border-neutral-700 text-white text-center text-lg tracking-[0.5em] py-3 rounded focus:border-red-500 focus:ring-1 focus:ring-red-900 outline-none transition-all placeholder:text-neutral-800 font-mono"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="button" 
              className="w-full bg-white text-black font-bold text-sm py-3 rounded mt-4 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={14} /> AUTHENTICATE
            </button>

          </form>

          {/* Security Footer Data */}
          <div className="mt-8 pt-4 border-t border-dashed border-neutral-800 space-y-2">
            <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
              <span>IP ADDRESS:</span>
              <span className="text-neutral-400">192.168.X.XXX</span>
            </div>
            <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
              <span>SESSION ID:</span>
              <span className="text-neutral-400">SEC-8492-AX</span>
            </div>
            <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
              <span>ENCRYPTION:</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <Activity size={10} /> TLS 1.3
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Exit Hatch */}
      <Link 
        to="/login"
        className="fixed top-6 left-6 text-neutral-600 hover:text-white flex items-center gap-2 text-xs transition-colors"
      >
        <ArrowLeft size={14} /> Return to Portal
      </Link>

    </section>
  );
};

export default AdminLogin;