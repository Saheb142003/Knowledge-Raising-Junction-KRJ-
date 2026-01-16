import React from "react";
import { motion } from "framer-motion";
import { 
  Projector, 
  Users, 
  PenTool, 
  MonitorPlay, 
  ArrowRight,
  Sparkles 
} from "lucide-react";

const TEACHER_COURSES = [
  {
    id: 1,
    title: "Advanced Pedagogy",
    description: "Master the art of concept delivery and student engagement strategies.",
    icon: <Projector size={24} />,
    color: "text-blue-400"
  },
  {
    id: 2,
    title: "Classroom Management",
    description: "Techniques to handle large batches, maintain discipline, and boost focus.",
    icon: <Users size={24} />,
    color: "text-emerald-400"
  },
  {
    id: 3,
    title: "Assessment Design",
    description: "Learn to create balanced test papers that truly measure conceptual depth.",
    icon: <PenTool size={24} />,
    color: "text-rose-400"
  },
  {
    id: 4,
    title: "Digital Teaching Tools",
    description: "Navigate OBS, Smart Boards, and LMS platforms like a pro.",
    icon: <MonitorPlay size={24} />,
    color: "text-purple-400"
  }
];

const TeacherTraining = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* --- LEFT: The Pitch --- */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
                <Sparkles size={14} className="text-indigo-400" />
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  Professional Development
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Courses Designed for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                  Educators.
                </span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Great teachers are lifelong learners. KRJ offers structured certification programs for teachers who want to improve classroom delivery, assessment design, and batch handling.
              </p>

              <button className="group px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/40 flex items-center gap-2">
                Explore Teacher Programs 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT: The Course Grid --- */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEACHER_COURSES.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 ${course.color} group-hover:scale-110 transition-transform`}>
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {course.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeacherTraining;