'use client';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Package } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
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
    const res = await dispatch(loginUser(data));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Welcome back!');
      const userPayload = res.payload;
      if (userPayload?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Package size={24} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Log in to manage your orders & wishlist.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
          
          <Button type="submit" loading={loading} className="mt-4">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-800 font-bold hover:underline">
            Register now
          </Link>
        </p>

        <div className="mt-6 text-xs text-center text-gray-400">
          <p>Demo Admin: admin@ecommerce.com / Admin@1234</p>
          <p>Demo User: user@ecommerce.com / User@1234</p>
        </div>
      </div>
    </div>
  );
}
