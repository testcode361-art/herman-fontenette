// src/components/BackgroundAnimation.jsx
import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    let shootingStars = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
        this.hue = 200 + Math.random() * 40; // Blue to cyan range
      }

      update() {
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity > 1 || this.opacity < 0.1) {
          this.twinkleDirection *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 217, 255, ${this.opacity})`;
        ctx.fill();
        
        // Glow effect
        if (this.size > 1) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3
          );
          gradient.addColorStop(0, `rgba(56, 217, 255, ${this.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(56, 217, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Create shooting stars
    class ShootingStar {
      constructor() {
        this.reset();
        this.opacity = 0;
        this.fadeIn = true;
      }

      reset() {
        this.x = Math.random() * canvas.width * 0.6;
        this.y = Math.random() * canvas.height * 0.3;
        this.length = Math.random() * 150 + 50;
        this.speed = Math.random() * 8 + 4;
        this.angle = (Math.random() * 60 + 30) * Math.PI / 180;
        this.trail = [];
        this.maxTrail = 20;
        this.active = false;
        this.waitTime = Math.random() * 3000 + 1000;
        this.timer = 0;
        this.hue = 200 + Math.random() * 40;
      }

      update() {
        if (!this.active) {
          this.timer += 16;
          if (this.timer > this.waitTime) {
            this.active = true;
            this.timer = 0;
            this.opacity = 1;
          }
          return;
        }

        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) {
          this.trail.shift();
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.opacity -= 0.01;

        if (this.opacity <= 0 || 
            this.x > canvas.width || 
            this.y > canvas.height ||
            this.x < 0 || 
            this.y < 0) {
          this.active = false;
          this.reset();
        }
      }

      draw() {
        if (!this.active && this.trail.length === 0) return;

        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const progress = i / this.trail.length;
          const alpha = progress * this.opacity * 0.6;
          const size = progress * 2;
          
          ctx.beginPath();
          ctx.arc(this.trail[i].x, this.trail[i].y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 217, 255, ${alpha})`;
          ctx.fill();
        }

        // Draw head
        if (this.active) {
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, 10
          );
          gradient.addColorStop(0, `rgba(56, 217, 255, ${this.opacity})`);
          gradient.addColorStop(0.5, `rgba(56, 217, 255, ${this.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(56, 217, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.fill();
        }
      }
    }

    // Initialize stars
    for (let i = 0; i < 200; i++) {
      stars.push(new Star());
    }

    // Initialize shooting stars
    for (let i = 0; i < 8; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.7
      );
      gradient.addColorStop(0, 'rgba(11, 27, 51, 0.3)');
      gradient.addColorStop(1, 'rgba(6, 17, 31, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Update and draw shooting stars
      shootingStars.forEach(star => {
        star.update();
        star.draw();
      });

      // Draw nebula-like glow
      const time = Date.now() * 0.0001;
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + 0.6 * (0.5 + 0.5 * Math.sin(time + i * 2)));
        const y = canvas.height * (0.3 + 0.4 * (0.5 + 0.5 * Math.sin(time * 0.7 + i * 1.5)));
        const radius = 200 + Math.sin(time + i) * 50;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(41, 182, 246, ${0.03 + 0.02 * Math.sin(time + i)})`);
        gradient.addColorStop(0.5, `rgba(56, 217, 255, ${0.02 + 0.01 * Math.sin(time * 0.8 + i)})`);
        gradient.addColorStop(1, 'rgba(56, 217, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default BackgroundAnimation;