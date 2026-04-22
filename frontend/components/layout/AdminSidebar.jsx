'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { logout } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/admin/dashboard' },
    { name: 'Products', icon: <Package size={18} />, href: '/admin/products' },
    { name: 'Orders', icon: <ShoppingCart size={18} />, href: '/admin/orders' },
    { name: 'Users', icon: <Users size={18} />, href: '/admin/users' },
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white font-serif-display text-sm tracking-tighter">L</div>
           <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">Admin Panel</span>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-50 p-4 space-y-1">
          <Link href="/admin/settings" 
            className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Settings size={18} />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all w-full text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="p-6 mt-10">
           <Link href="/" className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400 hover:text-gray-900 transition-colors">
              <ChevronLeft size={14} /> Back to Store
           </Link>
        </div>
      </div>
    </aside>
  );
}
