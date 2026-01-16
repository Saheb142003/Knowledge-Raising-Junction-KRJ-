import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  MapPin, 
  HelpCircle, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const ContactFinalCTA = () => {
  return (
    <section className="py-20 bg-slate-900 font-sans relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still deciding?
          </h2>
          <p className="text-slate-400">
            If you aren't ready to contact us yet, feel free to explore our ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Courses */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Explore Courses</h3>
            <p className="text-sm text-slate-400 mb-6">
              Browse our complete catalog of Online and Offline programs for JEE, NEET, and Boards.
            </p>
            <Link to="/courses">
              <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors flex items-center justify-center gap-2">
                View All Courses
              </button>
            </Link>
          </motion.div>

          {/* Card 2: Centers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-orange-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-[#FF7F50] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Find a Center</h3>
            <p className="text-sm text-slate-400 mb-6">
              Locate the nearest KRJ Offline Center to visit us for a face-to-face counseling session.
            </p>
            <Link to="/centers">
              <button className="w-full py-3 rounded-lg bg-[#FF7F50] hover:bg-[#ff6b3d] text-white font-bold transition-colors flex items-center justify-center gap-2">
                Locate Nearest Center
              </button>
            </Link>
          </motion.div>

          {/* Card 3: Query */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Have a Doubt?</h3>
            <p className="text-sm text-slate-400 mb-6">
              Skip the browsing. Send us a direct query and let our team guide you to the right choice.
            </p>
            <button 
              onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 rounded-lg bg-transparent border border-slate-600 text-slate-300 hover:border-white hover:text-white font-bold transition-colors flex items-center justify-center gap-2"
            >
              Fill Inquiry Form <ArrowRight size={16} />
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactFinalCTA;