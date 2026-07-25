'use client';

import { motion } from 'framer-motion';

const partners = ['University of Delhi', 'NUS Students', 'Placement Cells', 'Campus Labs', 'Career Circle'];

export function TrustedBySection() {
  return (
    <section className="section-shell py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="glass-card flex flex-col items-center justify-between gap-6 px-6 py-6 lg:flex-row lg:px-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Trusted by students and campus teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {partners.map((partner) => (
            <div key={partner} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
              {partner}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
