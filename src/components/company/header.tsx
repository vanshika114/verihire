'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Menu, ChevronDown, LogOut } from 'lucide-react';
import { useCompany } from '@/contexts/company-context';

const mockAlerts = [
  'Priya Sharma accepted your offer',
  'New candidate matched for SDE-II role',
  'Offer for Rahul Verma expires in 2 days',
];

interface CompanyHeaderProps {
  onMenuClick: () => void;
}

export function CompanyHeader({ onMenuClick }: CompanyHeaderProps) {
  const { company, logout } = useCompany();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/company/auth/login');
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Menu size={20} />
        </button>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-white">Dashboard</span> / Overview
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((value) => !value);
              setUserMenuOpen(false);
            }}
            aria-label="Notifications"
            className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell size={18} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              3
            </span>
          </button>
          {notifOpen ? (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              {mockAlerts.map((alert) => (
                <div
                  key={alert}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {alert}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setUserMenuOpen((value) => !value);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
              {company?.name?.charAt(0)?.toUpperCase() ?? 'C'}
            </span>
            <span className="hidden max-w-[120px] truncate sm:inline">{company?.name ?? 'Company'}</span>
            <ChevronDown size={14} />
          </button>
          {userMenuOpen ? (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
