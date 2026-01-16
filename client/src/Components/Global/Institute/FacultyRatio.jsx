import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  HeartHandshake, 
  MessageCircle, 
  Target, 
  CheckCircle2
} from "lucide-react";

const RELATIONSHIP_POINTS = [
  {
    id: 1,
    title: "Controlled Batch Size (1:25)",
    description: "We cap our batches intentionally. A teacher can only guide a student they actually know.",
    icon: <Users size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Mentor-Style Teaching",
    description: "Our faculties go beyond the syllabus to offer career advice, stress management, and motivation.",
    icon: <HeartHandshake size={24} />,
    color: "rose"
  },
  {
    id: 3,
    title: "Open Door Policy",
    description: "Students can approach teachers before or after class for doubt clearance without hesitation.",
    icon: <MessageCircle size={24} />,
    color: "emerald"
  }
];

const FacultyRatio = () => {
  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* --- LEFT: The Visual (Mentorship Topology) --- */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 p-8 flex flex-col items-center justify-center">
              
              {/* Central Mentor Node */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="relative z-20 w-24 h-24 bg-white rounded-full shadow-xl border-4 border-[#FF7F50] flex flex-col items-center justify-center mb-12"
              >
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mentor</div>
                <div className="text-2xl font-black text-slate-900">KRJ</div>
                {/* Connecting Lines (CSS) */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-slate-300" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 h-0.5 bg-slate-300 mt-12" />
                <div className="absolute top-full left-0 w-0.5 h-8 bg-slate-300 mt-12 -ml-24" />
                <div className="absolute top-full right-0 w-0.5 h-8 bg-slate-300 mt-12 -mr-24" />
              </motion.div>

              {/* Student Nodes Row */}
              <div className="flex gap-8 relative z-10">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 mb-2">
                      <Target size={24} className={i === 2 ? "text-blue-500" : "text-slate-300"} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">Student</span>
                  </motion.div>
                ))}
              </div>

              {/* Pulse Ring Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200 rounded-full opacity-50 animate-[spin_10s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-slate-300 rounded-full opacity-50 animate-[spin_15s_linear_infinite_reverse]" />
            
            </div>
          </div>

          {/* --- RIGHT: The Copy --- */}
          <div className="lg:w-1/2">
            
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Lost in a crowd? <br />
                <span className="text-blue-600">Not Here.</span>
              </h2>
              
              <div className="pl-6 border-l-4 border-[#FF7F50] py-2 bg-orange-50/50 rounded-r-xl">
                <p className="text-lg md:text-xl text-slate-700 italic font-medium leading-relaxed">
                  "At KRJ, faculties don’t just teach batches — they guide students through their academic journey."
                </p>
              </div>
            </div>

            {/* Benefit List */}
            <div className="space-y-8">
              {RELATIONSHIP_POINTS.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Parent Reassurance Box */}
            <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                <strong>For Parents:</strong> You receive monthly performance reports and have direct access to schedule meetings with mentors. We keep you in the loop.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FacultyRatio;