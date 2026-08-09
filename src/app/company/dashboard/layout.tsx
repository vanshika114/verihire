'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/company/protected-route';
import { CompanySidebar } from '@/components/company/sidebar';
import { CompanyHeader } from '@/components/company/header';

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <CompanySidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col lg:pl-[250px]">
          <CompanyHeader onMenuClick={() => setMobileSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
