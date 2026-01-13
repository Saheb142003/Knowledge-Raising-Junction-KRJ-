import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  Star, 
  Crown, 
  Award,
  BarChart3
} from "lucide-react";

// --- Mock Data ---
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

const DATA_BY_YEAR = {
  2025: {
    stats: { totalSelections: 450, highestRank: "AIR 12", avgScore: "92%" },
    graphData: [
      { label: "JEE Adv", value: 85, color: "bg-rose-500" },
      { label: "NEET", value: 120, color: "bg-emerald-500" },
      { label: "Boards >95%", value: 245, color: "bg-blue-500" },
    ],
    students: [
      { id: 1, name: "Aarav Patel", rank: "AIR 12", exam: "JEE Advanced", score: "310/360", img: "bg-slate-200" },
      { id: 2, name: "Sanya Gupta", rank: "AIR 45", exam: "NEET UG", score: "715/720", img: "bg-slate-200" },
      { id: 3, name: "Rohan Kumar", rank: "99.2%", exam: "CBSE Class 12", score: "State Topper", img: "bg-slate-200" },
    ]
  },
  2024: {
    stats: { totalSelections: 380, highestRank: "AIR 28", avgScore: "89%" },
    graphData: [
      { label: "JEE Adv", value: 60, color: "bg-rose-400" },
      { label: "NEET", value: 100, color: "bg-emerald-400" },
      { label: "Boards >95%", value: 220, color: "bg-blue-400" },
    ],
    students: [
      { id: 4, name: "Ishaan Sharma", rank: "AIR 28", exam: "JEE Advanced", score: "295/360", img: "bg-slate-200" },
      { id: 5, name: "Meera Reddy", rank: "AIR 89", exam: "NEET UG", score: "705/720", img: "bg-slate-200" },
      { id: 6, name: "Arjun Singh", rank: "98.8%", exam: "ICSE Class 10", score: "City Topper", img: "bg-slate-200" },
    ]
  },
  // Fallback for older years to avoid empty state in demo
  default: {
    stats: { totalSelections: 200, highestRank: "AIR 100+", avgScore: "85%" },
    graphData: [
      { label: "JEE Adv", value: 30, color: "bg-rose-300" },
      { label: "NEET", value: 50, color: "bg-emerald-300" },
      { label: "Boards >95%", value: 120, color: "bg-blue-300" },
    ],
    students: [
      { id: 99, name: "Past Topper", rank: "Top 1%", exam: "Various Exams", score: "Distinction", img: "bg-slate-200" },
    ]
  }
};

const TopPerformers = () => {
  const [activeYear, setActiveYear] = useState(2025);
  const currentData = DATA_BY_YEAR[activeYear] || DATA_BY_YEAR.default;

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50/50 to-white relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header & Filter --- */}
        <div className="flex flex-col items-center text-center mb-16 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Crown size={14} fill="currentColor" />
              <span>Hall of Fame</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Our Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Excellence.</span>
            </h2>
          </div>

          {/* Year Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeYear === year 
                    ? "text-slate-900" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {activeYear === year && (
                  <motion.div 
                    layoutId="yearTab"
                    className="absolute inset-0 bg-amber-300 shadow-lg shadow-amber-500/20 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Top Section: Stats & Graph --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: Key Stats Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
             {/* Card 1 */}
             <motion.div 
               key={`stats-1-${activeYear}`}
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
               className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5"
             >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                   <Trophy size={28} />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Total Selections</p>
                   <h3 className="text-3xl font-black text-slate-900">{currentData.stats.totalSelections}+</h3>
                </div>
             </motion.div>

             {/* Card 2 */}
             <motion.div 
               key={`stats-2-${activeYear}`}
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
               className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5"
             >
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                   <Star size={28} fill="currentColor" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Highest Rank</p>
                   <h3 className="text-3xl font-black text-slate-900">{currentData.stats.highestRank}</h3>
                </div>
             </motion.div>
          </div>

          {/* Right: Performance Graph */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
               <BarChart3 size={20} className="text-slate-400" />
               <h3 className="text-lg font-bold text-slate-700">Exam Performance Breakdown ({activeYear})</h3>
            </div>
            
            <div className="flex-1 flex items-end justify-around gap-4 h-48 sm:h-64 pb-2 border-b border-slate-100">
               {currentData.graphData.map((item, idx) => (
                 <div key={idx} className="flex flex-col items-center gap-3 w-full group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.value / 300) * 100}%` }} // Simplified scale logic
                      transition={{ duration: 1, delay: idx * 0.1, type: "spring" }}
                      className={`w-full max-w-[80px] rounded-t-2xl relative ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`}
                    >
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.value} Students
                       </div>
                    </motion.div>
                    <span className="text-xs sm:text-sm font-bold text-slate-500">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* --- Main Attraction: Student Cards --- */}
        <div>
           <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-slate-200" />
              <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Top Achievers of {activeYear}</h3>
              <div className="h-px flex-1 bg-slate-200" />
           </div>

           <motion.div 
             layout
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           >
             <AnimatePresence mode="wait">
               {currentData.students.map((student) => (
                 <motion.div
                   key={student.id}
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.3 }}
                   className="group relative bg-white rounded-3xl p-1 shadow-sm hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300"
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                   
                   <div className="bg-white rounded-[1.4rem] p-6 h-full flex flex-col items-center text-center border border-slate-100 group-hover:border-transparent transition-colors">
                      
                      {/* Rank Badge */}
                      <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide border border-amber-200">
                         {student.rank}
                      </div>

                      {/* Avatar */}
                      <div className={`w-24 h-24 rounded-full ${student.img} border-4 border-white shadow-lg mb-4 flex items-center justify-center text-3xl font-bold text-slate-400`}>
                         {/* Placeholder if no image */}
                         {student.name.charAt(0)}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-1">{student.name}</h3>
                      <p className="text-sm font-semibold text-slate-400 mb-4">{student.exam}</p>

                      <div className="w-full h-px bg-slate-100 mb-4" />

                      <div className="flex items-center gap-2">
                         <Medal size={18} className="text-amber-500" />
                         <span className="text-lg font-black text-slate-800">{student.score}</span>
                      </div>
                   </div>
                 </motion.div>
               ))}
             </AnimatePresence>
           </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TopPerformers;