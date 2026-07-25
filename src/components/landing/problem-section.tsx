'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, BadgeDollarSign, Fingerprint, ShieldAlert } from 'lucide-react';
import { SectionHeading } from '@/components/landing/section-heading';

const problems = [
  {
    title: 'Fake internships',
    description: 'Scammers create polished offers that look legitimate but never materialize.',
    icon: ShieldAlert,
  },
  {
    title: 'Registration fees',
    description: 'Fraudsters demand upfront payments before sharing real company details.',
    icon: BadgeDollarSign,
  },
  {
    title: 'Fake recruiters',
    description: 'Impersonated hiring teams target students through social channels and email.',
    icon: Fingerprint,
  },
  {
    title: 'Identity theft',
    description: 'Personal data is harvested and misused when trust signals are ignored.',
    icon: AlertTriangle,
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="section-shell py-20 sm:py-24">
      <SectionHeading
        eyebrow="The problem"
        title="Most offers look polished until they’re not."
        description="Students are being targeted by a new wave of professional-looking scams that exploit urgency, prestige, and trust."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {problems.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <motion.article
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card group p-7"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 p-3 text-cyan-700 shadow-sm dark:text-cyan-300">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{problem.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{problem.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
