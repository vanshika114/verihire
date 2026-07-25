'use client';

import { motion } from 'framer-motion';
import { BriefcaseBusiness, FileText, Globe2, Mail, MessageSquareText, Newspaper, Sparkles } from 'lucide-react';

const tips = [
  { title: 'Offer Letter', description: 'Upload the PDF or screenshot of the official offer letter.', icon: FileText },
  { title: 'Job Posting', description: 'Paste a LinkedIn, Internshala, or company career page URL.', icon: Globe2 },
  { title: 'Recruiter Email', description: 'Share the email thread to inspect urgency and suspicious phrasing.', icon: Mail },
  { title: 'Screenshot', description: 'Capture the offer details from chat, Slack, or a mobile screenshot.', icon: MessageSquareText },
  { title: 'LinkedIn Job', description: 'A posting link often reveals the employer and role context.', icon: BriefcaseBusiness },
  { title: 'Internshala', description: 'Internship offers and application details work well with our analysis.', icon: Newspaper },
  { title: 'Company Website', description: 'Verify the role and brand presence from the official site.', icon: Sparkles },
];

export function TipsPanel() {
  return (
    <div className="space-y-4 rounded-[30px] border border-slate-200/80 bg-white/70 p-6 shadow-[0_18px_60px_-25px_rgba(15,23,42,0.18)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-cyan-100/80 p-2 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">What can I upload?</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">Anything that helps us verify the opportunity</h3>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-[24px] border border-slate-200/70 bg-slate-50/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/80 p-2 text-slate-700 shadow-sm dark:bg-slate-900/70 dark:text-slate-200">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{tip.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
