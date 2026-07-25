'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface EmailInputProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

export function EmailInput({ value, onChange, maxLength = 1400 }: EmailInputProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
      <div className="relative">
        <Mail className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
        <Textarea
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          maxLength={maxLength}
          className="min-h-[220px] rounded-[24px] border-slate-200/80 bg-white/90 pl-12 pr-4 pt-4 text-base shadow-sm dark:border-white/10 dark:bg-slate-900/80"
          placeholder="Paste the recruiter email or message thread here..."
        />
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-3 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
        <span>We’ll detect any suspicious phrasing or urgency signals.</span>
        <span className="font-medium text-slate-500 dark:text-slate-400">{value?.length ?? 0}/{maxLength}</span>
      </div>
    </motion.div>
  );
}
