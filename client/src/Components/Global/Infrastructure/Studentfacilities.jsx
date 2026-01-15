import React from "react";
import { motion } from "framer-motion";
import { 
  Armchair, 
  Library, 
  Wifi, 
  MonitorPlay, 
  BookOpenCheck, 
  Coffee 
} from "lucide-react";

const FACILITIES = [
  {
    id: 1,
    title: "Modern Classrooms",
    description: "Air-conditioned, acoustically treated rooms with ergonomic seating for long study hours.",
    icon: <Armchair size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Study Library",
    description: "A silent, distraction-free zone stocked with reference books for focused self-study.",
    icon: <Library size={24} />,
    color: "amber"
  },
  {
    id: 3,
    title: "Digital Support",
    description: "High-speed Wi-Fi and computer labs for accessing online tests and digital resources.",
    icon: <Wifi size={24} />,
    color: "emerald"
  },
  {
    id: 4,
    title: "Recorded Backups",
    description: "Missed a class? Access full HD recordings of every lecture on the student app.",
    icon: <MonitorPlay size={24} />,
    color: "rose"
  },
  {
    id: 5,
    title: "Study Material",
    description: "Comprehensive printed modules, workbooks, and question banks provided on day one.",
    icon: <BookOpenCheck size={24} />,
    color: "purple"
  },
  {
    id: 6,
    title: "Student Lounge",
    description: "A space to relax, discuss doubts with peers, or grab a quick snack between classes.",
    icon: <Coffee size={24} />,
    color: "orange"
  }
];

const StudentFacilities = () => {
  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Built for <span className="text-[#FF7F50]">Learning.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Whether you join offline or online, we provide the infrastructure you need to succeed without distractions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
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

export default StudentFacilities;