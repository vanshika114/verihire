'use client';

import { useCompany } from '@/contexts/company-context';

const stats = [
  { label: 'Total Candidates', value: 24 },
  { label: 'Offers Sent', value: 8 },
  { label: 'Awaiting Response', value: 3 },
  { label: 'At-Risk Offers', value: 1, isDanger: true },
];

export default function CompanyDashboardPage() {
  const { company } = useCompany();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Welcome back, {company?.name ?? 'Company'}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your hiring pipeline is ready. Start managing candidates.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p
              className={`mt-2 text-3xl font-semibold ${
                stat.isDanger ? 'text-red-500' : 'text-slate-900 dark:text-white'
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          + Create Role
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          + Search Candidates
        </button>
      </div>
    </div>
  );
}
