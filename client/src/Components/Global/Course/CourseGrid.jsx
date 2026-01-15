import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Globe, 
  Video, 
  Users, 
  ArrowRight, 
  PlayCircle,
  MoreHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA ---
const COURSES = [
  {
    id: 1,
    title: "Class 10 Science Mastery",
    subject: "Science",
    teacher: "Dr. Anjali Verma",
    thumbnailColor: "bg-blue-500",
    board: "CBSE",
    classLevel: "Class 10",
    mode: "Live + Recorded",
    language: "Hinglish",
    validity: "Till Exam",
    price: 4999,
    originalPrice: 8000,
    rating: 4.8
  },
  {
    id: 2,
    title: "Lakshya JEE Mains 2026",
    subject: "Physics + Maths",
    teacher: "Er. Rahul Singh",
    thumbnailColor: "bg-orange-500",
    board: "Foundation",
    classLevel: "Class 11",
    mode: "Live Batches",
    language: "English",
    validity: "2 Years",
    price: 12999,
    originalPrice: 25000,
    rating: 4.9
  },
  {
    id: 3,
    title: "NEET Zoology Special",
    subject: "Biology",
    teacher: "Prof. S.K. Gupta",
    thumbnailColor: "bg-emerald-500",
    board: "NEET",
    classLevel: "Droppers",
    mode: "Recorded",
    language: "Hindi",
    validity: "1 Year",
    price: 2499,
    originalPrice: 5000,
    rating: 4.7
  },
  {
    id: 4,
    title: "Class 12 Accounts Pro",
    subject: "Commerce",
    teacher: "CA Priya Das",
    thumbnailColor: "bg-indigo-500",
    board: "State Board",
    classLevel: "Class 12",
    mode: "Live Batches",
    language: "Hinglish",
    validity: "6 Months",
    price: 3999,
    originalPrice: 7000,
    rating: 4.6
  },
  {
    id: 5,
    title: "Social Studies Crash Course",
    subject: "SST",
    teacher: "Amit Kumar",
    thumbnailColor: "bg-rose-500",
    board: "CBSE",
    classLevel: "Class 10",
    mode: "Live",
    language: "Hindi",
    validity: "3 Months",
    price: 999,
    originalPrice: 2500,
    rating: 4.5
  },
  {
    id: 6,
    title: "Python for Beginners",
    subject: "Computer Science",
    teacher: "Tech Faculty",
    thumbnailColor: "bg-cyan-500",
    board: "Skill",
    classLevel: "All",
    mode: "Recorded",
    language: "English",
    validity: "Lifetime",
    price: 499,
    originalPrice: 2000,
    rating: 4.8
  }
];

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300"
    >
      
      {/* --- TOP: Thumbnail & Badges --- */}
      <div className={`h-48 relative ${course.thumbnailColor} bg-gradient-to-br from-white/10 to-transparent`}>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-wide">
            {course.board}
          </span>
          <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-bold text-white shadow-sm uppercase tracking-wide">
            {course.classLevel}
          </span>
        </div>

        {/* Wishlist / More Options */}
        <button className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors">
           <MoreHorizontal size={16} />
        </button>

        {/* Teacher Avatar (Floating) */}
        <div className="absolute -bottom-6 right-6">
          <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg shadow-slate-900/10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center text-lg font-bold text-slate-400">
              {course.teacher.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* --- MIDDLE: Main Info --- */}
      <div className="pt-8 px-5 pb-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-[#FF7F50] uppercase tracking-wider">
            {course.subject}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <span>★</span> {course.rating}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          by {course.teacher}
        </p>
      </div>

      {/* --- META ROW: Tech Details --- */}
      <div className="px-5 py-3 bg-slate-50 border-y border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
        <div className="flex items-center gap-1.5" title="Mode">
          <Video size={14} className="text-slate-400" />
          <span>{course.mode}</span>
        </div>
        <div className="flex items-center gap-1.5" title="Language">
          <Globe size={14} className="text-slate-400" />
          <span>{course.language}</span>
        </div>
        <div className="flex items-center gap-1.5" title="Validity">
          <Clock size={14} className="text-slate-400" />
          <span>{course.validity}</span>
        </div>
      </div>

      {/* --- BOTTOM: Pricing & Action --- */}
      <div className="p-5 flex items-center justify-between gap-4">
        
        <div>
           <div className="flex items-baseline gap-2">
             <span className="text-xl font-black text-slate-900">₹{course.price.toLocaleString()}</span>
             <span className="text-xs font-bold text-slate-400 line-through">₹{course.originalPrice}</span>
           </div>
           <button className="text-xs font-bold text-slate-500 hover:text-[#FF7F50] flex items-center gap-1 mt-1 transition-colors">
              <PlayCircle size={12} /> Watch Demo
           </button>
        </div>

        <button 
          onClick={() => navigate(`/course/${course.id}`)}
          className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:bg-[#FF7F50] hover:shadow-orange-500/30 active:scale-95 transition-all flex items-center gap-2"
        >
          View Details <ArrowRight size={16} />
        </button>

      </div>

    </motion.div>
  );
};

const CourseGrid = () => {
  return (
    <div className="w-full">
      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {COURSES.map((course) => (
           <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Load More Trigger (Optional) */}
      <div className="mt-16 text-center">
        <button className="px-8 py-3 border border-slate-200 text-slate-500 font-bold rounded-full hover:border-slate-900 hover:text-slate-900 transition-all">
          Load More Courses
        </button>
      </div>
    </div>
  );
};

export default CourseGrid;