"use client";

import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  ExternalLink,
  FileText,
  Globe2,
  Mail,
  Network,
  ShieldCheck,
  TriangleAlert,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

import { ReportChart } from "./report-chart";
import { SectionCard } from "./section-card";
import { TrustGauge } from "./trust-gauge";

type ReportDashboardProps = {
  reportId: string;
};

const positiveSignals = [
  "Official domain",
  "Active LinkedIn",
  "Company registered",
  "HTTPS enabled",
  "Employee presence",
];

const redFlags = [
  { title: "Domain only 20 days old", detail: "The sender infrastructure was created recently" },
  { title: "Recruiter email mismatch", detail: "The recruiter address does not align with the public domain" },
  { title: "Unrealistic salary", detail: "The offer is above market benchmarks for this role" },
];

const trustBreakdown = [
  { name: "Company", value: 92, color: "#22d3ee" },
  { name: "Recruiter", value: 84, color: "#38bdf8" },
  { name: "Domain", value: 73, color: "#34d399" },
  { name: "Salary", value: 77, color: "#818cf8" },
  { name: "Community", value: 89, color: "#f59e0b" },
];

const riskCategories = [
  { name: "Identity", value: 18, color: "#f97316" },
  { name: "Fraud", value: 12, color: "#ef4444" },
  { name: "Compensation", value: 24, color: "#facc15" },
  { name: "Process", value: 10, color: "#3b82f6" },
];

const scoreDistribution = [
  { name: "0-25", value: 4, color: "#f87171" },
  { name: "26-50", value: 8, color: "#fb923c" },
  { name: "51-75", value: 28, color: "#facc15" },
  { name: "76-100", value: 60, color: "#34d399" },
];

export function ReportDashboard({ reportId }: ReportDashboardProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] px-4 py-8 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4 rounded-[32px] border border-white/15 bg-slate-900/70 p-6 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:flex-row sm:items-end sm:justify-between sm:p-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200">
              <ShieldCheck className="h-4 w-4" />
              VeriHire Intelligence Report
            </div>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Offer Verification Intelligence</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Report ID <span className="font-semibold text-white">{reportId}</span> compiled from company records, recruiter signals, domain intelligence, salary benchmarks, and community feedback.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200"
            type="button"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Generate PDF
          </motion.button>
        </motion.header>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionCard title="Trust Score" subtitle="Live confidence snapshot">
              <TrustGauge score={82} riskLevel="Low Risk" confidence={96} />
            </SectionCard>

            <SectionCard title="AI Summary" subtitle="Why this score was generated">
              <p className="text-sm leading-8 text-slate-300">
                The opportunity appears legitimate based on company registration, verified recruiter email patterns, and positive historical reports. The recently registered domain and the salary variance slightly increase caution, but the overall signal remains strong.
              </p>
            </SectionCard>

            <SectionCard title="Recommendation" subtitle="Suggested next move">
              <div className="rounded-[24px] border border-emerald-400/30 bg-emerald-500/10 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                  <CheckCircle2 className="h-4 w-4" />
                  Proceed
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Proceed with the offer, but confirm the domain ownership and recruiter identity in the next follow-up conversation.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Positive Signals" subtitle="Evidence the model found">
              <div className="space-y-3">
                {positiveSignals.map((signal) => (
                  <div key={signal} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-slate-200">{signal}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Red Flags" subtitle="Priority concerns">
              <div className="space-y-3">
                {redFlags.map((flag) => (
                  <div key={flag.title} className="rounded-[20px] border border-amber-400/20 bg-amber-500/10 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
                      <TriangleAlert className="h-4 w-4" />
                      {flag.title}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{flag.detail}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="Company Verification" subtitle="Legal and organizational intelligence">
              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/55 p-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200">
                    <Building2 className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 text-xl font-semibold text-white">Northstar Labs</h4>
                  <p className="mt-2 text-sm text-slate-400">AI Infrastructure</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">Verified</span>
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">Registered</span>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-slate-300">
                  {[
                    ["Industry", "Software & AI"],
                    ["Employees", "120+"],
                    ["Founded", "2018"],
                    ["Website", "northstarlabs.com"],
                    ["GST", "27AABCN1234F1Z5"],
                    ["CIN", "U72900KA2018PTC123456"],
                    ["Location", "Bengaluru, India"],
                    ["Status", "Active"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <span className="font-medium text-slate-400">{label}</span>
                      <span className="text-right text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Recruiter Analysis" subtitle="Identity and messaging trust">
              <div className="rounded-[24px] border border-white/10 bg-slate-950/55 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-white">
                      <UserRound className="h-4 w-4 text-cyan-400" />
                      <span className="font-semibold">Asha Menon</span>
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-200">Verified</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                      <Mail className="h-4 w-4" />
                      asha@northstarlabs.com
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <Globe2 className="h-4 w-4" />
                      linkedin.com/in/asha-m
                    </div>
                  </div>
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                    <div className="font-semibold">Email Trust</div>
                    <div className="mt-1 text-2xl font-semibold">91%</div>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Domain Analysis" subtitle="Infrastructure and registrar signals">
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["Age", "20 days"],
                  ["SSL", "Valid"],
                  ["DNS", "Configured"],
                  ["HTTPS", "Enabled"],
                  ["WHOIS", "Public"],
                  ["Registrar", "Namecheap"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</div>
                    <div className="mt-2 font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Salary Analysis" subtitle="Compensation versus market">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Expected Salary", "$115k"],
                  ["Offered Salary", "$132k"],
                  ["Market Comparison", "+14%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[20px] border border-white/10 bg-slate-950/55 p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <DollarSign className="h-4 w-4 text-emerald-400" />
                      {label}
                    </div>
                    <div className="mt-3 text-xl font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <ReportChart data={[
                  { name: "Market", value: 115, color: "#38bdf8" },
                  { name: "Expected", value: 115, color: "#f59e0b" },
                  { name: "Offered", value: 132, color: "#34d399" },
                ]} height={220} />
              </div>
            </SectionCard>

            <SectionCard title="Offer Letter Analysis" subtitle="Document authenticity metrics">
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["Grammar score", "92%"],
                  ["Logo authenticity", "High"],
                  ["Signature", "Present"],
                  ["Formatting", "Consistent"],
                  ["Payment request", "No"],
                  ["Overall authenticity", "Strong"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</div>
                    <div className="mt-2 font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Community Reports" subtitle="Peer sentiment and prior complaint history">
              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                    <TrendingUp className="h-4 w-4" />
                    34 reports
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    The latest report mentions a strong employer brand and a positive onboarding experience, with one recurring concern around delayed communication.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
                    <BadgeCheck className="h-4 w-4" />
                    Similarity score 87%
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    <span>Latest report</span>
                    <span className="font-semibold text-white">Trustworthy employer</span>
                  </div>
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200" type="button">
                    View Reports
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Evidence breakdown" subtitle="Cross-signal confidence distribution">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="mb-3 text-sm font-semibold text-slate-300">Trust breakdown</div>
                  <ReportChart data={trustBreakdown} height={220} />
                </div>
                <div>
                  <div className="mb-3 text-sm font-semibold text-slate-300">Risk categories</div>
                  <ReportChart data={riskCategories} height={220} />
                </div>
                <div className="lg:col-span-2">
                  <div className="mb-3 text-sm font-semibold text-slate-300">Score distribution</div>
                  <ReportChart data={scoreDistribution} height={220} />
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  );
}
