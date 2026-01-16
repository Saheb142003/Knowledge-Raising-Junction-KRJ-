import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  UserCheck, 
  CheckCircle,
  Info
} from "lucide-react";

const PROCESS_STEPS = [
  {
    id: 1,
    title: "Submit Application",
    description: "Fill out the form above with accurate details. Whether it's a job application or course inquiry, this is step one.",
    icon: <FileText size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Internal Review",
    description: "Our HR or Academic Team reviews your profile. We check for eligibility, batch availability, or role fitment.",
    icon: <Search size={24} />,
    color: "orange"
  },
  {
    id: 3,
    title: "Interaction",
    description: "Shortlisted candidates get an interview call. Students receive a counseling call to discuss batch options.",
    icon: <UserCheck size={24} />,
    color: "purple"
  },
  {
    id: 4,
    title: "Final Confirmation",
    description: "You receive an official offer letter (for jobs) or an admission confirmation (for students) via email.",
    icon: <CheckCircle size={24} />,
    color: "emerald"
  }
];

const ApplicationProcess = () => {
  return (
    <section className="py-20 bg-slate-50 font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            How it <span className="text-blue-600">Works.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We value your time. Here is our transparent 4-step process from submission to onboarding.
          </p>
        </div>

        {/* --- Process Timeline --- */}
        <div className="relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 flex flex-col md:items-center text-left md:text-center group"
              >
                
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-${step.color}-500 shadow-sm mb-6 group-hover:scale-110 group-hover:border-${step.color}-100 transition-all duration-300`}>
                  {step.icon}
                </div>

                {/* Step Number (Mobile Only) */}
                <span className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Step 0{step.id}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed px-2">
                  {step.description}
                </p>

              </motion.div>
            ))}
          </div>

        </div>

        {/* --- Transparency Note --- */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50/50 rounded-full border border-blue-100 text-sm text-blue-800">
            <Info size={18} className="shrink-0" />
            <span>
              <strong>Note:</strong> We typically respond to shortlisted applications within <strong>3-5 working days.</strong>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ApplicationProcess;