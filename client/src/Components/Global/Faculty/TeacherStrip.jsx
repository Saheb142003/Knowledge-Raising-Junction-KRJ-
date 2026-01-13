import React from "react";
import { ArrowRight, Briefcase } from "lucide-react";

const TeacherStrip = () => {
  return (
    <section className="py-12 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Validation (Social Proof) */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            
            {/* Avatar Stack */}
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-400"
                >
                  {/* Placeholder for teacher images */}
                  T{i}
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                +20
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Learn from the Masters.
              </h3>
              <p className="text-slate-500 text-sm font-medium">
                Our faculty includes IITians, PhDs, and Industry Experts.
              </p>
            </div>
          </div>

          {/* Divider (Hidden on mobile) */}
          <div className="hidden md:block w-px h-12 bg-slate-200 mx-4"></div>

          {/* Right: Recruitment CTA */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-right">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                Careers at KRJ
              </span>
              <p className="text-slate-900 font-bold">
                Are you an educator?
              </p>
            </div>
            
            <button className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 hover:border-slate-900 rounded-xl text-slate-900 font-bold transition-all hover:shadow-lg">
              <Briefcase size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
              <span>Teach with KRJ</span>
              <ArrowRight size={18} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeacherStrip;