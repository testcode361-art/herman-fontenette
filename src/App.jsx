// src/App.jsx - Updated with Reviews section
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Books from './components/Books';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Background Animation */}
      <BackgroundAnimation />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Books />
          <Reviews />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;