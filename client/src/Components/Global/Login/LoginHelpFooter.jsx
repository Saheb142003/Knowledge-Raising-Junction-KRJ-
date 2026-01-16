import React from "react";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Lock 
} from "lucide-react";

const LoginHelpFooter = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative z-10 mt-16 w-full max-w-2xl mx-auto text-center font-sans"
    >
      
      {/* --- Divider --- */}
      <div className="w-24 h-px bg-slate-800 mx-auto mb-8" />

      {/* --- Trouble Logging In? --- */}
      <div className="mb-8">
        <h4 className="text-slate-400 font-medium flex items-center justify-center gap-2 mb-4">
          <HelpCircle size={16} />
          Having trouble accessing your account?
        </h4>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
          <a 
            href="tel:+919876543210" 
            className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
          >
            <Phone size={14} />
            <span>+91 98765 43210</span>
          </a>
          
          <span className="hidden sm:block text-slate-700">|</span>
          
          <a 
            href="mailto:support@krj.in" 
            className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
          >
            <Mail size={14} />
            <span>support@krj.in</span>
          </a>
        </div>
      </div>

      {/* --- Security & Privacy Badge --- */}
      <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-slate-900 border border-slate-800/50 backdrop-blur-sm shadow-xl">
        
        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
          <Lock size={12} className="text-emerald-500" />
          <span>256-Bit SSL Encrypted</span>
        </div>

        <div className="w-px h-3 bg-slate-800" />

        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
          <ShieldCheck size={12} className="text-blue-500" />
          <span>KRJ Secure Gateway</span>
        </div>

      </div>

      {/* --- Legal (No Links) --- */}
      <div className="mt-8 text-[10px] text-slate-600">
        <p>
          Unauthorized access to this system is strictly prohibited and monitored. 
          <br className="hidden sm:block" />
          By logging in, you agree to our Acceptable Use Policy.
        </p>
      </div>

    </motion.div>
  );
};

export default LoginHelpFooter;