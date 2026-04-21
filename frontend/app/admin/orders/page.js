'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'react-hot-toast';

export default function AdminOrders() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, user, router]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data.data);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { orderStatus: status });
      toast.success('Order status updated');
      fetchOrders();
    } catch {
      toast.error('Failed to update order status');
    }
  };

  const handlePaymentStatusUpdate = async (id, isPaidStr) => {
    try {
      const isPaid = isPaidStr === 'true';
      await api.put(`/orders/${id}/payment-status`, { isPaid });
      toast.success('Payment status updated');
      fetchOrders();
    } catch {
      toast.error('Failed to update payment status');
    }
  };

  if (loading) return <div className="py-32 flex justify-center"><Spinner size={48} /></div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1 w-full max-w-full overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Orders</h1>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID Target</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Customer / Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900" title={order._id}>
                    ...{order._id.substring(order._id.length - 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{order.user?.name || 'Deleted User'}</div>
                    <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <select
                        value={order.isPaid.toString()}
                        onChange={(e) => handlePaymentStatusUpdate(order._id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border-2 outline-none cursor-pointer w-max appearance-none text-center ${
                          order.isPaid ? 'border-green-200 bg-green-100 text-green-800' : 'border-red-200 bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="true">Paid</option>
                        <option value="false">Not Paid</option>
                      </select>
                      <span className="text-xs text-gray-500 font-medium">
                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className={`text-sm font-bold px-3 py-1.5 rounded-lg border-2 outline-none cursor-pointer ${
                        order.orderStatus === 'Delivered' ? 'border-green-500 text-green-700 bg-green-50' :
                        order.orderStatus === 'Processing' ? 'border-blue-500 text-blue-700 bg-blue-50' :
                        'border-gray-200 text-gray-700'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
