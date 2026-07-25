'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Bot, SearchCheck, ShieldCheck, UploadCloud } from 'lucide-react';
import { SectionHeading } from '@/components/landing/section-heading';

const steps = [
  { title: 'Upload', description: 'Drop a URL, offer letter, screenshot, or email.', icon: UploadCloud },
  { title: 'AI analysis', description: 'The platform reads content and maps it against known risk signals.', icon: Bot },
  { title: 'Verification', description: 'It checks company legitimacy, recruiter credibility, and domain history.', icon: SearchCheck },
  { title: 'Trust score', description: 'You get an explainable score with recommendations and red flags.', icon: ShieldCheck },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-shell py-20 sm:py-24">
      <SectionHeading
        eyebrow="How it works"
        title="From upload to insight in four effortless steps."
        description="The flow is intentionally simple so students can verify an opportunity in minutes without drowning in jargon."
      />
      <div className="mt-12 rounded-[2rem] border border-slate-200/70 bg-white/70 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex-1"
            >
              <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/80 p-6 text-center shadow-sm transition-colors duration-300 hover:border-cyan-200/70 dark:border-white/10 dark:bg-slate-950/70">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/15">
                  <step.icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
              {index < steps.length - 1 ? (
                <div className="my-4 flex justify-center text-cyan-600 dark:text-cyan-300 lg:my-0 lg:justify-end">
                  <ArrowDown className="rotate-90 lg:rotate-0" size={18} />
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
