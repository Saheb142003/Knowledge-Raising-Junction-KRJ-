import React from "react";
import { motion } from "framer-motion";
import { 
  Wallet, 
  Receipt, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const AffordableEducation = () => {
  return (
    <section className="py-20 bg-blue-50/30 border-y border-blue-100 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck size={14} />
            Fair Pricing Promise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Quality Education shouldn't come with a <br />
            <span className="text-blue-600">Premium Tag.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            KRJ focuses on <strong className="text-slate-900">accessible education</strong> — fair pricing without compromising academic quality. We believe every student deserves a chance to excel.
          </p>
        </motion.div>

        {/* --- The 3 Pillars of Affordability --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Pillar 1: Transparency */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
              <Receipt size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Transparent Fees</h3>
            <p className="text-sm text-slate-500">
              What you see is what you pay. No hidden admission charges, no surprise exam fees, no infrastructure costs.
            </p>
          </motion.div>

          {/* Pillar 2: Course-Based */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
              <Wallet size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Course-Based Pricing</h3>
            <p className="text-sm text-slate-500">
              Don't pay for a whole bundle if you don't need it. Choose specific subjects or batches that fit your budget.
            </p>
          </motion.div>

          {/* Pillar 3: Value */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Value-Driven Batches</h3>
            <p className="text-sm text-slate-500">
              We invest in great teachers and study material, not expensive billboards. That savings is passed to you.
            </p>
          </motion.div>

        </div>

        {/* --- Soft Action --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           <button className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 transition-colors">
             Check Fee Structure <ArrowRight size={18} />
           </button>
           
           <span className="hidden sm:block text-slate-300">|</span>

           <button className="text-slate-600 font-bold hover:text-[#FF7F50] flex items-center gap-2 transition-colors">
             Apply for Merit Scholarship
           </button>
        </div>

      </div>
    </section>
  );
};

export default AffordableEducation;