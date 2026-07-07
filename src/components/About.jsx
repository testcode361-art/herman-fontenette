// src/components/About.jsx - Updated to display author photo
import React from 'react';
import { authorData } from '../data';

const About = () => {
  return (
    <section id="about" className="section-spacer max-w-6xl mx-auto">
      <div className="glass-card rounded-2xl p-6 md:p-10 backdrop-blur-sm border border-white/10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* author photo */}
          <div className="flex-shrink-0 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#38D9FF]/40 shadow-xl shadow-[#29B6F6]/20">
            <img 
              src={authorData.cover} 
              alt={authorData.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-gradient-to-br', 'from-[#0B1B33]', 'to-[#101C3F]');
                e.target.parentElement.innerHTML = `
                  <span class="text-6xl text-[#38D9FF]/70">
                    <i class="fas fa-user-astronaut"></i>
                  </span>
                `;
              }}
            />
          </div>
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-2 glow-text">
              About the Author
            </h2>
            <p className="text-sm text-[#B8C4D6] mb-4 italic">
              {authorData.name}
            </p>
            <p className="text-[#B8C4D6] text-sm md:text-base leading-relaxed max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#29B6F6]/40">
              {authorData.bio}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="px-3 py-1 glass text-xs text-[#38D9FF] border border-[#38D9FF]/30 rounded-full">Faith-driven</span>
              <span className="px-3 py-1 glass text-xs text-[#38D9FF] border border-[#38D9FF]/30 rounded-full">Sci-Fi</span>
              <span className="px-3 py-1 glass text-xs text-[#38D9FF] border border-[#38D9FF]/30 rounded-full">Urban fiction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;