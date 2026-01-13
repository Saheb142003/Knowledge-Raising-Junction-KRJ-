import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Mic2, 
  Building2, 
  ArrowRight 
} from "lucide-react";

const PERSONAS = [
  {
    id: 1,
    title: "For Students",
    tagline: "Learn with Structure",
    description: "Stop juggling random videos. Get a disciplined learning path with fixed schedules, syllabus tracking, and performance goals.",
    icon: <GraduationCap size={32} />,
    color: "blue", // text-blue-600
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200"
  },
  {
    id: 2,
    title: "For Teachers",
    tagline: "Teach with Clarity",
    description: "Focus purely on delivery. We handle the logistics—attendance, test creation, and resource distribution—so you can just teach.",
    icon: <Mic2 size={32} />,
    color: "orange", // text-orange-600
    bg: "bg-orange-50",
    border: "group-hover:border-orange-200"
  },
  {
    id: 3,
    title: "For Institutions",
    tagline: "Operate at Scale",
    description: "Standardize your quality. Manage multiple batches, branches, and academic calendars from a single, unified command center.",
    icon: <Building2 size={32} />,
    color: "slate", // text-slate-700
    bg: "bg-slate-100",
    border: "group-hover:border-slate-300"
  }
];

const TargetAudience = () => {
  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Who is <span className="text-[#FF7F50]">KRJ</span> For?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            A unified ecosystem that connects the three pillars of education.
          </p>
        </div>

        {/* 3 Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PERSONAS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative p-8 rounded-[2rem] border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start ${item.border}`}
            >
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.bg} text-${item.color}-600 transition-colors`}>
                {React.cloneElement(item.icon, { className: `text-${item.color}-600` })}
              </div>

              {/* Text Content */}
              <div className="mb-6">
                <span className={`block text-xs font-bold uppercase tracking-widest mb-2 text-${item.color}-600`}>
                  {item.title}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.tagline}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>

              {/* Subtle Arrow (Optional) */}
              <div className="mt-auto pt-6 w-full border-t border-slate-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-slate-400">Learn More</span>
                <ArrowRight size={16} className={`text-${item.color}-600`} />
              </div>

              {/* Hover Gradient Overlay (Subtle) */}
              <div className={`absolute inset-0 rounded-[2rem] bg-${item.color}-50/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500`} />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TargetAudience;