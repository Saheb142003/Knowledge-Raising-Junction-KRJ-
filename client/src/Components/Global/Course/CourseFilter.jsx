import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ArrowUpDown 
} from "lucide-react";

// --- FILTER DATA ---
const FILTERS_CONFIG = [
  {
    id: "board",
    label: "Board / Stream",
    type: "radio", // Single select logic visually
    options: ["State Board", "CBSE", "Foundation", "Graduation"]
  },
  {
    id: "class",
    label: "Class / Level",
    type: "checkbox",
    options: ["Class 6-10", "Class 11-12", "FY / SY / TY"]
  },
  {
    id: "type",
    label: "Course Type",
    type: "checkbox",
    options: ["Live + Recorded", "Live Only", "Recorded Only"]
  },
  {
    id: "subject",
    label: "Subject",
    type: "checkbox",
    options: ["Maths", "Science", "Commerce", "Arts", "Competitive"]
  },
  {
    id: "extras",
    label: "Extras",
    type: "checkbox",
    options: ["Includes Tests", "Includes Assignments", "Includes Guess Papers"]
  }
];

const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest Added" },
  { id: "price_low", label: "Price: Low to High" },
  { id: "price_high", label: "Price: High to Low" },
];

// --- SUB-COMPONENT: Filter Section Accordion ---
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left mb-2 group"
      >
        <span className="font-bold text-slate-800 text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-slate-400 group-hover:text-[#FF7F50]" />
        ) : (
          <ChevronDown size={16} className="text-slate-400 group-hover:text-[#FF7F50]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CourseFilters = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("popular");
  
  // Mock State for filters
  const [filters, setFilters] = useState({
    board: [],
    class: [],
    type: [],
    subject: [],
    extras: []
  });

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  // --- CONTENT RENDERER (Shared between Mobile/Desktop) ---
  const FilterContent = () => (
    <>
      {/* Sort Section */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
          Sort By
        </label>
        <div className="space-y-2">
          {SORT_OPTIONS.map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer group">
              <input 
                type="radio" 
                name="sort" 
                className="hidden" 
                checked={selectedSort === option.id}
                onChange={() => setSelectedSort(option.id)}
              />
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 transition-colors ${
                selectedSort === option.id ? "border-[#FF7F50]" : "border-slate-300"
              }`}>
                {selectedSort === option.id && <div className="w-2 h-2 rounded-full bg-[#FF7F50]" />}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                selectedSort === option.id ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
              }`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Filters */}
      {FILTERS_CONFIG.map((section) => (
        <FilterSection key={section.id} title={section.label}>
          {section.options.map((option) => (
            <label key={option} className="flex items-center cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-[#FF7F50] checked:bg-[#FF7F50]"
                  checked={filters[section.id].includes(option)}
                  onChange={() => handleCheckboxChange(section.id, option)}
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <Check size={10} strokeWidth={4} />
                </div>
              </div>
              <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </FilterSection>
      ))}

      {/* Apply Button (Mobile Only usually, but helpful visual) */}
      <div className="mt-8 pt-4">
        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-[#FF7F50] transition-colors shadow-lg shadow-slate-900/10">
          Apply Filters
        </button>
        <button 
           onClick={() => setFilters({ board: [], class: [], type: [], subject: [], extras: [] })}
           className="w-full py-3 text-slate-400 font-bold text-xs mt-2 hover:text-slate-600"
        >
          Reset All
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* =========================================
          DESKTOP SIDEBAR (Sticky)
      ========================================= */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
        <div className="sticky top-24 max-h-[calc(180vh-120px)] overflow-y-auto noScroll pr-2 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* Sidebar Header */}
          <div className="flex items-center gap-2 mb-6">
            <Filter size={18} className="text-[#FF7F50]" />
            <h3 className="text-lg font-bold text-slate-900">Filters</h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <FilterContent />
          </div>

        </div>
      </aside>

      {/* =========================================
          MOBILE TRIGGER & DRAWER
      ========================================= */}
      <div className="lg:hidden mb-6">
        
        {/* Mobile Horizontal Bar */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md whitespace-nowrap"
          >
            <Filter size={16} /> Filters & Sort
          </button>
          
          {/* Quick Pills (Horizontal Scroll) */}
          {["CBSE", "Class 10", "Maths"].map((pill) => (
             <button key={pill} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium whitespace-nowrap">
               {pill}
             </button>
          ))}
        </div>

        {/* The Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
              />
              
              {/* Slide-over Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Filter size={20} className="text-[#FF7F50]" /> 
                    Filters
                  </h3>
                  <button 
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  <FilterContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default CourseFilters;