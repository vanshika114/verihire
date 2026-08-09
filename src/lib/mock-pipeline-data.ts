import type { Candidate } from '@/types/candidate';
import type { Role } from '@/types/role';
import type { Pipeline, PipelineStage } from '@/types/pipeline';
import type { Offer } from '@/types/offer';

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    reliability_score: 88,
    acceptance_rate: 86,
    avg_time_to_join: 12,
    total_offers: 7,
    accepted_offers: 6,
    backed_out_count: 1,
    red_flags: [],
    company_feedback: [
      { company: 'Google', feedback: 'Great professional, joined on time', rating: 5 },
      { company: 'Amazon', feedback: 'Good candidate but long negotiation', rating: 4 },
    ],
    tags: ['High reliability', 'Quick joiner'],
  },
  {
    id: 'cand-002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    reliability_score: 72,
    acceptance_rate: 75,
    avg_time_to_join: 14,
    total_offers: 5,
    accepted_offers: 4,
    backed_out_count: 1,
    red_flags: ['Salary negotiator'],
    company_feedback: [
      { company: 'Microsoft', feedback: 'Professional, lengthy negotiation period', rating: 4 },
    ],
    tags: ['Moderate reliability'],
  },
  {
    id: 'cand-003',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    reliability_score: 55,
    acceptance_rate: 60,
    avg_time_to_join: 20,
    total_offers: 5,
    accepted_offers: 3,
    backed_out_count: 2,
    red_flags: ['Multiple backing outs', 'Takes long to join'],
    company_feedback: [{ company: 'Flipkart', feedback: 'Backed out at last moment', rating: 2 }],
    tags: ['Lower reliability', 'High risk'],
  },
  {
    id: 'cand-004',
    name: 'Sneha Patel',
    email: 'sneha@example.com',
    reliability_score: 92,
    acceptance_rate: 95,
    avg_time_to_join: 8,
    total_offers: 4,
    accepted_offers: 4,
    backed_out_count: 0,
    red_flags: [],
    company_feedback: [
      { company: 'Uber', feedback: 'Excellent, joined exactly on schedule', rating: 5 },
      { company: 'Swiggy', feedback: 'Professional and reliable', rating: 5 },
    ],
    tags: ['Highly reliable', 'Quick joiner'],
  },
  {
    id: 'cand-005',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    reliability_score: 68,
    acceptance_rate: 70,
    avg_time_to_join: 16,
    total_offers: 6,
    accepted_offers: 4,
    backed_out_count: 2,
    red_flags: [],
    company_feedback: [],
    tags: ['Moderate reliability'],
  },
  {
    id: 'cand-006',
    name: 'Ananya Reddy',
    email: 'ananya@example.com',
    reliability_score: 81,
    acceptance_rate: 80,
    avg_time_to_join: 10,
    total_offers: 5,
    accepted_offers: 4,
    backed_out_count: 1,
    red_flags: [],
    company_feedback: [{ company: 'Zomato', feedback: 'Reliable and communicative', rating: 4 }],
    tags: ['Reliable'],
  },
  {
    id: 'cand-007',
    name: 'Karan Mehta',
    email: 'karan@example.com',
    reliability_score: 45,
    acceptance_rate: 40,
    avg_time_to_join: 25,
    total_offers: 5,
    accepted_offers: 2,
    backed_out_count: 3,
    red_flags: ['Frequent backouts', 'Slow to respond'],
    company_feedback: [{ company: 'Paytm', feedback: 'Went silent after offer', rating: 2 }],
    tags: ['High risk'],
  },
  {
    id: 'cand-008',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    reliability_score: 95,
    acceptance_rate: 100,
    avg_time_to_join: 7,
    total_offers: 3,
    accepted_offers: 3,
    backed_out_count: 0,
    red_flags: [],
    company_feedback: [{ company: 'Razorpay', feedback: 'Outstanding, joined early', rating: 5 }],
    tags: ['Highly reliable', 'Quick joiner'],
  },
  {
    id: 'cand-009',
    name: 'Rohan Desai',
    email: 'rohan@example.com',
    reliability_score: 63,
    acceptance_rate: 65,
    avg_time_to_join: 18,
    total_offers: 4,
    accepted_offers: 3,
    backed_out_count: 1,
    red_flags: ['Salary negotiator'],
    company_feedback: [],
    tags: ['Moderate reliability'],
  },
  {
    id: 'cand-010',
    name: 'Ishita Nair',
    email: 'ishita@example.com',
    reliability_score: 58,
    acceptance_rate: 55,
    avg_time_to_join: 19,
    total_offers: 6,
    accepted_offers: 3,
    backed_out_count: 2,
    red_flags: ['Long negotiation'],
    company_feedback: [{ company: 'Ola', feedback: 'Took a while to decide', rating: 3 }],
    tags: ['Moderate reliability'],
  },
];

export const mockRoles: Role[] = [
  {
    id: 'role-001',
    company_id: 'comp-001',
    title: 'Senior Backend Engineer',
    status: 'open',
    department: 'Engineering',
  },
  {
    id: 'role-002',
    company_id: 'comp-001',
    title: 'Product Manager',
    status: 'open',
    department: 'Product',
  },
  {
    id: 'role-003',
    company_id: 'comp-001',
    title: 'DevOps Engineer',
    status: 'open',
    department: 'Infrastructure',
  },
];

export const mockPipeline: Pipeline = {
  'role-001': {
    screening: [
      { candidate_id: 'cand-001', added_at: '2026-08-01', days_in_stage: 8 },
      { candidate_id: 'cand-002', added_at: '2026-08-02', days_in_stage: 7 },
      { candidate_id: 'cand-004', added_at: '2026-08-03', days_in_stage: 6 },
      { candidate_id: 'cand-006', added_at: '2026-08-04', days_in_stage: 5 },
    ],
    interviews: [
      { candidate_id: 'cand-003', added_at: '2026-08-05', days_in_stage: 4 },
      { candidate_id: 'cand-005', added_at: '2026-08-06', days_in_stage: 3 },
      { candidate_id: 'cand-009', added_at: '2026-08-06', days_in_stage: 3 },
    ],
    offers: [{ candidate_id: 'cand-001', added_at: '2026-08-08', days_in_stage: 1 }],
  },
  'role-002': {
    screening: [
      { candidate_id: 'cand-002', added_at: '2026-08-01', days_in_stage: 8 },
      { candidate_id: 'cand-005', added_at: '2026-08-02', days_in_stage: 7 },
      { candidate_id: 'cand-010', added_at: '2026-08-03', days_in_stage: 6 },
    ],
    interviews: [{ candidate_id: 'cand-004', added_at: '2026-08-05', days_in_stage: 4 }],
    offers: [],
  },
  'role-003': {
    screening: [
      { candidate_id: 'cand-003', added_at: '2026-08-01', days_in_stage: 8 },
      { candidate_id: 'cand-008', added_at: '2026-08-04', days_in_stage: 5 },
    ],
    interviews: [{ candidate_id: 'cand-007', added_at: '2026-08-05', days_in_stage: 4 }],
    offers: [],
  },
};

export const mockOffers: Offer[] = [
  {
    id: 'offer-001',
    candidate_id: 'cand-001',
    role_id: 'role-001',
    position_title: 'Senior Backend Engineer',
    salary: 1500000,
    currency: 'INR',
    start_date: '2026-09-01',
    status: 'sent',
    sent_at: '2026-08-08T10:00:00Z',
    response_at: null,
    created_by: 'Arjun Sharma',
    backing_out_risk: { probability: 0.15, level: 'low' },
  },
  {
    id: 'offer-002',
    candidate_id: 'cand-003',
    role_id: 'role-001',
    position_title: 'Senior Backend Engineer',
    salary: 1800000,
    currency: 'INR',
    start_date: '2026-09-15',
    status: 'responded',
    sent_at: '2026-08-07T14:30:00Z',
    response_at: '2026-08-08T15:45:00Z',
    created_by: 'Priya Kumar',
    survey_response: {
      will_accept: true,
      join_date: '2026-09-15',
      concerns: 'Need WFH flexibility',
    },
    backing_out_risk: { probability: 0.55, level: 'high' },
  },
  {
    id: 'offer-003',
    candidate_id: 'cand-004',
    role_id: 'role-002',
    position_title: 'Product Manager',
    salary: 2200000,
    currency: 'INR',
    start_date: '2026-09-10',
    status: 'accepted',
    sent_at: '2026-08-02T09:15:00Z',
    response_at: '2026-08-04T11:00:00Z',
    created_by: 'Priya Kumar',
    survey_response: {
      will_accept: true,
      join_date: '2026-09-10',
      concerns: '',
    },
    backing_out_risk: { probability: 0.08, level: 'low' },
  },
  {
    id: 'offer-004',
    candidate_id: 'cand-005',
    role_id: 'role-003',
    position_title: 'DevOps Engineer',
    salary: 1600000,
    currency: 'INR',
    start_date: '2026-09-20',
    status: 'withdrawn',
    sent_at: '2026-07-28T12:00:00Z',
    response_at: '2026-08-01T09:00:00Z',
    created_by: 'Arjun Sharma',
    backing_out_risk: { probability: 0.72, level: 'high' },
  },
  {
    id: 'offer-005',
    candidate_id: 'cand-008',
    role_id: 'role-003',
    position_title: 'DevOps Engineer',
    salary: 1700000,
    currency: 'INR',
    start_date: '2026-09-05',
    status: 'rejected',
    sent_at: '2026-08-03T10:30:00Z',
    response_at: '2026-08-05T16:20:00Z',
    created_by: 'Priya Kumar',
    survey_response: {
      will_accept: false,
      join_date: '',
      concerns: 'Accepted a competing offer',
    },
    backing_out_risk: { probability: 0.4, level: 'medium' },
  },
];

export function getMockCandidates(): Candidate[] {
  return mockCandidates;
}

export function getMockRoles(companyId = 'comp-001'): Role[] {
  return mockRoles.filter((role) => role.company_id === companyId);
}

export function getMockPipeline(): Pipeline {
  return mockPipeline;
}

export function getMockOffers(): Offer[] {
  return mockOffers;
}

export function getCandidateById(id: string): Candidate | undefined {
  return mockCandidates.find((candidate) => candidate.id === id);
}

export function getRoleById(id: string): Role | undefined {
  return mockRoles.find((role) => role.id === id);
}

export function getOffersForCandidate(candidateId: string): Offer[] {
  return mockOffers.filter((offer) => offer.candidate_id === candidateId);
}

export const pipelineStages: { key: PipelineStage; label: string }[] = [
  { key: 'screening', label: 'Screening' },
  { key: 'interviews', label: 'Interviews' },
  { key: 'offers', label: 'Offers' },
];
