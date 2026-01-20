import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
 

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 md:px-8 bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* --- LEFT: Subtle Brand Identity --- */}
        <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <div className="scale-75 origin-left grayscale">
            <Logo />
          </div>
          <span className="text-xs font-semibold text-slate-500 hidden sm:block">
            Education Systems
          </span>
        </div>

        {/* --- RIGHT: Copyright & Legal --- */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[10px] md:text-xs text-slate-400 font-medium">
          
          <span>© {currentYear} KRJ. All rights reserved.</span>
          
          <div className="hidden md:block w-px h-3 bg-slate-300" />
          
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-600 transition-colors">
              Terms of Service
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default DashboardFooter;