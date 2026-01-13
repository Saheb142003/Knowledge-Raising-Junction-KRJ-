import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const FOUNDERS = [
  {
    id: 1,
    name: "Anubhaw Kumar Gupta",
    role: "Co-Founder & Tech Lead",
    belief: "We don't just teach subjects; we architect learning paths.",
    image: "bg-slate-200" // Placeholder for actual image URL
  },
  {
    id: 2,
    name: "Rohan Jaiswal",
    role: "Co-Founder & Academic Head",
    belief: "Education scales only when systems respect both teachers and students.",
    image: "bg-slate-300" // Placeholder for actual image URL
  }
];

const LeadershipSection = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF7F50] font-bold text-sm uppercase tracking-widest mb-3"
          >
            Leadership
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900"
          >
            Built by Educators & Engineers.
          </motion.h2>
        </div>

        {/* --- Founders Grid --- */}
        <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
          {FOUNDERS.map((founder, idx) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group text-center w-full max-w-sm"
            >
              
              {/* Image Container */}
              <div className="relative mx-auto w-64 h-64 mb-8 overflow-hidden rounded-[2rem]">
                {/* Image Placeholder (Grayscale by default, Color on hover) */}
                <div className={`w-full h-full ${founder.image} grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out bg-cover bg-center`} />
                
                {/* Social Overlay (Optional) */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-4 bg-gradient-to-t from-black/50 to-transparent">
                  <a href="#" className="text-white hover:text-[#FF7F50] transition-colors"><Linkedin size={20} /></a>
                  <a href="#" className="text-white hover:text-[#FF7F50] transition-colors"><Twitter size={20} /></a>
                </div>
              </div>

              {/* Text Info */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {founder.name}
                </h3>
                <p className="text-xs font-bold text-[#FF7F50] uppercase tracking-wider mb-6">
                  {founder.role}
                </p>
                
                {/* The Belief Line */}
                <div className="relative inline-block max-w-xs">
                  <span className="absolute -top-4 -left-2 text-4xl text-slate-200 font-serif leading-none">“</span>
                  <p className="text-slate-600 font-medium italic text-lg leading-relaxed relative z-10">
                    {founder.belief}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;