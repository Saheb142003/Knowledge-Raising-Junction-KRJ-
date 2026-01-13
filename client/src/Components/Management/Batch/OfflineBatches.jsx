import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  MapPin, 
  CalendarDays, 
  Users, 
  ArrowRight, 
  AlertCircle,
  Sun,
  Moon,
  Zap,
  Check,
  Timer
} from "lucide-react";

// --- Mock Data: Offline Batches ---
const BATCHES = [
  {
    id: 1,
    name: "Sankalp JEE 2026",
    subject: "Physics & Maths",
    target: "Class 11 (Moving to 12)",
    days: "MWF", // Mon-Wed-Fri
    shift: "Evening",
    time: "4:00 PM - 7:30 PM",
    room: "Hall A (Main Branch)",
    teacher: "Er. R.K. Gupta",
    status: "Filling Fast",
    seatsLeft: 5,
    startDate: "Starts 15th Jan",
    color: "orange"
  },
  {
    id: 2,
    name: "Board Booster",
    subject: "Science Complete",
    target: "Class 10 CBSE",
    days: "TTS", // Tue-Thu-Sat
    shift: "Evening",
    time: "5:00 PM - 7:00 PM",
    room: "Room 102 (2nd Floor)",
    teacher: "Dr. Anjali",
    status: "Open",
    seatsLeft: 12,
    startDate: "Ongoing",
    color: "blue"
  },
  {
    id: 3,
    name: "NEET Dropper Special",
    subject: "PCB Core",
    target: "Droppers",
    days: "Daily", 
    shift: "Morning",
    time: "8:00 AM - 1:00 PM",
    room: "Hall B (Main Branch)",
    teacher: "Team Phoenix",
    status: "Waitlist",
    seatsLeft: 0,
    startDate: "Started 2 Days ago",
    color: "emerald"
  },
  {
    id: 4,
    name: "Commerce Foundation",
    subject: "Accounts & Eco",
    target: "Class 11",
    days: "MWF",
    shift: "Morning",
    time: "7:00 AM - 9:00 AM",
    room: "Room 204",
    teacher: "CA Priya",
    status: "Open",
    seatsLeft: 20,
    startDate: "Starts 20th Jan",
    color: "purple"
  },
  {
    id: 5,
    name: "Weekend Olympiad",
    subject: "Maths & Mental Ability",
    target: "Class 8-9",
    days: "Weekend",
    shift: "Afternoon",
    time: "2:00 PM - 5:00 PM",
    room: "Lab 1",
    teacher: "Mr. Singh",
    status: "Filling Fast",
    seatsLeft: 3,
    startDate: "Next Saturday",
    color: "indigo"
  }
];

// --- Components ---

// 1. The Floating Urgency Card
const FloatingNotification = () => (
  <motion.div 
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1, type: "spring" }}
    className="absolute top-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-30"
  >
    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl shadow-slate-900/40 border border-slate-700 flex items-start gap-4 backdrop-blur-md">
      <div className="bg-[#FF7F50] p-2 rounded-lg animate-pulse">
        <Timer size={24} className="text-white" />
      </div>
      <div>
        <h4 className="font-bold text-lg leading-tight">Last Call: JEE Crash Course</h4>
        <p className="text-slate-400 text-xs mt-1">Final batch for April attempt starts tomorrow. Only 2 seats remaining.</p>
        <button className="mt-3 text-xs font-bold uppercase tracking-wider text-[#FF7F50] hover:text-white transition-colors flex items-center gap-1">
          Reserve Seat Now <ArrowRight size={12} />
        </button>
      </div>
    </div>
  </motion.div>
);

const OfflineBatches = () => {
  const [dayFilter, setDayFilter] = useState("All");
  const [shiftFilter, setShiftFilter] = useState("All");

  // Filters Data
  const DAYS = ["All", "MWF", "TTS", "Daily", "Weekend"];
  const SHIFTS = [
    { label: "All", icon: null },
    { label: "Morning", icon: <Sun size={14} /> },
    { label: "Afternoon", icon: <Sun size={14} /> },
    { label: "Evening", icon: <Moon size={14} /> }
  ];

  // Logic
  const filteredBatches = useMemo(() => {
    return BATCHES.filter(batch => {
      const dayMatch = dayFilter === "All" || batch.days === dayFilter;
      const shiftMatch = shiftFilter === "All" || batch.shift === shiftFilter;
      return dayMatch && shiftMatch;
    });
  }, [dayFilter, shiftFilter]);

  return (
    <section className="relative min-h-screen bg-[#FDFDFD] py-20 px-4 md:px-8 font-sans overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Floating Notification Component */}
      <FloatingNotification />

      <div className="max-w-7xl mx-auto relative z-10 pt-10">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin size={12} />
            <span>Offline Center Batches</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Classroom <span className="text-[#FF7F50]">Programs.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl">
            Experience disciplined learning in our tech-enabled classrooms. 
            Select your preferred days and time slots below.
          </p>
        </div>

        {/* --- Filters Toolbar --- */}
        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Filter Group 1: Days */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Filter by Days</span>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => setDayFilter(day)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                    dayFilter === day 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-slate-200"></div>

          {/* Filter Group 2: Shifts */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Preferred Time</span>
            <div className="flex flex-wrap gap-2">
              {SHIFTS.map((shift) => (
                <button
                  key={shift.label}
                  onClick={() => setShiftFilter(shift.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                    shiftFilter === shift.label 
                    ? "bg-[#FF7F50] text-white border-[#FF7F50] shadow-orange-200" 
                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {shift.icon}
                  {shift.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Grid Results --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBatches.map((batch) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={batch.id}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-orange-200 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 relative"
              >
                
                {/* Top Status Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${
                  batch.status === "Waitlist" ? "from-red-500 to-red-600" : 
                  batch.status === "Filling Fast" ? "from-amber-400 to-orange-500" : 
                  "from-emerald-400 to-teal-500"
                }`} />

                <div className="p-6 md:p-8">
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-slate-100 rounded-md text-[10px] font-extrabold uppercase text-slate-500 mb-2 tracking-wide">
                        {batch.target}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[#FF7F50] transition-colors">
                        {batch.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">{batch.subject}</p>
                    </div>
                    {/* Urgency Badge */}
                    {batch.status !== "Open" && (
                      <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl text-[10px] font-bold uppercase leading-none text-center border ${
                        batch.status === "Waitlist" ? "bg-red-50 text-red-600 border-red-100" : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                         <AlertCircle size={14} className="mb-1"/>
                         {batch.status === "Waitlist" ? "Full" : "Fast"}
                      </div>
                    )}
                  </div>

                  {/* Schedule Details Container */}
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100 mb-6">
                    {/* Time */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{batch.time}</p>
                        <p className="text-xs text-slate-400 font-medium">{batch.shift} Shift</p>
                      </div>
                    </div>
                    
                    {/* Days */}
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg text-purple-500 shadow-sm">
                        <CalendarDays size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{batch.days}</p>
                        <p className="text-xs text-slate-400 font-medium">Weekly Schedule</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg text-emerald-500 shadow-sm">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{batch.room}</p>
                        <p className="text-xs text-slate-400 font-medium">KRJ Center</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Users size={14} />
                      <span>{batch.teacher}</span>
                    </div>
                    
                    <div className="text-right">
                       {batch.seatsLeft > 0 ? (
                         <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                           <Zap size={12} fill="currentColor" /> {batch.seatsLeft} Seats Left
                         </span>
                       ) : (
                         <span className="text-xs font-bold text-red-500">Admission Closed</span>
                       )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-[#FF7F50] transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg shadow-slate-900/20">
                    Book Demo Class <ArrowRight size={16} />
                  </button>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBatches.length === 0 && (
          <div className="text-center py-20">
             <div className="inline-block p-4 rounded-full bg-slate-100 text-slate-400 mb-4">
               <CalendarDays size={40} />
             </div>
             <h3 className="text-xl font-bold text-slate-900">No batches match your schedule</h3>
             <p className="text-slate-500 mt-2">Try changing the Day or Time filter.</p>
             <button 
               onClick={() => {setDayFilter("All"); setShiftFilter("All")}}
               className="mt-6 text-[#FF7F50] font-bold underline"
             >
               View All Batches
             </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default OfflineBatches;