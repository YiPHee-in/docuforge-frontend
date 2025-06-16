"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Download,
  Settings,
  Calendar,
  RefreshCw,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import { ProjectSearch } from "./project-search";
import Link from "next/link";
import type { ProjectDisplay } from "@/app/dashboard/dashboard-server";

interface ProjectsListClientProps {
  projects: ProjectDisplay[];
}

export function ProjectsListClient({ projects }: ProjectsListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.repositories.some((repo: string) =>
        repo.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "updating":
        return <Badge className="bg-blue-100 text-blue-800">Updating</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">Draft</Badge>;
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <ProjectSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="updating">Updating</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 mt-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  {getStatusBadge(project.status)}
                  <Badge variant="outline">{project.language}</Badge>
                </div>
                <p className="text-slate-600 mb-3">{project.description}</p>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Updated {project.lastUpdated}
                  </span>
                  <span>{project.lines.toLocaleString()} lines</span>
                  <span>{project.views} views</span>
                  <span>{project.downloads} downloads</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    View Site
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/download/${project.id}`}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/settings/${project.id}`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/projects/${project.id}`}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-600">
                  Repositories: {project.repositories.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <RefreshCw className="h-3 w-3" />
                  Auto-sync: {project.webhookStatus}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
