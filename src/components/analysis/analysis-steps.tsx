"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

type AnalysisStep = {
  title: string;
  detail: string;
};

type AnalysisStepsProps = {
  steps: AnalysisStep[];
  activeStep: number;
  completedCount: number;
};

export function AnalysisSteps({ steps, activeStep, completedCount }: AnalysisStepsProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isCompleted = index < completedCount;
        const isActive = index === activeStep;

        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${
              isCompleted
                ? "border-emerald-400/30 bg-emerald-500/10"
                : isActive
                  ? "border-cyan-400/30 bg-cyan-500/10"
                  : "border-white/10 bg-white/5"
            }`}
          >
            <div
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isCompleted
                  ? "bg-emerald-500/15 text-emerald-400"
                  : isActive
                    ? "bg-cyan-500/15 text-cyan-400"
                    : "bg-slate-500/10 text-slate-400"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Circle className="h-3.5 w-3.5" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-white">{step.title}</p>
              <p className="text-sm text-slate-400">{step.detail}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
