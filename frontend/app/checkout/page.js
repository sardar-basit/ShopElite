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
import Button from '@/components/ui/Button';
import api from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Lock } from 'lucide-react';

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
        paymentMethod: 'stripe-mock',
        itemsPrice: totalPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice,
      };
      const { data: orderRes } = await api.post('/orders', orderData);
      await api.put(`/orders/${orderRes.data._id}/pay`, { paymentIntentId });
      toast.success('Mock Payment successful! Order placed.');
      dispatch(clearCart());
      router.push('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="bg-orange-50 p-5 rounded-xl border border-orange-200 text-orange-800 text-sm">
        <strong>Demo Mode Active:</strong> We detected placeholder Stripe keys in your environment. You can place a mock demo order right now without needing active credentials!
      </div>
      <Button type="submit" loading={loading} className="w-full py-3">Place Demo Order</Button>
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
      
      alert('Order placed successfully! You will receive a confirmation mail after some time.');
      dispatch(clearCart());
      router.push('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="bg-green-50 p-5 rounded-xl border border-green-200 text-green-800 text-sm">
        <strong>Cash on Delivery selected:</strong> You can pay for your package in cash when it arrives at your doorstep.
      </div>
      <Button type="submit" loading={loading} className="w-full py-3 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30">Complete Order Fastly</Button>
    </form>
  );
};

export default function CheckoutPage() {
  const { items, totalPrice } = useSelector((s) => s.cart);
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { fullName: user?.name || '' }
  });

  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (!isAuthenticated) router.push('/login?redirect=checkout');
    if (items.length === 0) router.push('/cart');
  }, [isAuthenticated, items, router]);

  const onSaveAddress = async (data) => {
    setShippingAddress(data);
    setAddressSaved(true);
    
    // Create payment intent
    try {
      const res = await api.post('/orders/payment-intent', {
        amount: totalPrice,
      });
      setClientSecret(res.data.clientSecret);
      setPaymentIntentId(res.data.paymentIntentId);
    } catch (err) {
      toast.error('Failed to initialize payment');
      setAddressSaved(false);
    }
  };

  if (!isAuthenticated || items.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Forms */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-blue-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
              Shipping Details
            </h2>
            
            {!addressSaved ? (
              <form onSubmit={handleSubmit(onSaveAddress)} className="space-y-4">
                <Input label="Full Name" error={errors.fullName?.message} {...register('fullName', { required: 'Required' })} />
                <Input label="Address" error={errors.address?.message} {...register('address', { required: 'Required' })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" error={errors.city?.message} {...register('city', { required: 'Required' })} />
                  <Input label="State" error={errors.state?.message} {...register('state', { required: 'Required' })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode', { required: 'Required' })} />
                  <Input label="Phone" error={errors.phone?.message} {...register('phone', { required: 'Required' })} />
                </div>
                <Button type="submit" className="mt-4">Save Address</Button>
              </form>
            ) : (
              <div>
                <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 relative">
                  <p className="font-semibold">{shippingAddress.fullName}</p>
                  <p>{shippingAddress.address}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                  <p>{shippingAddress.phone}</p>
                  <button onClick={() => setAddressSaved(false)} className="absolute top-4 right-4 text-orange-500 hover:underline font-medium">Edit</button>
                </div>
                
                <div className="mt-6 border-t border-gray-100 pt-6">
                   <h3 className="text-lg font-bold text-gray-900 mb-3 block">Payment Method</h3>
                   <div className="flex flex-col sm:flex-row gap-4">
                      <label className={`flex-1 border p-4 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50 shadow-[0_0_0_1px_rgba(249,115,22,1)]' : 'border-gray-200 hover:border-gray-300'}`}>
                         <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                         <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                         <p className="text-xs text-gray-500 mt-1">Pay securely with Stripe</p>
                      </label>
                      <label className={`flex-1 border p-4 rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50 shadow-[0_0_0_1px_rgba(249,115,22,1)]' : 'border-gray-200 hover:border-gray-300'}`}>
                         <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                         <div className="font-semibold text-gray-900">Cash on Delivery</div>
                         <p className="text-xs text-gray-500 mt-1">Pay with cash when order arrives</p>
                      </label>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm transition-opacity ${!addressSaved ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
               <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${addressSaved ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
               <Lock size={20} className={addressSaved ? 'text-gray-900' : 'text-gray-400'} /> Payment
            </h2>
            
            {paymentMethod === 'card' ? (
                clientSecret && clientSecret !== 'mock_demo_client_secret' ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm clientSecret={clientSecret} paymentIntentId={paymentIntentId} shippingAddress={shippingAddress} />
                  </Elements>
                ) : clientSecret === 'mock_demo_client_secret' ? (
                  <MockCheckoutForm paymentIntentId={paymentIntentId} shippingAddress={shippingAddress} />
                ) : addressSaved ? (
                  <div className="py-8"><Spinner /></div>
                ) : (
                  <p className="text-gray-500 text-sm">Please save your shipping address and select a payment method to proceed.</p>
                )
            ) : paymentMethod === 'cod' && addressSaved ? (
                <CodCheckoutForm shippingAddress={shippingAddress} />
            ) : (
                <p className="text-gray-500 text-sm">Please save your shipping address to proceed.</p>
            )}
          </div>
        </div>

        {/* Right: Summary Order */}
        <div className="w-full md:w-[400px]">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto pr-2 mb-4">
              {items.map((item) => (
                <div key={item._id} className="py-3 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-bold text-orange-500 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-gray-200 mb-4" />
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
