'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import StarRating from './StarRating';
import { ShoppingCart, Heart } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((s) => s.auth);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        image: product.images?.[0]?.url || '/placeholder.jpg',
        stock: product.stock,
      })
    );
    toast.success('Added to cart!');
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    try {
      await api.post(`/users/wishlist/${product._id}`);
      toast.success('Wishlist updated!');
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product._id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPct}%
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-500"
          >
            <Heart size={16} />
          </button>
          {product.featured && (
            <div className="absolute bottom-3 left-3 bg-blue-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <div className="text-xs text-orange-500 font-semibold uppercase tracking-wide">{product.category}</div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-800 transition-colors leading-snug">
            {product.name}
          </h3>
          <StarRating rating={product.ratings} numReviews={product.numReviews} size={3.5} />

          <div className="flex items-center gap-2 mt-auto pt-2">
            <span className="text-lg font-bold text-blue-900">${displayPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 text-sm"
          >
            <ShoppingCart size={15} />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
