export interface CandidateFeedback {
  company: string;
  feedback: string;
  rating: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  reliability_score: number;
  acceptance_rate: number;
  avg_time_to_join: number;
  total_offers: number;
  accepted_offers: number;
  backed_out_count: number;
  red_flags: string[];
  company_feedback: CandidateFeedback[];
  tags: string[];
}
