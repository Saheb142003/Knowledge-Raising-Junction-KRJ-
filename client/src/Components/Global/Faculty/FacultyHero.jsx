import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  CheckCircle2, 
  Users, 
  BookOpen 
} from "lucide-react";

const FacultyHero = () => {
  return (
    <section className="relative w-full min-h-[60vh] bg-slate-950 pt-32 pb-20 overflow-hidden font-sans flex flex-col justify-center">
      
      {/* --- BACKGROUND VISUALS (Abstract Classroom Grid) --- */}
      <div className="absolute inset-0 z-0">
        
        {/* 1. Geometric Floor Grid (Perspective) */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #334155 1px, transparent 1px),
              linear-gradient(to bottom, #334155 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />

        {/* 2. Central Spotlight (The Teacher's Spot) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
        
        {/* 3. Floating Particles (Ideas) */}
        <motion.div 
           animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 5, repeat: Infinity }}
           className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-[1px]"
        />
        <motion.div 
           animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
           transition={{ duration: 7, repeat: Infinity, delay: 1 }}
           className="absolute top-1/2 right-1/4 w-3 h-3 bg-orange-400 rounded-full blur-[1px]"
        />

      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-md mb-8">
            <GraduationCap size={16} className="text-[#FF7F50]" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Academic Excellence
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight mb-6 leading-tight">
            Learn from Faculties Who Teach with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 font-sans font-black">
              Structure & Purpose.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
            At KRJ, faculties are selected for <span className="text-white font-medium">subject mastery</span>, <span className="text-white font-medium">teaching clarity</span>, and consistency — not popularity.
          </p>

          {/* --- Trust Metrics Strip --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800 pt-8 max-w-4xl mx-auto">
            {[
              { label: "Selection Ratio", value: "1:25", icon: <CheckCircle2 size={16} /> },
              { label: "Avg Experience", value: "8+ Years", icon: <BookOpen size={16} /> },
              { label: "Active Faculties", value: "85+", icon: <Users size={16} /> },
              { label: "Student Rating", value: "4.8/5", icon: <CheckCircle2 size={16} /> },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-1 group">
                <div className="flex items-center gap-2 text-slate-300 font-bold text-lg group-hover:text-[#FF7F50] transition-colors">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium uppercase tracking-wide">
                  {stat.icon}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default FacultyHero;