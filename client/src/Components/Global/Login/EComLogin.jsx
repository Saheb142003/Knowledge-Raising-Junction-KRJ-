import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShoppingBag,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";

const EComLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md mx-auto">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

        {/* --- HEADER --- */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-4 border border-blue-500/20">
            <ShoppingBag size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Welcome back.</h2>
          <p className="text-sm text-slate-400">
            Login to access your purchased courses.
          </p>
        </div>

        {/* --- FORM --- */}
        <form className="space-y-5">
          
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email / Username</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <Link to="/forgot-password" class="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Forgot?
              </Link>
            </div>
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
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2 group"
          >
            <span>Login Securely</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </form>

        {/* --- DIVIDER --- */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <span className="relative bg-slate-900 px-4 text-xs text-slate-500 uppercase tracking-widest">
            New to KRJ?
          </span>
        </div>

        {/* --- SECONDARY ACTION (Create Account) --- */}
        <button className="w-full py-3.5 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
          <UserPlus size={18} />
          Create Free Account
        </button>

      </motion.div>
      
    </div>
  );
};

export default EComLogin;