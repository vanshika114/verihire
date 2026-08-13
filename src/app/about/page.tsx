'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/landing/section-heading';

const stats = [
  { label: 'Students protected', value: '12,000+' },
  { label: 'Offers verified', value: '30,000+' },
  { label: 'Scam patterns detected', value: '92%' },
];

const values = [
  {
    title: 'Students first',
    description: 'Every feature starts with one question: does this protect a student\u2019s time, money, or safety?',
    icon: Heart,
  },
  {
    title: 'Radical transparency',
    description: 'We show our work. Every trust score comes with the exact signals that produced it — no black boxes.',
    icon: ShieldCheck,
  },
  {
    title: 'Community powered',
    description: 'Scam patterns evolve fast. Real reports from real students keep our detection sharper than any static database.',
    icon: Users,
  },
  {
    title: 'Built to move fast',
    description: 'A verification should take minutes, not days — because scammers count on you not having the time to check.',
    icon: Sparkles,
  },
];

const team = [
  { name: 'Srishti Raghava', role: 'Founder & Product' },
  { name: 'Aarav Mehta', role: 'AI & Trust Systems' },
  { name: 'Naina Kapoor', role: 'Community & Trust Reports' },
  { name: 'Yusuf Ali', role: 'Engineering' },
];

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="section-shell relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.16),transparent_45%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-cyan-50/80 px-3 py-2 text-sm font-medium text-cyan-700 shadow-sm dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
            <Target size={16} />
            About VeriHire
          </div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            Built so no student has to guess if an offer is real.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            VeriHire AI started after watching classmates lose money, time, and trust to fake internships and
            recruiting scams. We built the verification tool we wished had existed for us.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/upload">
              <Button variant="primary" className="w-full gap-2 px-6 sm:w-auto">
                Verify an offer <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="secondary" className="w-full px-6 sm:w-auto">
                Read community reports
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="section-shell py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="glass-card grid grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-3 lg:px-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Story */}
      <section className="section-shell py-20 sm:py-24">
        <SectionHeading
          eyebrow="Our story"
          title="A tool built out of a bad semester, not a business plan."
          description="VeriHire AI didn't start in a boardroom. It started in a placement WhatsApp group."
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="glass-card mx-auto mt-12 max-w-3xl space-y-5 p-8 sm:p-10"
        >
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            In one placement season, three students from our own college paid "registration fees" to recruiters who
            disappeared the same week. Another accepted a written offer that turned out to be a copy-pasted template
            with a fake company seal. Nobody had an easy way to check before it was too late.
          </p>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            We started by manually cross-checking domains and offer letters for classmates. That turned into a
            checklist, then a scoring model, and eventually the AI-powered verification platform VeriHire is today —
            built by students, for students, to close the information gap that scammers rely on.
          </p>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
            Every report submitted to the community feed makes the next verification a little sharper. That's the
            whole idea: the more students who check before they apply, the harder it gets for a fake opportunity to
            spread.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="section-shell py-20 sm:py-24">
        <SectionHeading
          eyebrow="What we stand for"
          title="Principles that shape every feature we ship."
          description="These aren't wall decorations — they're the questions we ask before building anything new."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="glass-card p-6"
              >
                <div className="inline-flex rounded-2xl bg-slate-950/95 p-3 text-cyan-300 shadow-sm dark:bg-cyan-500/10 dark:text-cyan-300">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{value.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="section-shell py-20 sm:py-24">
        <SectionHeading
          eyebrow="The team"
          title="A small team obsessed with one problem."
          description="We're students and engineers who got tired of watching classmates get scammed."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-semibold text-white">
                {member.name.charAt(0)}
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{member.name}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell py-20 sm:py-24">
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
            Join thousands of students verifying before they apply.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Check an offer, or share your own experience so the next student doesn't have to find out the hard way.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/upload">
              <Button variant="primary" className="gap-2 px-6">
                Verify an offer <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="secondary" className="px-6">
                Visit the community
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
