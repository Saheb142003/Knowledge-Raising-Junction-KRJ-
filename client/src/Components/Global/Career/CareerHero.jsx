import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  ArrowDown 
} from "lucide-react";

const CareerHero = () => {
  return (
    <section className="relative w-full min-h-[50vh] bg-slate-900 flex flex-col justify-center font-sans overflow-hidden pt-20 pb-16">
      
      {/* --- BACKGROUND ASSETS --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(to right, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Abstract Shapes */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-md mb-6">
            <Briefcase size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Join Our Team
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-6">
            Careers & Opportunities <br />
            <span className="text-slate-400 font-sans font-light">at KRJ.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Explore teaching roles, academic positions, and student opportunities across KRJ’s learning ecosystem. Help us build the future of education.
          </p>

          {/* Quick Stat / Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-slate-500 border-t border-slate-800 pt-8 mt-8">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Academic Roles
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Management & Ops
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Student Internships
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default CareerHero;