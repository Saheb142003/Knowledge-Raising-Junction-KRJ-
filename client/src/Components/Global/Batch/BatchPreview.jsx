import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Wifi, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// --- MOCK BATCH DATA ---
const UPCOMING_BATCHES = [
  {
    id: "B101",
    name: "Sankalp Batch (Morning)",
    startDate: "15 Aug, 2025",
    days: "Mon - Wed - Fri",
    time: "07:00 AM - 09:00 AM",
    mode: "Live Online",
    language: "Hinglish",
    totalSeats: 60,
    filledSeats: 48,
    status: "Filling Fast",
    color: "rose"
  },
  {
    id: "B102",
    name: "Lakshya Batch (Evening)",
    startDate: "20 Aug, 2025",
    days: "Tue - Thu - Sat",
    time: "05:00 PM - 08:00 PM",
    mode: "Hybrid (Delhi)",
    language: "English",
    totalSeats: 40,
    filledSeats: 12,
    status: "Open",
    color: "blue"
  },
  {
    id: "B103",
    name: "Weekend Special",
    startDate: "01 Sep, 2025",
    days: "Sat - Sun",
    time: "10:00 AM - 02:00 PM",
    mode: "Live Online",
    language: "Hindi",
    totalSeats: 100,
    filledSeats: 85,
    status: "Almost Full",
    color: "orange"
  }
];

const BatchPreview = () => {
  return (
    <section className="py-12 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar size={20} className="text-[#FF7F50]" />
              Upcoming Batches
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Select a schedule that works for you.
            </p>
          </div>
          <button className="text-sm font-bold text-[#FF7F50] hover:text-orange-600 flex items-center gap-1 transition-colors">
            View All Schedule <ArrowRight size={16} />
          </button>
        </div>

        {/* --- Batch List --- */}
        <div className="space-y-4">
          {UPCOMING_BATCHES.map((batch, idx) => {
            const fillPercentage = (batch.filledSeats / batch.totalSeats) * 100;
            const isHighDemand = fillPercentage > 75;

            return (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  isHighDemand 
                    ? "border-orange-100 bg-orange-50/30 hover:border-orange-300" 
                    : "border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg"
                }`}
              >
                
                {/* Content Layout */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-5">
                  
                  {/* Left: Date Block */}
                  <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Starts</span>
                    <span className="text-lg font-black text-slate-900 leading-none mt-1">
                      {batch.startDate.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {batch.startDate.split(" ")[1]}
                    </span>
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 w-full md:w-auto text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h4 className="text-lg font-bold text-slate-900">
                        {batch.name}
                      </h4>
                      {/* Tags */}
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border flex items-center gap-1 ${
                          batch.mode.includes("Online") 
                            ? "bg-rose-50 text-rose-600 border-rose-100" 
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}>
                          {batch.mode.includes("Online") ? <Wifi size={10} /> : <MapPin size={10} />}
                          {batch.mode}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded border border-slate-200">
                          {batch.language}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        {batch.days}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" />
                        {batch.time}
                      </span>
                    </div>
                  </div>

                  {/* Right: Seats & Action */}
                  <div className="shrink-0 w-full md:w-48">
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className={isHighDemand ? "text-orange-600" : "text-slate-500"}>
                          {isHighDemand ? "🔥 Filling Fast!" : "Seats Available"}
                        </span>
                        <span className="text-slate-400">
                          {batch.filledSeats}/{batch.totalSeats}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fillPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            isHighDemand ? "bg-gradient-to-r from-orange-400 to-red-500" : "bg-blue-500"
                          }`}
                        />
                      </div>
                    </div>

                    <button className="w-full py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-[#FF7F50] hover:shadow-orange-500/20">
                      Secure Seat <ArrowRight size={14} />
                    </button>
                    
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Helper Note */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
          <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> You can switch batches within the first 7 days of enrollment. 
            Missed a live class? Recordings are uploaded within 2 hours.
          </p>
        </div>

      </div>
    </section>
  );
};

export default BatchPreview;