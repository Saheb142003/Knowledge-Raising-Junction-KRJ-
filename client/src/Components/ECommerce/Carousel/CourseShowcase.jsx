import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Award, 
  Target, 
  Microscope, 
  ArrowRight,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- DATA: SLIDE CONTENT ---
const slides = [
  {
    id: 1,
    category: "Foundation Years",
    title: "Class 10th Mastery",
    description: "Build a rock-solid foundation for your future. Comprehensive coverage for Science, Maths, and Social Studies.",
    icon: <BookOpen size={100} />,
    // Gradient for text/blobs
    color: "from-orange-500 to-red-600",
    // Light background for right panel
    bgAccent: "bg-orange-50/80", 
    actions: [
      { label: "CBSE Board", link: "/courses/10/cbse" },
      { label: "ICSE Board", link: "/courses/10/icse" },
      { label: "State Boards", link: "/courses/10/state" },
      { label: "Olympiads", link: "/courses/10/olympiad" },
    ]
  },
  {
    id: 2,
    category: "Board Excellence",
    title: "Class 12th Boards",
    description: "Expert guidance for the crucial turning point. Specialized batches ensuring 95%+ targets in Board Exams.",
    icon: <Award size={100} />,
    color: "from-blue-500 to-indigo-600",
    bgAccent: "bg-blue-50/80",
    actions: [
      { label: "Science Stream", link: "/courses/12/science" },
      { label: "Commerce", link: "/courses/12/commerce" },
      { label: "Arts/Humanities", link: "/courses/12/arts" },
      { label: "Crash Course", link: "/courses/12/crash" },
    ]
  },
  {
    id: 3,
    category: "Competitive Exams",
    title: "Entrance Prep (UG)",
    description: "Crack the toughest entrance exams. Structured modules, mock tests, and previous year analysis.",
    icon: <Target size={100} />,
    color: "from-emerald-500 to-teal-600",
    bgAccent: "bg-emerald-50/80",
    actions: [
      { label: "JEE Mains/Adv", link: "/courses/jee" },
      { label: "NEET Medical", link: "/courses/neet" },
      { label: "CUET (All)", link: "/courses/cuet" },
      { label: "IPU-CET", link: "/courses/ipu" },
    ]
  },
  {
    id: 4,
    category: "Graduation",
    title: "B.Sc & B.Com Coaching",
    description: "Don't struggle with college semesters. Get semester-wise coaching for major universities.",
    icon: <GraduationCap size={100} />,
    color: "from-purple-500 to-violet-600",
    bgAccent: "bg-purple-50/80",
    actions: [
      { label: "B.Sc (Hons)", link: "/courses/bsc" },
      { label: "B.Com (Prog/Hons)", link: "/courses/bcom" },
      { label: "B.A. English", link: "/courses/ba" },
      { label: "Entrance PG", link: "/courses/pg-entrance" },
    ]
  },
  {
    id: 5,
    category: "Test Series",
    title: "Mock Papers & Guides",
    description: "Practice makes perfect. Access our library of 500+ mock tests and curated revision guides.",
    icon: <Microscope size={100} />,
    color: "from-pink-500 to-rose-600",
    bgAccent: "bg-pink-50/80",
    actions: [
      { label: "Class 10 Mocks", link: "/tests/10" },
      { label: "Class 12 Mocks", link: "/tests/12" },
      { label: "JEE/NEET Series", link: "/tests/competitive" },
      { label: "Previous Years", link: "/tests/pyq" },
    ]
  }
];

const CourseShowcase = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000); // Slightly longer for readability
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Smoother Animation Variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // Custom easing for "pop"
    },
    exit: (direction) => ({
      x: direction > 0 ? "-20%" : "20%", // Parallax exit
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeInOut" }
    })
  };

  return (
    <section className="w-full px-4 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-8 flex items-end justify-between px-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-[#FF7F50]"></span>
              <span className="text-[#FF7F50] font-bold tracking-widest uppercase text-xs">
                Academic Roadmap
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-orange-400">Programs</span>
            </h2>
          </div>
          
          {/* Controls */}
          <div className="hidden md:flex gap-3">
            <button onClick={prevSlide} className="group p-4 rounded-full border border-slate-200 hover:border-[#FF7F50] hover:bg-white text-slate-400 hover:text-[#FF7F50] transition-all shadow-sm hover:shadow-md">
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={nextSlide} className="group p-4 rounded-full bg-slate-900 text-white hover:bg-[#FF7F50] transition-all shadow-lg hover:shadow-[#FF7F50]/30">
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- HERO SLIDER CARD --- */}
        <div className="relative w-full min-h-[850px] lg:min-h-[700px] bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 h-full"
            >
              
              {/* === LEFT: CONTENT === */}
              <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center relative z-20 bg-white">
                
                {/* Category Pill */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full bg-gradient-to-r ${slides[current].color} bg-opacity-10 text-white text-xs font-bold uppercase tracking-wider mb-8 shadow-md`}
                >
                  <Sparkles size={14} className="text-white" />
                  {slides[current].category}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight"
                >
                  {slides[current].title}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg font-medium"
                >
                  {slides[current].description}
                </motion.p>

                {/* Actions Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="block text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">
                    Select Your Stream:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {slides[current].actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(action.link)}
                        className="group relative flex items-center justify-between px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-transparent hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
                      >
                         {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-r ${slides[current].color} transition-opacity duration-300`} />
                        
                        <span className="font-bold text-slate-700 group-hover:text-slate-900 relative z-10">
                          {action.label}
                        </span>
                        
                        <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform relative z-10`}>
                           <ArrowRight size={16} className={`text-slate-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${slides[current].color}`} />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* === RIGHT: VISUAL ATTRACTION === */}
              <div className={`relative flex items-center justify-center overflow-hidden ${slides[current].bgAccent} transition-colors duration-500`}>
                
                {/* 1. Animated Gradient Orb */}
                <motion.div 
                   animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className={`absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br ${slides[current].color} blur-[120px] opacity-40`}
                />

                {/* 2. Secondary Orb */}
                <motion.div 
                   animate={{ scale: [1.2, 1, 1.2], x: [0, 50, 0] }}
                   transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                   className={`absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-tl ${slides[current].color} blur-[100px] opacity-30`}
                />
                
                {/* 3. Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.3] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

                {/* 4. Glass Card Container for Icon */}
                <motion.div
                  initial={{ scale: 0.8, y: 50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
                  className="relative z-10"
                >
                  {/* Glass Card */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-2xl shadow-slate-900/5 flex items-center justify-center group">
                    
                    {/* Inner Glow */}
                    <div className={`absolute inset-0 rounded-[3rem] bg-gradient-to-br ${slides[current].color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* The Icon */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className={`text-transparent bg-clip-text bg-gradient-to-br ${slides[current].color} drop-shadow-2xl`}
                    >
                      {React.cloneElement(slides[current].icon, { 
                        className: `stroke-[1.5px] drop-shadow-sm`, 
                        color: "url(#gradient)" // This is conceptual, styling handled via wrapper
                      })}
                      {/* Applying text gradient color to SVG strictly via wrapper text color */}
                      <div className={`text-slate-800`}>
                         {/* Fallback color if gradient text clip doesn't work perfectly on SVGs in all browsers, usually needs a mask or specific SVG props. 
                             For simplicity/robustness, we use the slate-800 but wrap it in a div that gives it a 'glow' or specific color via props if desired. 
                             Here we stick to a clean dark slate for high contrast inside the glass. */}
                         {React.cloneElement(slides[current].icon, { className: "text-slate-800 w-32 h-32 md:w-40 md:h-40" })}
                      </div>
                    </motion.div>

                  </div>

                  {/* Decor elements around the card */}
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                    className="absolute -top-6 -right-6 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                  >
                    <span className="text-2xl">✨</span>
                  </motion.div>
                  <motion.div 
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}
                     className="absolute -bottom-4 -left-8 w-auto px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-600">Active Batch</span>
                  </motion.div>

                </motion.div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Progress Bar (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100 flex">
            {slides.map((slide, idx) => (
               <div key={idx} className="flex-1 h-full bg-slate-100 relative overflow-hidden">
                 {current === idx && (
                   <motion.div 
                     layoutId="progress"
                     className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}
                     initial={{ x: "-100%" }}
                     animate={{ x: "0%" }}
                     transition={{ duration: 8, ease: "linear" }}
                   />
                 )}
                 {/* Static bar for visited slides */}
                 {idx < current && <div className={`absolute inset-0 bg-slate-300`} />}
               </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CourseShowcase;