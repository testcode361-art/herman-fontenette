// src/components/Reviews.jsx - Updated to show rating stars
import React from 'react';
import { books } from '../data';

const Reviews = () => {
  // Get all books that have reviews or ratings
  const booksWithRatings = books.filter(book => book.rating > 0 || (book.reviews && book.reviews.length > 0));
  
  if (booksWithRatings.length === 0) {
    return null;
  }

  // Create review items from both written reviews and ratings
  const allReviewItems = [];
  booksWithRatings.forEach(book => {
    // If book has written reviews, add them
    if (book.reviews && book.reviews.length > 0) {
      book.reviews.forEach(review => {
        allReviewItems.push({
          ...review,
          bookTitle: book.title,
          isWrittenReview: true
        });
      });
    }
    
    // If book has a rating but no written reviews, add a rating-only entry
    if (book.rating > 0 && (!book.reviews || book.reviews.length === 0)) {
      allReviewItems.push({
        name: "Reader",
        rating: book.rating,
        date: "Verified Purchase",
        comment: "Great book!",
        bookTitle: book.title,
        isWrittenReview: false
      });
    }
  });

  return (
    <section id="reviews" className="section-spacer max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-light text-center mb-4 glow-text">
        Reader <span className="text-[#38D9FF]">Reviews</span>
      </h2>
      <p className="text-center text-[#B8C4D6] text-sm mb-12">
        What readers are saying about Herman's books
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allReviewItems.map((review, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-[#38D9FF]"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${i < review.rating ? 'text-[#FFD700]' : 'text-[#B8C4D6]/30'}`}
                ></i>
              ))}
              {!review.isWrittenReview && (
                <span className="text-[#B8C4D6]/50 text-xs ml-2">(Rating only)</span>
              )}
            </div>

            {/* Review Text */}
            <p className="text-[#B8C4D6] text-sm leading-relaxed mb-4 italic">
              "{review.comment}"
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div>
                <p className="text-white text-sm font-medium">{review.name}</p>
                <p className="text-[#B8C4D6]/60 text-xs">{review.date}</p>
              </div>
              <span className="text-[#38D9FF]/60 text-xs border border-[#38D9FF]/20 px-2 py-1 rounded-full">
                {review.bookTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;