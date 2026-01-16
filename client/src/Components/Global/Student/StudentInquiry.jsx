import React from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  PhoneCall, 
  Mail, 
  MessageSquare,
  MapPin
} from "lucide-react";

const StudentInquiry = () => {
  return (
    <section className="py-24 bg-white font-sans border-t border-slate-200" id="student-inquiry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* --- LEFT: The "Why" & Contact Info --- */}
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#FF7F50] font-bold text-xs uppercase tracking-widest mb-2 block">
                Student Admissions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Not sure where to start? <br />
                <span className="text-[#FF7F50]">Let us guide you.</span>
              </h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Whether you are looking for an offline center near you or need advice on which batch to join, our academic counselors are here to help.
              </p>

              {/* Contact Details List */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Admission Helpline</h4>
                    <p className="text-sm text-slate-500">+91 98765 43210 (10 AM - 7 PM)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Support</h4>
                    <p className="text-sm text-slate-500">admissions@krj.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Head Office</h4>
                    <p className="text-sm text-slate-500">
                      2nd Floor, KP Tower, South Extension, New Delhi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT: The Inquiry Form --- */}
          <div className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-[#FF7F50]" />
                Submit an Inquiry
              </h3>

              <form className="space-y-5">
                
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Student Name"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#FF7F50] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#FF7F50] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Class & Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Target Exam / Class</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#FF7F50] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-600">
                      <option>Select Class</option>
                      <option>Class 10 (Board)</option>
                      <option>Class 12 (Board)</option>
                      <option>JEE Mains/Adv</option>
                      <option>NEET UG</option>
                      <option>Foundation (8-10)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Preferred Mode</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#FF7F50] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-600">
                      <option>Select Mode</option>
                      <option>Offline Center</option>
                      <option>Online App</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: City */}
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">City / Location</label>
                   <input 
                      type="text" 
                      placeholder="e.g. Patna, Delhi, or Remote"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#FF7F50] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    />
                </div>

                {/* Row 4: Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Your Query</label>
                  <textarea 
                    rows="3"
                    placeholder="Tell us what you are looking for..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#FF7F50] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="button" // Change to submit in production
                  className="w-full py-4 bg-[#FF7F50] text-white font-bold rounded-xl hover:bg-[#ff6b3d] shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={18} />
                  Request Call Back
                </button>

                <p className="text-center text-xs text-slate-400 mt-4">
                  By submitting, you agree to receive academic counseling updates via WhatsApp/SMS.
                </p>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StudentInquiry;