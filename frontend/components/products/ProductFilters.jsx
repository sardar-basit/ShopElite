'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProducts } from '@/store/slices/productSlice';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

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
    <div className="bg-[#F5F5DC] space-y-12 pr-4">
      <div className="flex items-center justify-between border-b border-[#e8e1d5] pb-6">
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3E2C23] flex items-center gap-3">
          <SlidersHorizontal size={14} className="text-[#8B6B4A]" /> Filters
        </h3>
        <button onClick={reset} className="text-[9px] uppercase tracking-widest text-[#8B6B4A]/60 hover:text-[#3E2C23] font-bold underline underline-offset-4">Reset</button>
      </div>

      {/* Category */}
      <section className="space-y-6">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#8B6B4A]/50">Category Selection</p>
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              value=""
              checked={local.category === ''}
              onChange={() => setLocal({ ...local, category: '' })}
              className="accent-[#8B6B4A] w-3 h-3"
            />
            <span className={`text-[11px] uppercase tracking-widest transition-colors ${local.category === '' ? 'text-[#3E2C23] font-bold' : 'text-[#3E2C23]/40 group-hover:text-[#3E2C23]/60'}`}>All Archive</span>
          </label>
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={local.category === cat}
                onChange={(e) => setLocal({ ...local, category: e.target.value })}
                className="accent-[#8B6B4A] w-3 h-3"
              />
              <span className={`text-[11px] uppercase tracking-widest transition-colors ${local.category === cat ? 'text-[#3E2C23] font-bold' : 'text-[#3E2C23]/40 group-hover:text-[#3E2C23]/60'}`}>{cat}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Price Range */}
      <section className="space-y-6">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#8B6B4A]/50">Price Tier</p>
        <div className="flex gap-4">
          <div className="relative flex-1">
             <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] text-[#8B6B4A]/30 font-bold">$</span>
             <input
               type="number"
               placeholder="MIN"
               value={local.minPrice}
               onChange={(e) => setLocal({ ...local, minPrice: e.target.value })}
               className="w-full border-b border-[#e8e1d5] py-2 pl-4 text-[10px] font-bold focus:outline-none focus:border-[#D4A373] bg-transparent text-[#3E2C23]"
             />
          </div>
          <div className="relative flex-1">
             <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] text-[#8B6B4A]/30 font-bold">$</span>
             <input
               type="number"
               placeholder="MAX"
               value={local.maxPrice}
               onChange={(e) => setLocal({ ...local, maxPrice: e.target.value })}
               className="w-full border-b border-[#e8e1d5] py-2 pl-4 text-[10px] font-bold focus:outline-none focus:border-[#D4A373] bg-transparent text-[#3E2C23]"
             />
          </div>
        </div>
      </section>

      {/* Sorting */}
      <section className="space-y-6 pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#8B6B4A]/50">Display Logic</p>
        <div className="relative">
           <select
             value={local.sort}
             onChange={(e) => setLocal({ ...local, sort: e.target.value })}
             className="w-full border-b border-[#e8e1d5] py-2 pr-8 text-[10px] font-bold uppercase tracking-widest text-[#3E2C23] focus:outline-none focus:border-[#D4A373] bg-transparent appearance-none"
           >
             <option value="newest">Recent Releases</option>
             <option value="price_asc">Price: Low to High</option>
             <option value="price_desc">Price: High to Low</option>
             <option value="rating">Superior Rating</option>
             <option value="popular">Highly Reviewed</option>
           </select>
           <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8B6B4A]/30 pointer-events-none" />
        </div>
      </section>

      <button
        onClick={apply}
        className="w-full bg-[#D4A373] hover:bg-[#c4834a] text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 transition-all"
      >
        Apply Refinement —
      </button>
    </div>
  );
}
