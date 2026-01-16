import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  Briefcase, 
  HelpCircle,
  CheckCircle2
} from "lucide-react";

const ROLES = [
  {
    id: "student",
    label: "Student",
    description: "I want to join a course or have a query about my batch.",
    icon: <GraduationCap size={24} />
  },
  {
    id: "parent",
    label: "Parent / Guardian",
    description: "I want to discuss my child's progress or admission.",
    icon: <Users size={24} />
  },
  {
    id: "teacher",
    label: "Teacher / Faculty",
    description: "I am interested in teaching roles or academic partnerships.",
    icon: <Briefcase size={24} />
  },
  {
    id: "general",
    label: "General Visitor",
    description: "I have a press inquiry, business proposal, or other question.",
    icon: <HelpCircle size={24} />
  }
];

const ContactRouting = () => {
  // State to manage selection (This would be passed down to the Form component in a real app)
  const [selectedRole, setSelectedRole] = useState("student");

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            First, tell us who you are.
          </h2>
          <p className="text-sm text-slate-500">
            This helps us route your query to the right department immediately.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            
            return (
              <motion.button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-start gap-4 p-5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected 
                    ? "bg-white border-[#FF7F50] shadow-md shadow-orange-500/10 ring-1 ring-[#FF7F50]" 
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {/* Selection Indicator Icon */}
                <div className={`absolute top-4 right-4 transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0"}`}>
                  <CheckCircle2 size={20} className="text-[#FF7F50] fill-orange-50" />
                </div>

                {/* Role Icon */}
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected 
                    ? "bg-orange-50 text-[#FF7F50]" 
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {role.icon}
                </div>

                {/* Text */}
                <div className="pr-6">
                  <h3 className={`font-bold text-base mb-1 ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                    {role.label}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactRouting;