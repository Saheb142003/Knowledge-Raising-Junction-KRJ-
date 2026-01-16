import React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

// --- MOCK DATA ---
const CENTERS = [
  {
    id: 1,
    city: "New Delhi (Head Office)",
    address: "2nd Floor, KP Tower, South Extension Part-1, New Delhi - 110049",
    phone: "+91 98765 43210",
    hours: "09:00 AM - 07:00 PM (Mon-Sat)",
    mapLink: "#"
  },
  {
    id: 2,
    city: "Patna (Boring Road)",
    address: "Opposite AN College, Boring Road, Patna, Bihar - 800001",
    phone: "+91 98765 11111",
    hours: "08:00 AM - 08:00 PM (Daily)",
    mapLink: "#"
  },
  {
    id: 3,
    city: "Lucknow (Hazratganj)",
    address: "3rd Floor, City Mall, Hazratganj, Lucknow, UP - 226001",
    phone: "+91 98765 22222",
    hours: "09:00 AM - 07:00 PM (Mon-Sat)",
    mapLink: "#"
  },
  {
    id: 4,
    city: "Kota (Rajeev Gandhi Nagar)",
    address: "Plot 12, Main Road, Rajeev Gandhi Nagar, Kota, Rajasthan",
    phone: "+91 98765 33333",
    hours: "08:00 AM - 08:00 PM (Daily)",
    mapLink: "#"
  }
];

const OfflineCenters = () => {
  return (
    <section className="py-20 bg-slate-50 font-sans border-t border-slate-200" id="centers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">
              Our Presence
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Visit our Offline Centers
            </h2>
            <p className="text-slate-500 mt-2">
              Experience the KRJ learning environment in person. Walk in for a free counseling session.
            </p>
          </div>
          
          <Link to="/centers" className="hidden md:flex items-center gap-2 text-[#FF7F50] font-bold hover:gap-3 transition-all">
            View All Cities <ArrowRight size={18} />
          </Link>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          
          {/* LEFT: Map Container (Placeholder for Google Maps Embed) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-full bg-slate-200 rounded-3xl overflow-hidden noScroll relative group"
          >
            {/* Replace this div with an actual <iframe src="..." /> */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png')] bg-cover bg-center opacity-10 grayscale group-hover:grayscale-0 transition-all duration-500" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                <MapPin size={18} className="text-[#FF7F50]" />
                View on Google Maps
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Scrollable Center List */}
          <div className="flex flex-col gap-4 overflow-y-auto noScroll pr-2 custom-scrollbar">
            {CENTERS.map((center, idx) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {center.city}
                  </h3>
                  <a href={center.mapLink} className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Navigation size={18} />
                  </a>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {center.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-slate-400 shrink-0" />
                    <p className="text-sm text-slate-600 font-medium">
                      {center.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-slate-400 shrink-0" />
                    <p className="text-sm text-slate-500">
                      {center.hours}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}

            {/* Mobile CTA (Visible only on small screens) */}
            <div className="md:hidden pt-4 text-center">
              <Link to="/centers" className="inline-flex items-center gap-2 text-[#FF7F50] font-bold">
                View All Cities <ArrowRight size={18} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default OfflineCenters;