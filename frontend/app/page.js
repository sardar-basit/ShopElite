'use client';
import Link from 'next/link';
import { ArrowRight, Star, Quote } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="w-full bg-[#F5F5DC]">
      {/* Warm Dramatic Hero */}
      <section className="relative h-[85vh] overflow-hidden bg-[#3E2C23]">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="High Fashion LUXE" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.2] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-[#3E2C23]/30 flex flex-col items-center justify-center text-center p-6">
           <span className="text-[10px] uppercase tracking-[0.5em] text-white/80 font-black mb-6">Autumn / Winter 2024 Collection</span>
           <h1 className="text-5xl md:text-7xl lg:text-9xl font-light text-white mb-8 tracking-tighter font-serif-display drop-shadow-2xl italic">
             The New Archive
           </h1>
           <p className="text-white/80 max-w-xl mb-12 text-sm md:text-base leading-relaxed tracking-[0.1em] font-light italic">
             Discover pieces defined by unique elegance and refined materials, designed for the modern discerning individual.
           </p>
           <Link href="/products" className="bg-[#D4A373] hover:bg-[#c4834a] text-white px-16 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all transform hover:scale-105 border border-white/10">
             Explore Archive —
           </Link>
        </div>
      </section>

      {/* Featured Collection Strip */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl space-y-6">
             <span className="text-[10px] uppercase tracking-[0.4em] text-[#8B6B4A]/50 font-black">Curation Excellence</span>
             <h2 className="text-4xl md:text-5xl font-serif-display text-[#3E2C23] leading-tight italic">Artisanal Craftsmanship</h2>
             <p className="text-[#8B6B4A] text-sm leading-relaxed italic font-light">Each piece in our collection is selected with an uncompromising focus on material quality and timeless silhouette.</p>
          </div>
          <Link href="/products" className="text-[10px] uppercase tracking-[0.5em] font-black text-[#8B6B4A] border-b border-[#D4A373] pb-2 hover:text-[#3E2C23] hover:border-[#3E2C23] transition-all">
             View All Series —
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
           {[
             { img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800', cat: 'Apparel', name: 'Structured Camel Coat' },
             { img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800', cat: 'Leather', name: 'Signature Handbag' },
             { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', cat: 'Audio', name: 'Prime Headphones' },
             { img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', cat: 'Watches', name: 'Luxe Chronograph' }
           ].map((item, i) => (
             <Link key={i} href="/products" className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-white mb-8 border border-[#e8e1d5]/50 rounded-sm relative shadow-sm">
                   <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 mix-blend-multiply opacity-90" />
                   <div className="absolute inset-0 bg-[#3E2C23]/5 opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#8B6B4A]/40 font-black mb-3 block">{item.cat} — Edition</span>
                <h3 className="font-serif-display text-2xl text-[#3E2C23] group-hover:text-[#D4A373] transition-colors italic">{item.name}</h3>
             </Link>
           ))}
        </div>
      </section>
      
      {/* Editorial Philosophical Block */}
      <section className="bg-[#8B6B4A]/5 py-32 border-y border-[#e8e1d5]/50 mb-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
           <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4A373]/30"></div>)}
           </div>
           <p className="text-3xl md:text-5xl font-serif-display italic text-[#3E2C23] leading-tight tracking-tight">
             "Luxury is not about high price tags, but about the depth of consideration put into every fiber and every stitch of the final creation."
           </p>
           <div className="pt-8 border-t border-[#e8e1d5] w-24 mx-auto">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#8B6B4A]/40 block leading-relaxed">— THE LUXE ARCHIVE PHILOSOPHY</span>
           </div>
        </div>
      </section>

      {/* Narrative Split Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 mb-32">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
               <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" className="w-full rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Boutique" />
            </div>
            <div className="order-1 lg:order-2 space-y-10 pr-10">
               <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4A373] font-black">Our Boutiques</span>
               <h2 className="text-4xl md:text-6xl font-serif-display text-[#3E2C23] leading-tight italic">Personal Concierge Experience</h2>
               <p className="text-[#8B6B4A] text-sm leading-loose italic font-light">Visit our flagship boutiques in Paris, New York, and London for a bespoke experience curated specifically for your profile. Discover exclusive archive pieces available only in-store.</p>
               <button className="bg-[#3E2C23] hover:bg-[#1a1310] text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all">
                  Locate Boutique —
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
