'use client';
import { Phone, Mail, Clock, Send, MapPin } from 'lucide-react';
import Input from '@/components/ui/Input';

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting our concierge. A dedicated representative will reach out to you shortly.');
  };

  return (
    <div className="luxe-page-light">
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-32">
        {/* Page Header */}
        <div className="text-center mb-24 md:mb-32">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#8B6B4A]/50 font-black mb-6 block">Personalized Service</span>
          <h1 className="text-4xl md:text-7xl font-serif-display text-[#3E2C23] mb-8 tracking-tighter italic">Contact Our Concierge</h1>
          <p className="text-[#8B6B4A] text-sm md:text-lg max-w-3xl mx-auto leading-relaxed font-light italic">
            Whether you have a question about an exquisite piece, require personal styling assistance, or wish to arrange a private viewing, our dedicated team is at your service.
          </p>
          <div className="w-12 h-px bg-[#D4A373] mx-auto mt-12"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          
          {/* Left: Message Form */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-serif-display text-[#3E2C23] mb-16 uppercase tracking-widest text-sm font-black italic underline underline-offset-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <Input label="Identity / Full Name" placeholder="ENTER YOUR FULL NAME" required />
                 <Input label="Electronic Mail" type="email" placeholder="ENTER YOUR EMAIL ADDRESS" required />
              </div>
              
              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8B6B4A]/50 font-black mb-2">Subject of Inquiry</label>
                <div className="relative group">
                  <select className="w-full border-b border-[#e8e1d5] py-4 text-[10px] font-black uppercase tracking-widest text-[#3E2C23] focus:outline-none focus:border-[#D4A373] bg-transparent appearance-none">
                    <option>Select an inquiry type</option>
                    <option>Bespoke Consultation</option>
                    <option>Product Information</option>
                    <option>Private Viewing</option>
                    <option>Corporate Gifting</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#8B6B4A]/30 font-light">↓</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8B6B4A]/50 font-black mb-2">Your Message</label>
                <textarea 
                  rows="5" 
                  placeholder="HOW MAY WE ASSIST YOU TODAY?" 
                  className="w-full border-b border-[#e8e1d5] py-4 text-[10px] font-black uppercase tracking-widest text-[#3E2C23] focus:outline-none focus:border-[#D4A373] bg-transparent resize-none placeholder:text-[#3E2C23]/20"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="bg-[#D4A373] hover:bg-[#c4834a] text-white px-20 py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-4 shadow-xl"
              >
                <Send size={12} /> Send Message —
              </button>
            </form>
          </div>

          {/* Right: Info Panels */}
          <div className="lg:col-span-5 space-y-20">
            
            {/* Client Services Box - Dramatic Contrast */}
            <div className="bg-[#3E2C23] text-white p-12 py-20 rounded-sm space-y-20 relative overflow-hidden group shadow-2xl">
               {/* Subtle background flair */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A373]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-3xl font-serif-display text-white border-b border-white/5 pb-10 italic">Client Services</h3>
              
              <div className="space-y-12">
                <div className="flex items-start gap-10 group/item">
                  <div className="mt-1"><Phone size={22} className="text-[#D4A373]" strokeWidth={1} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black mb-3">Private Line</p>
                    <p className="text-xl font-serif-display tracking-widest group-hover/item:text-[#D4A373] transition-colors">+1 (800) 555-LUXE</p>
                  </div>
                </div>

                <div className="flex items-start gap-10 group/item">
                  <div className="mt-1"><Mail size={22} className="text-[#D4A373]" strokeWidth={1} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black mb-3">Digital Inquiry</p>
                    <p className="text-xl font-serif-display tracking-widest group-hover/item:text-[#D4A373] transition-colors">concierge@luxe.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-10 group/item">
                  <div className="mt-1"><Clock size={22} className="text-[#D4A373]" strokeWidth={1} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black mb-3">Boutique Hours</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] font-black leading-loose text-white/60">
                      Monday — Friday: 9AM – 8PM EST<br/>
                      Saturday — Sunday: 10AM – 6PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Boutiques - Clean Minimal */}
            <div className="space-y-12">
              <h3 className="text-[11px] uppercase tracking-[0.6em] text-[#8B6B4A]/50 font-black border-b border-[#e8e1d5] pb-6">Global Flagships</h3>
              <div className="space-y-10">
                 {[
                   { city: "Paris", info: "AVENUE MONTAIGNE" },
                   { city: "New York", info: "FIFTH AVENUE" },
                   { city: "London", info: "NEW BOND STREET" }
                 ].map((loc, i) => (
                   <div key={i} className="flex justify-between items-end group cursor-pointer border-b border-[#e8e1d5]/30 pb-8 hover:border-[#D4A373] transition-all">
                      <div className="space-y-2">
                        <span className="text-2xl font-serif-display text-[#3E2C23] group-hover:text-[#D4A373] transition-all italic">{loc.city}</span>
                        <div className="flex items-center gap-3">
                           <MapPin size={10} className="text-[#8B6B4A]/30" />
                           <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B6B4A]/40 font-black">{loc.info}</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 group-hover:text-[#3E2C23] font-black border-b border-transparent group-hover:border-[#3E2C23] pb-1 transition-all">View Archive</span>
                   </div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
