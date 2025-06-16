import { getSession } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import type { ProjectDisplay } from "@/app/dashboard/dashboard-server";
import { ProjectsListClient } from "./projects-list-client";
import type { PrismaClient } from "@/lib/generated/prisma";

type ProjectWithVersions = Awaited<
  ReturnType<PrismaClient["project"]["findUnique"]>
> & {
  versions: Array<{
    id: string;
    versionNumber: number;
    createdAt: Date;
    openapiSpec: any;
    mermaidSpec: string | null;
    contentHash: string;
    projectId: string;
  }>;
};

type MembershipWithProjects = Awaited<
  ReturnType<PrismaClient["organizationMember"]["findUnique"]>
> & {
  organization: {
    projects: ProjectWithVersions[];
  };
};

async function getProjects(authUserId: string): Promise<ProjectDisplay[]> {
  // First get the user by authUserId
  const user = await prisma.user.findUnique({
    where: { authUserId },
  });

  if (!user) {
    return [];
  }

  const memberships = (await prisma.organizationMember.findMany({
    where: { userId: user.id },
    include: {
      organization: {
        include: {
          projects: {
            include: {
              versions: true,
            },
          },
        },
      },
    },
  })) as MembershipWithProjects[];

  const projects = memberships.flatMap((membership: MembershipWithProjects) =>
    membership.organization.projects.map((project: ProjectWithVersions) => ({
      id: project.id,
      name: project.name,
      description: project.repoUrl || "No repository connected",
      status: "active", // TODO: Implement actual status based on webhook/version status
      lastUpdated: formatDistanceToNow(project.updatedAt, {
        addSuffix: true,
      }),
      url: `/docs/${project.id}`,
      repositories: project.repoUrl ? [project.repoUrl] : [], // Use repoUrl as a single repository
      language: "Unknown", // TODO: Detect from repository
      lines: 0, // TODO: Calculate from repository
      webhookStatus: "inactive", // TODO: Implement webhook status
      views: 0, // TODO: Implement analytics
      downloads: 0, // TODO: Implement analytics
      latestVersion: project.versions[0] || null,
    }))
  );

  return projects;
}

export async function ProjectsListServer() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Sign in to view your projects
        </h2>
        <p className="text-slate-600 mb-6">
          Please sign in to access your projects and documentation.
        </p>
        <a
          href="/signin"
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Sign In
        </a>
      </div>
    );
  }

  const projects = await getProjects(session.user.id);
  return <ProjectsListClient projects={projects} />;
}
