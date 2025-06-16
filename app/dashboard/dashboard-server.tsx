import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import type { Prisma } from "@/lib/generated/prisma";
import type { Session } from "@supabase/supabase-js";
import { Dashboard } from "@/components/dashboard";
import { prisma } from "@/lib/prisma";

type ProjectWithVersions = Prisma.ProjectGetPayload<{
  include: { versions: true };
}>;

type OrganizationWithProjects = Prisma.OrganizationGetPayload<{
  include: { projects: { include: { versions: true } } };
}>;

type MembershipWithOrg = Prisma.OrganizationMemberGetPayload<{
  include: {
    organization: { include: { projects: { include: { versions: true } } } };
  };
}>;

type UserWithMemberships = Prisma.UserGetPayload<{
  include: {
    memberships: {
      include: {
        organization: {
          include: { projects: { include: { versions: true } } };
        };
      };
    };
  };
}>;

export type ProjectDisplay = {
  id: string;
  name: string;
  description: string;
  status: string;
  lastUpdated: string;
  url: string;
  repositories: string[];
  language: string;
  lines: number;
  webhookStatus: string;
  views: number;
  downloads: number;
  latestVersion: ProjectWithVersions["versions"][0] | null;
};

interface DashboardServerProps {
  session: Session;
}

export async function DashboardServer({ session }: DashboardServerProps) {
  // Fetch user's projects from all organizations they're a member of
  const user = (await prisma.user.findUnique({
    where: { authUserId: session.user.id },
    include: {
      memberships: {
        include: {
          organization: {
            include: {
              projects: {
                include: {
                  versions: {
                    orderBy: { createdAt: "desc" },
                    take: 1, // Get only the latest version
                  },
                },
              },
            },
          },
        },
      },
    },
  })) as UserWithMemberships | null;

  if (!user || user.memberships.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Documentation Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              No projects found. Create your first project to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get projects from all organizations the user is a member of
  const projects: ProjectDisplay[] = user.memberships.flatMap(
    (membership: MembershipWithOrg) =>
      membership.organization.projects.map((project: ProjectWithVersions) => ({
        id: project.id,
        name: project.name,
        description: project.repoUrl || "No repository connected",
        status: "active", // TODO: Implement actual status based on webhook/version status
        lastUpdated: formatDistanceToNow(project.updatedAt, {
          addSuffix: true,
        }),
        url: `/docs/${project.id}`,
        repositories: project.repoUrl ? [project.repoUrl] : [],
        language: "Unknown", // TODO: Detect from repository
        lines: 0, // TODO: Calculate from repository
        webhookStatus: "inactive", // TODO: Implement webhook status
        views: 0, // TODO: Implement analytics
        downloads: 0, // TODO: Implement analytics
        latestVersion: project.versions[0] || null,
      }))
  );

  const stats = [
    {
      label: "Total Projects",
      value: projects.length.toString(),
      change: "",
      icon: "FileText",
    },
    {
      label: "Documentation Views",
      value: projects
        .reduce((sum: number, p: ProjectDisplay) => sum + p.views, 0)
        .toString(),
      change: "",
      icon: "TrendingUp",
    },
    {
      label: "Active Webhooks",
      value: projects
        .filter((p: ProjectDisplay) => p.webhookStatus === "active")
        .length.toString(),
      change: "",
      icon: "RefreshCw",
    },
    {
      label: "Team Members",
      value: user.memberships.length.toString(),
      change: "",
      icon: "Users",
    },
  ];

  return <Dashboard projects={projects} stats={stats} />;
}
