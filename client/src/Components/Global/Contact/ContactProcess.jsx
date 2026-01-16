import React from "react";
import { motion } from "framer-motion";
import { 
  Inbox, 
  UserCog, 
  PhoneIncoming, 
  CheckCircle2,
  Clock
} from "lucide-react";

const PROCESS_STEPS = [
  {
    id: 1,
    title: "Query Received",
    description: "Our system logs your inquiry instantly. You will receive an automated email acknowledgement with a Ticket ID.",
    icon: <Inbox size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Expert Assigned",
    description: "Your query is routed to the relevant department (Admissions, Faculty, or Support) based on your selection.",
    icon: <UserCog size={24} />,
    color: "indigo"
  },
  {
    id: 3,
    title: "Follow-up",
    description: "Our counselor or support executive will contact you via Phone or Email to discuss your specific needs.",
    icon: <PhoneIncoming size={24} />,
    color: "purple"
  },
  {
    id: 4,
    title: "Resolution",
    description: "We ensure you have all the answers—whether it's syllabus details, fee structure, or technical help.",
    icon: <CheckCircle2 size={24} />,
    color: "emerald"
  }
];

const ContactProcess = () => {
  return (
    <section className="py-20 bg-white font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            We don't leave you <span className="text-blue-600">hanging.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Here is exactly what happens after you hit "Submit". We value your time and aim for quick resolutions.
          </p>
        </div>

        {/* --- Timeline Container --- */}
        <div className="relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-slate-100 -z-0">
             {/* Progress gradient (Optional visual flair) */}
             <div className="w-1/2 h-full bg-gradient-to-r from-blue-100 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-${step.color}-600 shadow-sm mb-6 group-hover:scale-110 group-hover:border-${step.color}-200 group-hover:shadow-lg group-hover:shadow-${step.color}-500/10 transition-all duration-300`}>
                  {step.icon}
                </div>

                {/* Step Counter (Mobile) */}
                <span className="md:hidden text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                  Step 0{step.id}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed px-2">
                  {step.description}
                </p>

              </motion.div>
            ))}
          </div>

        </div>

        {/* --- Trust / SLA Note --- */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-200 text-sm font-medium text-slate-600">
            <Clock size={16} className="text-[#FF7F50]" />
            <span>Typical Response Time: <strong>24 - 48 Hours</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactProcess;