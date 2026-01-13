import React from "react";
import { motion } from "framer-motion";
import { 
  CalendarDays, 
  BadgeCheck, 
  FileSpreadsheet, 
  TrendingUp 
} from "lucide-react";

const PILLARS = [
  {
    id: 1,
    title: "Structured Batches",
    description: "Learning shouldn't be random. Join disciplined cohorts with fixed timelines and syllabus coverage.",
    icon: <CalendarDays size={28} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Verified Teachers",
    description: "Learn from the best. Every educator on KRJ is vetted for expertise, experience, and teaching quality.",
    icon: <BadgeCheck size={28} />,
    color: "orange"
  },
  {
    id: 3,
    title: "Integrated Tests",
    description: "Practice as you learn. Chapter-wise tests and full-length mocks woven directly into your course flow.",
    icon: <FileSpreadsheet size={28} />,
    color: "emerald"
  },
  {
    id: 4,
    title: "Student Tracking",
    description: "Know where you stand. Visualise your strengths and weak areas with granular performance analytics.",
    icon: <TrendingUp size={28} />,
    color: "purple"
  }
];

const ValuePillars = () => {
  return (
    <section className="py-20 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Students Choose <span className="text-[#FF7F50]">KRJ</span>
          </h2>
          <p className="text-slate-500">
            We prioritize structure over volume. Our platform is built to help you stay focused, disciplined, and on track.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#FF7F50] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValuePillars;