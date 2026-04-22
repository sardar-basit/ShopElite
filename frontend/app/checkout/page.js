'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/cart/CheckoutForm';
import { clearCart } from '@/store/slices/cartSlice';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';
import api from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Lock, MapPin, Truck, ChevronRight, ShieldCheck } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const MockCheckoutForm = ({ shippingAddress, paymentIntentId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((s) => s.cart);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedItems = items.map(i => ({ product: i._id, name: i.name, image: i.image, price: i.price, quantity: i.quantity }));
      const orderData = {
        orderItems: formattedItems,
        shippingAddress,
        paymentMethod: 'stripe',
        itemsPrice: totalPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice,
      };
      const { data: orderRes } = await api.post('/orders', orderData);
      await api.put(`/orders/${orderRes.data._id}/pay`, { paymentIntentId });
      toast.success('Transaction Successful — Order Confirmed');
      dispatch(clearCart());
      router.push('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment processing failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 mt-12">
      <div className="bg-[#8B6B4A]/5 p-8 border-l-2 border-[#D4A373] text-[#3E2C23] text-[10px] leading-loose uppercase tracking-[0.2em] font-black italic">
        Secure Demo Mode: Placeholder Stripe architecture detected. Click below to finalize your luxury acquisition in archival mock mode.
      </div>
      <button 
        type="submit" 
        className="w-full bg-[#D4A373] hover:bg-[#c4834a] text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl active:scale-[0.98]"
        disabled={loading}
      >
        {loading ? 'Processing —' : 'Finalize Acquisition —'}
      </button>
    </form>
  );
};

const CodCheckoutForm = ({ shippingAddress }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((s) => s.cart);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedItems = items.map(i => ({ product: i._id, name: i.name, image: i.image, price: i.price, quantity: i.quantity }));
      const orderData = {
        orderItems: formattedItems,
        shippingAddress,
        paymentMethod: 'cod',
        itemsPrice: totalPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice,
      };
      await api.post('/orders', orderData);
      toast.success('Order Recorded — Settlement on Delivery');
      dispatch(clearCart());
      router.push('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 mt-12">
      <div className="bg-[#3E2C23]/5 p-8 border-l-2 border-[#3E2C23] text-[#3E2C23] text-[10px] leading-loose uppercase tracking-[0.2em] font-black italic">
        Personal Concierge Delivery: Settlement will be collected in person upon arrival of your archival package.
      </div>
      <button 
        type="submit" 
        className="w-full bg-[#3E2C23] hover:bg-[#1a1310] text-[#F5F5DC] py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl"
        disabled={loading}
      >
        {loading ? 'Processing —' : 'Complete Reservation —'}
      </button>
    </form>
  );
};

export default function CheckoutPage() {
  const { items, totalPrice } = useSelector((s) => s.cart);
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { fullName: user?.name || '' }
  });

  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) router.push('/login?redirect=checkout');
    if (items.length === 0) router.push('/cart');
  }, [isAuthenticated, items, router]);

  const onSaveAddress = async (data) => {
    setShippingAddress(data);
    setAddressSaved(true);
    try {
      const res = await api.post('/orders/payment-intent', { amount: totalPrice });
      setClientSecret(res.data.clientSecret);
      setPaymentIntentId(res.data.paymentIntentId);
    } catch (err) {
      toast.error('Logistics gateway failed to initialize');
      setAddressSaved(false);
    }
  };

  if (!mounted || !isAuthenticated || items.length === 0) return null;

  return (
    <div className="luxe-page-light bg-[#F5F5DC]">
      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-32">
        <h1 className="text-5xl md:text-7xl font-serif-display text-[#3E2C23] mb-24 border-b border-[#e8e1d5] pb-12 tracking-tight italic">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          
          {/* Left: Interactive Acquisition Flow */}
          <div className="lg:col-span-7 space-y-32">
            
            {/* Step 1: Logistics */}
            <section className="relative">
              <div className="flex items-center gap-6 mb-16 px-1">
                <span className="w-10 h-10 rounded-full bg-white text-[#3E2C23] border border-[#e8e1d5] flex items-center justify-center text-xs font-black leading-none shadow-sm">01</span>
                <h2 className="text-2xl font-serif-display text-[#3E2C23] uppercase tracking-widest text-sm font-black italic">Logistics & Destination</h2>
              </div>
              
              {!addressSaved ? (
                <form onSubmit={handleSubmit(onSaveAddress)} className="space-y-16 px-1">
                  <Input label="Recipient Designation" placeholder="NAME OF PROCURER" error={errors.fullName?.message} {...register('fullName', { required: 'Required' })} />
                  <Input label="Primary Delivery Coordinate" placeholder="STREET, SUITE, BUILDING" error={errors.address?.message} {...register('address', { required: 'Required' })} />
                  <div className="grid grid-cols-2 gap-16">
                    <Input label="City" placeholder="PARIS" error={errors.city?.message} {...register('city', { required: 'Required' })} />
                    <Input label="State / Province" placeholder="ILE-DE-FRANCE" error={errors.state?.message} {...register('state', { required: 'Required' })} />
                  </div>
                  <div className="grid grid-cols-2 gap-16">
                    <Input label="Postal Code" placeholder="75001" error={errors.postalCode?.message} {...register('postalCode', { required: 'Required' })} />
                    <Input label="Telephone Channel" placeholder="+33 (0) ...." error={errors.phone?.message} {...register('phone', { required: 'Required' })} />
                  </div>
                  <button type="submit" className="bg-[#3E2C23] text-[#F5F5DC] px-16 py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#1a1310] transition-all shadow-xl">Secure Logistics —</button>
                </form>
              ) : (
                <div className="bg-white border border-[#e8e1d5]/50 p-10 md:p-12 rounded-sm relative group shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="space-y-6">
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#8B6B4A]/40 mb-2">Authenticated Destination:</p>
                      <div className="text-[#3E2C23] space-y-1 italic">
                        <p className="font-black text-2xl font-serif-display tracking-wide leading-tight">{shippingAddress.fullName}</p>
                        <p className="text-sm font-light text-[#8B6B4A]">{shippingAddress.address}</p>
                        <p className="text-sm font-light text-[#8B6B4A]">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                        <div className="flex items-center gap-3 pt-4">
                           <div className="w-1.5 h-1.5 bg-[#D4A373] rounded-full"></div>
                           <p className="text-[11px] font-black tracking-widest text-[#D4A373] uppercase">{shippingAddress.phone}</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setAddressSaved(false)} 
                      className="text-[10px] font-black uppercase tracking-widest text-[#8B6B4A]/40 hover:text-[#3E2C23] underline underline-offset-8 decoration-[#D4A373]/30"
                    >Modify Logistics</button>
                  </div>
                  
                  <div className="mt-16 pt-12 border-t border-[#e8e1d5]">
                     <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#8B6B4A]/40 mb-10">Settlement Architecture:</p>
                     <div className="flex flex-col sm:flex-row gap-8">
                        <button 
                          onClick={() => setPaymentMethod('card')}
                          className={`flex-1 text-left p-8 border transition-all ${paymentMethod === 'card' ? 'border-[#3E2C23] bg-[#F5F5DC]/30 ring-1 ring-[#3E2C23] shadow-inner' : 'border-[#e8e1d5] hover:border-[#8B6B4A]/40'}`}
                        >
                           <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3E2C23]">Global Encrypted Card</p>
                           <p className="text-[10px] text-[#8B6B4A]/60 mt-2 uppercase tracking-widest italic leading-relaxed">Stripe Infrastructure / Fully Secured</p>
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('cod')}
                          className={`flex-1 text-left p-8 border transition-all ${paymentMethod === 'cod' ? 'border-[#3E2C23] bg-[#F5F5DC]/30 ring-1 ring-[#3E2C23] shadow-inner' : 'border-[#e8e1d5] hover:border-[#8B6B4A]/40'}`}
                        >
                           <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3E2C23]">Concierge Settlement</p>
                           <p className="text-[10px] text-[#8B6B4A]/60 mt-2 uppercase tracking-widest italic leading-relaxed">Settlement upon Personal Handover</p>
                        </button>
                     </div>
                  </div>
                </div>
              )}
            </section>

            {/* Step 2: Settlement Handling */}
            <section className={!addressSaved ? 'opacity-20 pointer-events-none' : ''}>
              <div className="flex items-center gap-6 mb-16 px-1">
                <span className="w-10 h-10 rounded-full bg-white text-[#3E2C23] border border-[#e8e1d5] flex items-center justify-center text-xs font-black leading-none shadow-sm">02</span>
                <h2 className="text-2xl font-serif-display text-[#3E2C23] uppercase tracking-widest text-sm font-black italic">Archival Settlement</h2>
              </div>
              
              <div className="bg-white border border-[#e8e1d5]/50 p-10 md:p-16 shadow-sm">
                {paymentMethod === 'card' ? (
                    clientSecret && clientSecret !== 'mock_demo_client_secret' ? (
                      <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm clientSecret={clientSecret} paymentIntentId={paymentIntentId} shippingAddress={shippingAddress} />
                      </Elements>
                    ) : clientSecret === 'mock_demo_client_secret' ? (
                      <MockCheckoutForm paymentIntentId={paymentIntentId} shippingAddress={shippingAddress} />
                    ) : addressSaved ? (
                      <div className="py-16 flex flex-col items-center gap-6">
                         <Spinner size={32} color="#D4A373" />
                         <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#8B6B4A]/30 animate-pulse">Initializing Secure Channels —</p>
                      </div>
                    ) : (
                      <p className="text-[11px] font-black text-[#8B6B4A]/30 uppercase tracking-[0.3em] leading-loose text-center py-10">Awaiting logistics confirmation before clearing settlement channels.</p>
                    )
                ) : (
                    <CodCheckoutForm shippingAddress={shippingAddress} />
                )}
              </div>
            </section>
          </div>

          {/* Right: Acquisition Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white p-12 py-16 rounded-sm border border-[#e8e1d5]/50 sticky top-36 space-y-12 shadow-sm">
              <div className="space-y-4">
                 <h3 className="text-xl font-serif-display text-[#3E2C23] uppercase tracking-[0.2em] text-sm font-black italic">Acquisition Overview</h3>
                 <div className="w-8 h-[1px] bg-[#D4A373]"></div>
              </div>
              
              <div className="space-y-10 max-h-[400px] overflow-y-auto pr-6 scrollbar-thin">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-8 items-center group">
                    <div className="w-24 h-24 bg-[#F5F5DC]/30 border border-[#e8e1d5]/30 p-2 overflow-hidden flex-shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply transition-all group-hover:scale-110" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-lg font-serif-display text-[#3E2C23] tracking-tight leading-none italic">{item.name}</p>
                      <div className="flex justify-between items-end">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 font-black">Quantity: {item.quantity}</p>
                        <p className="text-sm font-black text-[#3E2C23] tracking-widest">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-[#e8e1d5] space-y-8">
                <div className="flex justify-between items-center text-[#8B6B4A]/40">
                   <span className="text-[10px] uppercase tracking-[0.3em] font-black italic">Archive Subtotal</span>
                   <span className="text-base font-black tracking-widest">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[#D4A373]">
                   <span className="text-[10px] uppercase tracking-[0.4em] font-black italic">Logistics / Delivery</span>
                   <span className="text-[10px] uppercase tracking-[0.4em] font-black italic leading-none">Complimentary —</span>
                </div>
                <div className="pt-12 border-t border-[#3E2C23] flex justify-between items-end">
                   <span className="text-sm uppercase tracking-[0.5em] font-black text-[#3E2C23]">Final Total</span>
                   <span className="text-5xl font-serif-display text-[#3E2C23] tracking-tighter leading-none italic">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-12 flex items-center justify-center gap-4 text-[#8B6B4A]/20">
                 <ShieldCheck size={14} />
                 <span className="text-[10px] uppercase tracking-[0.5em] font-black">Archive Security Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
