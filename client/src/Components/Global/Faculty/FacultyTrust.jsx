import React from "react";
import { motion } from "framer-motion";
import { 
  CalendarCheck, 
  Scale, 
  MessageCircle, 
  Eye 
} from "lucide-react";

const TRUST_FACTORS = [
  {
    id: 1,
    title: "Consistent Schedules",
    description: "Classes happen when they are supposed to. No random cancellations or surprise reschedules.",
    icon: <CalendarCheck size={28} />
  },
  {
    id: 2,
    title: "Clear Evaluation",
    description: "Grading criteria are transparent. You will know exactly why you lost marks and how to fix it.",
    icon: <Scale size={28} />
  },
  {
    id: 3,
    title: "Regular Resolution",
    description: "Doubts aren't ignored. Dedicated slots ensure every query gets a logical explanation.",
    icon: <MessageCircle size={28} />
  },
  {
    id: 4,
    title: "Full Transparency",
    description: "Performance data is open. Students and parents can track progress without barriers.",
    icon: <Eye size={28} />
  }
];

const FacultyTrust = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">
            Trust is earned through <span className="text-blue-600">consistency.</span>
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_FACTORS.map((factor, idx) => (
            <motion.div
              key={factor.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              
              <div className="text-blue-500 mb-4 bg-blue-50 p-3 rounded-xl inline-block">
                {factor.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {factor.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {factor.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FacultyTrust;