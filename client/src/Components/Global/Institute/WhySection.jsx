import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Users, 
  FileCheck, 
  TrendingUp, 
  ArrowRight 
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Structured Batches",
    description: "No more confusion. Your entire syllabus is organized into clear, manageable modules with a defined timeline.",
    icon: <Layers size={28} />,
    color: "blue",
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-50"
  },
  {
    id: 2,
    title: "Expert Mentorship",
    description: "Learn from the best. Get direct guidance, doubt resolution, and tips from teachers who have mastered the subjects.",
    icon: <Users size={28} />,
    color: "orange",
    gradient: "from-orange-500 to-amber-400",
    bg: "bg-orange-50"
  },
  {
    id: 3,
    title: "Tests & Assignments",
    description: "Practice makes perfect. Regular chapter-wise tests and assignments to ensure you are exam-ready at all times.",
    icon: <FileCheck size={28} />,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50"
  },
  {
    id: 4,
    title: "Track Your Growth",
    description: "Visualise your improvement. detailed analytics of your test scores, attendance, and weak areas to help you focus.",
    icon: <TrendingUp size={28} />,
    color: "purple",
    gradient: "from-violet-500 to-fuchsia-400",
    bg: "bg-violet-50"
  }
];

const WhyChooseSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      
      {/* Background Decor (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4"
          >
            Why Choose Us
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6"
          >
            Focused on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-orange-400">Your Success.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500"
          >
            We simplify the learning process so you can focus on what matters most—understanding concepts and cracking exams.
          </motion.p>
        </div>

        {/* --- Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2"
            >
              
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`text-${feature.color}-500`}>
                  {React.cloneElement(feature.icon, { className: `stroke-[2px] text-${feature.color}-600` })}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#FF7F50] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              
              {/* Optional Arrow indicator */}
              <div className="flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-slate-900 transition-colors">
                 <span>Learn more</span>
                 <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// export default WhyKRJ;


export default WhyChooseSection;