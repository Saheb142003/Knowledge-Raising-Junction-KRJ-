import React from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  FlaskConical, 
  Globe, 
  Briefcase, 
  ArrowRight, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

// --- MOCK MAPPING DATA ---
const DEPARTMENTS = [
  {
    id: "math",
    title: "Mathematics Dept.",
    description: "From basic algebra to advanced calculus.",
    icon: <Calculator size={24} />,
    color: "blue",
    courses: [
      { name: "Class 10 CBSE Maths", url: "/course/math-10" },
      { name: "Class 12 State Board", url: "/course/math-12" },
      { name: "JEE Mains Foundation", url: "/course/jee-foundation" },
      { name: "Vedic Maths Skill", url: "/course/vedic-maths" }
    ]
  },
  {
    id: "science",
    title: "Science Dept.",
    description: "Physics, Chemistry & Biology integrated.",
    icon: <FlaskConical size={24} />,
    color: "emerald",
    courses: [
      { name: "NEET UG Biology", url: "/course/neet-bio" },
      { name: "Class 10 Science Combo", url: "/course/science-10" },
      { name: "Physics for JEE Adv", url: "/course/physics-jee" },
      { name: "Chemistry Lab Virtual", url: "/course/chem-lab" }
    ]
  },
  {
    id: "commerce",
    title: "Commerce & Arts",
    description: "Accounting, Economics & Humanities.",
    icon: <Briefcase size={24} />,
    color: "orange",
    courses: [
      { name: "Class 11 Accounts", url: "/course/accounts-11" },
      { name: "Economics Micro/Macro", url: "/course/economics" },
      { name: "Business Studies", url: "/course/bst" },
      { name: "CA Foundation Prep", url: "/course/ca-foundation" }
    ]
  }
];

const FacultyCourseMap = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Expertise in <span className="text-[#FF7F50]">Action.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            See where our faculties apply their methodology. Explore courses curated and taught by these specific departments.
          </p>
        </div>

        {/* --- Department Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
            >
              
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-${dept.color}-50 text-${dept.color}-600 flex items-center justify-center mb-4`}>
                    {dept.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#FF7F50] transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {dept.description}
                  </p>
                </div>
              </div>

              {/* Course List */}
              <div className="space-y-3 mb-8">
                {dept.courses.map((course) => (
                  <Link 
                    key={course.name} 
                    to={course.url}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:border-[#FF7F50]/30 hover:shadow-sm transition-all group/link"
                  >
                    <span className="text-sm font-semibold text-slate-600 group-hover/link:text-slate-900">
                      {course.name}
                    </span>
                    <ChevronRight size={16} className="text-slate-300 group-hover/link:text-[#FF7F50]" />
                  </Link>
                ))}
              </div>

              {/* CTA Footer */}
              <div className="pt-6 border-t border-slate-100 text-center">
                <Link 
                  to="/courses" 
                  className={`inline-flex items-center gap-2 text-sm font-bold text-${dept.color}-600 hover:gap-3 transition-all`}
                >
                  View All {dept.title.split(" ")[0]} Courses <ArrowRight size={16} />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FacultyCourseMap;