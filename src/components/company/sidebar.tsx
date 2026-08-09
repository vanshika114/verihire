'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Network, FileText, Star, LogOut, ShieldCheck, X } from 'lucide-react';
import { useCompany } from '@/contexts/company-context';

const menuItems = [
  { label: 'Dashboard', href: '/company/dashboard', icon: Home },
  { label: 'Pipeline', href: '/company/dashboard/pipeline', icon: Network },
  { label: 'Offers', href: '/company/dashboard/offers', icon: FileText },
  { label: 'Reputation', href: '/company/dashboard/reputation', icon: Star },
];

interface CompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompanySidebar({ isOpen, onClose }: CompanySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { company, logout } = useCompany();

  const handleLogout = () => {
    logout();
    router.push('/company/auth/login');
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-slate-900 text-slate-200">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/company/dashboard" className="flex items-center gap-2">
          <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2 text-white">
            <ShieldCheck size={18} />
          </div>
          <span className="text-sm font-semibold text-white">VeriHire Company</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-1 text-slate-400 hover:text-white lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl border-l-2 px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'border-cyan-400 bg-slate-800 text-white'
                  : 'border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 px-4 py-4">
        <p className="truncate text-sm font-semibold text-white">{company?.name ?? 'Company'}</p>
        <p className="truncate text-xs text-slate-500">{company?.email}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] lg:block">{sidebarContent}</aside>

      {/* Mobile sidebar */}
      {isOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-[250px] max-w-[85vw]">{sidebarContent}</aside>
        </div>
      ) : null}
    </>
  );
}
