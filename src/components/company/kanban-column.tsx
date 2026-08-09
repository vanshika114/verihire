'use client';

import type { Candidate } from '@/types/candidate';
import { CandidateCard } from '@/components/company/candidate-card';

export interface KanbanCardData {
  candidate: Candidate;
  roleTitle: string;
  daysInStage: number;
}

interface KanbanColumnProps {
  title: string;
  cards: KanbanCardData[];
  onCardClick?: (candidate: Candidate) => void;
}

export function KanbanColumn({ title, cards, onCardClick }: KanbanColumnProps) {
  return (
    <div className="flex min-w-[260px] flex-1 flex-col rounded-2xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {cards.length}
        </span>
      </div>

      <div className="max-h-[520px] space-y-3 overflow-y-auto p-3">
        {cards.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
            No candidates in this stage.
          </p>
        ) : (
          cards.map(({ candidate, roleTitle, daysInStage }) => (
            <CandidateCard
              key={`${candidate.id}-${roleTitle}`}
              candidate={candidate}
              roleTitle={roleTitle}
              daysInStage={daysInStage}
              onClick={onCardClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
