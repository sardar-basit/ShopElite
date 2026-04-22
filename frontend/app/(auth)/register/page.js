'use client';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated, user } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      if (user?.role === 'admin') router.push('/admin/dashboard');
      else router.push('/');
    }
  }, [isAuthenticated, user, dispatch, router]);

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Identity Established — Welcome to LUXE');
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-[#F5F5DC] px-4 py-12">
      <div className="w-full max-w-md bg-white p-10 py-16 border border-[#e8e1d5] shadow-2xl relative overflow-hidden group">
        
        {/* Editorial gold accent bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D4A373]"></div>
        
        <div className="text-center mb-16">
          <span 
            className="text-5xl font-serif-display font-light tracking-[0.4em] uppercase block mb-4 text-[#3E2C23]"
          >
            LUXE
          </span>
          <div className="w-12 h-px bg-[#D4A373] mx-auto mb-6"></div>
          <h2 className="text-[10px] font-black text-[#8B6B4A]/60 uppercase tracking-[0.5em] italic">Member Registration</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 text-[9px] tracking-widest uppercase font-black mb-12 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          <Input
            label="Full Identity"
            type="text"
            placeholder="MARCUS T. ARCHIVAL"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
            className="bg-transparent border-[#e8e1d5] text-[#3E2C23] focus:border-[#D4A373]"
          />
          <Input
            label="Electronic Mail"
            type="email"
            placeholder="PROCURER@LUXEMAISON.COM"
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
            })}
            className="bg-transparent border-[#e8e1d5] text-[#3E2C23] focus:border-[#D4A373]"
          />
          <Input
            label="Secure Passkey"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Must be at least 6 characters' }
            })}
            className="bg-transparent border-[#e8e1d5] text-[#3E2C23] focus:border-[#D4A373]"
          />
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-6 bg-[#3E2C23] hover:bg-[#1a1310] text-[#F5F5DC] font-black uppercase tracking-[0.4em] text-[10px] transition-all shadow-xl flex items-center justify-center gap-4"
          >
            {loading ? 'Processing —' : 'Register Identity —'}
          </button>
        </form>

        <p className="text-center text-[9px] uppercase tracking-[0.15em] text-[#8B6B4A]/60 mt-16 font-bold">
          Already established?{' '}
          <Link href="/login" className="text-[#D4A373] hover:text-[#3E2C23] transition-colors underline underline-offset-4 decoration-[#D4A373]/30">
             Sign In
          </Link>
        </p>

        <div className="mt-12 pt-8 border-t border-[#e8e1d5]/50 text-[8px] uppercase tracking-[0.3em] text-[#8B6B4A]/40 text-center">
            <p>Integrated Global Membership Architecture</p>
        </div>
      </div>
    </div>
  );
}
