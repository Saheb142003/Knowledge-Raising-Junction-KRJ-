import React from "react";
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  CalendarClock, 
  FileSpreadsheet, 
  UserCheck 
} from "lucide-react";

const PILLARS = [
  {
    id: 1,
    title: "Concept-First Teaching",
    description: "We don't rush to solve problems. We build the theoretical framework first, ensuring students understand the 'Why' before the 'How'.",
    icon: <BrainCircuit size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Batch-Oriented Discipline",
    description: "Learning requires rhythm. Our faculties adhere to strict batch schedules—no random uploads, no skipped classes.",
    icon: <CalendarClock size={24} />,
    color: "orange"
  },
  {
    id: 3,
    title: "Assessment-Driven Learning",
    description: "Tests aren't an afterthought. Our teaching plan is backward-integrated with weekly assessment goals.",
    icon: <FileSpreadsheet size={24} />,
    color: "emerald"
  },
  {
    id: 4,
    title: "Student Accountability",
    description: "Our teachers monitor the data. If a student lags in assignments, the system—and the teacher—intervenes.",
    icon: <UserCheck size={24} />,
    color: "purple"
  }
];

const FacultyDifference = () => {
  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT: The "System" Visual (Pedagogy Pipeline) --- */}
          <div className="relative h-full min-h-[500px] flex items-center justify-center lg:justify-end">
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl -z-10" />

            {/* The Connected Pipeline */}
            <div className="relative w-full max-w-md">
              {/* Vertical Connecting Line */}
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-100 rounded-full" />

              <div className="space-y-8 relative z-10">
                {PILLARS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex items-center gap-6"
                  >
                    {/* Node Circle */}
                    <div className={`relative w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-white border border-slate-200 shadow-lg z-10 group`}>
                      <div className={`text-${item.color}-600 transition-transform duration-300 group-hover:scale-110`}>
                        {item.icon}
                      </div>
                      {/* Active Dot */}
                      <div className={`absolute -right-1 -top-1 w-3 h-3 rounded-full bg-${item.color}-500 border-2 border-white`} />
                    </div>

                    {/* Label (Visible on Mobile/Tablet mainly, acts as visual caption) */}
                    <div className="hidden md:block lg:hidden xl:block bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                      <span className="font-bold text-slate-700 text-sm">{item.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT: Content Blocks --- */}
          <div>
            
            <div className="mb-12">
              <span className="text-[#FF7F50] font-bold text-xs uppercase tracking-widest mb-2 block">
                The KRJ Methodology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Not just Teaching Topics. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Building Systems.
                </span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                KRJ faculties don’t just deliver lectures — they follow a structured system where <strong className="text-slate-700">teaching</strong>, <strong className="text-slate-700">practice</strong>, <strong className="text-slate-700">testing</strong>, and <strong className="text-slate-700">feedback</strong> are tightly connected.
              </p>
            </div>

            {/* Detailed List */}
            <div className="space-y-8">
              {PILLARS.map((item) => (
                <div key={item.id} className="group">
                  <h3 className={`text-xl font-bold text-slate-900 mb-2 group-hover:text-${item.color}-600 transition-colors flex items-center gap-3`}>
                    <span className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                    {item.title}
                  </h3>
                  <p className="text-slate-500 pl-5 border-l-2 border-slate-100 ml-1 text-sm md:text-base leading-relaxed group-hover:border-${item.color}-200 transition-colors">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FacultyDifference;