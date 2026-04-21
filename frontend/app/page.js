'use client';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Clock, Star } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-900 text-white rounded-3xl mx-4 sm:mx-8 xl:mx-auto max-w-7xl mt-6 lg:mt-10 p-8 sm:p-16 lg:p-24 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-widest mb-6 border border-orange-500/30">
              New Collection 2024
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 text-white drop-shadow-md">
              Elevate Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Everyday Life.</span>
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-sm">
              Discover premium tech, fashion, and accessories curated to give you the ultimate elite experience. Unmatched quality, delivered directly to your door.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/products" className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-bold rounded-2xl transition-all border border-white/20 backdrop-blur-md flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center relative">
            <div className="w-80 h-80 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full absolute -z-10 blur-2xl opacity-50 animate-pulse"></div>
            <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000" alt="Premium Tech Hero" className="w-full max-w-md h-auto object-cover rounded-3xl shadow-2xl rotate-2 transform hover:rotate-0 transition-transform duration-500 border-4 border-white/10" />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Truck size={32} className="text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Delivery</h3>
              <p className="text-gray-500 text-sm">On all orders over $150.</p>
            </div>
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-gray-500 text-sm">Your payments are protected.</p>
            </div>
            <div className="flex flex-col items-center pt-8 sm:pt-0">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <Clock size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-500 text-sm">We're always here to help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Trending Categories</h2>
            <p className="text-gray-500">Explore the best selections from our catalog.</p>
          </div>
          <Link href="/products" className="hidden sm:flex text-blue-800 font-bold hover:text-blue-900 items-center gap-1 group">
            View All <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1 */}
          <Link href="/products?category=Electronics" className="group relative h-80 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800" alt="Electronics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Popular</span>
              <h3 className="text-white text-2xl font-bold">Electronics</h3>
            </div>
          </Link>

          {/* Category 2 */}
          <Link href="/products?category=Fashion" className="group relative h-80 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" alt="Fashion" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-2xl font-bold">Apparel & Fashion</h3>
            </div>
          </Link>

          {/* Category 3 */}
          <Link href="/products?category=Home" className="group relative h-80 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800" alt="Home Decor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-2xl font-bold">Home & Living</h3>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-gray-900 py-24 px-4 sm:px-6 lg:px-8 my-10 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-900 rounded-full blur-3xl mix-blend-screen opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16">Trusted by Elites Worldwide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl text-left">
                <div className="flex gap-1 mb-6 text-orange-500">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">
                  "Absolutely brilliant experience. The shipping was incredibly fast and the product quality exceeded all of my expectations. Customer for life!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white shadow-inner">
                    A
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Alex Johnson</h4>
                    <p className="text-gray-400 text-xs">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
