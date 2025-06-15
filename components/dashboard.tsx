"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const projects = [
    {
      id: "1",
      name: "Legacy COBOL System",
      description: "Main business application documentation",
      status: "active",
      lastUpdated: "2 hours ago",
      url: "https://legacy-cobol-docs.pages.dev",
      repositories: ["legacy-cobol-system", "cobol-utilities"],
      language: "COBOL",
      lines: 230000,
      webhookStatus: "active",
      views: 1247,
      downloads: 89,
    },
    {
      id: "2",
      name: "API Gateway Documentation",
      description: "Microservices API documentation",
      status: "active",
      lastUpdated: "1 day ago",
      url: "https://api-gateway-docs.pages.dev",
      repositories: ["api-gateway"],
      language: "JavaScript",
      lines: 15600,
      webhookStatus: "active",
      views: 892,
      downloads: 34,
    },
    {
      id: "3",
      name: "Perl Data Processor",
      description: "Legacy data transformation scripts",
      status: "updating",
      lastUpdated: "3 days ago",
      url: "https://perl-processor-docs.pages.dev",
      repositories: ["perl-data-processor"],
      language: "Perl",
      lines: 8900,
      webhookStatus: "active",
      views: 234,
      downloads: 12,
    },
  ]

  const stats = [
    { label: "Total Projects", value: "12", change: "+2", icon: FileText },
    { label: "Documentation Views", value: "8.2K", change: "+15%", icon: TrendingUp },
    { label: "Active Webhooks", value: "9", change: "100%", icon: RefreshCw },
    { label: "Team Members", value: "4", change: "+1", icon: Users },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "updating":
        return <Badge className="bg-blue-100 text-blue-800">Updating</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge variant="secondary">Draft</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Documentation Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage your AI-generated documentation projects</p>
        </div>
        <Button onClick={() => (window.location.href = "/connect")}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <stat.icon className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        ))}
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
                  <CardDescription>Manage your generated documentation sites</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select defaultValue="all">
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
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
                        <Button variant="outline" size="sm">
                          <Globe className="mr-2 h-4 w-4" />
                          View Site
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-600">Repositories: {project.repositories.join(", ")}</span>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes to your documentation</CardDescription>
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
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{activity.action}</h4>
                        <span className="text-sm text-slate-500">{activity.time}</span>
                      </div>
                      <p className="text-slate-600 text-sm mb-1">{activity.project}</p>
                      <p className="text-slate-500 text-xs">{activity.details}</p>
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
                <CardDescription>Most viewed documentation sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project, index) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-slate-600">{project.views} views</p>
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
  )
}
