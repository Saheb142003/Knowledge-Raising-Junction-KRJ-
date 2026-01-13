import React from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Users, 
  BarChart2, 
  Layers, 
  CheckCircle2 
} from "lucide-react";

const PILLARS = [
  {
    id: 1,
    title: "Learning Marketplace",
    description: "A centralized hub to discover courses across boards (CBSE, ICSE) and competitive exams (JEE, NEET). Curated, categorized, and accessible.",
    icon: <ShoppingBag size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Batch-based Education",
    description: "We move beyond random video playlists. KRJ enforces discipline through structured cohorts, fixed schedules, and live interaction.",
    icon: <Users size={24} />,
    color: "orange"
  },
  {
    id: 3,
    title: "Assessment & Progress",
    description: "A feedback loop built on data. Integrated mock tests, assignments, and granular analytics to track student growth real-time.",
    icon: <BarChart2 size={24} />,
    color: "emerald"
  }
];

const PlatformExplanation = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: ABSTRACT VISUAL (The Platform Stack) --- */}
          <div className="relative h-[500px] w-full bg-slate-50 rounded-[3rem] border border-slate-100 p-8 flex items-center justify-center overflow-hidden">
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Central "Core" */}
            <div className="relative z-10 w-full max-w-xs">
              
              {/* Stack Layer 3 (Top) */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 mb-4 flex items-center gap-4 relative z-30 transform translate-x-4"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                   <BarChart2 size={20} />
                </div>
                <div>
                   <div className="h-2 w-24 bg-slate-800 rounded mb-1" />
                   <div className="h-1.5 w-12 bg-slate-200 rounded" />
                </div>
              </motion.div>

              {/* Stack Layer 2 (Middle) */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 mb-4 flex items-center gap-4 relative z-20 transform -translate-x-4"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                   <Users size={20} />
                </div>
                <div>
                   <div className="h-2 w-32 bg-slate-800 rounded mb-1" />
                   <div className="h-1.5 w-20 bg-slate-200 rounded" />
                </div>
              </motion.div>

              {/* Stack Layer 1 (Bottom) */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 relative z-10 transform translate-x-2"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                   <ShoppingBag size={20} />
                </div>
                <div>
                   <div className="h-2 w-28 bg-slate-800 rounded mb-1" />
                   <div className="h-1.5 w-16 bg-slate-200 rounded" />
                </div>
              </motion.div>

              {/* Connecting Lines (Abstract) */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 text-slate-200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 4" className="animate-spin-slow" />
              </svg>
            </div>

          </div>

          {/* --- RIGHT: CONTENT BLOCKS --- */}
          <div>
            
            {/* Headline */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Layers size={14} />
                <span>The Architecture</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Unified. Structured. <br />
                <span className="text-[#FF7F50]">Scalable.</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                KRJ combines course discovery, live batches, assessments, and progress tracking into a single, scalable platform — designed for <strong className="text-slate-800">clarity</strong> and <strong className="text-slate-800">discipline</strong> in learning.
              </p>
            </div>

            {/* The 3 Pillars */}
            <div className="space-y-8">
              {PILLARS.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 bg-${item.color}-50 text-${item.color}-600 group-hover:bg-${item.color}-100`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformExplanation;