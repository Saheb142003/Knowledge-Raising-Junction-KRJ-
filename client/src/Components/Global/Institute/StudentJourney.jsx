import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Calendar, 
  CreditCard, 
  PlayCircle, 
  BarChart2, 
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Trophy,
  Clock
} from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Search Course",
    desc: "Explore streams, boards, and subjects.",
    icon: <Search size={20} />,
    color: "blue"
  },
  {
    id: 2,
    title: "View Batches",
    desc: "Filter by days (MWF/TTS) & timing.",
    icon: <Calendar size={20} />,
    color: "orange"
  },
  {
    id: 3,
    title: "Join & Enroll",
    desc: "Secure payment & instant access.",
    icon: <CreditCard size={20} />,
    color: "emerald"
  },
  {
    id: 4,
    title: "Attend Class",
    desc: "Live lectures, chats & recordings.",
    icon: <PlayCircle size={20} />,
    color: "purple"
  },
  {
    id: 5,
    title: "Tests & Results",
    desc: "AI analytics & performance tracking.",
    icon: <BarChart2 size={20} />,
    color: "pink"
  }
];

const StudentJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through steps
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            One Platform. <span className="text-[#FF7F50]">Complete Journey.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From your first search to your final exam result, KRJ connects every step of your education seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- LEFT: TIMELINE NAV --- */}
          <div 
            className="space-y-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer group relative flex items-center gap-6 p-6 rounded-2xl transition-all duration-300 ${
                    isActive ? "bg-slate-50 border border-slate-200 shadow-sm" : "hover:bg-slate-50/50"
                  }`}
                >
                  {/* Progress Line */}
                  {index !== STEPS.length - 1 && (
                    <div className="absolute left-[43px] top-[70px] w-0.5 h-8 bg-slate-100" />
                  )}

                  {/* Icon Bubble */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-110" 
                      : "bg-white border border-slate-100 text-slate-400 group-hover:border-slate-300"
                  }`}>
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold transition-colors ${
                      isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm transition-colors ${
                      isActive ? "text-slate-600" : "text-slate-300"
                    }`}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Active Indicator Arrow */}
                  {isActive && (
                    <motion.div layoutId="activeArrow" className="text-[#FF7F50]">
                      <ChevronRight />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* --- RIGHT: DYNAMIC VISUAL (MOCKUP) --- */}
          <div className="relative h-[500px] bg-slate-100 rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center">
             {/* Background Blob */}
             <div className={`absolute inset-0 opacity-20 transition-colors duration-700 bg-${STEPS[activeStep].color}-100`} />
             <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-to-b from-white to-transparent opacity-50" />

             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStep}
                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -20, scale: 0.95 }}
                 transition={{ duration: 0.4 }}
                 className="relative w-[85%] bg-white rounded-3xl shadow-xl p-6 border border-slate-100"
               >
                 {/* This Switch renders different Abstract UIs based on step */}
                 <VisualContent step={activeStep} />
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- HELPER: Abstract UI Renders for Right Side ---
const VisualContent = ({ step }) => {
  switch (step) {
    case 0: // Search
      return (
        <div className="space-y-4">
          <div className="h-12 bg-slate-100 rounded-xl flex items-center px-4 text-slate-400 gap-3 border border-slate-200">
            <Search size={18} />
            <div className="h-2 w-32 bg-slate-200 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">Class 12</span>
            <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">JEE</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-50 rounded-xl border border-slate-100" />)}
          </div>
        </div>
      );
    case 1: // Batches
      return (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-slate-800">Select Batch</h4>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">Filter</span>
          </div>
          {[1, 2].map(i => (
            <div key={i} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center hover:border-orange-200 bg-white">
              <div>
                <div className="h-3 w-24 bg-slate-800 rounded-full mb-2" />
                <div className="flex gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={10}/> Evening</span>
                  <span>•</span>
                  <span>MWF</span>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
            </div>
          ))}
        </div>
      );
    case 2: // Join
      return (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={40} />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Success!</h4>
          <p className="text-slate-500 text-sm mb-6">You have successfully enrolled in the JEE Alpha Batch.</p>
          <div className="p-3 bg-slate-50 rounded-xl text-left border border-slate-200">
            <div className="h-2 w-1/2 bg-slate-200 rounded-full mb-2" />
            <div className="h-2 w-1/3 bg-slate-200 rounded-full" />
          </div>
        </div>
      );
    case 3: // Attend
      return (
        <div>
          <div className="aspect-video bg-slate-900 rounded-xl mb-4 relative flex items-center justify-center overflow-hidden">
             <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</div>
             <PlayCircle className="text-white/50 w-12 h-12" />
             {/* Chat overlay mock */}
             <div className="absolute bottom-2 left-2 right-2 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center px-3 gap-2">
                <div className="w-4 h-4 rounded-full bg-white/50" />
                <div className="h-1.5 w-20 bg-white/50 rounded-full" />
             </div>
          </div>
          <div className="flex gap-3 overflow-hidden">
             <div className="h-8 w-20 bg-slate-100 rounded-lg flex items-center justify-center gap-1 text-xs text-slate-500 font-bold"><MessageSquare size={12}/> Chat</div>
             <div className="h-8 w-20 bg-slate-100 rounded-lg" />
             <div className="h-8 w-20 bg-slate-100 rounded-lg" />
          </div>
        </div>
      );
    case 4: // Results
      return (
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800">Test Analysis</h4>
              <Trophy size={16} className="text-yellow-500" />
           </div>
           <div className="flex gap-4 items-end h-32 px-4 border-b border-slate-100 pb-2">
              <div className="flex-1 bg-slate-100 rounded-t-lg h-[40%]" />
              <div className="flex-1 bg-slate-200 rounded-t-lg h-[60%]" />
              <div className="flex-1 bg-[#FF7F50] rounded-t-lg h-[85%] relative group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded font-bold">92%</div>
              </div>
              <div className="flex-1 bg-slate-100 rounded-t-lg h-[50%]" />
           </div>
           <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Physics</span>
              <span>Chem</span>
              <span className="text-[#FF7F50]">Maths</span>
              <span>Eng</span>
           </div>
        </div>
      );
    default:
      return null;
  }
};

export default StudentJourney;