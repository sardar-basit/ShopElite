'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/slices/productSlice';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import Spinner from '@/components/ui/Spinner';
import { useSearchParams } from 'next/navigation';
import { Filter, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const keywordParam = searchParams.get('keyword') || '';
  const { items, loading, error, filters, pages, currentPage } = useSelector((s) => s.products);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localPage, setLocalPage] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Sync local page with filters if filters change externally (reset)
      dispatch(fetchProducts({ ...filters, keyword: keywordParam, page: localPage, limit: 3 }));
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [dispatch, keywordParam, mounted, filters, localPage]);

  // Reset page to 1 when filters change (except the page filter itself)
  useEffect(() => {
    setLocalPage(1);
  }, [filters, keywordParam]);

  const handleNextPage = () => {
    if (localPage < pages) setLocalPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (localPage > 1) setLocalPage(prev => prev - 1);
  };

  if (!mounted) {
    return <div className="luxe-page-light py-32 flex justify-center"><Spinner size={48} color="#2D2D2D" /></div>;
  }

  if (error) {
    return <div className="luxe-page-light text-center text-red-500 py-20 font-serif-display text-xl uppercase tracking-widest">{error}</div>;
  }

  return (
    <div className="luxe-page-light bg-[#F5F5DC] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-20 items-start">
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden w-full flex items-center justify-center gap-4 bg-white border border-[#E5E7EB] py-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#2D2D2D] shadow-md transition-all active:scale-95"
        >
          <Filter size={14} className="text-[#D4A373]" /> Refine Archive —
        </button>

        {/* Desktop Sidebar / Mobile Modal */}
        <aside className={`fixed inset-0 z-[60] bg-[#F5F5DC] p-10 md:relative md:inset-auto md:z-0 md:bg-transparent md:p-0 w-full md:w-80 flex-shrink-0 transition-transform duration-700 ${mobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-y-auto`}>
          <div className="md:sticky md:top-32 space-y-16">
            <div className="md:hidden flex justify-end mb-12">
              <button onClick={() => setMobileFilterOpen(false)} className="bg-[#2D2D2D] p-3 rounded-full text-[#F5F5DC]"><X size={20} /></button>
            </div>
            <ProductFilters onClose={() => setMobileFilterOpen(false)} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-10 border-b border-[#E5E7EB] pb-12">
            <div className="space-y-4">
               <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4A373] font-black block">Curated Archive</span>
               <h1 className="text-5xl md:text-7xl font-serif-display text-[#2D2D2D] tracking-tighter leading-none italic">
                 The Collection
               </h1>
            </div>
            
            {/* Minimalist Pagination UI - Header Side */}
            <div className="flex items-center gap-12">
                <div className="text-[10px] uppercase tracking-[0.4em] text-[#2D2D2D]/60 font-black h-fit flex items-center gap-4">
                  <span className="text-[#2D2D2D]">{localPage.toString().padStart(2, '0')}</span> 
                  <div className="w-8 h-[1px] bg-[#E5E7EB]"></div>
                  <span>{pages.toString().padStart(2, '0')}</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrevPage}
                    disabled={localPage === 1}
                    className="p-4 bg-white border border-[#E5E7EB] text-[#2D2D2D] disabled:opacity-20 hover:bg-[#2D2D2D] hover:text-white transition-all shadow-sm rounded-sm"
                  >
                    <ChevronLeft size={16} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={handleNextPage}
                    disabled={localPage === pages}
                    className="p-4 bg-white border border-[#E5E7EB] text-[#2D2D2D] disabled:opacity-20 hover:bg-[#2D2D2D] hover:text-white transition-all shadow-sm rounded-sm"
                  >
                    <ChevronRight size={16} strokeWidth={3} />
                  </button>
                </div>
            </div>
          </div>

          {keywordParam && (
            <div className="flex items-center gap-4 mb-16">
               <span className="text-[10px] uppercase tracking-[0.2em] text-[#2D2D2D]/40 font-black">Search Result:</span>
               <span className="text-[11px] uppercase tracking-widest text-[#2D2D2D] font-black border-b border-[#D4A373] pb-1">"{keywordParam}"</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-56"><Spinner size={40} color="#D4A373" /></div>
          ) : items.length === 0 ? (
            <div className="bg-white py-48 text-center border border-[#E5E7EB] rounded-sm shadow-md">
              <h3 className="text-3xl font-serif-display text-[#2D2D2D]/20 mb-6 italic">No Pieces Found</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#2D2D2D]/30 font-black">Redefine your exploration parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          
          {/* Bottom Pagination Controls */}
          <div className="mt-24 pt-16 border-t border-[#E5E7EB] flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-8 group cursor-pointer" onClick={handlePrevPage}>
                <div className={`p-5 rounded-full border border-[#E5E7EB] group-hover:bg-[#2D2D2D] group-hover:text-white transition-all ${localPage === 1 ? 'opacity-0' : 'opacity-100'}`}>
                   <ArrowLeft size={16} />
                </div>
                <span className={`text-[10px] uppercase tracking-[0.5em] font-black text-[#2D2D2D]/40 group-hover:text-[#2D2D2D] transition-all ${localPage === 1 ? 'opacity-0' : 'opacity-100'}`}>Previous Sequence</span>
             </div>

             <div className="flex gap-2">
                {[...Array(pages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setLocalPage(i + 1)}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${localPage === i + 1 ? 'bg-[#D4A373] w-8' : 'bg-[#E5E7EB] hover:bg-[#2D2D2D]/20'}`}
                  ></button>
                ))}
             </div>

             <div className="flex items-center gap-8 group cursor-pointer" onClick={handleNextPage}>
                <span className={`text-[10px] uppercase tracking-[0.5em] font-black text-[#2D2D2D]/40 group-hover:text-[#2D2D2D] transition-all ${localPage === pages ? 'opacity-0' : 'opacity-100'}`}>Next Sequence</span>
                <div className={`p-5 rounded-full border border-[#E5E7EB] group-hover:bg-[#2D2D2D] group-hover:text-white transition-all ${localPage === pages ? 'opacity-0' : 'opacity-100'}`}>
                   <ArrowRight size={16} />
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
