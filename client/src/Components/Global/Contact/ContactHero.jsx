import React from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  LifeBuoy 
} from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative w-full py-20 bg-slate-900 flex flex-col justify-center font-sans overflow-hidden">
      
      {/* --- BACKGROUND ASSETS --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF7F50]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-md mb-6">
            <LifeBuoy size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              We're Here to Help
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">KRJ.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Whether you’re a <span className="text-white font-medium">student</span>, <span className="text-white font-medium">parent</span>, or <span className="text-white font-medium">educator</span> — our academic team is ready to assist you.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactHero;