'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/slices/productSlice';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import Spinner from '@/components/ui/Spinner';
import { useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordParam = searchParams.get('keyword') || '';
  const { items, loading, error, filters } = useSelector((s) => s.products);
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace('/login');
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      dispatch(fetchProducts({ ...filters, keyword: keywordParam, page: 1, limit: 12 }));
    }
  }, [dispatch, keywordParam, mounted, isAuthenticated]);

  if (!mounted || !isAuthenticated) {
    return <div className="py-32 flex justify-center"><Spinner size={48} /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start h-full pb-10 mt-4 max-w-7xl mx-auto px-4">
      <button 
        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        className="md:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl shadow-sm text-sm font-semibold"
      >
        <Filter size={18} /> Filters & Sorting
      </button>

      <div className={`w-full md:w-64 flex-shrink-0 ${mobileFilterOpen ? 'block' : 'hidden'} md:block sticky top-24`}>
        <ProductFilters onClose={() => setMobileFilterOpen(false)} />
      </div>

      <div className="flex-1 w-full">
        {keywordParam && (
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Search results for: <span className="text-blue-800">"{keywordParam}"</span> 
            <span className="text-gray-500 text-sm font-normal ml-2">({items.length} found)</span>
          </h2>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Spinner size={40} /></div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
