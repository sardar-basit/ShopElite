'use client';
import { Target, Lightbulb, Heart, Quote, Star, Award, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="luxe-page-light">
      {/* Editorial Hero */}
      <section className="relative h-[80vh] overflow-hidden bg-[#3E2C23]">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="The Legacy of LUXE" 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] opacity-50"
        />
        <div className="absolute inset-0 bg-[#3E2C23]/20 flex flex-col items-center justify-center text-center p-6">
           <span className="text-[10px] font-black uppercase tracking-[1em] text-white/90 mb-6 drop-shadow-sm">The Legacy of LUXE</span>
           <h1 className="text-6xl md:text-8xl font-serif-display text-white mb-8 tracking-tighter italic drop-shadow-md">Our Story</h1>
           <div className="w-16 h-[1px] bg-[#D4A373]"></div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div className="flex gap-8 group">
            <div className="w-px h-24 bg-[#D4A373] mt-2 group-hover:h-32 transition-all duration-700"></div>
            <div>
              <h2 className="text-3xl font-serif-display text-[#3E2C23] mb-6 uppercase tracking-wider text-sm font-black">Our Mission</h2>
              <p className="text-[#8B6B4A] text-sm leading-relaxed font-light italic">
                To redefine luxury by harmonizing the soul of traditional craftsmanship with the pulse of modern elegance. We strive to provide the world with pieces that are not just worn, but cherished as markers of conscious elegance.
              </p>
            </div>
          </div>
          <div className="flex gap-8 group">
            <div className="w-px h-24 bg-[#D4A373] mt-2 group-hover:h-32 transition-all duration-700"></div>
            <div>
              <h2 className="text-3xl font-serif-display text-[#3E2C23] mb-6 uppercase tracking-wider text-sm font-black">Our Vision</h2>
              <p className="text-[#8B6B4A] text-sm leading-relaxed font-light italic">
                To lead the global fashion industry into a new era where "timeless" applies as much to the health of our planet as it does to the aesthetic of our designs. Our vision is a future where high fashion is the ultimate catalyst for global sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Heritage - Drawing Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 border-t border-[#e8e1d5]/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-xl">
             <span className="text-[9px] uppercase tracking-[0.5em] text-[#D4A373] font-black mb-6 block">Artisanal Roots</span>
             <h2 className="text-4xl md:text-5xl font-serif-display text-[#3E2C23] mb-10 leading-tight italic">The Heritage</h2>
             <p className="text-[#8B6B4A] text-sm leading-loose mb-10 font-light italic">
               Founded in the heart of Paris with a singular vision, LUXE began as a bespoke atelier dedicated to the pursuit of tactile perfection. For three decades, we have remained steadfast in our commitment to elevating "Classical European" tailoring with contemporary silhouettes.
               <br/><br/>
               Our journey is defined by a relentless curation of the world's finest fibers and a deep respect for the hands that weave them. Every stitch tells a story of patience, passion, and an unwavering standard for the extraordinary.
             </p>
             <div className="w-24 h-24 overflow-hidden rounded-sm border border-[#e8e1d5] p-1 bg-white">
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale mix-blend-multiply" />
             </div>
          </div>
          <div className="bg-white p-12 lg:p-24 flex justify-center items-center rounded-sm border border-[#e8e1d5]/30">
             <div className="max-w-md w-full relative group">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" alt="Atelier Gallery" className="grayscale shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-1000 mix-blend-multiply" />
                <div className="absolute inset-0 border-2 border-[#D4A373]/20 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#8B6B4A]/5 py-24 md:py-32 border-y border-[#e8e1d5]/50">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
           <span className="text-[9px] uppercase tracking-[0.5em] text-[#8B6B4A]/40 font-black mb-8 block">Kind Words</span>
           <h2 className="text-4xl font-serif-display text-[#3E2C23] mb-20 uppercase tracking-widest text-sm font-black italic">Client Testimonials</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
              {[
                { name: "Elena Vance", source: "Finest Collection", text: "The level of detail in the evening silk gown I purchased is simply unmatched. It feels less like a piece of clothing and more like a work of art that I get to wear." },
                { name: "Julian Thorne", source: "Style Editor", text: "LUXE has completely changed my perspective on sustainable fashion. They prove that you never have to sacrifice beauty for responsibility." },
                { name: "Sienna Laurent", source: "The Muse", text: "The bespoke experience at the Paris atelier was the highlight of my year. The artisans are masters of their craft and their passion is infectious." }
              ].map((test, i) => (
                <div key={i} className="text-center group">
                   <div className="flex justify-center gap-1.5 mb-10">
                     {[...Array(5)].map((_, j) => <div key={j} className="w-1 h-1 rounded-full bg-[#D4A373]"></div>)}
                   </div>
                   <p className="text-sm text-[#8B6B4A] leading-relaxed font-light italic mb-8 px-4">"{test.text}"</p>
                   <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-[#3E2C23]">{test.name}</h4>
                   <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4A373] font-bold block mt-3">{test.source}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Culture in Action Grid */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 text-center mb-24">
           <span className="text-[9px] uppercase tracking-[0.5em] text-[#8B6B4A]/40 font-black mb-6 block">Our Community</span>
           <h2 className="text-4xl font-serif-display text-[#3E2C23] mb-4 px-10 italic">Our Culture in Action</h2>
           <div className="w-12 h-px bg-[#D4A373] mx-auto mt-8"></div>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-[1400px] mx-auto px-6 space-y-8">
           <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800" className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 mix-blend-multiply opacity-90 shadow-sm" alt="Culture 1" />
           <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800" className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 mix-blend-multiply opacity-90 shadow-sm" alt="Culture 2" />
           <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800" className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 mix-blend-multiply opacity-90 shadow-sm" alt="Culture 3" />
           <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 mix-blend-multiply opacity-90 shadow-sm" alt="Culture 4" />
           <img src="https://images.unsplash.com/photo-1470252649358-96f3e8053288?auto=format&fit=crop&q=80&w=800" className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 mix-blend-multiply opacity-90 shadow-sm" alt="Culture 5" />
           <img src="https://images.unsplash.com/photo-1511514750730-6893663737b6?auto=format&fit=crop&q=80&w=800" className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 mix-blend-multiply opacity-90 shadow-sm" alt="Culture 6" />
        </div>
      </section>

      {/* Philosophy Icon Grid */}
      <section className="bg-white py-24 md:py-32 border-y border-[#e8e1d5]/50">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
           <h2 className="text-3xl font-serif-display text-[#3E2C23] mb-20 uppercase tracking-widest text-sm font-black italic">Philosophy of Purpose</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <div className="space-y-8 group">
                 <div className="w-16 h-16 bg-[#F5F5DC] flex items-center justify-center mx-auto rounded-full shadow-sm border border-[#e8e1d5]/50 group-hover:scale-110 transition-transform">
                    <Award size={24} strokeWidth={1} className="text-[#D4A373]" />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3E2C23]">Traditional</h4>
                 <p className="text-[10px] uppercase tracking-widest leading-loose text-[#8B6B4A] px-10">We reject the compromise of fast fashion, favoring an uncompromising commitment to quality.</p>
              </div>
              <div className="space-y-8 group">
                 <div className="w-16 h-16 bg-[#F5F5DC] flex items-center justify-center mx-auto rounded-full shadow-sm border border-[#e8e1d5]/50 group-hover:scale-110 transition-transform">
                    <Leaf size={24} strokeWidth={1} className="text-[#D4A373]" />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3E2C23]">Sustainable</h4>
                 <p className="text-[10px] uppercase tracking-widest leading-loose text-[#8B6B4A] px-10">Our ecological footprint is measured by our longevity. We create pieces that last a lifetime.</p>
              </div>
              <div className="space-y-8 group">
                 <div className="w-16 h-16 bg-[#F5F5DC] flex items-center justify-center mx-auto rounded-full shadow-sm border border-[#e8e1d5]/50 group-hover:scale-110 transition-transform">
                    <Heart size={24} strokeWidth={1} className="text-[#D4A373]" />
                 </div>
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3E2C23]">Beautiful</h4>
                 <p className="text-[10px] uppercase tracking-widest leading-loose text-[#8B6B4A] px-10">Respecting tradition doesn't mean ignoring the future. We integrate cutting-edge materials.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#3E2C23] text-white py-32 px-6 text-center">
         <span className="text-[10px] font-black uppercase tracking-[1em] text-[#D4A373] mb-8 block">LOOKING FORWARD</span>
         <h2 className="text-4xl md:text-7xl font-serif-display italic mb-10 tracking-tighter">The Future is Timeless</h2>
         <p className="max-w-2xl mx-auto text-sm text-white/40 leading-loose mb-16 font-light uppercase tracking-widest italic pr-4">
           At our core, we believe true luxury is found at the intersection of heritage and imagination. LUXE invites you to participate in our vision of high fashion, redesigned for an era of accountability and grace.
         </p>
         <Link href="/products" className="bg-[#D4A373] hover:bg-[#c4834a] text-white px-20 py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all transform hover:-translate-y-1 block md:inline-block border border-white/5">
            Join Our World —
         </Link>
      </section>
    </div>
  );
}
