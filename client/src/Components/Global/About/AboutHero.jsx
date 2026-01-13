import React from "react";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    // ADDED: pt-24 md:pt-32 to clear the fixed header
    <section className="relative w-full min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans pt-24 md:pt-32">
      
      {/* --- BACKGROUND VISUALS (Abstract Network) --- */}
      <div className="absolute inset-0 z-0">
        
        {/* 1. Base Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        
        {/* 2. Radial Gradient Overlay (Vignette) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />

        {/* 3. Animated "Network Nodes" (Glowing Orbs) */}
        <motion.div 
           animate={{ 
             scale: [1, 1.2, 1], 
             opacity: [0.3, 0.6, 0.3],
             x: [0, 50, 0],
             y: [0, -50, 0]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
        />
        <motion.div 
           animate={{ 
             scale: [1, 1.5, 1], 
             opacity: [0.2, 0.5, 0.2],
             x: [0, -50, 0],
             y: [0, 50, 0]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF7F50]/10 rounded-full blur-[120px]"
        />

        {/* 4. Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]" />

      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              The Education Ecosystem
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] mb-8">
            More Than <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500">
              Courses.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            <span className="text-white font-medium">KRJ</span> is a unified education ecosystem connecting students, teachers, and structured learning workflows — from <span className="text-slate-200 border-b border-slate-700 pb-0.5">foundation</span> to <span className="text-slate-200 border-b border-slate-700 pb-0.5">graduation</span>.
          </p>

          {/* Optional: Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 flex justify-center"
          >
            <div className="w-px h-16 bg-gradient-to-b from-slate-500 to-transparent" />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default AboutHero;