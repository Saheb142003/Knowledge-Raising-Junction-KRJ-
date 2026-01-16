import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const CONTACT_METHODS = [
  {
    id: 1,
    title: "Email Support",
    icon: <Mail size={24} />,
    color: "blue",
    content: [
      { label: "Admissions & Courses", value: "admissions@krj.in" },
      { label: "Existing Student Support", value: "support@krj.in" }
    ],
    cta: null
  },
  {
    id: 2,
    title: "Call Us",
    icon: <Phone size={24} />,
    color: "emerald",
    content: [
      { label: "Admission Helpline", value: "+91 98765 43210" },
      { label: "Availability", value: "Mon–Sat | 9 AM – 7 PM" }
    ],
    cta: null
  },
  {
    id: 3,
    title: "Offline Centers",
    icon: <MapPin size={24} />,
    color: "orange",
    content: [
      { label: "Walk-in Counseling", value: "Available at all centers" },
      { label: "Presence", value: "12+ Cities across India" }
    ],
    cta: { text: "Find a Center", link: "/centers" }
  },
  {
    id: 4,
    title: "General Inquiry",
    icon: <MessageCircle size={24} />,
    color: "purple",
    content: [
      { label: "Have a question?", value: "Chat with us or leave a message." },
      { label: "Response Time", value: "Within 24 Hours" }
    ],
    cta: { text: "Send a Query", link: "#inquiry-form" } // Anchors to next section
  }
];

const QuickContact = () => {
  return (
    <section className="py-16 bg-white font-sans -mt-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTACT_METHODS.map((method, idx) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-${method.color}-50 text-${method.color}-600 flex items-center justify-center`}>
                  {method.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {method.title}
                </h3>
              </div>

              {/* Content Details */}
              <div className="space-y-4 mb-6 flex-grow">
                {method.content.map((item, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className={`font-semibold ${i === 0 ? "text-slate-800 text-base" : "text-slate-600 text-sm"}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Button (Conditional) */}
              {method.cta ? (
                <Link 
                  to={method.cta.link}
                  className={`flex items-center gap-2 text-sm font-bold text-${method.color}-600 hover:gap-3 transition-all mt-auto pt-4 border-t border-slate-50`}
                >
                  {method.cta.text} <ArrowRight size={16} />
                </Link>
              ) : (
                <div className="mt-auto pt-4 border-t border-slate-50">
                   <a href={`mailto:${method.content[0].value}`} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
                      Copy Details
                   </a>
                </div>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default QuickContact;