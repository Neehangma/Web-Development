import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import StarRating from '../common/StarRating';

const ReviewForm = ({ isOpen, booking, onSubmit, onClose }) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reviewData);
  };

  const handleRatingChange = (rating) => {
    setReviewData({ ...reviewData, rating });
  };

  if (!isOpen || !booking) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Write a Review">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Route:</strong> {booking.route.from} → {booking.route.to}</p>
          <p><strong>Travel Date:</strong> {new Date(booking.travelDate).toLocaleDateString()}</p>
          <p><strong>Seat:</strong> {booking.seatNumber}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-2">
            <StarRating
              rating={reviewData.rating}
              onRatingChange={handleRatingChange}
              size="lg"
            />
            <span className="text-sm text-gray-600">
              {reviewData.rating}/5 stars
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            value={reviewData.comment}
            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
            placeholder="Share your experience with this journey..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-24 transition-all duration-200"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReviewForm;