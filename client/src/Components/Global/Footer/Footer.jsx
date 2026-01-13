import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ChevronDown,
  ExternalLink,
  Download,
  Map
} from 'lucide-react';
import Logo from '../Logo/Logo'; // Assuming you have this

// --- DATA STRUCTURE ---
const FOOTER_LINKS = [
  {
    title: "School Preparation",
    links: [
      "NCERT Solutions Class 6-12",
      "CBSE Sample Papers",
      "ICSE Board Resources",
      "State Board Syllabus",
      "Class 10th Study Material",
      "Class 12th Notes",
      "Physics Formulas",
      "Chemistry Formulas",
      "Maths Formulas"
    ]
  },
  {
    title: "Entrance Exams (UG)",
    links: [
      "JEE Main & Advanced",
      "NEET UG",
      "CUET (Common Entrance)",
      "BITSAT Preparation",
      "State CETs",
      "Nursing Entrance",
      "Agriculture Exams",
      "JEE Previous Year Papers",
      "NEET Previous Year Papers"
    ]
  },
  {
    title: "Govt. & Competitive",
    links: [
      "UPSC CSE",
      "SSC CGL / CHSL",
      "Banking (PO/Clerk)",
      "Railway Exams (RRB)",
      "Defence (NDA/CDS)",
      "Teaching Exams (CTET)",
      "State PSC",
      "Gate Exam",
      "CA / CS Exams"
    ]
  },
  {
    title: "Courses & Batches",
    links: [
      "Live Online Coaching",
      "Offline Centres (Vidyapeeth)",
      "Distance Learning Program",
      "Test Series",
      "Crash Courses",
      "Scholarship Admission Test",
      "School Integrated Program"
    ]
  },
  {
    title: "Student Corner",
    links: [
      "Student Login",
      "Parent Portal",
      "Faculty Login",
      "KRJ Store (Books)",
      "Library Access",
      "Results & Achievers",
      "Careers at KRJ",
      "Become a Partner"
    ]
  }
];

// --- COMPONENTS ---

const SocialButton = ({ Icon, href }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#FF7F50] hover:text-white transition-all duration-300 border border-slate-700 hover:border-[#FF7F50]"
  >
    <Icon size={18} />
  </a>
);

// Mobile Accordion Item
const MobileFooterSection = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left text-slate-200 font-bold"
      >
        {title}
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF7F50]' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-3 pb-4"
          >
            {links.map((link, i) => (
              <li key={i}>
                <a href="#" className="text-slate-400 text-sm hover:text-[#FF7F50] block px-2">
                  {link}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white font-sans border-t-4 border-[#FF7F50]">
      
      {/* --- TOP SECTION: APP & NEWSLETTER (New addition for "Promising" look) --- */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-[#FF7F50]">
               <Download size={24} />
             </div>
             <div>
               <h4 className="font-bold text-lg text-white">Download the KRJ App</h4>
               <p className="text-slate-400 text-sm">Access free notes, quizzes & live classes.</p>
             </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">
               Google Play
             </button>
             <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold border border-slate-700 hover:border-slate-500 transition-colors">
               App Store
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND & INFO (Wider) */}
          <div className="lg:col-span-4 space-y-6 pr-0 lg:pr-8">
            <Logo foot={true} />
            
            <div className="space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed text-justify">
                <strong>About KRJ:</strong> Knowledge Raising Junction is a premier education platform providing comprehensive learning experiences to students of classes 6 to 12 and those preparing for JEE, NEET, and Govt Exams. We provide extensive NCERT solutions, sample papers, and previous year papers, making us a one-stop solution for all resources.
              </p>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-lg">
  <h5 className="text-[#FF7F50] font-bold text-sm mb-3 uppercase tracking-wide">Head Office</h5>
  <ul className="space-y-3">
    <li className="flex items-start gap-3 text-slate-600 text-sm font-medium">
      <MapPin size={16} className="text-[#FF7F50] mt-0.5 shrink-0" />
      <span className="leading-relaxed">123, Education Tower, Sector 62, Noida, Uttar Pradesh - 201309</span>
    </li>
    <li className="flex items-center gap-3 text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors cursor-pointer">
      <Phone size={16} className="text-[#FF7F50]" />
      <span>+91 98765 43210</span>
    </li>
    <li className="flex items-center gap-3 text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors cursor-pointer">
      <Mail size={16} className="text-[#FF7F50]" />
      <span>support@krj.edu.in</span>
    </li>
  </ul>
</div>

              {/* Socials */}
              <div>
                <h5 className="text-white font-bold text-sm mb-3">Connect with us</h5>
                <div className="flex gap-3">
                  <SocialButton Icon={Youtube} href="#" />
                  <SocialButton Icon={Instagram} href="#" />
                  <SocialButton Icon={Facebook} href="#" />
                  <SocialButton Icon={Linkedin} href="#" />
                  <SocialButton Icon={Twitter} href="#" />
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNS 2-5: MEGA LINKS (Desktop Grid / Mobile Accordion) */}
          <div className="lg:col-span-8">
            
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              {FOOTER_LINKS.map((section, idx) => (
                <div key={idx} className={idx === 4 ? "col-span-2 md:col-span-1" : ""}>
                  <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-[#FF7F50] pl-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href="#" className="text-slate-400 text-sm hover:text-[#FF7F50] transition-colors flex items-center gap-1 group">
                          <span className="w-0 group-hover:w-2 h-[1px] bg-[#FF7F50] transition-all duration-300"></span>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile View (Accordions) */}
            <div className="md:hidden">
              {FOOTER_LINKS.map((section, idx) => (
                <MobileFooterSection key={idx} title={section.title} links={section.links} />
              ))}
            </div>

            {/* Offline Centers CTA */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-slate-700 rounded-full text-[#FF7F50]">
                    <Map size={24} />
                 </div>
                 <div>
                    <h5 className="font-bold text-white text-lg">Find a KRJ Centre near you</h5>
                    <p className="text-slate-400 text-sm">Experience offline learning at our Vidyapeeth centers.</p>
                 </div>
              </div>
              <button className="px-6 py-3 bg-[#FF7F50] hover:bg-[#ff6b3d] text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-900/20 whitespace-nowrap">
                Locate Centres
              </button>
            </div>

          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} Knowledge Raising Junction (KRJ) EdTech Pvt. Ltd. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms & Conditions", "Refund Policy", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-slate-500 hover:text-[#FF7F50] text-sm font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* SEO Disclaimer (Optional but adds to the "Mega" feel) */}
        <div className="mt-8 pt-8 border-t border-slate-900 text-center">
            <p className="text-[10px] text-slate-700 leading-relaxed">
              Disclaimer: KRJ is an online education platform. All the content provided here is for educational purposes only. We do not claim to be the official website of any government organization.
            </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;