import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  BookOpen, 
  School,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const ChoosePath = () => {
  return (
    <section className="py-24 bg-white font-sans -mt-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* --- PATH 1: Teaching & Academic Roles --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 hover:border-slate-300 hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            {/* Icon Header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={36} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  Teaching & <br /> Academic Roles
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Join our faculty team. We are looking for passionate educators, subject matter experts, and academic coordinators who want to make a difference.
            </p>

            {/* Role List */}
            <div className="space-y-4 mb-10 flex-grow">
              {[
                { label: "Senior Faculties (JEE/NEET)", icon: <Users size={18} /> },
                { label: "Subject Matter Experts (Content)", icon: <BookOpen size={18} /> },
                { label: "Academic Coordinators", icon: <School size={18} /> }
              ].map((role) => (
                <div key={role.label} className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="text-blue-600">{role.icon}</div>
                  {role.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20">
              View Teaching Opportunities <ArrowRight size={20} />
            </button>
            
          </motion.div>

          {/* --- PATH 2: Student Opportunities & Queries --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative bg-orange-50/50 rounded-3xl p-8 md:p-10 border border-orange-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
          >
             {/* Icon Header */}
             <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-orange-100 text-[#FF7F50] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={36} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  Student & <br /> Admission Queries
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Looking to join a batch? Or perhaps you are a student looking for internship opportunities within KRJ? Start here.
            </p>

            {/* Role List */}
            <div className="space-y-4 mb-10 flex-grow">
              {[
                { label: "Active Batch Admissions", icon: <School size={18} /> },
                { label: "Offline Center Enquiries", icon: <Users size={18} /> },
                { label: "Course Guidance / Counseling", icon: <HelpCircle size={18} /> }
              ].map((role) => (
                <div key={role.label} className="flex items-center gap-3 text-slate-700 font-medium bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                  <div className="text-[#FF7F50]">{role.icon}</div>
                  {role.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="w-full py-4 bg-[#FF7F50] text-white rounded-xl font-bold hover:bg-[#ff6b3d] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
              Apply / Query as Student <ArrowRight size={20} />
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ChoosePath;