'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { ShoppingCart, User, LogOut, LayoutDashboard, Package, Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const { totalItems } = useSelector((s) => s.cart);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/');
    setUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?keyword=${encodeURIComponent(search.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <nav className="bg-blue-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">ShopElite</span>
          </Link>

          {/* User Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-5 ml-8 mr-auto">
            <Link href="/" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Home</Link>
            <Link href="/products" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Product</Link>
            <Link href="/about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About Us</Link>
            <Link href="/contact" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Contact</Link>
          </div>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs ml-auto mr-6">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
                <Search size={15} />
              </button>
            </div>
          </form>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {!mounted ? (
              <div className="w-[120px]"></div>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                      >
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                    >
                      <Package size={15} /> My Orders
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="relative text-white">
              <ShoppingCart size={22} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-900 border-t border-white/10 px-4 pb-4 space-y-3">
          <form onSubmit={handleSearch} className="pt-3 pb-2">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                <Search size={15} />
              </button>
            </div>
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col gap-3 py-2 border-b border-white/10 text-sm">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white font-medium">Home</Link>
            <Link href="/products" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white font-medium">Product</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white font-medium">About Us</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white font-medium">Contact</Link>
          </div>

          {!mounted ? null : isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-white/80 py-2 text-sm">
                  <LayoutDashboard size={16} /> Admin Dashboard
                </Link>
              )}
              <Link href="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-white/80 py-2 text-sm">
                <Package size={16} /> My Orders
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 py-2 text-sm">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-white text-sm font-medium py-2">Login</Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="bg-orange-500 text-white text-sm font-semibold py-2.5 rounded-lg text-center">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
