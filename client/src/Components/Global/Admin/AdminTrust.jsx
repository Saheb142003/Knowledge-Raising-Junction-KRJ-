import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  PhoneOutgoing 
} from "lucide-react";

const AdminTrust = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          
          {/* Visual Icon Group */}
          <div className="shrink-0 relative">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center relative z-10">
              <Lock size={32} />
            </div>
            {/* Decorative Shield behind */}
            <div className="absolute -top-2 -right-2 text-emerald-500 bg-white rounded-full p-1 border border-emerald-100 shadow-sm z-20">
              <ShieldCheck size={16} />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              We respect your data & privacy.
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              All applications and student queries are securely reviewed by the KRJ academic team. Your data is never shared with third-party agencies.
            </p>
            
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <PhoneOutgoing size={16} className="text-blue-600" />
              <span>Shortlisted candidates are contacted directly within 5 days.</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default AdminTrust;