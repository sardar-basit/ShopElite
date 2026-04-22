'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import StarRating from './StarRating';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
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
    toast.success('Added to Bag');
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Identity required for Wishlist');
      return;
    }
    try {
      await api.post(`/users/wishlist/${product._id}`);
      toast.success('Wishlist Synchronized');
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0;
  
  return (
    <Link href={`/products/${product._id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-white shadow-md rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-[#E5E7EB]">
        
        {/* Gallery Box - High Contrast Pure White */}
        <div className="relative aspect-[1/1] overflow-hidden bg-white flex items-center justify-center p-8 group">
          <img
            src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'}
            alt={product.name}
            className="max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Label Overlays - Redefined Brighter Labels */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {hasDiscount && (
               <div className="bg-[#D4A373] text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">Save Selection</div>
            )}
            {product.featured && (
               <div className="bg-[#2D2D2D] text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">Curated</div>
            )}
          </div>

          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full text-[#E5E7EB] hover:text-[#D4A373] transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 shadow-lg z-10"
          >
            <Heart size={16} strokeWidth={2} />
          </button>

          {/* Acquisition Overlay - Subtle refinement */}
          <div className="absolute inset-0 bg-[#D4A373]/5 opacity-0 group-hover:opacity-100 transition-all pointer-events-none"></div>
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2D2D2D]/40 border-b border-[#D4A373] pb-1 italic">Private Reserve</span>
            </div>
          )}

          {/* Quick Peek Tooltip (UX enhancement) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2D2D2D] text-white px-4 py-2 text-[8px] uppercase tracking-[0.3em] font-black opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 flex items-center gap-2 whitespace-nowrap shadow-xl">
             Explore Details <ArrowRight size={10} />
          </div>
        </div>

        {/* Informational Content - Enhanced Contrast */}
        <div className="p-8 flex flex-col flex-1 bg-white">
          <div className="flex justify-between items-start mb-4">
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4A373]/80 leading-none">{product.category}</span>
             <div className="flex gap-0.5 opacity-60">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i < Math.round(product.ratings) ? 'bg-[#D4A373]' : 'bg-[#E5E7EB]'}`}></div>
                ))}
             </div>
          </div>
          
          <h3 className="font-serif-display text-2xl text-[#2D2D2D] group-hover:text-[#D4A373] transition-colors leading-[1.1] mb-6 line-clamp-2 min-h-[2.2em]">
            {product.name}
          </h3>

          <div className="flex items-center gap-4 mt-auto">
            <span className="text-xl font-serif-display text-[#2D2D2D] tracking-tight leading-none italic">${displayPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-[11px] text-[#2D2D2D]/30 line-through tracking-widest">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full mt-8 py-5 text-[9px] font-black uppercase tracking-[0.4em] bg-white border border-[#2D2D2D] text-[#2D2D2D] flex items-center justify-center gap-3 transition-all hover:bg-[#2D2D2D] hover:text-white disabled:opacity-20 disabled:grayscale"
          >
            <ShoppingBag size={12} strokeWidth={2.5} />
            {product.stock === 0 ? 'Not Available' : 'Add to Collection —'}
          </button>
        </div>
      </div>
    </Link>
  );
}
