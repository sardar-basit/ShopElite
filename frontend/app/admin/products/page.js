'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchProducts } from '@/store/slices/productSlice';
import AdminSidebar from '@/components/layout/AdminSidebar';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminProducts() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const { items, loading } = useSelector((s) => s.products);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
    featured: false,
    images: null,
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  
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

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, images: files }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, featured: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('featured', formData.featured);
    
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        data.append('images', formData.images[i]);
      }
    }

    try {
      await api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Product created successfully!');
      setIsModalOpen(false);
      setFormData({ name: '', description: '', price: '', category: 'Electronics', stock: '', featured: false, images: null });
      dispatch(fetchProducts({ limit: 100 }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="py-32 flex justify-center"><Spinner size={48} /></div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1 w-full max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <Button variant="accent" onClick={() => setIsModalOpen(true)} className="w-auto px-6 whitespace-nowrap">
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

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
            
            <form onSubmit={handleCreateProduct} className="space-y-6">
              <Input label="Product Name" name="name" required value={formData.name} onChange={handleInputChange} />
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-800 transition-colors resize-none"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input label="Price ($)" name="price" type="number" step="0.01" required value={formData.price} onChange={handleInputChange} />
                <Input label="Stock" name="stock" type="number" required value={formData.stock} onChange={handleInputChange} />
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-blue-800 transition-colors h-[50px]"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Toys">Toys</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Food">Food</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  required
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 accent-blue-800 cursor-pointer" />
                <span className="font-semibold text-gray-900">Mark as Featured Product</span>
              </label>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 font-semibold text-gray-500 hover:text-gray-900">Cancel</button>
                <Button type="submit" loading={submitLoading} className="px-8">Save Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
