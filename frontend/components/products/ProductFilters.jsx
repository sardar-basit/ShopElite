'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProducts } from '@/store/slices/productSlice';
import { SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Beauty', 'Automotive', 'Food', 'Other'];

export default function ProductFilters({ onClose }) {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.products.filters);
  const [local, setLocal] = useState(filters);

  const apply = () => {
    dispatch(setFilters(local));
    dispatch(fetchProducts({ ...local, page: 1, limit: 12 }));
    onClose?.();
  };

  const reset = () => {
    const blank = { keyword: '', category: '', minPrice: '', maxPrice: '', minRating: '', sort: 'newest' };
    setLocal(blank);
    dispatch(setFilters(blank));
    dispatch(fetchProducts({ page: 1, limit: 12 }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-blue-800" /> Filters
        </h3>
        <button onClick={reset} className="text-xs text-orange-500 hover:underline font-medium">Reset all</button>
      </div>

      {/* Category */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Category</p>
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={local.category === cat}
                onChange={(e) => setLocal({ ...local, category: e.target.value })}
                className="accent-blue-800"
              />
              <span className="text-sm text-gray-600 group-hover:text-blue-800 transition-colors">{cat}</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={local.category === ''}
              onChange={() => setLocal({ ...local, category: '' })}
              className="accent-blue-800"
            />
            <span className="text-sm text-gray-600">All Categories</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Price Range</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={local.minPrice}
            onChange={(e) => setLocal({ ...local, minPrice: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800/30"
          />
          <input
            type="number"
            placeholder="Max $"
            value={local.maxPrice}
            onChange={(e) => setLocal({ ...local, maxPrice: e.target.value })}
            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800/30"
          />
        </div>
      </div>

      {/* Min Rating */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Minimum Rating</p>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setLocal({ ...local, minRating: r === 0 ? '' : r })}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                (r === 0 && local.minRating === '') || local.minRating == r
                  ? 'bg-blue-800 text-white border-blue-800'
                  : 'border-gray-200 text-gray-600 hover:border-blue-800'
              }`}
            >
              {r === 0 ? 'Any' : `${r}+★`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Sort By</p>
        <select
          value={local.sort}
          onChange={(e) => setLocal({ ...local, sort: e.target.value })}
          className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800/30"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="rating">Highest Rated</option>
          <option value="popular">Most Reviewed</option>
        </select>
      </div>

      <button
        onClick={apply}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
