export type RoleStatus = 'open' | 'closed' | 'on-hold';

export interface Role {
  id: string;
  company_id: string;
  title: string;
  status: RoleStatus;
  department: string;
}
