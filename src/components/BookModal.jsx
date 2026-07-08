// src/components/BookModal.jsx - Updated to show rating even without reviews
import React, { useEffect } from 'react';

const BookModal = ({ book, isOpen, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !book) return null;

  const hasReviews = book.reviews && book.reviews.length > 0;
  const hasRating = book.rating && book.rating > 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-[#06111F]/90 backdrop-blur-sm animate-fadeIn"></div>
      
      {/* Modal Content */}
      <div 
        className="relative glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl shadow-[#29B6F6]/10"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .relative.glass-card::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#B8C4D6] hover:text-white transition-colors duration-200 z-10 bg-[#0B1B33]/80 rounded-full w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#38D9FF]/50"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="p-6 md:p-8">
          {/* Book Cover and Title Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-shrink-0 w-full md:w-48 h-64 md:h-72 bg-gradient-to-br from-[#0B1B33] to-[#101C3F] rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="text-5xl text-[#38D9FF]/30">
                        <i class="fas fa-book-open"></i>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="text-5xl text-[#38D9FF]/30">
                  <i className="fas fa-book-open"></i>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white glow-text mb-3">
                {book.title}
              </h2>
              
              {/* Rating Display */}
              {hasRating && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < book.rating ? 'text-[#FFD700]' : 'text-[#B8C4D6]/30'}`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-[#B8C4D6] text-sm">
                    {book.rating}.0 ({book.totalReviews || 0} {book.totalReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 glass text-xs text-[#38D9FF] border border-[#38D9FF]/30 rounded-full">
                  Sci-Fi / Faith
                </span>
                <span className="px-3 py-1 glass text-xs text-[#38D9FF] border border-[#38D9FF]/30 rounded-full">
                  Christian Fiction
                </span>
              </div>
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#29B6F6] to-[#38D9FF] text-white font-medium rounded-full shadow-lg shadow-[#29B6F6]/30 hover:shadow-[#38D9FF]/50 transition-all duration-300 hover:scale-105"
              >
                <i className="fab fa-amazon"></i>
                View on Amazon
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          </div>

          {/* Full Description */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-lg font-semibold text-[#38D9FF] mb-3 flex items-center gap-2">
              <i className="fas fa-book-reader"></i>
              About This Book
            </h3>
            <div className="text-[#B8C4D6] text-sm leading-relaxed whitespace-pre-wrap">
              {book.description}
            </div>
          </div>

          {/* Reviews Section - Show if there are written reviews */}
          {hasReviews && (
            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-[#38D9FF] mb-3 flex items-center gap-2">
                <i className="fas fa-star"></i>
                Reader Reviews ({book.reviews.length})
              </h3>
              <div className="space-y-4">
                {book.reviews.map((review, index) => (
                  <div key={index} className="glass-card rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < review.rating ? 'text-[#FFD700]' : 'text-[#B8C4D6]/30'} text-sm`}
                        ></i>
                      ))}
                    </div>
                    <p className="text-[#B8C4D6] text-sm leading-relaxed italic">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center justify-between mt-2 border-t border-white/5 pt-2">
                      <p className="text-white text-xs font-medium">{review.name}</p>
                      <p className="text-[#B8C4D6]/50 text-xs">{review.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating-only display if book has rating but no reviews */}
          {hasRating && !hasReviews && (
            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-[#38D9FF] mb-3 flex items-center gap-2">
                <i className="fas fa-star"></i>
                Rating
              </h3>
              <div className="glass-card rounded-xl p-4 border border-white/5 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < book.rating ? 'text-[#FFD700]' : 'text-[#B8C4D6]/30'} text-xl`}
                    ></i>
                  ))}
                </div>
                <span className="text-white font-medium">{book.rating}.0/5</span>
                <span className="text-[#B8C4D6]/50 text-sm">({book.totalReviews || 0} ratings)</span>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-[#B8C4D6]/60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38D9FF] animate-pulse"></span>
              Available on Amazon
            </div>
            <button
              onClick={onClose}
              className="text-sm text-[#B8C4D6] hover:text-white transition-colors duration-200 border border-white/10 hover:border-[#38D9FF]/30 px-4 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BookModal;