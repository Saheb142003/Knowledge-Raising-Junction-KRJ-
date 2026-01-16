import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Globe, 
  Video, 
  Star,
  ArrowRight, 
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA (Updated with Teacher Images) ---
const COURSES = [
  {
    id: 1,
    title: "Class 10 Science Mastery Batch",
    subject: "Science",
    teacher: "Dr. Anjali Verma",
    teacherRole: "Senior Physics Faculty",
    teacherImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    thumbnailColor: "bg-blue-600",
    board: "CBSE",
    classLevel: "Class 10",
    mode: "Live + Recorded",
    language: "Hinglish",
    validity: "Till Exam",
    price: 4999,
    originalPrice: 8000,
    rating: 4.8,
    reviews: 1240
  },
  {
    id: 2,
    title: "Lakshya JEE Mains 2026 (Complete)",
    subject: "PCM Combo",
    teacher: "Er. Rahul Singh",
    teacherRole: "Ex-IIT Kanpur",
    teacherImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    thumbnailColor: "bg-orange-500",
    board: "JEE Mains",
    classLevel: "Class 11",
    mode: "Live Batches",
    language: "English",
    validity: "2 Years",
    price: 12999,
    originalPrice: 25000,
    rating: 4.9,
    reviews: 850
  },
  {
    id: 3,
    title: "NEET Zoology Special Module",
    subject: "Biology",
    teacher: "Prof. S.K. Gupta",
    teacherRole: "HOD Zoology",
    teacherImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    thumbnailColor: "bg-emerald-600",
    board: "NEET UG",
    classLevel: "Droppers",
    mode: "Recorded",
    language: "Hindi",
    validity: "1 Year",
    price: 2499,
    originalPrice: 5000,
    rating: 4.7,
    reviews: 2100
  },
  {
    id: 4,
    title: "Class 12 Accounts Pro Batch",
    subject: "Commerce",
    teacher: "CA Priya Das",
    teacherRole: "Chartered Accountant",
    teacherImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    thumbnailColor: "bg-indigo-600",
    board: "State Board",
    classLevel: "Class 12",
    mode: "Live Batches",
    language: "Hinglish",
    validity: "6 Months",
    price: 3999,
    originalPrice: 7000,
    rating: 4.6,
    reviews: 500
  },
  {
    id: 5,
    title: "Social Studies Exam Crash Course",
    subject: "SST",
    teacher: "Amit Kumar",
    teacherRole: "UPSC Mentor",
    teacherImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150",
    thumbnailColor: "bg-rose-600",
    board: "CBSE",
    classLevel: "Class 10",
    mode: "Live",
    language: "Hindi",
    validity: "3 Months",
    price: 999,
    originalPrice: 2500,
    rating: 4.5,
    reviews: 320
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
      className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300 h-full"
    >
      
      {/* --- 1. HEADER: Thumbnail & Overlay --- */}
      <div className={`h-52 relative ${course.thumbnailColor} overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
           <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg text-xs font-extrabold text-slate-900 shadow-sm uppercase tracking-wider">
             {course.subject}
           </span>
           <button className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors">
              <MoreVertical size={16} />
           </button>
        </div>

        {/* Bottom Badge (On Image) */}
        <div className="absolute bottom-4 left-5 flex gap-2">
            <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white border border-white/20 uppercase">
                {course.board}
            </span>
            <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white border border-white/20 uppercase">
                {course.classLevel}
            </span>
        </div>
      </div>

      {/* --- 2. BODY: Info & Specs --- */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Title & Rating */}
        <div className="mb-4">
           <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-500 text-xs font-bold gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                 <Star size={10} fill="currentColor" /> {course.rating}
              </div>
              <span className="text-xs text-slate-400 font-medium">({course.reviews} reviews)</span>
           </div>
           <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
             {course.title}
           </h3>
        </div>

        {/* Tech Specs Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
           <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Video size={14} className="text-blue-500" />
              {course.mode}
           </div>
           <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Globe size={14} className="text-emerald-500" />
              {course.language}
           </div>
           <div className="flex items-center gap-2 text-xs font-medium text-slate-500 col-span-2">
              <Clock size={14} className="text-orange-500" />
              Validity: <span className="text-slate-700">{course.validity}</span>
           </div>
        </div>

        {/* Pricing (Moved to Body for cleaner Footer) */}
        <div className="mt-auto pt-4 border-t border-dashed border-slate-200 flex items-end gap-3">
           <span className="text-2xl font-black text-slate-900">₹{course.price.toLocaleString()}</span>
           <span className="text-sm font-bold text-slate-400 line-through mb-1">₹{course.originalPrice}</span>
           <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mb-1 ml-auto">
             {(100 - (course.price/course.originalPrice * 100)).toFixed(0)}% OFF
           </span>
        </div>

      </div>

      {/* --- 3. FOOTER: Teacher & CTA (The New Section) --- */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-4">
        
        {/* Left: Teacher Profile */}
        <div className="flex items-center gap-3">
           <div className="relative">
             <img 
               src={course.teacherImage} 
               alt={course.teacher}
               className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
             />
             <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 text-white p-0.5 rounded-full border border-white">
                <CheckCircle2 size={10} strokeWidth={3} />
             </div>
           </div>
           <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-none mb-1">
                {course.teacher}
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">
                {course.teacherRole}
              </span>
           </div>
        </div>

        {/* Right: Action Button */}
        <button 
           onClick={() => navigate(`/course/${course.id}`)}
           className="shrink-0 w-10 h-10 rounded-full bg-slate-900 hover:bg-[#FF7F50] text-white flex items-center justify-center transition-all shadow-md group-hover:scale-110"
           title="View Course Details"
        >
           <ArrowRight size={18} />
        </button>

      </div>

    </motion.div>
  );
};

const CourseGrid = () => {
  return (
    <section className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Optional context) */}
        <div className="mb-10 flex justify-between items-end">
           <div>
             <h2 className="text-3xl font-bold text-slate-900">Featured Courses</h2>
             <p className="text-slate-500 mt-2">Handpicked batches for serious learners.</p>
           </div>
        </div>

        {/* The Grid - Adjusted for Max 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
             <CourseCard key={course.id} course={course} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CourseGrid;