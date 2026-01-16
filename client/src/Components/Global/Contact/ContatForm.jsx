import React from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  MapPin, 
  User, 
  Mail, 
  Phone 
} from "lucide-react";

const ContactForm = () => {
  return (
    <section className="py-16 bg-white font-sans" id="inquiry-form">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100"
        >
          {/* Form Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Send us a Message
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Please fill out the form below. We usually respond within 24 hours.
            </p>
          </div>

          <form className="space-y-6">
            
            {/* Row 1: Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#FF7F50] focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#FF7F50] focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Contact & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input 
                    type="tel" 
                    placeholder="+91 98765 00000"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#FF7F50] focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">City / Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. Patna, Delhi"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#FF7F50] focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">I am a...</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#FF7F50] focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-600 appearance-none">
                  <option value="" disabled selected>Select Role</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent / Guardian</option>
                  <option value="teacher">Teacher / Faculty</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Query Regarding</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#FF7F50] focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-600 appearance-none">
                  <option value="" disabled selected>Select Topic</option>
                  <option value="courses">Online Courses</option>
                  <option value="batches">Offline Batches</option>
                  <option value="center">Center Location</option>
                  <option value="teaching">Teaching Opportunity</option>
                  <option value="other">Other / General</option>
                </select>
              </div>
            </div>

            {/* Row 4: Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Message</label>
              <textarea 
                rows="4"
                placeholder="How can we help you today?"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#FF7F50] focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="w-full py-4 bg-[#FF7F50] hover:bg-[#ff6b3d] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]">
              <Send size={18} />
              Submit Query
            </button>

            {/* Privacy Note */}
            <p className="text-center text-xs text-slate-400 mt-4">
              Your details are safe with us. We only use this info to respond to your query.
            </p>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactForm;