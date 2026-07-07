// src/components/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent (placeholder) — thank you for reaching out!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-spacer max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/10">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-2 glow-text">
          Connect with <span className="text-[#38D9FF]">Herman</span>
        </h2>
        <p className="text-center text-[#B8C4D6] text-sm mb-8">
          Drop a message — I’d love to hear from you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#06111F]/60 border border-white/10 rounded-xl text-white placeholder:text-[#B8C4D6]/40 focus:border-[#38D9FF] focus:ring-1 focus:ring-[#38D9FF] transition outline-none"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#06111F]/60 border border-white/10 rounded-xl text-white placeholder:text-[#B8C4D6]/40 focus:border-[#38D9FF] focus:ring-1 focus:ring-[#38D9FF] transition outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#06111F]/60 border border-white/10 rounded-xl text-white placeholder:text-[#B8C4D6]/40 focus:border-[#38D9FF] focus:ring-1 focus:ring-[#38D9FF] transition outline-none resize-none"
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#29B6F6] text-white font-medium rounded-xl shadow-lg shadow-[#29B6F6]/30 hover:bg-[#4FC3F7] transition duration-300 flex items-center justify-center gap-2"
          >
            <i className="fas fa-paper-plane"></i> Send Message
          </button>
        </form>
        {/* social links */}
        <div className="mt-8 flex justify-center gap-6 text-[#B8C4D6] text-xl">
          <a href="#" className="hover:text-[#38D9FF] transition"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-[#38D9FF] transition"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-[#38D9FF] transition"><i className="fab fa-goodreads-g"></i></a>
          <a href="#" className="hover:text-[#38D9FF] transition"><i className="fab fa-amazon"></i></a>
        </div>
      </div>
    </section>
  );
};

export default Contact;