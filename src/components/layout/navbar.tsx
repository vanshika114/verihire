'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';

const navItems = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'Features', href: '#features', isRoute: false },
  { label: 'How It Works', href: '#how-it-works', isRoute: false },
  { label: 'Community', href: '/community', isRoute: true },
  { label: 'About', href: '/about', isRoute: true },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSectionClick = (id: string) => {
    const sectionId = id.replace('#', '');

    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.isRoute) {
      return pathname === item.href;
    }

    return pathname === '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2 text-white shadow-lg shadow-cyan-500/30">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight">VeriHire AI</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Know Before You Apply</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => {
                if (item.isRoute) {
                  router.push(item.href);
                } else {
                  handleSectionClick(item.href);
                }
              }}
              className={`transition hover:text-cyan-600 dark:hover:text-cyan-300 ${isActive(item) ? 'text-cyan-600 dark:text-cyan-300' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/upload">
            <Button variant="primary">Get started</Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-slate-200 bg-white/80 p-2.5 text-slate-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200/70 bg-white/95 px-6 py-4 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (item.isRoute) {
                    router.push(item.href);
                  } else {
                    handleSectionClick(item.href);
                  }
                }}
                className={`rounded-2xl px-3 py-2 text-left transition hover:bg-slate-100 hover:text-cyan-600 dark:hover:bg-slate-800 dark:hover:text-cyan-300 ${isActive(item) ? 'bg-slate-100 text-cyan-600 dark:bg-slate-800 dark:text-cyan-300' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <Link href="/upload" onClick={() => setOpen(false)}>
              <Button variant="primary" className="mt-1 w-full justify-center">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
