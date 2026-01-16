import React from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Trophy, 
  Users, 
  Sun, 
  CalendarHeart,
  GraduationCap
} from "lucide-react";

// --- MOCK EVENT DATA ---
// Replace the 'bg-color' classes with actual <img src="..." /> in production
const EVENTS = [
  {
    id: 1,
    title: "Teachers' Day Celebration",
    date: "Sept 5",
    category: "Culture",
    description: "Students expressing gratitude to their mentors.",
    color: "bg-orange-100", 
    icon: <Heart className="text-orange-400" size={32} />
  },
  {
    id: 2,
    title: "Annual Prize Distribution",
    date: "March 15",
    category: "Achievement",
    description: "Honoring the top rankers of the academic year.",
    color: "bg-blue-100",
    icon: <Trophy className="text-blue-400" size={32} />
  },
  {
    id: 3,
    title: "Science Exhibition",
    date: "Nov 14",
    category: "Learning",
    description: "Applying theoretical knowledge to build real models.",
    color: "bg-emerald-100",
    icon: <Sun className="text-emerald-400" size={32} />
  },
  {
    id: 4,
    title: "Batch Farewell",
    date: "Feb 20",
    category: "Community",
    description: "Wishing our seniors luck for their board exams.",
    color: "bg-purple-100",
    icon: <GraduationCap className="text-purple-400" size={32} />
  }
];

const BeyondClassrooms = () => {
  return (
    <section className="py-24 bg-white font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1️⃣ SECTION HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-3 block">
              Campus Life
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">
              Beyond Classrooms
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Learning grows stronger when students and teachers connect beyond academics.
            </p>
          </motion.div>
        </div>

        {/* 2️⃣ EVENTS SHOWCASE (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {EVENTS.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-default"
            >
              {/* IMAGE PLACEHOLDER (Replace with actual <img>) */}
              <div className={`absolute inset-0 ${event.color} transition-transform duration-700 group-hover:scale-105 flex items-center justify-center`}>
                {/* Icon is just for placeholder visualization */}
                <div className="opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-4 duration-500">
                    {event.icon}
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <div className="flex items-center gap-2 mb-2 opacity-80">
                   <CalendarHeart size={14} />
                   <span className="text-xs font-bold uppercase tracking-wider">{event.category}</span>
                </div>
                <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-[#FF7F50] transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-slate-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3️⃣ & 4️⃣ WHY & BENEFITS */}
        <div className="max-w-4xl mx-auto text-center bg-slate-50 rounded-3xl p-10 md:p-12 border border-slate-100">
          
          {/* Why Text */}
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Building Character, Not Just Grades.
          </h3>
          <p className="text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            At KRJ, education is not limited to lectures and exams. Celebrations and academic gatherings help build <strong className="text-slate-900">respect</strong>, <strong className="text-slate-900">motivation</strong>, and <strong className="text-slate-900">confidence</strong> — strengthening the student–teacher bond.
          </p>

          {/* Student Gains Icons */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                <Sun size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">Confidence</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-orange-500 shadow-sm">
                <Trophy size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">Motivation</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm">
                <Users size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">Sense of Belonging</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-purple-600 shadow-sm">
                <Heart size={20} />
              </div>
              <span className="text-sm font-bold text-slate-700">Healthy Culture</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BeyondClassrooms;