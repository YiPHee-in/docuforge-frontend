import { Suspense } from "react";
import { DashboardServer } from "@/app/dashboard/dashboard-server";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { getSession } from "@/app/actions/auth";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Please sign in to view your dashboard
        </h1>
      </div>
    );
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardServer session={session} />
    </Suspense>
  );
}
