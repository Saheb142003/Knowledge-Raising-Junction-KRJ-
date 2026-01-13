import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  FileCheck 
} from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "Enterprise Security",
    description: "Your data is encrypted and stored using banking-grade security protocols. Safety is our baseline.",
    icon: <ShieldCheck size={24} />
  },
  {
    id: 2,
    title: "Privacy First",
    description: "Strict role-based access ensures students, teachers, and parents only see what they are meant to see.",
    icon: <Lock size={24} />
  },
  {
    id: 3,
    title: "Fair Testing",
    description: "Our assessment engine is built for integrity, ensuring fair play and accurate performance tracking.",
    icon: <FileCheck size={24} />
  },
  {
    id: 4,
    title: "Always On",
    description: "Built on scalable cloud architecture with 99.9% uptime. Learning happens on your schedule, not ours.",
    icon: <Server size={24} />
  }
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 font-sans relative overflow-hidden">
      
      {/* Background Pattern (Subtle Dot Grid) */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Built on <span className="text-blue-600">Trust.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            We understand the responsibility of handling student data. Our platform is engineered for security, privacy, and reliability.
          </p>
        </div>

        {/* 4-Column Icon Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              
              {/* Icon Bubble */}
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;