import Link from 'next/link';
import { Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

const links = [
  { label: 'About', href: '#solution' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/80 py-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="section-shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2 text-white shadow-lg shadow-cyan-500/20">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">VeriHire AI</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Trust intelligence for every opportunity.</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Verify internships and offers before you commit—using explainable AI, community signals, and trusted analysis.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-cyan-600 dark:hover:text-cyan-300">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Mail, href: 'mailto:hello@verihire.ai' },
              { icon: Linkedin, href: 'https://linkedin.com' },
              { icon: Github, href: 'https://github.com' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white/80 p-2.5 text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-cyan-400/50"
              >
                <item.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="section-shell mt-8 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
        © 2026 VeriHire AI. All rights reserved.
      </div>
    </footer>
  );
}
