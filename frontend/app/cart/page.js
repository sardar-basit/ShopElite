'use client';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, totalPrice } = useSelector((s) => s.cart);
  const { isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      router.push('/login?redirect=checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1 text-center"></div>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item._id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 sm:p-6 items-center">
                  <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-100" />
                    <div>
                      <Link href={`/products/${item._id}`} className="font-semibold text-gray-900 hover:text-blue-800 line-clamp-2">
                        {item.name}
                      </Link>
                      <div className="text-sm font-bold text-orange-500 mt-1">${item.price.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-3 flex justify-start sm:justify-center">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-medium"
                      >-</button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-medium"
                      >+</button>
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2 text-left sm:text-right font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="col-span-1 flex justify-end sm:justify-center absolute sm:relative top-4 right-4 sm:top-auto sm:right-auto">
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm text-red-500 hover:underline font-medium flex items-center gap-1"
              >
                <Trash2 size={14} /> Clear Cart
              </button>
              <Link href="/" className="text-sm text-blue-800 hover:underline font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.reduce((a, c) => a + c.quantity, 0)} items)</span>
                <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping estimate</span>
                <span className="font-semibold text-gray-900 line-through text-gray-400">Free</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              variant="accent"
              className="w-full py-3.5 shadow-lg shadow-orange-500/20"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
