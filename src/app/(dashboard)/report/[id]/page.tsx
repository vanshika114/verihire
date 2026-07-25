import { ReportDashboard } from "@/components/report/report-dashboard";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ReportDashboard reportId={id} />;
}
