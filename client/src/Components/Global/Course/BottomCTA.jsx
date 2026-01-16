import React from "react";
import { motion } from "framer-motion";
import { 
  PlayCircle, 
  CalendarDays, 
  ArrowRight 
} from "lucide-react";

const BottomCTA = () => {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#FF7F50]/10 rounded-full blur-[100px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Experience the <span className="text-[#FF7F50]">KRJ</span> Difference.
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Not ready to commit? No problem. Sit in on a real class or explore our free demo library to see how we teach.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Primary: Demo */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg"
          >
            <PlayCircle size={20} className="text-[#FF7F50]" />
            <span>Explore Demo Classes</span>
          </motion.button>

          {/* Secondary: Schedule */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 hover:bg-slate-700 transition-all"
          >
            <CalendarDays size={20} />
            <span>Check Live Batch Schedule</span>
          </motion.button>

        </div>

        {/* Soft Text */}
        <p className="mt-8 text-xs text-slate-500 font-medium">
          No credit card required for demos. Instant access.
        </p>

      </div>
    </section>
  );
};

export default BottomCTA;