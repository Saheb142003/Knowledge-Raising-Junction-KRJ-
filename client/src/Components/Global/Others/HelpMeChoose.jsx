import React from "react";
import { motion } from "framer-motion";
import { 
  PhoneCall, 
  Sparkles, 
  MessageCircle 
} from "lucide-react";

const HelpMeChoose = () => {
  return (
    <section className="py-16 bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-indigo-500/30 text-white"
        >
          
          {/* Background Decorative Circles */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            {/* Left: Text & Human Element */}
            <div className="max-w-xl">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                {/* Avatar Stack */}
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-slate-200" />
                  ))}
                </div>
                <span className="text-indigo-100 text-sm font-medium">
                  Expert counselors online
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-3 text-white">
                Confused about which course to pick?
              </h2>
              <p className="text-indigo-100 text-lg leading-relaxed">
                Don't guess. Get personalized advice based on your current class, goals, and learning style.
              </p>
            </div>

            {/* Right: Dual Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              
              {/* Primary Action: Call */}
              <button className="px-6 py-4 bg-white text-indigo-700 rounded-xl font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all flex items-center justify-center gap-3">
                <PhoneCall size={20} />
                <span>Talk to Advisor</span>
              </button>

              {/* Secondary Action: AI/Quiz */}
              <button className="px-6 py-4 bg-indigo-500/30 backdrop-blur-md border border-indigo-400/50 text-white rounded-xl font-bold hover:bg-indigo-500/50 transition-all flex items-center justify-center gap-3">
                <Sparkles size={20} className="text-yellow-300" />
                <span>Get Recommendation</span>
              </button>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HelpMeChoose;