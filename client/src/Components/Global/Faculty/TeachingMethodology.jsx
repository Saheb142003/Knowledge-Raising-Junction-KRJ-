import React from "react";
import { motion } from "framer-motion";
import { 
  Layout, 
  Video, 
  PenTool, 
  ClipboardCheck, 
  TrendingUp, 
  ArrowRight 
} from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Topic Breakdown",
    description: "Deconstructing complex concepts into bite-sized, logical modules before teaching begins.",
    icon: <Layout size={20} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Guided Explanation",
    description: "Live or recorded lectures that focus on conceptual clarity and real-world application.",
    icon: <Video size={20} />,
    color: "indigo"
  },
  {
    id: 3,
    title: "Practice & Drill",
    description: "Immediate application of concepts through curated assignments and problem sets.",
    icon: <PenTool size={20} />,
    color: "purple"
  },
  {
    id: 4,
    title: "Testing & Eval",
    description: "Regular quizzes and full-length mocks to benchmark performance against the batch.",
    icon: <ClipboardCheck size={20} />,
    color: "rose"
  },
  {
    id: 5,
    title: "Feedback Loop",
    description: "Data-driven insights to identify weak areas and close the learning gap.",
    icon: <TrendingUp size={20} />,
    color: "emerald"
  }
];

const TeachingMethodology = () => {
  return (
    <section className="py-24 bg-slate-50 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF7F50] animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              The Learning Loop
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            A System, Not <span className="italic text-slate-400">Randomness.</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Our teaching process is engineered for retention. Every topic follows a strict 5-step lifecycle to ensure mastery.
          </p>
        </div>

        {/* --- The Process Flow --- */}
        <div className="relative">
          
          {/* Connecting Line (Desktop: Horizontal, Mobile: Vertical) */}
          <div className="absolute top-8 left-4 md:left-0 md:top-1/2 md:-translate-y-1/2 w-0.5 h-full md:w-full md:h-0.5 bg-slate-200 -z-10 origin-left" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative flex flex-col items-center text-center md:text-center group"
              >
                
                {/* Step Number Badge (Desktop Only) */}
                <div className="hidden md:block absolute -top-12 text-6xl font-black text-slate-100 select-none z-0">
                  0{step.id}
                </div>

                {/* Icon Circle */}
                <div className={`relative w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 z-10 shadow-sm group-hover:border-${step.color}-500 group-hover:text-${step.color}-600 group-hover:scale-110 transition-all duration-300 mb-6`}>
                  {step.icon}
                  
                  {/* Pulse Effect on Hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-${step.color}-500/20 opacity-0 group-hover:animate-ping transition-opacity`} />
                </div>

                {/* Content */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow w-full md:w-auto md:bg-transparent md:border-0 md:shadow-none md:p-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed md:max-w-[180px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector Arrow (Visual Only) */}
                {idx !== STEPS.length - 1 && (
                  <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-300">
                    <ArrowRight size={20} className="rotate-90" />
                  </div>
                )}

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeachingMethodology;