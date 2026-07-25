'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  BrainCircuit,
  MessagesSquare,
  Globe2,
  BadgeCheck,
  Users,
  ReceiptText,
  DollarSign,
} from 'lucide-react';
import { SectionHeading } from '@/components/landing/section-heading';

const features = [
  { title: 'OCR', description: 'Extract text from scanned documents and uploaded files.', icon: FileText },
  { title: 'AI verification', description: 'Evaluate claims with policy-aware reasoning and structured checks.', icon: BrainCircuit },
  { title: 'Explainable AI', description: 'See which signals raised or lowered the trust score.', icon: MessagesSquare },
  { title: 'Domain analysis', description: 'Inspect domain history, reputation, and sender consistency.', icon: Globe2 },
  { title: 'Recruiter verification', description: 'Validate recruiter identities and communication patterns.', icon: BadgeCheck },
  { title: 'Community reports', description: 'Learn from student experiences and shared warning signals.', icon: Users },
  { title: 'Offer letter analysis', description: 'Parse the structure and language of contracts and offers.', icon: ReceiptText },
  { title: 'Salary intelligence', description: 'Compare pay expectations against realistic market values.', icon: DollarSign },
];

export function KeyFeaturesSection() {
  return (
    <section id="features" className="section-shell py-20 sm:py-24">
      <SectionHeading
        eyebrow="Key features"
        title="Everything you need to inspect an opportunity with confidence."
        description="The platform combines OCR, AI reasoning, and public intelligence into one premium experience."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="glass-card p-6"
            >
              <div className="inline-flex rounded-2xl bg-slate-950/95 p-3 text-cyan-300 shadow-sm dark:bg-cyan-500/10 dark:text-cyan-300">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
