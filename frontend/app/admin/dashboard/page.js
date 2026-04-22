'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import { TrendingUp, Package, Users, DollarSign, Download, ArrowUpRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const StatsCard = ({ title, value, change, positive }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{title}</p>
      <div className={`flex items-center gap-1 text-[10px] font-bold ${positive ? 'text-[#1a7a4a]' : 'text-red-500'}`}>
        <ArrowUpRight size={12} /> {change}%
      </div>
    </div>
    <h4 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h4>
  </div>
);

export default function AdminDashboard() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const { data } = await api.get('/orders/stats');
        setStats(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isAuthenticated, user, router]);

  if (loading || !stats) return <div className="py-32 flex justify-center"><Spinner size={48} color="#1a7a4a" /></div>;

  const chartData = {
    labels: stats.monthlyRevenue.map(m => `${m._id.month}/${m._id.year}`),
    datasets: [
      {
        label: 'Revenue ($)',
        data: stats.monthlyRevenue.map(m => m.revenue),
        borderColor: '#1a7a4a',
        backgroundColor: 'rgba(26, 122, 74, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#1a7a4a',
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-screen bg-gray-50/50 p-4">
      <AdminSidebar />
      
      <div className="flex-1 w-full max-w-full overflow-hidden px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-serif-display text-gray-900">Admin Panel</h1>
            <p className="text-[#888] text-xs mt-1">Welcome Back, here's what's happening today.</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
             <Download size={14} /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard title="Total Sales" value={`$${stats.totalRevenue.toLocaleString()}`} change="12.5" positive={true} />
          <StatsCard title="Total Orders" value={stats.totalOrders} change="8.2" positive={true} />
          <StatsCard title="Active Users" value={stats.totalOrders + 124} change="3.1" positive={true} />
          <StatsCard title="Monthly Growth" value={`${stats.ordersByStatus.length}%`} change="0.4" positive={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Chart */}
           <div className="lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Revenue Overview</h3>
                 <select className="bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest px-4 py-2 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                 </select>
              </div>
              <div className="w-full h-[350px]">
                <Line 
                  data={chartData} 
                  options={{ 
                    maintainAspectRatio: false, 
                    responsive: true, 
                    plugins: { legend: { display: false } },
                    scales: {
                       y: { grid: { display: false }, ticks: { font: { size: 10 } } },
                       x: { grid: { display: false }, ticks: { font: { size: 10 } } }
                    }
                  }} 
                />
              </div>
           </div>

           {/* Side Action Panel */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Action Items</h3>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[11px] font-medium text-gray-600">Pending Approvals</span>
                       <span className="bg-gray-100 text-gray-900 text-[9px] font-black px-2 py-1 rounded">3</span>
                    </div>
                    <div className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[11px] font-medium text-gray-600">Low Stock Alert</span>
                       <span className="bg-red-50 text-red-600 text-[9px] font-black px-2 py-1 rounded">12</span>
                    </div>
                    <div className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[11px] font-medium text-gray-600">New Support Tickets</span>
                       <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-1 rounded">5</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
