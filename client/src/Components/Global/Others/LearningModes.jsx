import React from "react";
import { motion } from "framer-motion";
import { 
  Laptop, 
  Users, 
  Check, 
  ArrowRight,
  Wifi,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const LearningModes = () => {
  return (
    <section className="py-24 bg-white font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose how you <span className="text-[#FF7F50]">Learn.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Whether you prefer the flexibility of home or the discipline of a classroom, KRJ has a structured path for you.
          </p>
        </div>

        {/* The Choice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Option 1: Online */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
          >
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Laptop size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Online Courses</h3>
                <span className="text-sm font-bold text-blue-600 uppercase tracking-wide flex items-center gap-1">
                  <Wifi size={14} /> Learn from Anywhere
                </span>
              </div>
            </div>

            <p className="text-slate-500 mb-8 flex-grow">
              Perfect for self-driven students who want high-quality education without the commute. Access recorded lectures, live doubts, and tests on the app.
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
              {["Flexible Schedule", "Unlimited Recording Access", "Digital Test Series", "Lower Fee Structure"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link to="/courses" className="mt-auto">
              <button className="w-full py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-900 font-bold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                Explore Online Courses
              </button>
            </Link>
          </motion.div>

          {/* Option 2: Offline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-[#FF7F50] hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 group"
          >
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FF7F50] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Offline Batches</h3>
                <span className="text-sm font-bold text-orange-400 uppercase tracking-wide flex items-center gap-1">
                  <MapPin size={14} /> Center Based Learning
                </span>
              </div>
            </div>

            <p className="text-slate-400 mb-8 flex-grow">
              The gold standard for serious preparation. Learn in a disciplined classroom environment with face-to-face mentorship and peer competition.
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
              {["Strict Daily Routine", "Face-to-Face Doubt Solving", "Library Access", "Competitive Peer Group"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-orange-500/20 text-[#FF7F50] flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link to="/centers" className="mt-auto">
              <button className="w-full py-4 rounded-xl bg-[#FF7F50] text-white font-bold hover:bg-[#ff6b3d] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20">
                Join Offline Batch <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LearningModes;