// components/ProductReviews.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

type Review = {
  rating: number;
  comment: string;
};

type ProductReviewsProps = {
  reviews?: Review[];
  onSubmitReview: (review: Review) => void;
};

const ProductReviews = ({ reviews = [], onSubmitReview }: ProductReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0 && comment.trim()) {
      onSubmitReview({ rating, comment });
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row gap-8 px-2 md:px-10">
      {/* Existing Reviews */}
      <div className="w-full md:w-4/5 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image
                    key={i}
                    src={i < review.rating ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    width={16}
                    height={16}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Add New Review */}
      <div className="w-full md:w-1/5 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Rate This Product</h2>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src={i < rating ? assets.star_icon : assets.star_dull_icon}
              alt="star"
              width={20}
              height={20}
              onClick={() => setRating(i + 1)}
              className="cursor-pointer"
            />
          ))}
        </div>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-orange-500 text-white hover:bg-orange-600 rounded transition"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
