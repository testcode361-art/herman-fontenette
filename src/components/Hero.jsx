// src/components/Hero.jsx - Updated with animations
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const particlesRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Particle animation for the hero section
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = 195 + Math.random() * 40; // Blue to cyan
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Float up slowly
        this.y -= 0.1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
        ctx.fill();

        // Glow effect for larger particles
        if (this.size > 2) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 4
          );
          gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.opacity * 0.2})`);
          gradient.addColorStop(1, `hsla(${this.hue}, 100%, 70%, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.15 * (1 - distance / 150);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 217, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Text animation effect
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const letters = title.textContent.split('');
    title.textContent = '';

    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.05}s`;
      title.appendChild(span);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative section-spacer pt-24 overflow-hidden"
    >
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/hermanBg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#06111F]/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center z-10 relative">
        {/* Decorative floating elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#29B6F6]/5 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#38D9FF]/5 blur-3xl animate-pulse delay-1000"></div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 glow-text" ref={titleRef}>
          Herman <span className="text-[#38D9FF]"> Fontenette</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#B8C4D6] italic mb-6 animate-fadeInUp animation-delay-300">
          “Stories that travel beyond imagination.”
        </p>
        
        <p className="max-w-2xl mx-auto text-[#B8C4D6] text-base md:text-lg leading-relaxed mb-8 animate-fadeInUp animation-delay-500">
          Visionary storyteller weaving faith, urban grit, and cosmic prophecy into unforgettable narratives.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-700">
          <a
            href="#books"
            className="px-8 py-3 bg-[#29B6F6] text-white font-medium rounded-full shadow-lg shadow-[#29B6F6]/30 hover:bg-[#4FC3F7] transition duration-300 hover:scale-105 hover:shadow-[#38D9FF]/50 transform"
          >
            Explore Books
          </a>
          <a
            href="#about"
            className="px-8 py-3 glass-card text-white font-medium rounded-full border border-white/20 hover:border-[#38D9FF] transition duration-300 hover:scale-105 hover:shadow-[#38D9FF]/20 transform"
          >
            About the Author
          </a>
        </div>

        {/* Decorative glowing dots with animation */}
        <div className="mt-12 flex justify-center gap-3 animate-fadeInUp animation-delay-900">
          <span className="w-2 h-2 rounded-full bg-[#38D9FF] opacity-70 animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-[#29B6F6] opacity-40 animate-pulse animation-delay-200"></span>
          <span className="w-2 h-2 rounded-full bg-[#38D9FF] opacity-70 animate-pulse animation-delay-400"></span>
        </div>
      </div>

      {/* Subtle decorative lines with animation */}
      <div className="absolute left-0 bottom-20 w-24 h-px bg-gradient-to-r from-transparent to-[#29B6F6] opacity-30 z-10 animate-pulse"></div>
      <div className="absolute right-0 top-40 w-24 h-px bg-gradient-to-l from-transparent to-[#38D9FF] opacity-30 z-10 animate-pulse animation-delay-500"></div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 opacity-20 animate-bounce">
        <div className="w-1 h-4 bg-[#38D9FF] rounded-full"></div>
        <div className="w-1 h-6 bg-[#38D9FF] rounded-full"></div>
        <div className="w-1 h-4 bg-[#38D9FF] rounded-full"></div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        .animation-delay-900 {
          animation-delay: 900ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;