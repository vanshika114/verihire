"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BrainCircuit, Clock3, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AnalysisSteps } from "@/components/analysis/analysis-steps";
import { CheckingAnimation } from "@/components/analysis/checking-animation";
import { LoadingSkeleton } from "@/components/analysis/loading-skeleton";
import { ProgressIndicator } from "@/components/analysis/progress-indicator";

const steps = [
  { title: "Extracting text", detail: "Parsing the offer content and structure" },
  { title: "Running OCR", detail: "Scanning embedded images and PDFs" },
  { title: "Detecting company details", detail: "Cross-checking company metadata" },
  { title: "Verifying domain", detail: "Validating the sender infrastructure" },
  { title: "Checking recruiter credibility", detail: "Reviewing identity and communication patterns" },
  { title: "Analyzing salary", detail: "Comparing compensation against benchmarks" },
  { title: "Searching community reports", detail: "Looking for prior complaints and signals" },
  { title: "AI reasoning", detail: "Synthesizing the evidence into a verdict" },
  { title: "Calculating Trust Score", detail: "Generating a final confidence score" },
];

const tips = [
  "Never pay to get hired.",
  "Verify recruiter email domains.",
  "Beware of urgent deadlines.",
  "Review salary terms before you accept.",
  "Ask for a company contact outside the recruiter.",
];

export default function AnalyzePage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setCurrentStepIndex((previousStep) => {
        if (previousStep >= steps.length) {
          window.clearInterval(stepTimer);
          return previousStep;
        }

        if (previousStep === steps.length - 1) {
          setIsTransitioning(true);
          return previousStep + 1;
        }

        return previousStep + 1;
      });
    }, 750);

    const tipTimer = window.setInterval(() => {
      setTipIndex((previousTip) => (previousTip + 1) % tips.length);
    }, 3200);

    return () => {
      window.clearInterval(stepTimer);
      window.clearInterval(tipTimer);
    };
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      router.replace("/report/demo");
    }, 800);

    return () => window.clearTimeout(redirectTimer);
  }, [isTransitioning, router]);

  const completedCount = Math.min(steps.length, currentStepIndex);
  const progress = Math.round((completedCount / steps.length) * 100);
  const activeStepIndex = isTransitioning ? steps.length - 1 : Math.min(currentStepIndex, steps.length - 1);
  const timeEstimate = isTransitioning ? "Finishing up..." : `${Math.max(1, steps.length - completedCount)}s remaining`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] px-4 py-8 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
              <BrainCircuit className="h-4 w-4" />
              Multi-agent intelligence
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Analyzing Your Job Offer...
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Our AI agents are reading the offer, validating the company, and scoring the signal quality in real time.
            </p>
          </div>

          <div className="glass-card rounded-[24px] border border-white/20 bg-slate-900/70 p-4 text-white shadow-[0_20px_80px_-28px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              <ShieldCheck className="h-4 w-4" />
              Security first
            </div>
            <p className="mt-2 text-sm text-slate-300">
              The verification pipeline runs across multiple signals before we produce a trusted result.
            </p>
          </div>
        </motion.div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="glass-card relative overflow-hidden rounded-[32px] border border-white/20 bg-slate-900/70 p-6 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                <Zap className="h-4 w-4" />
                Trust Engine live
              </div>

              <div className="mt-8">
                <CheckingAnimation />
              </div>
            </div>
          </motion.section>

          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="glass-card rounded-[32px] border border-white/20 bg-slate-900/70 p-6 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200">
                    Verification flow
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Live analysis pipeline
                  </h2>
                </div>
                <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
                  {completedCount}/{steps.length} checks
                </div>
              </div>

              <div className="mt-6">
                <ProgressIndicator progress={progress} timeEstimate={timeEstimate} />
              </div>

              <div className="mt-6">
                <AnalysisSteps steps={steps} activeStep={activeStepIndex} completedCount={completedCount} />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="glass-card rounded-[32px] border border-white/20 bg-slate-900/70 p-6 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-7"
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Security tip
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tips[tipIndex]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/15 bg-slate-950/60 p-4"
                >
                  <p className="text-lg font-semibold text-white">{tips[tipIndex]}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
                <Clock3 className="h-4 w-4" />
                The next report will appear as soon as the evidence is finalized.
              </div>

              <div className="mt-5">
                <LoadingSkeleton />
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
