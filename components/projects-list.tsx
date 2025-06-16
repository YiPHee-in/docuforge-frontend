import type { Prisma } from "@/lib/generated/prisma";
import { ProjectsClient } from "@/components/projects-client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

type ProjectWithOrg = {
  id: string;
  name: string;
  repoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
  latestVersion: {
    id: string;
    versionNumber: number;
    createdAt: Date;
  } | null;
};

type UserWithMemberships = Prisma.UserGetPayload<{
  include: {
    memberships: {
      include: {
        organization: {
          include: {
            projects: {
              include: {
                versions: {
                  orderBy: { createdAt: "desc" };
                  take: 1;
                };
              };
            };
          };
        };
      };
    };
  };
}>;

interface ProjectsListProps {
  session: Session;
}

export async function ProjectsList({ session }: ProjectsListProps) {
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
                    take: 1,
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
            <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-600 mt-1">
              No projects found. Create your first project to get started.
            </p>
          </div>
          <Button asChild>
            <Link href="/connect" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get projects from all organizations the user is a member of
  const projects: ProjectWithOrg[] = user.memberships.flatMap((membership) =>
    membership.organization.projects.map((project) => ({
      id: project.id,
      name: project.name,
      repoUrl: project.repoUrl,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      organization: {
        id: membership.organization.id,
        name: membership.organization.name,
        slug: membership.organization.slug,
      },
      latestVersion: project.versions[0] || null,
    }))
  );

  return <ProjectsClient projects={projects} />;
}
