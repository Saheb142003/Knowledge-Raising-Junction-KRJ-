import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  ArrowRight,
  Filter
} from "lucide-react";

// --- MOCK JOB DATA ---
const JOBS = [
  {
    id: 1,
    title: "Senior Physics Faculty",
    department: "JEE Advanced Dept.",
    mode: "Offline",
    location: "New Delhi (South Ex)",
    experience: "5-8 Years",
    type: "Full Time",
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Mathematics Doubt Expert",
    department: "Foundation (Class 9-10)",
    mode: "Online (Remote)",
    location: "Work from Home",
    experience: "1-3 Years",
    type: "Part Time / Contract",
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "NEET Zoology Faculty",
    department: "Medical Wing",
    mode: "Hybrid",
    location: "Patna Center",
    experience: "3+ Years",
    type: "Full Time",
    posted: "Just now"
  },
  {
    id: 4,
    title: "Academic Content Creator",
    department: "R&D Team",
    mode: "Online",
    location: "Remote",
    experience: "Fresher / 1 Year",
    type: "Internship",
    posted: "3 days ago"
  }
];

const TeachingJobs = () => {
  return (
    <section className="py-24 bg-slate-50 font-sans border-t border-slate-200" id="teaching-roles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header & Filter --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">
              Current Openings
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Join our Academic Team
            </h2>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors text-sm font-medium shadow-sm">
            <Filter size={16} /> Filter Roles
          </button>
        </div>

        {/* --- Job Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {JOBS.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 group"
            >
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    {job.department}
                  </p>
                </div>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 whitespace-nowrap">
                  {job.mode}
                </span>
              </div>

              {/* Job Details */}
              <div className="flex flex-wrap gap-y-3 gap-x-6 mb-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-400" />
                  {job.experience}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  {job.type}
                </div>
              </div>

              {/* Footer / CTA */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-400">
                  Posted {job.posted}
                </span>
                
                <button className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors group/btn">
                  Apply Now 
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* --- No Jobs State (Visual Filler) --- */}
        <div className="mt-12 text-center p-8 bg-slate-100 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-sm mb-4">
            Don't see a role that fits? We are always looking for talent.
          </p>
          <button className="text-blue-600 font-bold hover:underline">
            Send your Resume to careers@krj.com
          </button>
        </div>

      </div>
    </section>
  );
};

export default TeachingJobs;