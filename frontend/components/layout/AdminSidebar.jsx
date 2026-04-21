import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Package, Users, Settings } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const nav = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Products', href: '/admin/products', icon: <Package size={18} /> },
    { name: 'Orders', href: '/admin/orders', icon: <TrendingUp size={18} /> },
    { name: 'Users', href: '/admin/users', icon: <Users size={18} /> },
  ];

  return (
    <div className="w-full md:w-64 bg-white md:bg-transparent rounded-2xl md:rounded-none border border-gray-100 md:border-none p-4 md:p-0 mb-6 md:mb-0 mb-6 md:sticky top-24 shrink-0 overflow-x-auto md:overflow-visible">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 hidden md:block">Admin Menu</h2>
      <div className="flex md:flex-col gap-2">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                active
                  ? 'bg-blue-800 text-white shadow-md'
                  : 'text-gray-600 hover:bg-white hover:text-blue-800 hover:shadow-sm md:hover:bg-white/60'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
