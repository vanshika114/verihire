'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { SectionHeading } from '@/components/landing/section-heading';

export function ProductPreviewSection() {
  return (
    <section className="section-shell py-20 sm:py-24">
      <SectionHeading
        eyebrow="Product preview"
        title="A dashboard that feels like a real investigative tool."
        description="The preview combines a trust score, positive signals, and red flags into a polished experience students can understand at a glance."
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mt-12 rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-inner dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Opportunity review</p>
                <p className="mt-2 text-2xl font-semibold">Data Science Internship</p>
              </div>
              <div className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-200">Verified</div>
            </div>
            <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-400">Trust score</p>
                  <p className="mt-2 text-5xl font-semibold">86</p>
                </div>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">Strong</div>
              </div>
              <div className="mt-6 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[86%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/15 p-2 text-emerald-600">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Positive signals</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Company domain is older than 8 years and recruiter is listed publicly.</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-500/15 p-2 text-amber-600">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Red flags</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">The email address uses a newly registered domain and the offer mentions a registration fee.</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-500/15 p-2 text-cyan-600">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Recommendation</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Proceed with caution. Review the company’s public profile before engaging further.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
