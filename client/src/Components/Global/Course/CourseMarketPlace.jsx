import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, 
  Search, 
  PlayCircle, 
  Clock, 
  CheckCircle2, 
  Star,
  BookOpen,
  MonitorPlay,
  ArrowRight,
  Sparkles,
  MoreHorizontal
} from "lucide-react";

// --- Mock Data ---
const BOARDS = ["All", "CBSE", "State Board", "Foundation", "Graduation"];

const CLASS_FILTERS = {
  "All": ["Class 10", "Class 12", "JEE/NEET", "B.Com", "FYJC"],
  "CBSE": ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"],
  "State Board": ["Class 10", "Class 12", "FYJC", "SYJC"],
  "Foundation": ["JEE Starter", "NEET Starter", "Olympiad"],
  "Graduation": ["B.Com", "B.Sc", "BBA", "FY", "SY", "TY"]
};

const COURSES = [
  {
    id: 1,
    title: "Complete Science Mastery",
    board: "CBSE",
    classLevel: "Class 10",
    teacher: "Dr. Anjali Verma",
    rating: 4.8,
    reviews: 420,
    students: "1.2k+",
    type: "Live + Recorded",
    validity: "1 Year",
    price: 4999,
    originalPrice: 8000,
    colorTheme: "blue", // used for gradients
    features: ["Daily Live Classes", "PDF Notes", "Weekly Tests"]
  },
  {
    id: 2,
    title: "Mathematics Excellence",
    board: "State Board",
    classLevel: "Class 12",
    teacher: "Prof. R.K. Sharma",
    rating: 4.9,
    reviews: 850,
    students: "850+",
    type: "Live Batches",
    validity: "Exam Date",
    price: 3499,
    originalPrice: 6000,
    colorTheme: "orange",
    features: ["Doubt Solving", "PYQ Analysis", "Formula Sheets"]
  },
  {
    id: 3,
    title: "JEE Mains - Physics Core",
    board: "Foundation",
    classLevel: "JEE/NEET",
    teacher: "Er. Rahul Singh",
    rating: 4.7,
    reviews: 1200,
    students: "2.1k+",
    type: "Recorded",
    validity: "2 Years",
    price: 1999,
    originalPrice: 5000,
    colorTheme: "purple",
    features: ["HD Lectures", "Mock Tests", "24/7 Access"]
  },
  {
    id: 4,
    title: "Accounts & Finance Pro",
    board: "Graduation",
    classLevel: "B.Com",
    teacher: "CA Priya Das",
    rating: 4.6,
    reviews: 150,
    students: "400+",
    type: "Live Batches",
    validity: "6 Months",
    price: 5999,
    originalPrice: 10000,
    colorTheme: "emerald",
    features: ["Case Studies", "Excel Training", "Certificates"]
  }
];

// Helper for dynamic colors
const getColorClasses = (theme) => {
  const themes = {
    blue: "from-blue-500 to-cyan-400 bg-blue-50 text-blue-600 border-blue-100",
    orange: "from-orange-500 to-amber-400 bg-orange-50 text-orange-600 border-orange-100",
    purple: "from-violet-500 to-fuchsia-400 bg-violet-50 text-violet-600 border-violet-100",
    emerald: "from-emerald-500 to-teal-400 bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  return themes[theme] || themes.blue;
};

const CourseMarketplace = () => {
  const [activeBoard, setActiveBoard] = useState("All");
  const [activeClass, setActiveClass] = useState("All");

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const boardMatch = activeBoard === "All" || course.board === activeBoard;
      const classMatch = activeClass === "All" || activeClass === "Filter by Class" || course.classLevel === activeClass || (activeBoard === "All");
      return boardMatch && classMatch;
    });
  }, [activeBoard, activeClass]);

  const handleBoardChange = (board) => {
    setActiveBoard(board);
    setActiveClass("All");
  };

  return (
    <section className="min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute -top-20 right-[-100px] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-50 mix-blend-multiply" />
      <div className="absolute top-40 left-[-100px] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[100px] opacity-50 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-4">
               <Sparkles size={14} className="text-[#FF7F50]" />
               <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Premium Learning</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-orange-400">Perfect Course.</span>
            </h2>
            <p className="text-slate-500 mt-4 text-lg max-w-lg">
              Expert-led courses for Boards, Competitive Exams, and Graduation. Start your journey today.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-blue-200 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 flex items-center p-2 border border-slate-100">
              <Search className="ml-3 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search subjects, teachers..." 
                className="w-full pl-3 pr-4 py-2 bg-transparent text-slate-700 placeholder-slate-400 outline-none font-medium"
              />
              <button className="bg-slate-900 hover:bg-[#FF7F50] text-white p-2.5 rounded-xl transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* --- Filters Area --- */}
        <div className="space-y-6">
          
          {/* Level 1: Board Selection (Tabs) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl w-fit shadow-sm">
            {BOARDS.map((board) => (
              <button
                key={board}
                onClick={() => handleBoardChange(board)}
                className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all z-10 ${
                  activeBoard === board ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {activeBoard === board && (
                  <motion.div 
                    layoutId="boardTab"
                    className="absolute inset-0 bg-[coral] rounded-xl cursor-pointer shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)] border border-slate-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative cursor-pointer z-10 ${activeBoard===board?"text-white":"text-gray-500"} `}>{board}</span>
              </button>
            ))}
          </div>

          {/* Level 2: Class Selection (Horizontal Scroll) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide mask-linear-fade">
             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400 shrink-0">
                <Filter size={14} />
             </div>
            {(CLASS_FILTERS[activeBoard] || []).map((cls) => (
              <button
                key={cls}
                onClick={() => setActiveClass(activeClass === cls ? "All" : cls)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all shrink-0 ${
                  activeClass === cls
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* --- Course Grid --- */}
        <motion.div 
          layout
          className="flex items-center justify-between flex-wrap gap-5"
        >
          <AnimatePresence>
            {filteredCourses.map((course) => {
              const theme = getColorClasses(course.colorTheme);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={course.id}
                  className="group w-sm relative bg-white rounded-[1rem] border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 flex flex-col overflow-hidden"
                >
                  
                  {/* Thumbnail / Header Area */}
                  <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${theme.split(' ')[0]}`}>
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-800 shadow-sm border border-white/50">
                        {course.board} • {course.classLevel}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                       <button className="p-2 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-full text-white transition-colors">
                          <MoreHorizontal size={16} />
                       </button>
                    </div>

                    {/* Teacher Image / Avatar Placeholder */}
                    <div className="absolute bottom-[-24px] right-6 w-16 h-16 rounded-2xl bg-white p-1 shadow-lg shadow-slate-200 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold text-slate-400">
                           {course.teacher.charAt(0)}
                        </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-8 px-6 pb-6 flex-1 flex flex-col">
                    
                    {/* Meta Tags */}
                    <div className="flex items-center gap-3 mb-3 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                        {course.type === "Recorded" ? <MonitorPlay size={12}/> : <Clock size={12}/>}
                        {course.type}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                         <Star size={12} fill="currentColor" />
                         <span>{course.rating}</span>
                         <span className="text-slate-400 font-normal">({course.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight group-hover:text-[#FF7F50] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mb-5">{course.teacher}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {course.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={14} className={`shrink-0 ${theme.split(' ')[2]}`} />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer / Pricing */}
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-slate-900">₹{course.price.toLocaleString()}</span>
                          <span className="text-xs text-slate-400 font-bold line-through">₹{course.originalPrice/1000}k</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                           {course.validity} Access
                        </span>
                      </div>
                      
                      <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/30 group-hover:bg-[#FF7F50] group-hover:scale-110 group-hover:shadow-orange-500/40 transition-all duration-300">
                         <ArrowRight size={20} />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
              <BookOpen size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              We couldn't find any courses matching your filters. Try selecting a different board.
            </p>
            <button 
              onClick={() => {setActiveBoard("All"); setActiveClass("All")}}
              className="mt-6 text-[#FF7F50] font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default CourseMarketplace;