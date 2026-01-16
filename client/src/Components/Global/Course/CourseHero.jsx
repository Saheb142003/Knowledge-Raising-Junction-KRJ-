import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const FILTERS = ["All", "State Board", "CBSE", "Foundation", "Graduation"];

const CoursesHero = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    // PT-32 to clear fixed header, PB-20 for medium height
    <section className="relative w-full bg-slate-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        
        {/* Glow behind search bar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Headline Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md mb-6">
            <Sparkles size={12} className="text-[#FF7F50]" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Course Library
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            Find the Right Course for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7F50] to-orange-300">
              Your Learning Path.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From <strong>Foundation</strong> basics to <strong>Graduation</strong> mastery. Explore structured courses, live batches, and assessments designed for results.
          </p>
        </motion.div>

        {/* --- SEARCH INTERFACE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
          {/* Input Wrapper */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-2 shadow-2xl">
              <Search className="ml-4 text-slate-400 shrink-0" size={24} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject, class, or exam..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500 px-4 py-3 text-lg"
              />
              <button className="hidden sm:flex items-center gap-2 bg-[#FF7F50] hover:bg-[#ff6b3d] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-900/20">
                Search
              </button>
              
              {/* Mobile Search Icon Button */}
              <button className="sm:hidden bg-[#FF7F50] p-3 rounded-xl text-white">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- QUICK BOARD CHIPS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-white text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-600 hover:bg-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CoursesHero;