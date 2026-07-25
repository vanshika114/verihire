"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

type ProgressIndicatorProps = {
  progress: number;
  timeEstimate: string;
};

export function ProgressIndicator({ progress, timeEstimate }: ProgressIndicatorProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>Progress</span>
        <span className="font-medium text-white">{progress}%</span>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800/60">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
        <span>AI agents are active</span>
        <span className="inline-flex items-center gap-1 text-slate-300">
          <Clock3 className="h-4 w-4" />
          {timeEstimate}
        </span>
      </div>
    </div>
  );
}
