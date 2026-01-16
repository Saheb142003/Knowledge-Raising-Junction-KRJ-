import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Filter 
} from "lucide-react";

// --- MOCK FACULTY DATA ---
const FACULTY_DATA = [
  {
    id: 1,
    name: "Dr. Anjali Verma",
    subject: "Physics",
    experience: "15+ Years",
    level: "JEE Advanced",
    focus: "Visualizing complex mechanics through real-world simulation.",
    category: "Science",
    board: "Competitive",
    image: "bg-slate-200" // Placeholder
  },
  {
    id: 2,
    name: "Prof. S.K. Gupta",
    subject: "Mathematics",
    experience: "12 Years",
    level: "Class 11-12",
    focus: "Building calculus intuition before solving equations.",
    category: "Science",
    board: "CBSE",
    image: "bg-slate-300"
  },
  {
    id: 3,
    name: "Mrs. Priya Das",
    subject: "Accountancy",
    experience: "10 Years",
    level: "Class 12",
    focus: "Simplifying balance sheets with logical storytelling.",
    category: "Commerce",
    board: "State Board",
    image: "bg-slate-200"
  },
  {
    id: 4,
    name: "Mr. Rahul Singh",
    subject: "Chemistry",
    experience: "8 Years",
    level: "NEET UG",
    focus: "Organic reaction mechanisms mapped as flowcharts.",
    category: "Science",
    board: "Competitive",
    image: "bg-slate-300"
  },
  {
    id: 5,
    name: "Ms. Kavita Mehra",
    subject: "English",
    experience: "20 Years",
    level: "Foundation",
    focus: "Grammar precision and creative writing structure.",
    category: "Arts",
    board: "ICSE",
    image: "bg-slate-200"
  },
  {
    id: 6,
    name: "Er. Amit Kumar",
    subject: "Computer Sc.",
    experience: "6 Years",
    level: "Skill",
    focus: "Coding logic over syntax memorization.",
    category: "Tech",
    board: "Vocational",
    image: "bg-slate-300"
  }
];

const FILTERS = ["All", "Science", "Commerce", "Arts", "Competitive"];

const FacultyGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredFaculty = activeFilter === "All" 
    ? FACULTY_DATA 
    : FACULTY_DATA.filter(f => f.category === activeFilter || f.board === activeFilter);

  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header & Filters --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-[#FF7F50] font-bold text-xs uppercase tracking-widest mb-2 block">
              Meet the Mentors
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Our Academic <span className="text-slate-400">Pillars.</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* --- Faculty Grid --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaculty.map((faculty) => (
              <motion.div
                key={faculty.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#FF7F50]/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
              >
                
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative bg-slate-100">
                  {/* Actual Image would go here */}
                  <div className={`w-full h-full ${faculty.image} transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0`} />
                  
                  {/* Badge Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-sm border border-white">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <BookOpen size={12} className="text-[#FF7F50]" />
                      {faculty.subject}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#FF7F50] transition-colors">
                      {faculty.name}
                    </h3>
                  </div>

                  {/* Meta Details */}
                  <div className="flex items-center gap-4 mb-6 text-xs font-bold text-slate-500 uppercase tracking-wide">
                    <div className="flex items-center gap-1.5">
                      <Award size={14} className="text-slate-400" />
                      {faculty.experience}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-slate-400" />
                      {faculty.level}
                    </div>
                  </div>

                  {/* Teaching Focus (The "Why") */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-sm text-slate-600 italic font-medium leading-relaxed">
                      "{faculty.focus}"
                    </p>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredFaculty.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Filter size={48} className="mx-auto mb-4 opacity-20" />
            <p>No faculty members found for this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default FacultyGrid;