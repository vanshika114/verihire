import type { Company } from '@/types/company';

export const mockCompanies: Record<string, Company> = {
  'comp-001': {
    id: 'comp-001',
    name: 'Tech Startup Inc',
    email: 'hr@techstartup.com',
    industry: 'Tech',
    size: '51-200',
    regions: ['Bangalore', 'Delhi'],
    budget: '50L',
    is_authenticated: false,
  },
  'comp-002': {
    id: 'comp-002',
    name: 'FinEdge Solutions',
    email: 'talent@finedge.io',
    industry: 'Finance',
    size: '11-50',
    regions: ['Mumbai', 'Pune'],
    budget: '1Cr',
    is_authenticated: false,
  },
};

export function findMockCompanyByEmail(email: string): Company | null {
  const normalized = email.trim().toLowerCase();
  const match = Object.values(mockCompanies).find(
    (company) => company.email.toLowerCase() === normalized,
  );
  return match ?? null;
}

export function generateCompanyId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `comp-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`;
}

export const industryOptions = ['Tech', 'Finance', 'Healthcare', 'Retail', 'Other'];

export const companySizeOptions = ['1-10', '11-50', '51-200', '201-500', '500+'];

export const hiringRegionOptions = [
  'Bangalore',
  'Delhi',
  'Mumbai',
  'Hyderabad',
  'Chennai',
  'Pune',
];
