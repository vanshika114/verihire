'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useCompany } from '@/contexts/company-context';
import {
  generateCompanyId,
  industryOptions,
  companySizeOptions,
  hiringRegionOptions,
} from '@/lib/mock-company-data';
import { isValidEmail, isValidPhone, getPasswordStrengthError } from '@/lib/validation';
import type { Company } from '@/types/company';

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phone: string;
  industry: string;
  companySize: string;
  regions: string[];
  budget: string;
}

const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white';

export default function CompanySignupPage() {
  const router = useRouter();
  const { setCompany } = useCompany();
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      phone: '',
      industry: '',
      companySize: '',
      regions: [],
      budget: '',
    },
  });

  const selectedRegions = watch('regions');
  const password = watch('password');

  const toggleRegion = (region: string) => {
    const next = selectedRegions.includes(region)
      ? selectedRegions.filter((item) => item !== region)
      : [...selectedRegions, region];
    setValue('regions', next, { shouldValidate: true });
  };

  const handleNext = async () => {
    const valid = await trigger(['email', 'password', 'confirmPassword', 'companyName', 'phone']);
    if (valid) setStep(2);
  };

  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    // Simulated network request — swap for a real API call when the backend is ready.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const newCompany: Company = {
      id: generateCompanyId(),
      name: values.companyName,
      email: values.email,
      industry: values.industry,
      size: values.companySize,
      regions: values.regions,
      budget: values.budget,
      is_authenticated: true,
    };

    setCompany(newCompany);
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
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Create a company account
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Step {step} of 2</p>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-cyan-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-cyan-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 ? (
            <>
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
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) => getPasswordStrengthError(value) ?? true,
                  })}
                />
                {errors.password ? (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={inputClasses}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirmPassword ? (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Company Name
                </label>
                <input
                  type="text"
                  className={inputClasses}
                  {...register('companyName', { required: 'Company name is required' })}
                />
                {errors.companyName ? (
                  <p className="mt-1 text-xs text-red-500">{errors.companyName.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone
                </label>
                <input
                  type="tel"
                  className={inputClasses}
                  {...register('phone', {
                    required: 'Phone number is required',
                    validate: (value) => isValidPhone(value) || 'Enter a valid phone number',
                  })}
                />
                {errors.phone ? <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p> : null}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="mt-2 w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
              >
                Next
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <Link
                  href="/company/auth/login"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  Log in
                </Link>
              </p>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Industry
                </label>
                <select
                  className={inputClasses}
                  {...register('industry', { required: 'Select an industry' })}
                >
                  <option value="">Select industry</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.industry ? (
                  <p className="mt-1 text-xs text-red-500">{errors.industry.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Company Size
                </label>
                <select
                  className={inputClasses}
                  {...register('companySize', { required: 'Select a company size' })}
                >
                  <option value="">Select size</option>
                  {companySizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.companySize ? (
                  <p className="mt-1 text-xs text-red-500">{errors.companySize.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Hiring Regions
                </label>
                <div className="flex flex-wrap gap-2">
                  {hiringRegionOptions.map((region) => {
                    const isSelected = selectedRegions.includes(region);
                    return (
                      <button
                        key={region}
                        type="button"
                        onClick={() => toggleRegion(region)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
                            : 'border-slate-300 text-slate-600 hover:border-cyan-300 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {region}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  {...register('regions', {
                    validate: (value) => value.length > 0 || 'Select at least one region',
                  })}
                />
                {errors.regions ? (
                  <p className="mt-1 text-xs text-red-500">{errors.regions.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Budget
                </label>
                <input
                  type="text"
                  placeholder="e.g., 50L or 1Cr"
                  className={inputClasses}
                  {...register('budget', { required: 'Budget is required' })}
                />
                {errors.budget ? <p className="mt-1 text-xs text-red-500">{errors.budget.message}</p> : null}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-1/2 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
