import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Briefcase, 
  GraduationCap 
} from "lucide-react";
import { Link } from "react-router-dom";

const CareerContactCTA = () => {
  return (
    <section className="py-20 bg-slate-900 font-sans relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          
          {/* --- LEFT: Contact Details --- */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Still have questions? <br />
                <span className="text-slate-400">Reach the right team.</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                
                {/* HR Contact */}
                <div>
                  <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">
                    For Careers / HR
                  </h4>
                  <a href="mailto:careers@krj.com" className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors mb-1 justify-center lg:justify-start">
                    <Mail size={18} /> careers@krj.com
                  </a>
                  <p className="text-slate-500 text-sm">+91 90000 11111</p>
                </div>

                {/* Separator (Mobile Hidden) */}
                <div className="hidden sm:block w-px bg-slate-700" />

                {/* Admissions Contact */}
                <div>
                  <h4 className="text-[#FF7F50] text-sm font-bold uppercase tracking-wider mb-2">
                    For Admissions
                  </h4>
                  <a href="mailto:admissions@krj.com" className="flex items-center gap-2 text-white hover:text-orange-300 transition-colors mb-1 justify-center lg:justify-start">
                    <Mail size={18} /> admissions@krj.com
                  </a>
                  <p className="text-slate-500 text-sm">+91 90000 22222</p>
                </div>

              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: Final CTAs --- */}
          <div className="lg:w-1/2 flex flex-col sm:flex-row gap-4 w-full justify-end">
            
            {/* Job Application CTA */}
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => document.getElementById('teaching-roles')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-3 group"
            >
              <Briefcase size={20} />
              <span>Apply for Teaching Role</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            {/* Student Query CTA */}
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => document.getElementById('student-inquiry')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border border-slate-600 hover:border-[#FF7F50] text-slate-300 hover:text-[#FF7F50] rounded-xl font-bold transition-all flex items-center justify-center gap-3"
            >
              <GraduationCap size={20} />
              <span>Submit Student Query</span>
            </motion.button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CareerContactCTA;