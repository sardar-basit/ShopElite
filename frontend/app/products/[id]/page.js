'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, clearProductDetail } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import StarRating from '@/components/products/StarRating';
import Spinner from '@/components/ui/Spinner';
import { ShoppingBag, Check, ChevronRight, Share2, ShieldCheck, Truck } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((s) => s.products);
  const { isAuthenticated } = useSelector((s) => s.auth);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setMounted(true);
    dispatch(fetchProduct(params.id));
    fetchReviews();
    return () => dispatch(clearProductDetail());
  }, [dispatch, params.id]);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/${params.id}`);
      setReviews(data.data);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setReviewsLoading(false);
    }
  };

  const price = product?.discountPrice > 0 ? product.discountPrice : product?.price || 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price,
        image: product.images?.[0]?.url || '/placeholder.jpg',
        stock: product.stock,
      })
    );
    toast.success('Added to Bag');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const submitReview = async (data) => {
    try {
      await api.post(`/reviews/${product._id}`, data);
      toast.success('Review Synchronized');
      reset();
      fetchReviews();
      dispatch(fetchProduct(params.id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Inquiry failed');
    }
  };

  if (loading || !product) {
    return <div className="luxe-page-light py-40 flex justify-center"><Spinner size={48} color="#8B6B4A" /></div>;
  }
  if (error) return <div className="luxe-page-light text-center text-red-500 py-20 font-serif-display text-xl">{error}</div>;

  return (
    <div className="luxe-page-light">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 lg:pb-32">
        
        {/* Breadcrumb - Clean Brown Aesthetic */}
        <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#8B6B4A]/60 mb-12 border-b border-[#e8e1d5] pb-6">
          <Link href="/" className="hover:text-[#3E2C23]">Home</Link>
          <ChevronRight size={12} className="opacity-40" />
          <Link href="/products" className="hover:text-[#3E2C23]">Archive</Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-[#3E2C23] font-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Interactive Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="w-full aspect-[4/5] bg-white rounded-sm flex items-center justify-center p-12 lg:p-20 border border-[#e8e1d5]/50 group relative">
               <button className="absolute top-6 right-6 p-3 text-[#8B6B4A]/40 hover:text-[#D4A373] transition-all opacity-0 group-hover:opacity-100">
                  <Share2 size={18} strokeWidth={1.5} />
               </button>
               <img
                src={product.images?.[selectedImage]?.url || 'https://via.placeholder.com/800'}
                alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-700"
              />
            </div>
            
            {/* Thumbnails with refined borders */}
            {product.images?.length > 1 && (
              <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-24 h-24 bg-white rounded-sm flex-shrink-0 flex items-center justify-center p-4 border transition-all ${
                      selectedImage === idx ? 'border-[#D4A373] shadow-md scale-105' : 'border-[#e8e1d5]/50 hover:border-[#8B6B4A]/40'
                    }`}
                  >
                    <img src={img.url} alt="thumb" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Informational Context & CTAs */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Context Header */}
            <div className="space-y-6 mb-12">
               <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#8B6B4A]/40">{product.category} — Edition</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Check key={i} size={10} className={i < Math.round(product.ratings) ? "text-[#D4A373]" : "text-gray-200"} strokeWidth={3} />
                    ))}
                  </div>
               </div>
               
               <h1 className="text-4xl md:text-5xl font-serif-display text-[#3E2C23] leading-tight tracking-tight italic">
                 {product.name}
               </h1>

               <div className="flex items-center gap-6">
                  <div className="text-3xl font-serif-display text-[#3E2C23] tracking-wider">
                     ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  {product.discountPrice > 0 && (
                     <span className="text-sm text-[#8B6B4A]/40 line-through tracking-widest">${product.price.toFixed(2)}</span>
                  )}
               </div>
            </div>

            {/* Availability Badges - Modern Layout */}
            <div className="flex flex-wrap gap-4 mb-12 pb-12 border-b border-[#e8e1d5]/50">
               {product.stock > 0 ? (
                 <div className="flex items-center gap-2 bg-[#8B6B4A]/5 px-4 py-2 rounded-full border border-[#8B6B4A]/10">
                    <div className="w-1.5 h-1.5 bg-[#8B6B4A] rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8B6B4A]">Archival Stock Secured</span>
                 </div>
               ) : (
                  <div className="bg-red-50 px-4 py-2 rounded-full border border-red-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400 italic">Private Reserve Only</span>
                  </div>
               )}
               <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#e8e1d5]">
                  <Truck size={12} className="text-[#D4A373]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#3E2C23]/60 font-bold">Complimentary Logistics</span>
               </div>
            </div>

            {/* Narrative Description */}
            <div className="space-y-6 mb-12">
               <p className="text-sm text-[#8B6B4A] leading-loose font-light italic pr-4">
                 {product.description} Each LUXE piece is defined by meticulous consideration of material and form, ensuring a silhouette that remains relevant through every era of your narrative.
               </p>
            </div>

            {/* Acquisition Controls - GOLD & BROWN */}
            <div className="flex flex-col gap-4 mb-16">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-[#D4A373] hover:bg-[#c4834a] text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 disabled:opacity-30"
              >
                 Secure to Bag — <ShoppingBag size={14} />
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full border border-[#8B6B4A]/30 hover:border-[#8B6B4A] text-[#8B6B4A] py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all disabled:opacity-30"
              >
                Immediate Acquisition
              </button>
            </div>

            {/* Technical Parameters */}
            <div className="grid grid-cols-2 gap-y-10 gap-x-12 pt-12 border-t border-[#e8e1d5]/50">
               <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B6B4A]/40">Composition</p>
                  <p className="text-[11px] font-bold text-[#3E2C23] uppercase tracking-widest">Heritage Archive</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B6B4A]/40">Legacy</p>
                  <p className="text-[11px] font-bold text-[#3E2C23] uppercase tracking-widest">Global Support</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B6B4A]/40">Logistics</p>
                  <p className="text-[11px] font-bold text-[#3E2C23] uppercase tracking-widest">Insured Priority</p>
               </div>
               <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8B6B4A]/40">Auth / Verification</p>
                  <div className="flex items-center gap-2">
                     <ShieldCheck size={14} className="text-[#D4A373]" />
                     <p className="text-[11px] font-bold text-[#3E2C23] uppercase tracking-widest">Verified Piece</p>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Community Reflections (Reviews) */}
        <div className="mt-40 pt-20 border-t border-[#e8e1d5]">
           <div className="flex justify-between items-end mb-20 gap-8">
              <div>
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8B6B4A]/40 mb-4 block">Reflections</span>
                 <h2 className="text-4xl font-serif-display text-[#3E2C23] italic">Community Observations</h2>
              </div>
              <p className="max-w-xs text-[10px] text-[#8B6B4A]/60 font-bold uppercase tracking-widest leading-loose text-right hidden md:block">Sharing experiences from the global archive community.</p>
           </div>

           {reviewsLoading ? (
               <div className="flex justify-center p-20"><Spinner color="#D4A373" /></div>
           ) : reviews.length === 0 ? (
              <div className="bg-white/50 p-20 text-center border border-dashed border-[#e8e1d5] rounded-sm">
                 <p className="text-[11px] uppercase tracking-[0.3em] font-black text-[#8B6B4A]/30 italic">No reflections recorded yet. Be the first to observe.</p>
              </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {reviews.map((rev) => (
                 <div key={rev._id} className="bg-white p-10 border border-[#e8e1d5]/50 group hover:border-[#D4A373] transition-all relative">
                   <div className="flex justify-between items-center mb-8">
                      <div className="flex gap-0.5">
                         {[...Array(5)].map((_, i) => (
                           <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < rev.rating ? "bg-[#D4A373]" : "bg-gray-100"}`}></div>
                         ))}
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-[#8B6B4A]/40 font-bold italic">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                   </div>
                   <p className="text-sm text-[#8B6B4A] italic leading-relaxed mb-10">"{rev.comment}"</p>
                   <div className="pt-8 border-t border-[#e8e1d5]/30">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3E2C23]">{rev.user?.name || 'Anonymous Procurer'}</p>
                      <span className="text-[9px] uppercase tracking-widest text-[#D4A373] font-bold mt-1 block">Verified Account</span>
                   </div>
                 </div>
               ))}
             </div>
           )}

           {/* Inquiry Form (Leave Review) */}
           {mounted && isAuthenticated && (
             <div className="mt-32 max-w-2xl mx-auto space-y-12 bg-white/30 p-12 lg:p-20 border border-[#e8e1d5]/30 rounded-sm">
                <div className="text-center space-y-4">
                   <h4 className="font-serif-display text-4xl text-[#3E2C23] italic">Record Observation</h4>
                   <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B6B4A]/50 font-bold">Contribution to the Collective Narrative</p>
                </div>
                <form onSubmit={handleSubmit(submitReview)} className="space-y-12">
                   <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6B4A]/40">Rating Spectrum</label>
                     <select {...register('rating')} className="w-full bg-transparent border-b border-[#e8e1d5] py-4 text-[11px] font-black uppercase tracking-widest text-[#3E2C23] focus:outline-none focus:border-[#D4A373] appearance-none">
                       <option value="5">Superior Excellence</option>
                       <option value="4">Highly Commended</option>
                       <option value="3">Satisfactory Achievement</option>
                       <option value="2">Fair Consideration</option>
                       <option value="1">Lacking Requirement</option>
                     </select>
                   </div>
                   <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B6B4A]/40">Reflections</label>
                     <textarea {...register('comment', { required: true })} rows="4" placeholder="HOW DID THIS PIECE IMPACT YOUR NARRATIVE?" className="w-full bg-transparent border-b border-[#e8e1d5] p-0 py-4 text-[11px] font-black uppercase tracking-widest text-[#3E2C23] outline-none focus:border-[#D4A373] resize-none placeholder:text-[#3E2C23]/20"></textarea>
                   </div>
                   <button type="submit" className="w-full bg-[#8B6B4A] hover:bg-[#3E2C23] text-white py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all">Submit Reflection —</button>
                </form>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
