import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Clock,
  Layout,
  MapPin,
  CheckCircle2,
  Droplets
} from "lucide-react";

const OfflineQuality = () => {
  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* --- LEFT: The Visual Showcase --- */}
          <div className="lg:w-1/2 relative">
             {/* Main Image Container */}
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3]"
             >
               {/* NOTE: Replace the src below with your actual uploaded image path 
                  (e.g., the clean classroom image provided) 
               */}
               <img
                 src="/assets/classroom-interior.jpg" 
                 alt="Modern KRJ Classroom Infrastructure"
                 className="w-full h-full object-cover"
               />

               {/* Floating Badge: Safety */}
               <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-900">100% Secure</span>
                    <span className="text-xs text-slate-500">CCTV & Biometric Entry</span>
                  </div>
               </div>
             </motion.div>

             {/* Background Decoration */}
             <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-slate-50 rounded-3xl border border-slate-100" />
          </div>

          {/* --- RIGHT: The Parent Pitch --- */}
          <div className="lg:w-1/2">

            <div className="mb-10">
              <span className="text-[#FF7F50] font-bold text-xs uppercase tracking-widest mb-2 block">
                The Center Experience
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Safe. Structured. <br/>
                <span className="text-blue-600">Built for Focus.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                We know you worry about the environment your child studies in. KRJ centers are designed to be safe, hygienic, and strictly academic zones—free from outside distractions.
              </p>
            </div>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
              
              {/* Feature 1: Infrastructure */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Layout size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Clean Infrastructure</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Air-conditioned, well-lit classrooms with ergonomic furniture for long study hours.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2: Atmosphere */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Academic Atmosphere</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Strict "No-Phone Zones" and silent library areas ensure deep concentration.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3: Schedule */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Proper Scheduling</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Fixed timetables. Students arrive, attend classes, and leave on time. No loitering.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4: Hygiene */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Droplets size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Hygiene & Safety</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Regular cleaning, filtered water stations, and staff-monitored premises.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* CTA: Visit Center */}
            <div className="mt-12 pt-8 border-t border-slate-100">
               <button className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#FF7F50] transition-colors group">
                 <MapPin size={18} />
                 Visit your nearest center to check the facilities
                 <CheckCircle2 size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF7F50]"/>
               </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default OfflineQuality;