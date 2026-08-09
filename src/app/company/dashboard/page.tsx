'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCompany } from '@/contexts/company-context';

export default function CompanyDashboardPage() {
  const router = useRouter();
  const { company } = useCompany();

  useEffect(() => {
    router.replace('/company/dashboard/pipeline');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Redirecting to your pipeline...</p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Welcome back, {company?.name ?? 'Company'}. If you are not redirected automatically,{' '}
          <a href="/company/dashboard/pipeline" className="font-medium text-cyan-600 dark:text-cyan-400">
            click here
          </a>.
        </p>
      </div>
    </div>
  );
}
