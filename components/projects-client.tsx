"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";

type Project = {
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

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "updated" | "created">(
    "updated"
  );

  // Get unique organizations for the filter
  const organizations = Array.from(
    new Set(projects.map((p) => p.organization.name))
  );

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.organization.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesOrg =
        organizationFilter === "all" ||
        project.organization.name === organizationFilter;
      return matchesSearch && matchesOrg;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "updated":
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case "created":
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return 0;
      }
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""} found
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={organizationFilter}
              onValueChange={setOrganizationFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org} value={org}>
                    {org}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="updated">Last Updated</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Repository</TableHead>
              <TableHead>Latest Version</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link
                    href={`/docs/${project.id}`}
                    className="font-medium hover:underline"
                  >
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/organizations/${project.organization.slug}`}
                    className="text-slate-600 hover:underline"
                  >
                    {project.organization.name}
                  </Link>
                </TableCell>
                <TableCell>
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-600 hover:underline"
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      View Repository
                    </a>
                  ) : (
                    <span className="text-slate-400">No repository</span>
                  )}
                </TableCell>
                <TableCell>
                  {project.latestVersion ? (
                    <Badge variant="secondary">
                      v{project.latestVersion.versionNumber}
                    </Badge>
                  ) : (
                    <span className="text-slate-400">No versions</span>
                  )}
                </TableCell>
                <TableCell className="text-slate-600">
                  {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
