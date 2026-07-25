"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, subtitle, action, children, className = "" }: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`glass-card rounded-[28px] border border-white/20 bg-slate-900/70 p-6 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}
