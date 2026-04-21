'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, clearProductDetail } from '@/store/slices/productSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import StarRating from '@/components/products/StarRating';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { ShoppingCart, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function ProductDetail({ params }) {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((s) => s.products);
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
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

  const handleAddToCart = () => {
    const price = product.discountPrice > 0 ? product.discountPrice : product.price;
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price,
        image: product.images?.[0]?.url || '/placeholder.jpg',
        stock: product.stock,
      })
    );
    // Overwrite the quantity just added if it's more than 1
    // Actually our addToCart logic just +1s if exists, or sets to 1.
    // For simplicity, we just dispatch N times.
    for (let i = 1; i < qty; i++) {
        dispatch(addToCart({ _id: product._id, stock: product.stock }));
    }
    toast.success('Added to cart!');
  };

  const submitReview = async (data) => {
    try {
      await api.post(`/reviews/${product._id}`, data);
      toast.success('Review submitted!');
      reset();
      fetchReviews();
      dispatch(fetchProduct(params.id)); // refresh average ratings
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) return toast.error('Please login first');
    try {
      await api.post(`/users/wishlist/${product._id}`);
      toast.success('Wishlist updated!');
    } catch {
      toast.error('Error updating wishlist');
    }
  };

  if (loading || !product) {
    return <div className="py-32 flex justify-center"><Spinner size={48} /></div>;
  }
  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  const price = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center relative">
            <img
              src={product.images?.[selectedImage]?.url || 'https://via.placeholder.com/600'}
              alt={product.name}
              className="max-w-full max-h-full object-contain mix-blend-multiply"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-orange-500 shadow-md scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <StarRating rating={product.ratings} numReviews={product.numReviews} size={5} />
            <span className="text-gray-400">|</span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-bold text-blue-900">${price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-xl text-gray-400 line-through mb-1">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <hr className="border-gray-100 mb-8" />

          {/* Action Row */}
          <div className="flex items-center gap-4 mb-8">
            {product.stock > 0 && (
              <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold transition"
                >-</button>
                <input
                  type="number"
                  value={qty}
                  readOnly
                  className="w-12 text-center py-3 font-semibold text-gray-900 focus:outline-none"
                />
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-bold transition"
                >+</button>
              </div>
            )}

            <Button
              variant="accent"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              className="flex-1 py-3 text-base shadow-lg shadow-orange-500/30"
            >
              <ShoppingCart size={20} />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <button
              onClick={handleWishlist}
              className="p-3 border border-gray-300 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-all"
              title="Add to Wishlist"
            >
              <Heart size={24} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <Truck className="text-blue-800" size={24} />
              <div>
                <p className="text-sm font-semibold text-gray-900">Fast Delivery</p>
                <p className="text-xs text-gray-500">Ships within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-800" size={24} />
              <div>
                <p className="text-sm font-semibold text-gray-900">2 Year Warranty</p>
                <p className="text-xs text-gray-500">Guarantee included</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-16 border-gray-200" />

      {/* Reviews Section */}
      <div className="max-w-4xl max-w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{product.ratings.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                <StarRating rating={product.ratings} size={4} />
              </div>
              <p className="text-gray-500 text-sm">Based on {product.numReviews} reviews</p>
            </div>

            {isAuthenticated ? (
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Write a Review</h4>
                <form onSubmit={handleSubmit(submitReview)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <select
                      {...register('rating', { required: true })}
                      className="w-full border-gray-200 rounded-xl p-2 text-sm focus:ring-blue-800"
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                    <textarea
                      {...register('comment', { required: true })}
                      rows="3"
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-blue-800 focus:outline-none"
                      placeholder="What did you like or dislike?"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="primary" className="w-full">Submit Review</Button>
                </form>
              </div>
            ) : (
              <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm text-center">
                Please <a href="/login" className="font-bold underline">log in</a> to write a review.
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-6">
            {reviewsLoading ? (
              <Spinner />
            ) : reviews.length === 0 ? (
              <p className="text-gray-500 py-10 text-center">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="pb-6 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                        {review.user?.name?.[0] || 'A'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{review.user?.name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={3} />
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
