'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section id="cta" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] border border-cyan-200/70 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-slate-100 p-8 text-center shadow-[0_30px_100px_-40px_rgba(6,182,212,0.6)] dark:border-cyan-400/20 dark:from-cyan-500/10 dark:to-slate-900 sm:p-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_55%)]" />
        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg dark:bg-cyan-500/15">
          <Sparkles size={24} />
        </div>
        <h2 className="relative mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
          Verify before you apply.
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Protect your time, your identity, and your future by checking every opportunity with VeriHire AI before you respond.
        </p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/upload">
            <Button variant="primary" className="gap-2 px-6">
              Start Verifying <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="#faq">
            <Button variant="secondary" className="px-6">
              Read the FAQ
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
