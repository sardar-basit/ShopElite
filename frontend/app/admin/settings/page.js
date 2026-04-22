'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';
import api from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Save, Globe, Mail, Phone, Settings as SettingsIcon, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
      return;
    }
    fetchSettings();
  }, [isAuthenticated, user, router]);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      reset(data.data);
    } catch (err) {
      toast.error('Failed to load global configuration');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await api.put('/settings', data);
      toast.success('Configuration Synchronized Successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Synchronization failed');
    } finally {
      setSaving(false);
    }
  };

  if (!mounted || !isAuthenticated || user?.role !== 'admin') return null;

  return (
    <div className="flex min-h-screen bg-[#F5F5DC]/50">
      <AdminSidebar />
      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-gray-200 pb-10">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4A373] font-black">Platform Control</span>
              <h1 className="text-4xl md:text-5xl font-serif-display text-[#2D2D2D] tracking-tight italic">Global Settings</h1>
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#2D2D2D]/40 font-black">
               <div className="w-8 h-[1px] bg-[#D4A373]"></div>
               Platform Architecture v1.0
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-32">
              <Spinner size={40} color="#D4A373" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 pb-20">
              
              {/* General Section */}
              <section className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-100 space-y-10">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-10">
                  <Globe className="text-[#D4A373]" size={20} strokeWidth={1.5} />
                  <h2 className="text-xl font-serif-display text-[#2D2D2D] italic">General Configuration</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Input 
                    label="Platform Designation" 
                    placeholder="e.g. LUXE Storefront" 
                    {...register('siteName', { required: 'Required' })} 
                    error={errors.siteName?.message}
                  />
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#2D2D2D]/60">Settlement Currency</label>
                    <select 
                      {...register('currency')}
                      className="w-full bg-white border-b border-gray-200 py-4 text-[11px] font-black uppercase tracking-widest text-[#2D2D2D] focus:outline-none focus:border-[#D4A373] appearance-none"
                    >
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-100 space-y-10">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-10">
                  <Mail className="text-[#D4A373]" size={20} strokeWidth={1.5} />
                  <h2 className="text-xl font-serif-display text-[#2D2D2D] italic">Communication Channels</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Input 
                    label="Official Concierge Email" 
                    placeholder="concierge@luxe.com" 
                    {...register('siteEmail', { required: 'Required' })} 
                    error={errors.siteEmail?.message}
                  />
                  <Input 
                    label="Direct Boutique Line" 
                    placeholder="+1 (800) 555-LUXE" 
                    {...register('sitePhone')} 
                  />
                </div>
              </section>

              {/* Social Links Section */}
              <section className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-100 space-y-10">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-10">
                  <SettingsIcon className="text-[#D4A373]" size={20} strokeWidth={1.5} />
                  <h2 className="text-xl font-serif-display text-[#2D2D2D] italic">Digital Visibility (Social)</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <Input label="Facebook Identity" placeholder="URL Sequence" {...register('socialLinks.facebook')} />
                  <Input label="Instagram Identity" placeholder="URL Sequence" {...register('socialLinks.instagram')} />
                  <Input label="Twitter Identity" placeholder="URL Sequence" {...register('socialLinks.twitter')} />
                </div>
              </section>

              {/* System Utility */}
              <section className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-gray-100 space-y-10">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-6 mb-10">
                  <ShieldAlert className="text-red-400" size={20} strokeWidth={1.5} />
                  <h2 className="text-xl font-serif-display text-[#2D2D2D] italic">System Utilities</h2>
                </div>
                
                <div className="flex items-center justify-between p-6 bg-red-50/30 border border-red-100 rounded-sm">
                   <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#2D2D2D]">Maintenance Atmosphere</p>
                      <p className="text-[10px] text-gray-500 italic">Disables the storefront for archival updates.</p>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" {...register('maintenanceMode')} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A373]"></div>
                   </label>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#2D2D2D] hover:bg-black text-white px-20 py-6 text-[10px] font-black uppercase tracking-[0.5em] transition-all transform hover:-translate-y-1 flex items-center gap-4 shadow-xl disabled:opacity-50"
                >
                  {saving ? (
                    <> <Spinner size={14} color="#FFF" /> Synchronizing... </>
                  ) : (
                    <> <Save size={16} /> Synchronize Configuration — </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </main>
    </div>
  );
}
