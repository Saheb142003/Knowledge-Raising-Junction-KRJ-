import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, 
  Award, 
  ClipboardCheck, 
  TrendingUp, 
  MessageCircleQuestion 
} from "lucide-react";

const INDICATORS = [
  { 
    id: 1, 
    label: "Structured Curriculum", 
    sub: "Aligned with latest patterns",
    icon: <Layers size={24} /> 
  },
  { 
    id: 2, 
    label: "Expert Teachers", 
    sub: "Learn from the masters",
    icon: <Award size={24} /> 
  },
  { 
    id: 3, 
    label: "Regular Tests", 
    sub: "Weekly & Monthly Mocks",
    icon: <ClipboardCheck size={24} /> 
  },
  { 
    id: 4, 
    label: "Progress Tracking", 
    sub: "Data-driven insights",
    icon: <TrendingUp size={24} /> 
  },
  { 
    id: 5, 
    label: "Doubt Support", 
    sub: "24/7 Expert assistance",
    icon: <MessageCircleQuestion size={24} /> 
  }
];

const LearningIndicators = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 2 cols mobile, 3 cols tablet, 5 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {INDICATORS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              
              {/* Icon Bubble */}
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#FF7F50] group-hover:border-[#FF7F50]/30 group-hover:shadow-lg group-hover:shadow-orange-500/10 transition-all duration-300 mb-4">
                {item.icon}
              </div>

              {/* Text */}
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-slate-800 transition-colors">
                {item.label}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {item.sub}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default LearningIndicators;