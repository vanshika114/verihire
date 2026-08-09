'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useCompany } from '@/contexts/company-context';
import { findMockCompanyByEmail, generateCompanyId } from '@/lib/mock-company-data';
import { isValidEmail } from '@/lib/validation';
import type { Company } from '@/types/company';

interface LoginFormValues {
  email: string;
  password: string;
}

const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white';

export default function CompanyLoginPage() {
  const router = useRouter();
  const { setCompany } = useCompany();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    // Mock auth: accepts any email/password combination for demo purposes.
    await new Promise((resolve) => setTimeout(resolve, 700));

    const existing = findMockCompanyByEmail(values.email);

    const company: Company = existing
      ? { ...existing, is_authenticated: true }
      : {
          id: generateCompanyId(),
          name: values.email.split('@')[0],
          email: values.email,
          industry: '',
          size: '',
          regions: [],
          budget: '',
          is_authenticated: true,
        };

    setCompany(company);
    setIsSubmitting(false);
    router.push('/company/dashboard/pipeline');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2 text-white">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-white">Company login</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Welcome back to VeriHire</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              className={inputClasses}
              {...register('email', {
                required: 'Email is required',
                validate: (value) => isValidEmail(value) || 'Enter a valid email address',
              })}
            />
            {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email.message}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              className={inputClasses}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password.message}</p> : null}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-medium text-cyan-600 hover:underline dark:text-cyan-400"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/company/auth/signup"
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-400"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
