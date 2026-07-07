// src/components/Books.jsx - Updated with modal integration
import React, { useState, useEffect } from 'react';
import { books } from '../data';
import BookModal from './BookModal';

const Books = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(books.length / itemsPerView);
  const maxIndex = totalSlides - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
  };

  // Get current visible books
  const startIndex = currentIndex * itemsPerView;

  return (
    <section id="books" className="section-spacer max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-light text-center mb-4 glow-text">
        Featured <span className="text-[#38D9FF]">Books</span>
      </h2>
      <p className="text-center text-[#B8C4D6] text-sm mb-12">
        {books.length} titles available — Navigate through the collection
      </p>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div 
                key={slideIndex}
                className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
              >
                {books
                  .slice(slideIndex * itemsPerView, slideIndex * itemsPerView + itemsPerView)
                  .map((book, idx) => (
                    <div
                      key={`${slideIndex}-${idx}`}
                      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Book Cover */}
                      <div className="w-full h-64 bg-gradient-to-br from-[#0B1B33] to-[#101C3F] flex items-center justify-center relative overflow-hidden">
                        {book.cover ? (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-contain p-3"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const parent = e.target.parentElement;
                              parent.innerHTML = `
                                <div class="text-5xl text-[#38D9FF]/30">
                                  <i class="fas fa-book-open"></i>
                                </div>
                                <p class="text-xs text-[#B8C4D6]/50 mt-2">Cover not available</p>
                              `;
                            }}
                          />
                        ) : (
                          <div className="text-5xl text-[#38D9FF]/30">
                            <i className="fas fa-book-open"></i>
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#B8C4D6] mb-2">Genre: Sci-Fi / Faith</p>
                        <p className="text-sm text-[#B8C4D6] flex-1 leading-relaxed line-clamp-3">
                          {book.description}
                        </p>
                        <button
                          onClick={() => openModal(book)}
                          className="mt-4 self-start text-[#38D9FF] text-sm font-medium border border-[#38D9FF]/40 px-4 py-1.5 rounded-full hover:bg-[#38D9FF]/10 hover:border-[#38D9FF]/80 transition duration-200 inline-flex items-center gap-2"
                        >
                          View Details
                          <i className="fas fa-arrow-right text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-[#0B1B33]/80 backdrop-blur-sm text-white p-3 rounded-full border border-white/10 hover:border-[#38D9FF] hover:bg-[#0B1B33] transition-all duration-300 shadow-lg hover:shadow-[#38D9FF]/20 z-10"
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left text-[#38D9FF]"></i>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-[#0B1B33]/80 backdrop-blur-sm text-white p-3 rounded-full border border-white/10 hover:border-[#38D9FF] hover:bg-[#0B1B33] transition-all duration-300 shadow-lg hover:shadow-[#38D9FF]/20 z-10"
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-right text-[#38D9FF]"></i>
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-[#38D9FF] shadow-lg shadow-[#38D9FF]/30'
                    : 'w-2 bg-[#B8C4D6]/30 hover:bg-[#B8C4D6]/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Book counter */}
      <div className="text-center mt-6">
        <span className="text-[#B8C4D6] text-sm border border-white/10 px-6 py-2 rounded-full glass">
          Showing {startIndex + 1} - {Math.min(startIndex + itemsPerView, books.length)} of {books.length} books
        </span>
      </div>

      {/* Modal */}
      <BookModal 
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Books;