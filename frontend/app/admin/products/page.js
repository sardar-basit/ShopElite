'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchProducts } from '@/store/slices/productSlice';
import AdminSidebar from '@/components/layout/AdminSidebar';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminProducts() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const { items, loading } = useSelector((s) => s.products);
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
    } else {
      dispatch(fetchProducts({ limit: 100 }));
    }
  }, [isAuthenticated, user, router, dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted');
        dispatch(fetchProducts({ limit: 100 }));
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  const toggleFeatured = async (id) => {
    try {
      await api.put(`/products/${id}/feature`);
      dispatch(fetchProducts({ limit: 100 }));
    } catch {
      toast.error('Failed to toggle featured status');
    }
  };

  if (loading) return <div className="py-32 flex justify-center"><Spinner size={48} /></div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1 w-full max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <Button variant="accent" className="w-auto px-6 whitespace-nowrap">
            <Plus size={18} /> Add Product
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Price / Stock</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4 min-w-[200px]">
                      <img src={product.images?.[0]?.url} alt={product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-gray-900 truncate max-w-[150px] sm:max-w-xs">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-bold">${product.price.toFixed(2)}</div>
                    <div className={`text-xs font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock} in stock
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button onClick={() => toggleFeatured(product._id)}>
                      {product.featured ? (
                        <CheckCircle size={20} className="text-blue-800 mx-auto" />
                      ) : (
                        <XCircle size={20} className="text-gray-300 mx-auto hover:text-gray-500" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex justify-end gap-3">
                      <button className="text-blue-800 hover:text-blue-900" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
