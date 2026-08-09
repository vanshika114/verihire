'use client';

import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { KanbanColumn, type KanbanCardData } from '@/components/company/kanban-column';
import {
  getMockRoles,
  getMockPipeline,
  getCandidateById,
  getRoleById,
  pipelineStages,
} from '@/lib/mock-pipeline-data';
import type { Candidate } from '@/types/candidate';
import type { PipelineStage } from '@/types/pipeline';

type RoleFilter = 'all' | string;

export default function CompanyPipelinePage() {
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('all');

  const roles = useMemo(() => getMockRoles(), []);
  const pipeline = useMemo(() => getMockPipeline(), []);

  const columns = useMemo(() => {
    const result: Record<PipelineStage, KanbanCardData[]> = {
      screening: [],
      interviews: [],
      offers: [],
    };

    const roleIds = selectedRole === 'all' ? Object.keys(pipeline) : [selectedRole];

    for (const roleId of roleIds) {
      const rolePipeline = pipeline[roleId];
      if (!rolePipeline) continue;
      const role = getRoleById(roleId);
      const roleTitle = role?.title ?? 'Unknown role';

      for (const stage of pipelineStages) {
        for (const entry of rolePipeline[stage.key]) {
          const candidate = getCandidateById(entry.candidate_id);
          if (!candidate) continue;
          result[stage.key].push({
            candidate,
            roleTitle,
            daysInStage: entry.days_in_stage,
          });
        }
      }
    }

    return result;
  }, [pipeline, selectedRole]);

  const stats = useMemo(() => {
    const allCards = [...columns.screening, ...columns.interviews, ...columns.offers];
    const totalCandidates = allCards.length;
    const atRiskCandidates = allCards.filter((card) => card.candidate.reliability_score < 60).length;
    const avgTimePerStage = totalCandidates
      ? Math.round(
          (allCards.reduce((sum, card) => sum + card.daysInStage, 0) / totalCandidates) * 10,
        ) / 10
      : 0;
    const screeningCount = columns.screening.length;
    const offersCount = columns.offers.length;
    const conversionRate = screeningCount
      ? Math.round((offersCount / screeningCount) * 100)
      : 0;

    return {
      totalCandidates,
      atRiskCandidates,
      avgTimePerStage,
      conversionRate,
      offersPending: offersCount,
    };
  }, [columns]);

  const handleReset = () => setSelectedRole('all');

  const handleCardClick = (candidate: Candidate) => {
    // Candidate detail modal ships in Prompt 4 — wire the trigger up now.
    console.log('Open candidate detail modal for', candidate.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Pipeline</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track candidates as they move through screening, interviews, and offers.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedRole}
          onChange={(event) => setSelectedRole(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        >
          <option value="all">All roles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Mobile-only stats accordion */}
      <details className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-slate-900 dark:text-white">
          Pipeline statistics
        </summary>
        <div className="mt-4">
          <PipelineStats stats={stats} />
        </div>
      </details>

      <div className="flex gap-6">
        <div className="-mx-1 flex flex-1 gap-4 overflow-x-auto px-1 pb-2">
          <KanbanColumn title="Screening" cards={columns.screening} onCardClick={handleCardClick} />
          <KanbanColumn title="Interviews" cards={columns.interviews} onCardClick={handleCardClick} />
          <KanbanColumn title="Offers" cards={columns.offers} onCardClick={handleCardClick} />
        </div>

        <aside className="hidden w-72 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:block">
          <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Statistics</p>
          <PipelineStats stats={stats} />
        </aside>
      </div>
    </div>
  );
}

interface PipelineStatsProps {
  stats: {
    totalCandidates: number;
    atRiskCandidates: number;
    avgTimePerStage: number;
    conversionRate: number;
    offersPending: number;
  };
}

function PipelineStats({ stats }: PipelineStatsProps) {
  return (
    <div className="space-y-4">
      <StatRow label="Total candidates" value={stats.totalCandidates} />
      <StatRow label="At-risk candidates" value={stats.atRiskCandidates} danger={stats.atRiskCandidates > 0} />
      <StatRow label="Avg time per stage" value={`${stats.avgTimePerStage}d`} />
      <StatRow label="Conversion rate" value={`${stats.conversionRate}%`} />
      <StatRow label="Offers pending" value={stats.offersPending} danger={stats.offersPending > 0} />
    </div>
  );
}

function StatRow({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string | number;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <span
        className={`rounded-full px-2 py-0.5 text-sm font-semibold ${
          danger
            ? 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400'
            : 'text-slate-900 dark:text-white'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
