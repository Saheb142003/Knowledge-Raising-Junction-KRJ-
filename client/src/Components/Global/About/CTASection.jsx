import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  Calendar, 
  Briefcase 
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden font-sans">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF7F50]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Main Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Ready to learn with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-orange-400">
              structure and clarity?
            </span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have moved beyond random videos to a disciplined, results-oriented learning path.
          </p>
        </motion.div>

        {/* Student Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="w-full sm:w-auto px-8 py-4 bg-[#FF7F50] hover:bg-[#ff6b3d] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 transition-all hover:scale-105">
            <Search size={20} />
            Explore Courses
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-white text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-slate-800">
            <Calendar size={20} />
            View Live Batches
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800 mb-8 max-w-xs mx-auto" />

        {/* Teacher Secondary CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            For Educators
          </span>
          <a href="#" className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium">
            <Briefcase size={16} />
            <span>Interested in teaching with KRJ?</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;