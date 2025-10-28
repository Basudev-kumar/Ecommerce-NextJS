'use client';

import { useState } from 'react';

interface AddToWishlistProps {
  productId: string;
  productName: string;
}

export default function AddToWishlist({
  productId,
  productName,
}: AddToWishlistProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToWishlist = () => {
    // Simulate adding to wishlist
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isAdded
          ? 'bg-green-600 text-white'
          : 'bg-pink-600 text-white hover:bg-pink-700'
      }`}
    >
      {isAdded ? '✓ Added to Wishlist' : '♥ Add to Wishlist'}
    </button>
  );
}
