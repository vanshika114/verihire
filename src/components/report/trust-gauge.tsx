"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

type TrustGaugeProps = {
  score: number;
  riskLevel: string;
  confidence: number;
};

export function TrustGauge({ score, riskLevel, confidence }: TrustGaugeProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/15 bg-slate-950/50 p-6 text-center">
      <div className="relative flex h-48 w-48 items-center justify-center">
        <svg viewBox="0 0 220 220" className="h-48 w-48 -rotate-90">
          <circle cx="110" cy="110" r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="18" fill="none" />
          <motion.circle
            cx="110"
            cy="110"
            r={radius}
            stroke="url(#trustGradient)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeDasharray={circumference}
          />
          <defs>
            <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trust Score</p>
          <div className="mt-2 text-5xl font-semibold text-white">{score}</div>
          <div className="text-sm text-slate-400">/ 100</div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
          {riskLevel}
        </div>
        <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200">
          Confidence {confidence}%
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        Verified with multi-agent reasoning
      </div>
    </div>
  );
}
