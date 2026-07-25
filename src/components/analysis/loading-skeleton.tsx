"use client";

export function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/20" />
      <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
      <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
    </div>
  );
}
