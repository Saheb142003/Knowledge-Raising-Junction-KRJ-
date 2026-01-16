import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Navigation, 
  Building2, 
  ArrowRight,
  School
} from "lucide-react";

// --- MOCK CENTER DATA ---
const CENTERS = [
  {
    id: 1,
    city: "New Delhi",
    type: "Flagship Campus",
    address: "CP & South Ex",
    status: "Open",
    color: "blue"
  },
  {
    id: 2,
    city: "Patna",
    type: "Regional Hub",
    address: "Boring Road",
    status: "Open",
    color: "orange"
  },
  {
    id: 3,
    city: "Lucknow",
    type: "Learning Center",
    address: "Hazratganj",
    status: "Admissions Open",
    color: "emerald"
  },
  {
    id: 4,
    city: "Rural Districts",
    type: "Satellite Centers",
    address: "12+ Locations",
    status: "Expanding",
    color: "purple"
  }
];

const CentersReach = () => {
  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* --- LEFT: The Map Visual --- */}
          <div className="lg:w-1/2 relative min-h-[400px] bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden flex items-center justify-center">
            
            {/* Background Map Pattern (Abstract Dot Grid) */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#64748b_2px,transparent_2px)] [background-size:24px_24px]" />
            
            {/* Radar Pulse Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-blue-500/30 rounded-full animate-[ping_3s_linear_infinite_1s]" />
            
            {/* Central Node */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white rounded-full shadow-xl shadow-blue-500/20 flex items-center justify-center mx-auto mb-4 border-4 border-blue-50">
                <MapPin size={32} className="text-blue-600 fill-blue-600" />
              </div>
              <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                <span className="font-bold text-slate-900 block">Pan-India Reach</span>
                <span className="text-xs text-slate-500">Connecting Urban & Rural</span>
              </div>
            </div>

            {/* Floating Dots (Decorative) */}
            {[...Array(6)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.2 }}
                 className="absolute w-3 h-3 bg-orange-400 rounded-full border-2 border-white shadow-sm"
                 style={{
                   top: `${20 + Math.random() * 60}%`,
                   left: `${20 + Math.random() * 60}%`
                 }}
               />
            ))}
          </div>

          {/* --- RIGHT: Content & List --- */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            
            <div className="mb-10">
              <span className="text-[#FF7F50] font-bold text-xs uppercase tracking-widest mb-2 block">
                Local Accessibility
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Quality education should not depend on <span className="text-blue-600">location.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Whether you are in a metro city or a remote town, KRJ centers are built to serve students across regions with the same standard of teaching.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-slate-100">
               <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-slate-900">12+</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">Cities</span>
               </div>
               <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-slate-900">50+</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">Offline Centers</span>
               </div>
               <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-slate-900">10k+</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">Students</span>
               </div>
            </div>

            {/* Center Cards (Compact Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {CENTERS.map((center) => (
                <div key={center.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-default group">
                  <div className={`w-10 h-10 rounded-lg bg-${center.color}-50 text-${center.color}-600 flex items-center justify-center shrink-0`}>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {center.city}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {center.type} • {center.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#FF7F50] transition-colors flex items-center gap-2">
                <Navigation size={18} /> Locate Nearest Center
              </button>
              <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:border-slate-400 transition-colors flex items-center gap-2">
                <School size={18} /> Join Offline Batch
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CentersReach;