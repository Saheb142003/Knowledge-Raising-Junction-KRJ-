import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Zap, 
  Target, 
  Star,
  ArrowRight,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA FOR FEATURED ---
const FEATURED_DATA = {
  "Most Popular": [
    {
      id: 101,
      title: "Full Stack Web Development",
      teacher: "Hitesh Choudhary",
      rating: 4.9,
      students: "15k+",
      price: 3999,
      tag: "Bestseller",
      color: "blue"
    },
    {
      id: 102,
      title: "JEE Advanced Power Batch",
      teacher: "Physics Wallah Team",
      rating: 4.8,
      students: "12k+",
      price: 4999,
      tag: "Trending",
      color: "orange"
    },
    {
      id: 103,
      title: "NEET UG Biology Masterclass",
      teacher: "Tarun Sir",
      rating: 4.9,
      students: "20k+",
      price: 2499,
      tag: "Hot",
      color: "emerald"
    }
  ],
  "New This Month": [
    {
      id: 201,
      title: "AI & Machine Learning 101",
      teacher: "Andrew Ng Style",
      rating: 4.7,
      students: "2k+",
      price: 5999,
      tag: "New",
      color: "purple"
    },
    {
      id: 202,
      title: "CUET General Test Prep",
      teacher: "Exam Expert",
      rating: 4.6,
      students: "5k+",
      price: 999,
      tag: "New",
      color: "rose"
    }
  ],
  "Exam Focused": [
    {
      id: 301,
      title: "CBSE Class 12 Crash Course",
      teacher: "Board Experts",
      rating: 4.8,
      students: "8k+",
      price: 1499,
      tag: "Exam Ready",
      color: "cyan"
    },
    {
      id: 302,
      title: "SSC CGL Math Special",
      teacher: "Gagan Pratap",
      rating: 4.9,
      students: "25k+",
      price: 1999,
      tag: "Govt Job",
      color: "indigo"
    }
  ]
};

const CATEGORIES = [
  { label: "Most Popular", icon: <Flame size={16} /> },
  { label: "New This Month", icon: <Zap size={16} /> },
  { label: "Exam Focused", icon: <Target size={16} /> }
];

const FeaturedCourses = () => {
  const [activeTab, setActiveTab] = useState("Most Popular");
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 350;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const currentCourses = FEATURED_DATA[activeTab] || FEATURED_DATA["Most Popular"];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header & Tabs --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Featured Collections</h2>
            <p className="text-slate-500 text-sm">Handpicked courses to help you decide faster.</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(cat.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === cat.label
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- Carousel Wrapper --- */}
        <div className="relative group">
          
          {/* Left Arrow */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#FF7F50] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 px-2 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`snap-center shrink-0 w-[300px] md:w-[340px] bg-white rounded-2xl border-2 border-slate-100 p-5 relative overflow-hidden group/card hover:border-${course.color}-400 hover:ring-4 hover:ring-${course.color}-100 transition-all duration-300`}
              >
                
                {/* Highlight Badge */}
                <div className={`absolute top-0 right-0 px-3 py-1 bg-${course.color}-100 text-${course.color}-700 text-[10px] font-bold uppercase rounded-bl-xl`}>
                  {course.tag}
                </div>

                {/* Content */}
                <div className="flex gap-4 mb-4">
                   <div className={`w-14 h-14 rounded-xl bg-${course.color}-50 flex items-center justify-center text-${course.color}-500 text-xl font-bold`}>
                      {course.title.charAt(0)}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                        <Star size={12} fill="currentColor" /> {course.rating}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2 group-hover/card:text-[#FF7F50] transition-colors">
                        {course.title}
                      </h3>
                   </div>
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-6">
                   <span className="flex items-center gap-1">
                     <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600 font-bold">T</div>
                     {course.teacher}
                   </span>
                   <span className="bg-slate-50 px-2 py-1 rounded text-slate-600">
                     {course.students} Students
                   </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                   <span className="text-2xl font-black text-slate-900">
                     ₹{course.price}
                   </span>
                   <button 
                     onClick={() => navigate(`/course/${course.id}`)}
                     className={`w-10 h-10 rounded-full bg-${course.color}-50 text-${course.color}-600 flex items-center justify-center hover:bg-${course.color}-500 hover:text-white transition-all`}
                   >
                     <ArrowRight size={20} />
                   </button>
                </div>

              </motion.div>
            ))}
            
            {/* "View All" Card at the end */}
            <div className="snap-center shrink-0 w-[150px] flex flex-col items-center justify-center bg-slate-100 rounded-2xl border border-dashed border-slate-300 text-slate-400 hover:bg-slate-200 hover:text-slate-600 hover:border-slate-400 cursor-pointer transition-all">
               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm">
                  <ArrowRight size={24} />
               </div>
               <span className="font-bold text-sm">View All</span>
            </div>

          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[#FF7F50] hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCourses;