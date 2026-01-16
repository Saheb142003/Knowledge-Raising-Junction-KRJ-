import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Users, 
  CalendarDays, 
  BookOpen, 
  ArrowRight 
} from "lucide-react";

const DisciplineSection = () => {
  return (
    <section className="py-24 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[#FF7F50] font-bold text-xs uppercase tracking-widest mb-3 block">
            Our Core Philosophy
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Batches that build <span className="underline decoration-[#FF7F50] decoration-4 underline-offset-4">Discipline.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            KRJ believes learning works best in disciplined batches — where students attend regularly, practice consistently, and are guided step-by-step.
          </p>
        </div>

        {/* --- The Bento Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Fixed Timings (Large - 7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Clock size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Clock size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Fixed Batch Timings</h3>
                <p className="text-slate-500">
                  No random uploads. Classes happen at a fixed time (e.g., MWF 5:00 PM), creating a daily routine that kills procrastination.
                </p>
              </div>

              {/* Visual Schedule Badge */}
              <div className="flex gap-3">
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold uppercase border border-slate-200">Mon</span>
                <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold uppercase border border-blue-200">Wed</span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold uppercase border border-slate-200">Fri</span>
                <span className="px-3 py-1 rounded-lg bg-slate-800 text-white text-xs font-bold uppercase ml-auto">05:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Batch Size (Small - 5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Limited Batch Size</h3>
            <p className="text-slate-500 mb-6">
              We cap our batches to ensure every student gets attention. You aren't just a number here.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Max Ratio 1:25
            </div>
          </motion.div>

          {/* Card 3: Academic Calendar (Small - 5 cols) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group"
          >
             <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
               <CalendarDays size={24} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">Academic Calendar</h3>
             <p className="text-slate-500 mb-6">
               A roadmap for the whole year. Know your exam dates, holidays, and revision weeks in advance.
             </p>
             
             {/* Mini Calendar Visual */}
             <div className="grid grid-cols-7 gap-1 opacity-50 max-w-[150px]">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className={`h-2 rounded-full ${i === 4 || i === 12 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                ))}
             </div>
          </motion.div>

          {/* Card 4: Subject Wise (Large - 7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 group flex flex-col justify-between"
          >
             <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Subject-Wise Focus</h3>
                <p className="text-slate-500">
                  Don't need the full package? Join specific subject batches to target your weak areas without overpaying.
                </p>
             </div>
             
             <div className="mt-6 flex flex-wrap gap-2">
                {['Physics', 'Advanced Maths', 'Organic Chem', 'Accounts'].map(sub => (
                   <span key={sub} className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold uppercase border border-slate-200 rounded-lg group-hover:border-purple-200 group-hover:text-purple-600 transition-colors">
                      {sub}
                   </span>
                ))}
             </div>
          </motion.div>

        </div>

        {/* --- Footer / Link --- */}
        <div className="mt-12 text-center">
           <button className="inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5 hover:text-[#FF7F50] hover:border-[#FF7F50] transition-all">
             Download Academic Calendar <ArrowRight size={16} />
           </button>
        </div>

      </div>
    </section>
  );
};

export default DisciplineSection;