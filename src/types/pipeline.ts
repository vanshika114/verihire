export type PipelineStage = 'screening' | 'interviews' | 'offers';

export interface PipelineEntry {
  candidate_id: string;
  added_at: string;
  days_in_stage: number;
}

export type RolePipeline = Record<PipelineStage, PipelineEntry[]>;

/** Keyed by role_id */
export type Pipeline = Record<string, RolePipeline>;
