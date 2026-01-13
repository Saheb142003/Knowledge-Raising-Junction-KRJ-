import React from "react";
import { motion } from "framer-motion";
import { 
  Scale, 
  ShieldCheck, 
  Target 
} from "lucide-react";

const PHILOSOPHY = [
  {
    id: 1,
    title: "Consistency > Shortcuts",
    description: "We don't believe in last-minute cramming or magic tricks. We believe in the compound effect of daily, disciplined effort.",
    icon: <Scale size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Accountability > Hype",
    description: "We don't sell dreams; we track progress. If a student falls behind, we intervene. If they excel, we push them further.",
    icon: <ShieldCheck size={24} />,
    color: "emerald"
  },
  {
    id: 3,
    title: "Outcomes > Promises",
    description: "Marketing doesn't clear exams. Concepts do. Our entire ecosystem is optimized for one thing: tangible academic improvement.",
    icon: <Target size={24} />,
    color: "orange"
  }
];

const LearningPhilosophy = () => {
  return (
    <section className="py-24 bg-slate-50 relative font-sans">
      
      {/* Background Texture (Subtle) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-40 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm mb-6"
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Our Core Beliefs
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-tight"
          >
            We built KRJ to replace <br className="hidden md:block" />
            <span className="italic text-slate-400">chaos</span> with <span className="text-[#FF7F50] underline decoration-4 decoration-orange-200 underline-offset-4">clarity.</span>
          </motion.h2>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PHILOSOPHY.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              
              {/* Minimal Icon Ring */}
              <div className={`w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center mb-6 text-slate-400 group-hover:border-${item.color}-500 group-hover:text-${item.color}-600 group-hover:bg-${item.color}-50 transition-all duration-500`}>
                {item.icon}
              </div>

              {/* Title as Equation */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 leading-relaxed text-lg max-w-xs mx-auto">
                {item.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LearningPhilosophy;