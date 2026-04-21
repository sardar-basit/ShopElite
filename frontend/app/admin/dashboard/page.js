'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const StatsCard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-semibold">{title}</p>
      <h4 className="text-3xl font-bold text-gray-900">{value}</h4>
    </div>
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

  if (loading || !stats) return <div className="py-32 flex justify-center"><Spinner size={48} /></div>;

  const chartData = {
    labels: stats.monthlyRevenue.map(m => `${m._id.month}/${m._id.year}`),
    datasets: [
      {
        label: 'Revenue ($)',
        data: stats.monthlyRevenue.map(m => m.revenue),
        borderColor: '#1e3a8a',
        backgroundColor: 'rgba(30, 58, 138, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1 w-full max-w-full overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatsCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={<DollarSign size={24} />} color="from-green-500 to-green-600" />
          <StatsCard title="Total Orders" value={stats.totalOrders} icon={<Package size={24} />} color="from-blue-600 to-blue-800" />
          <StatsCard title="Order Statuses" value={stats.ordersByStatus.length} icon={<TrendingUp size={24} />} color="from-orange-400 to-orange-500" />
          <StatsCard title="Monthly Points" value={stats.monthlyRevenue.length} icon={<Users size={24} />} color="from-purple-500 to-purple-600" />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend (Last 6 Months)</h3>
          <div className="w-full h-[300px] sm:h-[400px]">
            <Line 
              data={chartData} 
              options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
