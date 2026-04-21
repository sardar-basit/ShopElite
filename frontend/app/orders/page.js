'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import { Package, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function OrdersPage() {
  const { isAuthenticated } = useSelector((s) => s.auth);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=orders');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my');
        setOrders(data.data);
      } catch (err) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, router]);

  const StatusBadge = ({ status }) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Shipped: 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  if (loading) return <div className="py-32 flex justify-center"><Spinner size={40} /></div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <Package className="text-blue-800" size={32} /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't placed an order yet.</p>
          <Link href="/" className="inline-block bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition flex-shrink-0">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Order Placed</p>
                    <p className="font-semibold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Total</p>
                    <p className="font-semibold text-gray-900">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Status</p>
                    <StatusBadge status={order.orderStatus} />
                  </div>
                  <div className="sm:text-right">
                    <p className="text-gray-500 font-medium mb-1">Order #</p>
                    <p className="font-semibold text-gray-900 truncate" title={order._id}>{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 divide-y divide-gray-100">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-gray-100" />
                    <div className="flex-1">
                      <Link href={`/products/${item.product?._id || item.product}`} className="font-bold text-gray-900 hover:text-blue-800 line-clamp-1 mb-1">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-orange-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
