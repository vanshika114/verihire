export interface Offer {
  id: string;
  candidate_id: string;
  role_id: string;
  position_title: string;
  salary: number;
  currency: string;
  start_date: string;
  status: 'sent' | 'responded' | 'accepted' | 'withdrawn' | 'rejected';
  sent_at: string;
  response_at: string | null;
  created_by: string;
  survey_response?: {
    will_accept: boolean;
    join_date: string;
    concerns: string;
  };
  backing_out_risk: {
    probability: number;
    level: 'low' | 'medium' | 'high';
  };
}
