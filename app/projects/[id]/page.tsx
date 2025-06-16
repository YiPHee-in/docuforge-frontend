import { Suspense } from "react";
import { ProjectDetailServer } from "@/components/project-detail-server";
import { ProjectDetailSkeleton } from "@/components/project-detail-skeleton";

export async function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = await Promise.resolve(params.id);
  return (
    <div className="container py-8">
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailServer projectId={projectId} />
      </Suspense>
    </div>
  );
}
