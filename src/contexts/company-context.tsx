'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Company } from '@/types/company';

const STORAGE_KEY = 'verihire_company';

interface CompanyContextType {
  company: Company | null;
  setCompany: (company: Company) => void;
  logout: () => void;
  isAuthenticated: boolean;
  /** True until the initial localStorage read completes. */
  isLoading: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompanyState] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Company;
        if (parsed?.is_authenticated) {
          setCompanyState(parsed);
        }
      }
    } catch {
      // Ignore malformed/inaccessible storage
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setCompany = (next: Company) => {
    setCompanyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore write failures
    }
  };

  const logout = () => {
    setCompanyState(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        setCompany,
        logout,
        isAuthenticated: Boolean(company?.is_authenticated),
        isLoading,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
