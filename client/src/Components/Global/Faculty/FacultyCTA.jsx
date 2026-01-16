import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Users, 
  Calendar, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const FacultyCTA = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF7F50]/10 rounded-full blur-[100px]" />
         {/* Dot Pattern */}
         <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
            Ready to learn from the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-orange-300">
              Masters?
            </span>
          </h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Don't settle for random tutorials. Get structured guidance, disciplined batches, and proven mentorship.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          
          {/* Primary: Explore Courses */}
          <Link to="/courses" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-[#FF7F50] hover:bg-[#ff6b3d] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 transition-all"
            >
              <Search size={20} />
              <span>Explore All Courses</span>
            </motion.button>
          </Link>

          {/* Secondary: Join Batch */}
          <Link to="/batches" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg"
            >
              <Calendar size={20} />
              <span>Join a Live Batch</span>
            </motion.button>
          </Link>

        </div>

        {/* Tertiary Link: Faculty Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/courses?filter=faculty" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors group"
          >
            <Users size={18} />
            <span>Prefer to browse courses by Faculty?</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FacultyCTA;