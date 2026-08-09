import type { ReactNode } from 'react';
import { CompanyProvider } from '@/contexts/company-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <CompanyProvider>{children}</CompanyProvider>;
}
