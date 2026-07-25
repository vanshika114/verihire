'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, FileSearch, MessageSquareQuote, ShieldCheck, Sparkle, UserCheck } from 'lucide-react';
import { SectionHeading } from '@/components/landing/section-heading';

const features = [
  {
    title: 'Explainable trust score',
    description: 'Each score is broken down into transparent signals so you can understand the reasoning.',
    icon: BrainCircuit,
  },
  {
    title: 'Company and recruiter verification',
    description: 'Cross-check the legitimacy of employers, contact details, and hiring patterns.',
    icon: UserCheck,
  },
  {
    title: 'Domain and communication analysis',
    description: 'Inspect email domains, sender behavior, and scam language before you respond.',
    icon: MessageSquareQuote,
  },
  {
    title: 'Community-backed insight',
    description: 'Compare what other students are reporting to spot emerging risks faster.',
    icon: ShieldCheck,
  },
  {
    title: 'OCR and document parsing',
    description: 'Process offer letters, PDF files, screenshots, and direct URLs in one flow.',
    icon: FileSearch,
  },
  {
    title: 'Salary realism analysis',
    description: 'See whether the offer terms and pay structure align with market expectations.',
    icon: Sparkle,
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="section-shell py-20 sm:py-24">
      <SectionHeading
        eyebrow="The solution"
        title="VeriHire AI makes trust visible."
        description="Instead of relying on intuition, students can evaluate offers through a single AI-native experience built for clarity and speed."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card p-7"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800 p-3 text-cyan-300 shadow-sm">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
