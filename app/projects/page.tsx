import { Suspense } from "react";
import { ProjectsListServer } from "@/components/projects-list-server";
import { ProjectsSkeleton } from "@/components/projects-skeleton";

export default function ProjectsPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-slate-600 mt-1">
            Manage and view all your documentation projects
          </p>
        </div>
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsListServer />
      </Suspense>
    </div>
  );
}
