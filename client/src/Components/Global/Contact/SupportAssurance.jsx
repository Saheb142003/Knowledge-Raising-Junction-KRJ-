import React from "react";
import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  Headset 
} from "lucide-react";

const SUPPORT_PROMISES = [
  {
    id: 1,
    title: "Responsive Support",
    description: "No endless automated menus. You connect with real humans who understand your context.",
    icon: <Headset size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Respectful Communication",
    description: "Whether you are a student or a parent, every query is treated with patience, dignity, and care.",
    icon: <HeartHandshake size={24} />,
    color: "rose"
  },
  {
    id: 3,
    title: "Data Privacy",
    description: "Your contact details are strictly for support. We have a zero-tolerance policy for spam or data sharing.",
    icon: <ShieldCheck size={24} />,
    color: "emerald"
  },
  {
    id: 4,
    title: "Timely Follow-ups",
    description: "We value your time. If we can't solve it immediately, we provide a clear timeline for resolution.",
    icon: <Clock size={24} />,
    color: "orange"
  }
];

const SupportAssurance = () => {
  return (
    <section className="py-16 bg-slate-50 font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUPPORT_PROMISES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-start"
            >
              
              <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-4`}>
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

export default SupportAssurance;