'use client';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, X, ChevronLeft, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, totalPrice } = useSelector((s) => s.cart);
  const { isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      router.push('/login?redirect=checkout');
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="luxe-page-light pt-32 pb-48 text-center bg-[#F5F5DC]">
        <div className="flex justify-center mb-12 text-[#8B6B4A]/20">
           <ShoppingBag size={100} strokeWidth={0.5} />
        </div>
        <h2 className="text-4xl font-serif-display text-[#3E2C23] mb-8 uppercase tracking-[0.2em] italic">Your bag is empty</h2>
        <p className="text-[#8B6B4A] mb-16 max-w-sm mx-auto font-light leading-loose italic">Discover our new series and find the perfect piece for your collection.</p>
        <Link href="/products" className="inline-block bg-[#8B6B4A] text-white px-16 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-[#3E2C23] shadow-lg">
           Begin Exploration —
        </Link>
      </div>
    );
  }

  return (
    <div className="luxe-page-light bg-[#F5F5DC]">
      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-32">
        <div className="flex items-end gap-6 mb-24 border-b border-[#e8e1d5] pb-12">
          <h1 className="text-5xl md:text-7xl font-serif-display text-[#3E2C23] tracking-tight italic">Shopping Bag</h1>
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#8B6B4A]/40 font-black mb-4 h-fit hidden md:block">Items in Archive ({items.length})</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          
          {/* Left: Bag Items */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[#e8e1d5]/50 border-t border-[#e8e1d5]/50">
              {items.map((item) => (
                <div key={item._id} className="py-12 first:pt-12 grid grid-cols-12 gap-8 items-center group">
                  
                  {/* Item Image */}
                  <div className="col-span-4 sm:col-span-2 aspect-[3/4] bg-white rounded-sm overflow-hidden border border-[#e8e1d5]/30 p-2 shadow-sm relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply opacity-90 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[#8B6B4A]/5 opacity-0 group-hover:opacity-100 transition-all"></div>
                  </div>

                  {/* Item Details */}
                  <div className="col-span-8 sm:col-span-5 pr-4 space-y-3">
                    <Link href={`/products/${item._id}`} className="font-serif-display text-2xl text-[#3E2C23] hover:text-[#D4A373] transition-colors leading-tight italic">
                      {item.name}
                    </Link>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 font-black">Standard Edition / Archival Piece</p>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4A373] font-black">In Stock</p>
                    </div>
                    
                    {/* Mobile Quantity Control */}
                    <div className="flex sm:hidden items-center border border-[#e8e1d5] mt-6 w-fit h-fit bg-white/50">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                        className="px-4 py-2 font-light text-[#8B6B4A]/40 hover:text-[#3E2C23] disabled:opacity-10"
                        disabled={item.quantity <= 1}
                      >—</button>
                      <span className="w-10 text-center text-[10px] font-black text-[#3E2C23] tracking-widest">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        className="px-4 py-2 font-light text-[#8B6B4A]/40 hover:text-[#3E2C23]"
                      >+</button>
                    </div>
                  </div>

                  {/* Desktop Quantity Control */}
                  <div className="hidden sm:flex col-span-3 justify-center">
                    <div className="flex items-center border border-[#e8e1d5] bg-white/30 backdrop-blur-sm">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                        className="px-6 py-3 font-light text-[#8B6B4A]/40 hover:text-[#3E2C23] transition-all disabled:opacity-10"
                        disabled={item.quantity <= 1}
                      >—</button>
                      <span className="w-12 text-center text-[10px] font-black text-[#3E2C23] tracking-[0.3em]">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        className="px-6 py-3 font-light text-[#8B6B4A]/40 hover:text-[#3E2C23] transition-all"
                      >+</button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="hidden sm:flex col-span-2 flex-col items-end gap-6 h-full justify-between py-2">
                    <span className="text-sm font-black text-[#3E2C23] tracking-widest break-all">${(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-[#8B6B4A]/20 hover:text-red-400 transition-all p-2 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-16 mt-8 border-t border-[#e8e1d5]/50">
              <Link href="/products" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] font-black text-[#8B6B4A]/40 hover:text-[#3E2C23] transition-all group">
                  <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Continue Exploration
              </Link>
            </div>
          </div>

          {/* Right: Perpetual Acquisition Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-12 py-16 rounded-sm border border-[#e8e1d5]/50 space-y-12 sticky top-36 text-[#3E2C23] shadow-sm">
              <div className="space-y-4">
                 <h3 className="text-xl font-serif-display uppercase tracking-[0.2em] text-sm font-black italic">Bag Summary</h3>
                 <div className="w-8 h-[1px] bg-[#D4A373]"></div>
              </div>
              
              <div className="space-y-8">
                <div className="flex justify-between items-center group">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 font-black leading-none">Subtotal</span>
                  <span className="text-sm font-black leading-none tracking-widest">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 font-black leading-none">Logistics</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4A373] font-black leading-none">Complimentary —</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 font-black leading-none">Taxes</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B6B4A]/20 font-black leading-none italic">Calculated at Source</span>
                </div>
                
                <div className="pt-10 border-t border-[#e8e1d5] mt-10 flex justify-between items-end">
                  <span className="text-sm uppercase tracking-[0.4em] font-black text-[#3E2C23]">Final Total</span>
                  <span className="text-4xl font-serif-display tracking-tight leading-none italic">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#3E2C23] hover:bg-[#1a1310] text-[#F5F5DC] py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-[0.98]"
              >
                Proceed to Acquisition —
              </button>
              
              <div className="pt-8 text-center space-y-4">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 font-black leading-loose px-4">Encryption and secure settlement powered by Stripe Global Architecture</p>
                 <div className="flex justify-center gap-3 grayscale opacity-30">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
