'use client';
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';

export default function CheckoutForm({ clientSecret, paymentIntentId, shippingAddress }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, totalPrice } = useSelector((s) => s.cart);
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Confirm Stripe Payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shippingAddress.fullName,
            email: shippingAddress.email,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // 2. Create Order in Backend
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
        
        // 3. Mark as paid
        await api.put(`/orders/${orderRes.data._id}/pay`, {
          paymentIntentId: paymentIntent.id
        });

        toast.success('Payment successful! Order placed.');
        dispatch(clearCart());
        router.push('/orders');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    }
    setLoading(false);
  };

  const cardStyle = {
    style: {
      base: {
        color: '#1f2937',
        fontFamily: '"Inter", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#a1a1aa' },
      },
      invalid: { color: '#ef4444', iconColor: '#ef4444' },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <label className="text-sm font-semibold text-gray-700 mb-2 block">Card Details</label>
        <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
          <CardElement options={cardStyle} />
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || loading}
        loading={loading}
        className="w-full py-3.5 shadow-lg shadow-blue-800/20"
      >
        Pay ${totalPrice.toFixed(2)}
      </Button>
    </form>
  );
}
