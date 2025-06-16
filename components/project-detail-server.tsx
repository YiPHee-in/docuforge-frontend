import { getSession } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectDetail } from "./project-detail";
import type { ProjectData } from "./project-detail";

async function getProject(
  id: string,
  userId: string
): Promise<ProjectData | null> {
  // First get the user by authUserId
  const user = await prisma.user.findUnique({
    where: { authUserId: userId },
  });

  if (!user) {
    return null;
  }

  // Get the project and check if user has access through any organization
  const project = await prisma.project.findFirst({
    where: {
      id,
      organization: {
        members: {
          some: {
            userId: user.id,
          },
        },
      },
    },
    include: {
      versions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      organization: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    return null;
  }

  // Transform the data to match the client component's expected format
  return {
    id: project.id,
    name: project.name,
    description: project.repoUrl || "No repository connected",
    status: "active", // TODO: Implement actual status based on webhook/version status
    createdAt: project.createdAt.toISOString().split("T")[0],
    lastUpdated: project.updatedAt.toISOString(),
    lastGenerated: project.versions[0]?.createdAt.toISOString() || null,
    url: `/docs/${project.id}`,
    repositories: project.repoUrl
      ? [
          {
            id: "1",
            name: project.name,
            provider: "github",
            url: project.repoUrl,
            branch: "main",
            lastCommit: "latest",
            lines: 0, // TODO: Calculate from repository
          },
        ]
      : [],
    language: "Unknown", // TODO: Detect from repository
    totalLines: 0, // TODO: Calculate from repository
    webhookStatus: "inactive", // TODO: Implement webhook status
    views: 0, // TODO: Implement analytics
    downloads: 0, // TODO: Implement analytics
    template: "technical",
    outputs: ["docusaurus", "pdf", "readme"],
    team: project.organization.members.map((member) => ({
      name: member.user.name || member.user.email?.split("@")[0] || "Unknown",
      role: member.role,
      avatar: "/placeholder.svg?height=32&width=32",
    })),
    analytics: {
      views: [], // TODO: Implement analytics
      topPages: [], // TODO: Implement analytics
    },
    generations: project.versions.map((version) => ({
      id: version.id,
      status: "completed",
      startedAt: version.createdAt.toISOString(),
      completedAt: version.createdAt.toISOString(),
      duration: "5m", // TODO: Calculate actual duration
      trigger: "manual",
      commit: "latest",
      changes: ["Initial documentation generation"],
    })),
  };
}

export async function ProjectDetailServer({
  projectId,
}: {
  projectId: string;
}) {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Sign in to view project details
        </h2>
        <p className="text-slate-600 mb-6">
          Please sign in to access project details and documentation.
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

  const project = await getProject(projectId, session.user.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail projectId={projectId} initialData={project} />;
}
