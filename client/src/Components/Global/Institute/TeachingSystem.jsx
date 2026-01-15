import React from "react";
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Presentation, 
  PenTool, 
  ClipboardCheck, 
  LineChart 
} from "lucide-react";

const TEACHING_STEPS = [
  {
    id: 1,
    title: "Concept Teaching",
    description: "We don't just memorize formulas. We start with the 'Why'—building a strong theoretical foundation so you understand the logic.",
    icon: <BrainCircuit size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Classroom Explanation",
    description: "Interactive lectures where complex topics are broken down into real-world examples. No boring monologues.",
    icon: <Presentation size={24} />,
    color: "indigo"
  },
  {
    id: 3,
    title: "Practice Assignments",
    description: "Theory is useless without application. You get curated Daily Practice Problems (DPPs) to solidify what you learned.",
    icon: <PenTool size={24} />,
    color: "orange"
  },
  {
    id: 4,
    title: "Testing & Evaluation",
    description: "Weekly and monthly tests benchmark your performance against the batch, simulating the pressure of real exams.",
    icon: <ClipboardCheck size={24} />,
    color: "rose"
  },
  {
    id: 5,
    title: "Performance Feedback",
    description: "We analyze your test data to find weak spots. Then, we fix them together in remedial sessions.",
    icon: <LineChart size={24} />,
    color: "emerald"
  }
];

const TeachingSystem = () => {
  return (
    <section className="py-24 bg-slate-50 font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-20">
          <span className="text-[#FF7F50] font-bold text-xs uppercase tracking-widest mb-3 block">
            The KRJ Academic System
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Teaching follows a system. <br />
            <span className="text-slate-400 decoration-4 decoration-red-400/30 underline underline-offset-4">
              Not shortcuts.
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Success isn't an accident. It's the result of a repeatable, 5-step process we follow for every single chapter.
          </p>
        </div>

        {/* --- The Vertical Timeline --- */}
        <div className="relative">
          
          {/* Central Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

          <div className="space-y-12">
            {TEACHING_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  
                  {/* Content Box */}
                  <div className={`ml-20 md:ml-0 md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node (Icon) */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full bg-white border-4 border-slate-50 shadow-sm flex items-center justify-center text-${step.color}-500 relative z-10`}>
                      {step.icon}
                    </div>
                    {/* Active Dot Outline */}
                    <div className={`absolute inset-0 rounded-full border border-${step.color}-500 opacity-20 scale-150`} />
                  </div>

                  {/* Empty Spacer for Balance (Desktop Only) */}
                  <div className="hidden md:block md:w-[45%]" />

                </motion.div>
              );
            })}
          </div>

          {/* End Node */}
          <div className="absolute bottom-0 left-8 md:left-1/2 -translate-x-1/2 translate-y-full pt-8">
            <div className="px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
              Result
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeachingSystem;