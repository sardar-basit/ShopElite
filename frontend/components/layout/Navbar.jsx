'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, User, LogOut, Menu, X, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Shop', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-[#F5F5DC]/95 backdrop-blur-md py-3 shadow-sm border-[#e8e1d5]' : 'bg-[#F5F5DC] py-6 border-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        
        {/* Left Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              href={link.path}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:text-[#D4A373] ${pathname === link.path ? 'text-[#2D2D2D]' : 'text-[#2D2D2D]/60'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center: Branding */}
        <Link href="/" className="flex flex-col items-center group">
          <span className="text-4xl font-serif-display font-light text-[#2D2D2D] tracking-[0.2em] transition-all group-hover:tracking-[0.3em]">LUXE</span>
          <div className="w-8 h-[1px] bg-[#D4A373] mt-2 group-hover:w-12 transition-all"></div>
        </Link>
        
        {/* Right Navigation */}
        <div className="flex items-center gap-6 md:gap-8">
          <button className="text-[#2D2D2D] hover:text-[#D4A373] transition-colors"><Search size={18} strokeWidth={1.5} /></button>
          
          <Link href="/cart" className="relative text-[#2D2D2D] hover:text-[#D4A373] transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {mounted && items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4A373] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {mounted && (
            isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-[#3E2C23] hover:text-[#D4A373] transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </button>
                <div className="absolute right-0 top-full mt-4 w-52 bg-white border border-[#e8e1d5] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 shadow-xl rounded-sm">
                   <div className="px-4 py-3 border-b border-gray-50 mb-2">
                      <p className="text-[9px] uppercase tracking-widest text-[#3E2C23]/40 font-bold">Authenticated as</p>
                      <p className="text-xs font-bold text-[#3E2C23] truncate">{user?.name}</p>
                   </div>
                   {user?.role === 'admin' && (
                      <Link href="/admin/dashboard" className="block px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-[#3E2C23] hover:bg-[#F5F5DC] hover:text-[#D4A373]">Administrative Hub</Link>
                   )}
                   <Link href="/orders" className="block px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-[#3E2C23] hover:bg-[#F5F5DC] hover:text-[#D4A373]">Acquisitions</Link>
                   <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-[#3E2C23] hover:bg-[#F5F5DC] hover:text-[#D4A373] flex items-center gap-2">
                      Sign Out <LogOut size={12} />
                   </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden border border-[#3E2C23]/20 md:block px-6 py-2.5 text-[9px] uppercase tracking-[0.2em] font-bold text-[#3E2C23] hover:bg-[#D4A373] hover:text-white hover:border-[#D4A373] transition-all">
                Sign In
              </Link>
            )
          )}

          <button className="md:hidden text-[#3E2C23]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-[#F5F5DC] border-t border-[#e8e1d5] overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] border-b' : 'max-h-0'}`}>
        <div className="px-6 py-10 space-y-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-[0.3em] font-bold text-[#3E2C23]">
              {link.name}
            </Link>
          ))}
          {mounted && !isAuthenticated && (
            <Link href="/login" onClick={() => setIsOpen(false)} className="block text-sm uppercase tracking-[0.3em] font-bold text-[#D4A373]">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
