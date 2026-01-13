import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  Sparkles,
  Zap,
  CheckCircle2
} from "lucide-react";

const BATCHES = [
  {
    id: 1,
    name: "Arjuna Batch 2.0",
    target: "JEE Mains + Advanced 2027",
    forClass: "Class 11 Students",
    startDate: "Starts 15th Feb",
    status: "Filling Fast",
    statusColor: "text-orange-600 bg-orange-100",
    schedule: "Mon - Wed - Fri | 6:00 PM",
    seatsLeft: 12,
    color: "blue"
  },
  {
    id: 2,
    name: "Lakshya NEET Crash Course",
    target: "NEET UG 2026",
    forClass: "Class 12 & Droppers",
    startDate: "Live Now",
    status: "Classes Started",
    statusColor: "text-emerald-600 bg-emerald-100",
    schedule: "Daily | 4:00 PM",
    seatsLeft: null, // Open enrollment
    color: "emerald"
  },
  {
    id: 3,
    name: "Udaan: Foundation Series",
    target: "Olympiads + NTSE",
    forClass: "Class 9 & 10",
    startDate: "Starts 1st March",
    status: "Admissions Open",
    statusColor: "text-blue-600 bg-blue-100",
    schedule: "Weekends | 10:00 AM",
    seatsLeft: 45,
    color: "purple"
  }
];

const ActiveBatches = () => {
  return (
    <section className="py-20 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Zap size={14} fill="currentColor" />
              <span>Live & Upcoming</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Join a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Live Batch</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg text-lg">
              Structured cohorts with fixed schedules. Don't study alone—join a batch and stay disciplined.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 font-bold text-slate-600 hover:text-slate-900 transition-colors">
            View Full Schedule <ArrowRight size={20} />
          </button>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BATCHES.map((batch, idx) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[2rem] p-1 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              <div className="h-full bg-slate-50/50 rounded-[1.8rem] p-6 flex flex-col relative overflow-hidden">
                
                {/* Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${batch.color}-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-110`} />

                {/* Status Badge */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                   <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${batch.statusColor} border border-white/50 shadow-sm`}>
                     {batch.status}
                   </span>
                   {batch.seatsLeft && (
                     <span className="text-xs font-bold text-red-500 animate-pulse">
                       Only {batch.seatsLeft} seats left!
                     </span>
                   )}
                </div>

                {/* Content */}
                <div className="mb-6 relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#FF7F50] transition-colors">
                    {batch.name}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-4">
                    Target: <span className="text-slate-700">{batch.target}</span>
                  </p>
                  
                  {/* Info Tags */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                       <Users size={16} className="text-slate-400" />
                       <span>{batch.forClass}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                       <Calendar size={16} className="text-slate-400" />
                       <span>{batch.startDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                       <Clock size={16} className="text-slate-400" />
                       <span>{batch.schedule}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-auto pt-6 border-t border-slate-200/60 flex items-center justify-between relative z-10">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                      +40
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-[#FF7F50] text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 transition-all">
                    Enroll <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
            <button className="text-[#FF7F50] font-bold text-sm">View All Batches →</button>
        </div>

      </div>
    </section>
  );
};

export default ActiveBatches;