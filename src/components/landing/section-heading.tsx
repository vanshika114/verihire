'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="mb-5 inline-flex items-center rounded-full border border-cyan-200/80 bg-cyan-50/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-700 shadow-sm dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-300">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}
