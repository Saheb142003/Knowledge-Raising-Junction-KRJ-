import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  UserCheck, 
  LineChart, 
  MessageSquareQuote, 
  FileCheck 
} from "lucide-react";

const STANDARDS = [
  {
    id: 1,
    title: "Rigorous 3-Step Selection",
    description: "Only 1 in 25 applicants make the cut. Candidates undergo subject tests, demo lectures, and psychometric evaluation.",
    icon: <UserCheck size={24} />
  },
  {
    id: 2,
    title: "Quarterly Performance Audits",
    description: "Teaching isn't static. We review lecture recordings and student outcome data every 3 months to ensure quality.",
    icon: <LineChart size={24} />
  },
  {
    id: 3,
    title: "Student Feedback Loop",
    description: "Students have a voice. Anonymous weekly feedback helps us identify communication gaps immediately.",
    icon: <MessageSquareQuote size={24} />
  },
  {
    id: 4,
    title: "Curriculum Alignment",
    description: "No going off-topic. Faculties strictly adhere to the lesson plan to ensure the syllabus is completed on time.",
    icon: <FileCheck size={24} />
  }
];

const FacultyStandards = () => {
  return (
    <section className="py-24 bg-white font-sans relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none -mr-40 -mt-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          {/* --- LEFT: The Promise (Visual) --- */}
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl overflow-hidden"
            >
              {/* Abstract Badge BG */}
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <ShieldCheck size={200} />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/30">
                  <ShieldCheck size={28} />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">
                  We Don't Compromise on <span className="text-teal-400">Quality.</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Your child's future is not a testing ground. Our faculty standards are non-negotiable, ensuring a safe, consistent, and high-performance learning environment.
                </p>

                {/* Trust Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                    ISO Certified Process
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: The Standards (Grid) --- */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {STANDARDS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-5 group"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FacultyStandards;