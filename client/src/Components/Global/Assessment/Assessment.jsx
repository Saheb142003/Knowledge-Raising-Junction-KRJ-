import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  CheckCircle, 
  Lock, 
  Unlock, 
  Download, 
  ArrowRight,
  HelpCircle,
  Clock,
  Award
} from "lucide-react";

const CATEGORIES = ["Mock Tests", "Assignments", "Guess Papers"];

const RESOURCES = {
  "Mock Tests": [
    {
      id: 1,
      title: "JEE Mains Full Syllabus Test - 5",
      subtitle: "Based on latest NTA pattern",
      questions: 90,
      duration: "180 Mins",
      difficulty: "Hard",
      price: 199,
      isLocked: true,
      tags: ["High Yield", "New Pattern"]
    },
    {
      id: 2,
      title: "Class 12 Physics: Electrostatics",
      subtitle: "Chapter-wise mock drill",
      questions: 30,
      duration: "60 Mins",
      difficulty: "Medium",
      price: 99,
      isLocked: false, // Free / Demo
      tags: ["Chapter Test"]
    },
    {
      id: 3,
      title: "NEET Biology: Human Physiology",
      subtitle: "Unit-wise speed test",
      questions: 100,
      duration: "60 Mins",
      difficulty: "Medium",
      price: 149,
      isLocked: true,
      tags: ["Speed Drill"]
    }
  ],
  "Assignments": [
    {
      id: 101,
      title: "Calculus Problem Sheet (Level 1)",
      subtitle: "Basic differentiation & limits",
      questions: 50,
      type: "PDF + Video Sol.",
      price: 49,
      isLocked: false,
      tags: ["Practice"]
    },
    {
      id: 102,
      title: "Organic Chemistry Roadmap",
      subtitle: "Reaction mechanism flowchart",
      questions: 25,
      type: "Interactive PDF",
      price: 99,
      isLocked: true,
      tags: ["Revision"]
    }
  ],
  "Guess Papers": [
    {
      id: 201,
      title: "CBSE Class 12 Math Guess Paper",
      subtitle: "80% Hit Rate in 2025",
      type: "Premium PDF",
      price: 299,
      isLocked: true,
      tags: ["Best Seller", "Exam Special"]
    },
    {
      id: 202,
      title: "ICSE Class 10 Physics Predictions",
      subtitle: "Most likely questions for Boards",
      type: "Premium PDF",
      price: 249,
      isLocked: true,
      tags: ["Exam Special"]
    }
  ]
};

const AssessmentSection = () => {
  const [activeTab, setActiveTab] = useState("Mock Tests");

  return (
    <section className="py-24 bg-white relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Practice to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Perfection.</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Access our library of high-quality assessments. Included with your course, or available individually.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === cat 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Content Grid --- */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {RESOURCES[activeTab].map((item) => (
            <div 
              key={item.id}
              className="group relative bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
            >
              
              {/* Top Banner (Locked/Unlocked) */}
              <div className={`h-1.5 w-full ${item.isLocked ? "bg-slate-200" : "bg-emerald-400"}`} />

              <div className="p-6">
                
                {/* Header: Icon & Tags */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.isLocked ? "bg-slate-50 text-slate-400" : "bg-emerald-50 text-emerald-600"}`}>
                    {activeTab === "Mock Tests" ? <Clock size={20} /> : <FileText size={20} />}
                  </div>
                  <div className="flex gap-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase rounded-md border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title Area */}
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">
                  {item.subtitle}
                </p>

                {/* Meta Details */}
                <div className="flex items-center gap-4 mb-6 text-sm text-slate-600">
                  {item.questions && (
                    <div className="flex items-center gap-1.5">
                      <HelpCircle size={14} className="text-slate-400"/>
                      <span className="font-semibold">{item.questions} Qs</span>
                    </div>
                  )}
                  {item.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-400"/>
                      <span className="font-semibold">{item.duration}</span>
                    </div>
                  )}
                  {item.difficulty && (
                     <div className="flex items-center gap-1.5">
                      <Award size={14} className="text-slate-400"/>
                      <span className={`font-bold ${
                        item.difficulty === "Hard" ? "text-red-500" : 
                        item.difficulty === "Medium" ? "text-amber-500" : "text-emerald-500"
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer / CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                   {item.isLocked ? (
                     <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold">Buy Individually</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-slate-900">₹{item.price}</span>
                          <Lock size={12} className="text-slate-400" />
                        </div>
                     </div>
                   ) : (
                     <div className="flex flex-col">
                        <span className="text-xs text-emerald-600 font-bold">Free Access</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-slate-900">Free</span>
                          <Unlock size={12} className="text-emerald-500" />
                        </div>
                     </div>
                   )}

                   <button className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                     item.isLocked 
                      ? "bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg" 
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                   }`}>
                     {item.isLocked ? "Unlock" : "Attempt"} <ArrowRight size={14} />
                   </button>
                </div>

              </div>
              
              {/* Bottom Strip: "Included with Course" */}
              {item.isLocked && (
                 <div className="bg-slate-50 py-2 px-6 text-center border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                       Also included in <span className="text-blue-600 underline cursor-pointer">Full Course</span>
                    </p>
                 </div>
              )}

            </div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
           <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-slate-200 text-slate-600 font-bold hover:border-slate-900 hover:text-slate-900 transition-all">
              View All {activeTab} <ArrowRight size={18} />
           </button>
        </div>

      </div>
    </section>
  );
};

export default AssessmentSection;