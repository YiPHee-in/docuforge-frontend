"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Globe,
  Download,
  Settings,
  Plus,
  Search,
  Calendar,
  TrendingUp,
  Users,
  RefreshCw,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ProjectSearch } from "./project-search";
import { ProjectsListClient } from "./projects-list-client";
import { DashboardHeader } from "./dashboard-header";
import Link from "next/link";
import type { ProjectDisplay } from "@/app/dashboard/dashboard-server";

interface DashboardClientProps {
  projects: ProjectDisplay[];
  stats: {
    label: string;
    value: string;
    change: string;
    icon: string;
  }[];
}

export function DashboardClient({ projects, stats }: DashboardClientProps) {
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText":
        return FileText;
      case "TrendingUp":
        return TrendingUp;
      case "RefreshCw":
        return RefreshCw;
      case "Users":
        return Users;
      default:
        return FileText;
    }
  };

  return (
    <div className="p-8">
      <DashboardHeader />

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = getIcon(stat.icon);
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {stat.label}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      {stat.change && (
                        <span className="text-sm text-green-600">
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                  <Icon className="h-8 w-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Documentation Projects</CardTitle>
                  <CardDescription>
                    Manage your generated documentation sites
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ProjectsListClient projects={projects} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and changes to your documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Documentation updated",
                    project: "Legacy COBOL System",
                    time: "2 hours ago",
                    details: "Auto-updated from commit abc123f",
                    icon: RefreshCw,
                  },
                  {
                    action: "New project created",
                    project: "API Gateway Documentation",
                    time: "1 day ago",
                    details: "Generated from 3 repositories",
                    icon: Plus,
                  },
                  {
                    action: "PDF downloaded",
                    project: "Perl Data Processor",
                    time: "2 days ago",
                    details: "Downloaded by john@company.com",
                    icon: Download,
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{activity.action}</h4>
                        <span className="text-sm text-slate-500">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-1">
                        {activity.project}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Documentation Views</CardTitle>
                <CardDescription>Views over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <TrendingUp className="h-8 w-8 mr-2" />
                  Analytics chart would go here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Projects</CardTitle>
                <CardDescription>
                  Most viewed documentation sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project, index) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-slate-600">
                          {project.views} views
                        </p>
                      </div>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
