import React from "react";
import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  Clock, 
  MessageCircleQuestion 
} from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "You are not just a Roll Number.",
    description: "In big institutes, you get lost in the crowd. At KRJ, your mentor knows your name, your weak topics, and your goals.",
    icon: <HeartHandshake size={32} />,
    color: "rose"
  },
  {
    id: 2,
    title: "Discipline > Motivation.",
    description: "Motivation fades. Discipline stays. We follow a strict timetable for classes, self-study, and sleep. No excuses.",
    icon: <Clock size={32} />,
    color: "blue"
  },
  {
    id: 3,
    title: "Doubts Killed Instantly.",
    description: "Don't carry confusion to the next class. Our 'Doubt Clinics' (Offline & Online) ensure you are conceptually clear every day.",
    icon: <MessageCircleQuestion size={32} />,
    color: "emerald"
  }
];

const KRJEdge = () => {
  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Students Choose <span className="text-[#FF7F50]">KRJ?</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We bridge the gap between "Online Flexibility" and "Offline Discipline."
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {item.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed">
                {item.description}
              </p>
              
              {/* Bottom Decoration */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-${item.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KRJEdge;