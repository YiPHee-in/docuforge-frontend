"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Download, Search, Calendar, RefreshCw, ExternalLink, MoreHorizontal, Plus, Eye } from "lucide-react"

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState("")

  const projects = [
    {
      id: "legacy-cobol-system",
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
      id: "api-gateway",
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
      id: "perl-data-processor",
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1">Manage your documentation projects</p>
        </div>
        <Button asChild>
          <a href="/connect">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Documentation Projects</CardTitle>
              <CardDescription>All your generated documentation sites</CardDescription>
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
                      <a href={`/projects/${project.id}`} className="text-lg font-semibold hover:text-blue-600">
                        {project.name}
                      </a>
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
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {project.views} views
                      </span>
                      <span>{project.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/projects/${project.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      View Site
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
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
    </div>
  )
}
