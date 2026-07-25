'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/landing/section-heading';

const testimonials = [
  {
    quote: 'I uploaded a screenshot and received a clear breakdown that saved me from a fake opportunity.',
    name: 'Anika P.',
    role: 'Computer Science Student',
  },
  {
    quote: 'The trust indicators felt practical and trustworthy. It helped me question a suspicious recruiter.',
    name: 'Rahul M.',
    role: 'Marketing Intern',
  },
  {
    quote: 'The review felt polished, fast, and genuinely useful for students who are new to job hunting.',
    name: 'Mina L.',
    role: 'Placement Cell Lead',
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-shell py-20 sm:py-24">
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by students who want clarity before they commit."
        description="Early users are using VeriHire AI to validate everything from internships to high-stakes offers."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="glass-card p-7"
          >
            <div className="flex gap-1 text-cyan-500">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">“{item.quote}”</p>
            <div className="mt-8">
              <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
