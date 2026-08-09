'use client';

import type { Candidate } from '@/types/candidate';
import { getScoreBadgeClasses, formatDaysInStage } from '@/lib/format';

interface CandidateCardProps {
  candidate: Candidate;
  roleTitle: string;
  daysInStage: number;
  onClick?: (candidate: Candidate) => void;
}

export function CandidateCard({ candidate, roleTitle, daysInStage, onClick }: CandidateCardProps) {
  const hasRedFlags = candidate.red_flags.length > 0;

  return (
    <button
      type="button"
      onClick={() => onClick?.(candidate)}
      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{candidate.name}</p>
      <p className="truncate text-xs text-slate-500 dark:text-slate-400">{roleTitle}</p>

      <div className="mt-2 flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getScoreBadgeClasses(
            candidate.reliability_score,
          )}`}
        >
          {candidate.reliability_score}/100
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {candidate.acceptance_rate}% accept
        </span>
      </div>

      <p
        className={`mt-2 text-xs ${
          hasRedFlags
            ? 'font-medium text-red-500'
            : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        Red flags: {hasRedFlags ? candidate.red_flags.join(', ') : 'None'}
      </p>

      <p className="mt-2 text-right text-[11px] text-slate-400 dark:text-slate-500">
        {formatDaysInStage(daysInStage)}
      </p>
    </button>
  );
}
