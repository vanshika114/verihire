export function getScoreBadgeClasses(score: number) {
  if (score >= 80) {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200';
  }

  if (score >= 60) {
    return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200';
  }

  return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-200';
}

export function formatDaysInStage(days: number) {
  return `${days} day${days === 1 ? '' : 's'} in stage`;
}
