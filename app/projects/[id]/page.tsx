import { Suspense } from "react";
import { ProjectDetailServer } from "@/components/project-detail-server";
import { ProjectDetailSkeleton } from "@/components/project-detail-skeleton";

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8">
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailServer projectId={params.id} />
      </Suspense>
    </div>
  );
}
