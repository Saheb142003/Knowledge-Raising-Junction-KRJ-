import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  MapPin, 
  Zap, 
  Award 
} from "lucide-react";

const STATS = [
  { id: 1, label: "Courses Offered", value: "150+", icon: <BookOpen size={20} /> },
  { id: 2, label: "Active Students", value: "12k+", icon: <Users size={20} /> },
  { id: 3, label: "Expert Teachers", value: "85+", icon: <Award size={20} /> },
  { id: 4, label: "Cities Covered", value: "12", icon: <MapPin size={20} /> },
  { id: 5, label: "Live Batches", value: "40+", icon: <Zap size={20} /> },
];

const ScaleReach = () => {
  return (
    <section className="bg-slate-900 py-20 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950" />
      
      {/* Abstract Map Dots (Decoration) */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
         {[...Array(20)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute w-1.5 h-1.5 bg-white rounded-full"
             initial={{ opacity: 0.2 }}
             animate={{ opacity: [0.2, 1, 0.2] }}
             transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
             style={{ 
               top: `${Math.random() * 100}%`, 
               left: `${Math.random() * 100}%` 
             }}
           />
         ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Header Copy */}
          <div className="text-center lg:text-left max-w-sm">
             <h2 className="text-3xl font-bold text-white mb-4">
               Impact at Scale.
             </h2>
             <p className="text-slate-400 text-lg leading-relaxed">
               Built to scale — without losing academic discipline. Consistency across every classroom.
             </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 flex-1">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center lg:items-start group"
              >
                <div className="mb-3 p-3 rounded-xl bg-slate-800 text-slate-400 group-hover:text-[#FF7F50] group-hover:bg-[#FF7F50]/10 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-3xl md:text-4xl font-black text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ScaleReach;