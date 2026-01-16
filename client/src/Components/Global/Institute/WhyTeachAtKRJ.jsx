import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpenCheck, 
  Users, 
  Mic2, 
  CalendarClock, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";

const TEACHER_BENEFITS = [
  {
    id: 1,
    title: "Structured Curriculum Support",
    description: "Don't waste hours hunting for questions. Get access to our centralized content repository, DPPs, and slide decks so you can focus purely on delivery.",
    icon: <BookOpenCheck size={24} />,
    color: "blue"
  },
  {
    id: 2,
    title: "Limited Batch Sizes",
    description: "We cap our batches. You aren't broadcasting to a nameless crowd; you are mentoring students you actually know.",
    icon: <Users size={24} />,
    color: "emerald"
  },
  {
    id: 3,
    title: "Stable Schedules",
    description: "Respect for your time. Classes are scheduled in advance. No surprise 'Sunday Marathons' or last-minute cancellations.",
    icon: <CalendarClock size={24} />,
    color: "rose"
  },
  {
    id: 4,
    title: "Academic Autonomy",
    description: "We provide the syllabus, but you own the classroom. We respect your unique teaching style and methodology.",
    icon: <Mic2 size={24} />,
    color: "purple"
  },
  {
    id: 5,
    title: "Growth & Upskilling",
    description: "Teachers need to learn too. Access internal workshops on digital pedagogy, board management, and subject mastery.",
    icon: <TrendingUp size={24} />,
    color: "orange"
  },
  {
    id: 6,
    title: "Job Stability",
    description: "We hire for the long term. KRJ offers competitive compensation packages with year-round stability, not just seasonal gigs.",
    icon: <ShieldCheck size={24} />,
    color: "slate"
  }
];

const WhyTeachAtKRJ = () => {
  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-3 block">
            The Faculty Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Teach where you are <span className="text-blue-600">Valued.</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            At KRJ, we believe that happy teachers create successful students. We have built an environment that eliminates administrative chaos so you can do what you do best: <strong>Teach.</strong>
          </p>
        </div>

        {/* --- Benefits Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEACHER_BENEFITS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
            >
              
              <div className={`w-12 h-12 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyTeachAtKRJ;