import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function DemoReportPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] px-4 py-10 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Link
          href="/upload"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to upload
        </Link>

        <section className="glass-card rounded-[32px] border border-white/20 bg-slate-900/70 p-8 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                Demo report
              </div>
              <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Verification complete
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                This demo view shows the report experience that follows the analysis flow.
              </p>
            </div>

            <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-500/10 p-4 text-cyan-100">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Trust score</p>
              <p className="mt-2 text-4xl font-semibold">87/100</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Summary
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The offer appears mostly legitimate, but the recruiter domain should be confirmed before signing anything.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Risks detected
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Urgent interview deadline</li>
                <li>• Compensation details are unclear</li>
                <li>• Domain mismatch in recruiter signature</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
