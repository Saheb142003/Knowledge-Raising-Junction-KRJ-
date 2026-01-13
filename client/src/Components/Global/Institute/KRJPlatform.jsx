import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  MapPin, 
  Zap, 
  Award, 
  Linkedin, 
  Twitter 
} from "lucide-react";

// --- Custom CountUp Component ---
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  // Render the value
  const displayValue = React.useMemo(() => {
    // We need a ref to update text directly for performance, 
    // but for simplicity in this snippet we use a state-like approach or simple text ref
    // To keep it clean in React, we can just return a motion span
    return springValue;
  }, [springValue]);

  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setCurrent(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref} className="tabular-nums">{current}{suffix}</span>;
};

// --- Data ---
const METRICS = [
  { id: 1, label: "Courses Available", value: 150, suffix: "+", icon: <BookOpen size={20} /> },
  { id: 2, label: "Students Enrolled", value: 12000, suffix: "+", icon: <Users size={20} /> },
  { id: 3, label: "Active Teachers", value: 85, suffix: "+", icon: <Award size={20} /> },
  { id: 4, label: "Cities Presence", value: 12, suffix: "", icon: <MapPin size={20} /> },
  { id: 5, label: "Live Batches", value: 40, suffix: "+", icon: <Zap size={20} /> },
];

const FOUNDERS = [
  {
    id: 1,
    name: "Anubhaw Kumar Gupta",
    role: "Co-Founder & Tech Lead",
    philosophy: "We don't just teach subjects; we architect learning paths.",
    image: "bg-slate-200" // Placeholder class for image
  },
  {
    id: 2,
    name: "Rohan Jaiswal",
    role: "Co-Founder & Academic Head",
    philosophy: "Education needs structure, not just content.",
    image: "bg-slate-300"
  }
];

const KRJPlatform = () => {
  return (
    <section className="font-sans">
      
      {/* =========================================
          ROW 1: PLATFORM NUMBERS (HARD TRUST)
      ========================================= */}
      <div className="bg-slate-900 py-20 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="absolute -top-[100px] left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 text-center md:text-left">
            <div>
              <span className="text-[#FF7F50] font-bold tracking-widest uppercase text-xs">
                Built at Scale
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                The KRJ Ecosystem
              </h2>
            </div>
            <p className="text-slate-400 max-w-md">
              Learning at scale across cities, classrooms, and careers. We deliver consistency where it counts.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-t border-slate-800 pt-12">
            {METRICS.map((metric, idx) => (
              <div key={metric.id} className="flex flex-col items-center md:items-start group">
                <div className="mb-4 p-3 rounded-xl bg-slate-800/50 text-slate-400 group-hover:text-[#FF7F50] group-hover:bg-[#FF7F50]/10 transition-all duration-300">
                  {metric.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* =========================================
          ROW 2: FOUNDERS & VISION (HUMAN TRUST)
      ========================================= */}
      <div className="bg-white py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Vision Statement */}
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                We built KRJ to bring <span className="text-slate-400 decoration-slate-200 underline decoration-2 underline-offset-4">structure</span>, <span className="text-slate-400 decoration-slate-200 underline decoration-2 underline-offset-4">accountability</span>, and scale to education.
              </h3>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Education today is often chaotic. Too much content, too little direction. 
                  We started with a simple premise: <strong>What if learning was managed like a high-performance project?</strong>
                </p>
                <p>
                  No jargon. No administrative barriers. Just a clean, direct path from enrollment to achievement.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Trusted by parents across 12+ cities
                </p>
              </div>
            </div>

            {/* Right: Founder Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FOUNDERS.map((founder, idx) => (
                <motion.div
                  key={founder.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    {/* Placeholder Avatar */}
                    <div className={`w-16 h-16 rounded-full ${founder.image} border-4 border-white shadow-md flex items-center justify-center text-slate-400 text-xl font-bold`}>
                      {founder.name.charAt(0)}
                    </div>
                    {/* Social Icon (Subtle) */}
                    <a href="#" className="text-slate-300 hover:text-blue-600 transition-colors">
                      <Linkedin size={20} />
                    </a>
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-900">
                    {founder.name}
                  </h4>
                  <p className="text-xs font-bold text-[#FF7F50] uppercase tracking-wide mb-4">
                    {founder.role}
                  </p>
                  
                  <blockquote className="text-slate-500 italic text-sm leading-relaxed border-l-2 border-slate-200 pl-3">
                    "{founder.philosophy}"
                  </blockquote>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default KRJPlatform;