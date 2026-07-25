'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Bot, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import { UploadStepper } from '@/components/upload/upload-stepper';
import { TipsPanel } from '@/components/upload/tips-panel';
import { RecentAnalyses } from '@/components/upload/recent-analyses';

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_36%),linear-gradient(135deg,_rgba(255,255,255,0.94),_rgba(248,250,252,0.98))] px-4 py-8 text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_36%),linear-gradient(135deg,_rgba(2,6,23,0.98),_rgba(15,23,42,0.96))] dark:text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-slate-900/70">
          <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Link href="/" className="transition hover:text-cyan-600 dark:hover:text-cyan-300">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white">Upload</span>
          </nav>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/80 p-8 shadow-[0_24px_90px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300">
                <Sparkles className="h-4 w-4" />
                Premium offer verification
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
                  Verify Any Job Offer in Seconds
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Upload a job link, offer letter, screenshot, recruiter email, or company page and let our AI surface risk signals instantly.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300">
                  <UploadCloud className="h-4 w-4 text-cyan-500" />
                  Multi-format upload
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-cyan-500" />
                  Explainable trust score
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="rounded-[30px] border border-slate-200/70 bg-slate-950 p-6 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.75)]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">AI Review Engine</p>
                  <p className="text-xl font-semibold">Instant trust analysis</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">OCR and parsing for PDFs, screenshots, and emails.</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Flagging for impersonation, urgency, and missing company details.</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">A simple trust score you can explain to friends or family.</div>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                <span>Start with any evidence you already have.</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <UploadStepper />
            <RecentAnalyses />
          </div>
          <div className="space-y-8">
            <TipsPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
