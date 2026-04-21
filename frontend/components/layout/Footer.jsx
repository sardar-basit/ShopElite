'use client';
import Link from 'next/link';
import { Package, Send, Mail, MapPin, Phone } from 'lucide-react';

const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const TwitterIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const YoutubeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for subscribing with ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-900 rounded-full blur-3xl mix-blend-screen opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Package size={22} className="text-white" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">ShopElite</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Elevating your lifestyle with premium products, secure payments, and wildly fast delivery worldwide. Experience elite today.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all transform hover:-translate-y-1">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all transform hover:-translate-y-1">
                <TwitterIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all transform hover:-translate-y-1">
                <InstagramIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all transform hover:-translate-y-1">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span> Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span> Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span> About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span> Contact</Link></li>
              <li><Link href="/cart" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span> Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  123 Elite Avenue, Suite 900<br />New York City, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-orange-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  +1 (800) 555-0199
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  support@shopelite.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive exclusive deals and new arrivals!</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-colors"
                />
              </div>
              <button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors group">
                Subscribe <Send size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} ShopElite eCommerce. All rights reserved.
          </p>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" alt="Paypal" />
          </div>
        </div>
      </div>
    </footer>
  );
}
