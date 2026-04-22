import Link from 'next/link';
import { Mail, MapPin, Phone, Earth, Camera, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#8B6B4A] text-white pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-20 text-center md:text-left">
        
        {/* Brand Section */}
        <div className="space-y-8 flex flex-col items-center md:items-start">
          <Link href="/" className="flex flex-col items-center md:items-start">
             <span className="text-4xl font-serif-display tracking-[0.2em]">LUXE</span>
             <div className="w-8 h-[1px] bg-[#D4A373] mt-2"></div>
          </Link>
          <p className="text-[11px] leading-loose uppercase tracking-[0.2em] text-white/60 max-w-xs font-light">
            Defining modern elegance through a curation of refined materials and timeless silhouettes. A legacy of conscious luxury.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#D4A373] transition-colors"><Camera size={18} strokeWidth={1.5}/></Link>
            <Link href="#" className="hover:text-[#D4A373] transition-colors"><Send size={18} strokeWidth={1.5}/></Link>
            <Link href="#" className="hover:text-[#D4A373] transition-colors"><Earth size={18} strokeWidth={1.5}/></Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-10">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4A373]">Curation</h4>
          <ul className="space-y-5">
            <li><Link href="/" className="text-[10px] uppercase tracking-widest text-white/80 hover:text-white transition-colors">The Home</Link></li>
            <li><Link href="/products" className="text-[10px] uppercase tracking-widest text-white/80 hover:text-white transition-colors">The Archive</Link></li>
            <li><Link href="/about" className="text-[10px] uppercase tracking-widest text-white/80 hover:text-white transition-colors">The Heritage</Link></li>
            <li><Link href="/contact" className="text-[10px] uppercase tracking-widest text-white/80 hover:text-white transition-colors">The Concierge</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-10">
           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4A373]">Headquarters</h4>
           <div className="space-y-6 text-[10px] tracking-widest uppercase text-white/80 font-medium">
             <div className="flex items-start justify-center md:justify-start gap-4">
                <MapPin size={14} className="text-[#D4A373] shrink-0" />
                <p>123 Avenue Montaigne, Paris, France 75008</p>
             </div>
             <div className="flex items-center justify-center md:justify-start gap-4">
                <Phone size={14} className="text-[#D4A373] shrink-0" />
                <p>+33 (0) 1 55 50 12 34</p>
             </div>
             <div className="flex items-center justify-center md:justify-start gap-4">
                <Mail size={14} className="text-[#D4A373] shrink-0" />
                <p>contact@luxemaison.com</p>
             </div>
           </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-10">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4A373]">Newsletter</h4>
          <p className="text-[10px] tracking-widest uppercase text-white/60 leading-loose">Subscribe to the LUXE gazette for exclusive releases.</p>
          <form className="relative group">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="w-full bg-white/5 border-b border-white/20 py-4 text-[10px] font-bold tracking-widest focus:outline-none focus:border-[#D4A373] placeholder:text-white/20 px-0 transition-all group-hover:bg-white/10"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest font-black text-[#D4A373] hover:text-white transition-all">Join —</button>
          </form>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30">
          © 2026 LUXE Maison. Part of the Archival Heritage Group.
        </p>
        <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] font-black text-white/30">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Security</Link>
        </div>
      </div>
    </footer>
  );
}
