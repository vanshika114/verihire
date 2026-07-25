'use client';

import { motion } from 'framer-motion';
import { Link2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UrlInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function UrlInput({ value, onChange }: UrlInputProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-14 rounded-2xl border-slate-200/80 bg-white/90 pl-12 text-base shadow-sm dark:border-white/10 dark:bg-slate-900/80"
          placeholder="https://careers.company.com/job/offer"
        />
      </div>
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-3 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
        <Link2 className="h-4 w-4 text-cyan-500" />
        Paste a LinkedIn, Internshala, or company career page link.
      </div>
    </motion.div>
  );
}
