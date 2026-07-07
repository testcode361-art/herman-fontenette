// src/components/Footer.jsx - Updated with centered button in one horizontal line
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 glass mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Footer content in one horizontal line */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Copyright - Left */}
          <div className="text-sm text-[#B8C4D6] whitespace-nowrap">
            &copy; {new Date().getFullYear()} Herman Fontenette — All rights reserved.
          </div>

          {/* Launch Portal Button - Center */}
          <div className="flex-shrink-0">
            <a
              href="https://buy.stripe.com/7sY5kEdVm6vNfRU8Ey2kw07"
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative group
                px-5 py-2 sm:px-6 sm:py-2.5
                bg-gradient-to-r from-[#29B6F6] via-[#38D9FF] to-[#29B6F6]
                text-white text-xs sm:text-sm font-medium
                rounded-full
                shadow-md shadow-[#29B6F6]/20
                transform transition-all duration-300
                hover:scale-105 hover:shadow-[#38D9FF]/40
                hover:shadow-lg
                border border-white/15
                overflow-hidden
                flex items-center gap-2
              "
            >
              {/* Glowing background effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#29B6F6] via-[#38D9FF] to-[#29B6F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></span>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-rocket text-[#38D9FF] group-hover:text-white transition-colors duration-300 text-xs"></i>
                Launch & Go-Live Portal
                <i className="fas fa-arrow-right text-[#38D9FF] group-hover:text-white transition-colors duration-300 group-hover:translate-x-1 text-xs"></i>
              </span>
              
              {/* Animated border glow */}
              <span className="absolute inset-0 rounded-full border border-[#38D9FF]/20 group-hover:border-[#38D9FF]/70 transition-all duration-300"></span>
            </a>
          </div>

          {/* Navigation Links - Right */}
          <div className="flex gap-4 md:gap-6 text-[#B8C4D6] text-sm whitespace-nowrap">
            <a href="#" className="hover:text-[#38D9FF] transition duration-200">Privacy</a>
            <a href="#contact" className="hover:text-[#38D9FF] transition duration-200">Contact</a>
            <a href="#books" className="hover:text-[#38D9FF] transition duration-200">Books</a>
          </div>
        </div>

        {/* Bottom decorative elements */}
        {/* <div className="flex justify-between items-center mt-3">
          <div className="text-[#B8C4D6]/30 text-[10px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38D9FF] animate-pulse"></span>
             cosmic vibe 
          </div>
          <div className="text-[#B8C4D6]/20 text-[10px]">
            ✦
          </div>
        </div> */}
      </div>

      {/* Glowing accent line - thinner */}
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-[#38D9FF] to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;