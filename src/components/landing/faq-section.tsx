'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/landing/section-heading';

const faqs = [
  {
    question: 'What can I upload to VeriHire AI?',
    answer: 'You can upload a job URL, PDF offer letter, screenshot, or email to start the analysis.',
  },
  {
    question: 'How accurate is the trust score?',
    answer: 'The score combines multiple signals such as company legitimacy, recruiter credibility, salary realism, and domain reputation.',
  },
  {
    question: 'Is the analysis explainable?',
    answer: 'Yes. Every report includes the specific factors that influenced the overall trust result.',
  },
  {
    question: 'Is this only for internships?',
    answer: 'No. It can help evaluate internships, full-time offers, and student-facing recruitment opportunities.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell py-20 sm:py-24">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions students ask before they verify an offer."
        description="We’ve kept the experience clear and practical so the next step is always obvious."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div key={faq.question} className="glass-card p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              >
                <span className="text-base font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                <ChevronDown className={isOpen ? 'rotate-180 text-cyan-600' : 'text-slate-500'} size={18} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-panel-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
