'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const analyses = [
  { company: 'Northstar Labs', score: '92/100', date: '2h ago', risk: 'Low Risk' },
  { company: 'Aural AI', score: '74/100', date: 'Yesterday', risk: 'Medium Risk' },
  { company: 'Vertex Forge', score: '43/100', date: '2 days ago', risk: 'High Risk' },
];

export function RecentAnalyses() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">Recent Analyses</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Pick up where you left off</h3>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {analyses.map((item, index) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <Link
              href="/report/demo"
              className="flex h-full flex-col justify-between rounded-[24px] border border-slate-200/80 bg-white/85 p-5 shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_20px_60px_-30px_rgba(34,211,238,0.35)] dark:border-white/10 dark:bg-slate-900/70"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">{item.company}</p>
                  <div className="rounded-full bg-cyan-100/80 p-2 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50/80 px-3 py-2 dark:bg-slate-800/70">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Trust Score</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.score}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>{item.date}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{item.risk}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
