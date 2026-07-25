'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, CheckCircle2, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Trust signals analyzed', value: '18+' },
  { label: 'Scam patterns detected', value: '92%' },
  { label: 'Average response time', value: '< 2 min' },
];

export function HeroSection() {
  return (
    <section id="top" className="section-shell relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.16),transparent_45%)]" />
      <div className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-cyan-50/80 px-3 py-2 text-sm font-medium text-cyan-700 shadow-sm dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
            <Sparkles size={16} />
            AI-powered trust intelligence for students
          </div>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            Know Before You{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 bg-clip-text text-transparent">
              Apply.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            VeriHire AI analyzes offers, emails, screenshots, and domains to reveal whether an internship or role is genuine before you commit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/upload">
              <Button variant="primary" className="w-full gap-2 px-6 sm:w-auto">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:bg-slate-800 sm:w-auto"
            >
              <Bot size={18} /> Learn More
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {['Job URL', 'PDF offer', 'Screenshot', 'Email'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
                <CheckCircle2 size={16} className="text-cyan-500" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-transparent blur-3xl" />
          <div className="glass-card relative overflow-hidden p-4 sm:p-6">
            <div className="rounded-[1.5rem] border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Live analysis</p>
                  <p className="mt-2 text-2xl font-semibold">Offer trust score</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/15 p-3">
                  <ShieldCheck size={20} className="text-cyan-300" />
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Estimated trust</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-5xl font-semibold">83</span>
                      <span className="pb-2 text-lg text-slate-400">/100</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">High confidence</div>
                </div>
                <div className="mt-6 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {['Company legitimacy: Strong', 'Recruiter credibility: Verified', 'Salary realism: Plausible', 'Scam language: None'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-3 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -left-4 top-8 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-lg dark:border-white/10 dark:bg-slate-900/90"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-600">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">No red flags</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Email and domain look clean</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -right-4 bottom-8 rounded-2xl border border-cyan-200/70 bg-cyan-50/80 p-3 shadow-lg dark:border-cyan-400/20 dark:bg-slate-900/80"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cyan-500/15 p-2 text-cyan-600 dark:text-cyan-300">
                  <UploadCloud size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Upload in seconds</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">URL, PDF, screenshot, or email</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="glass-card px-6 py-6"
          >
            <p className="text-3xl font-semibold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
