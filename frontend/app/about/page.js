import { Target, Lightbulb, Heart, Users, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const team = [
    { name: "Sarah Jenkins", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
    { name: "David Chen", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    { name: "Elena Rodriguez", role: "Head of Logistics", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
    { name: "Marcus Johnson", role: "Customer Experience", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
  ];

  const events = [
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1475721025505-22a3fc2642be?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="bg-blue-900 text-white py-24 sm:py-32 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight">The <span className="text-orange-500">ShopElite</span> Story</h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto font-medium">
            We're on a mission to completely reimagine e-commerce by putting transparency, absolute quality, and people at the center of everything we do.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
              <Target size={120} />
            </div>
            <div className="w-16 h-16 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To democratize access to premium global brands while delivering a wildly delightful shopping interface. We believe that shopping online shouldn't be a chore—it should be a seamless, trusted, and elite experience from click to delivery.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
              <Lightbulb size={120} />
            </div>
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
              <Lightbulb size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To become the world's most trusted and beloved digital storefront. We envision a future where borders don't dictate what you can experience, and where every product you receive brings genuine joy into your life.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Elite Team</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">The brilliant minds working tirelessly behind the screen to bring you the greatest shopping experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                <div className="h-64 overflow-hidden relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-semibold text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Culture Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Life at ShopElite</h2>
            <p className="text-gray-500 text-lg max-w-2xl">From our global headquarters to our annual tech summits, see what makes our culture tick.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((img, idx) => (
            <div key={idx} className={`rounded-3xl overflow-hidden shadow-md group ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]' : 'h-[200px] md:h-[288px]'}`}>
              <img src={img} alt="Company Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-blue-900 text-center py-20 px-4 mb-10 mx-4 sm:mx-8 xl:mx-auto max-w-7xl rounded-3xl shadow-xl">
        <Heart size={48} className="text-orange-500 mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Become part of our journey.</h2>
        <a href="/products" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 text-lg">
          Start Shopping Today
        </a>
      </section>
    </div>
  );
}
