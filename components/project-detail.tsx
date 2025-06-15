"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Globe,
  Download,
  Settings,
  RefreshCw,
  ExternalLink,
  MoreHorizontal,
  Github,
  GitBranch,
  Eye,
  TrendingUp,
  Users,
  FileText,
  Edit,
  Copy,
  Share,
  Archive,
  Trash2,
  Code2,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
} from "lucide-react"

interface ProjectDetailProps {
  projectId: string
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const [webhookEnabled, setWebhookEnabled] = useState(true)
  const [autoUpdate, setAutoUpdate] = useState(true)

  // Mock project data - in real app this would come from API
  const project = {
    id: projectId,
    name: "Legacy COBOL System",
    description: "Comprehensive documentation for the main business application with 50+ years of business logic",
    status: "active",
    createdAt: "2024-01-15",
    lastUpdated: "2 hours ago",
    lastGenerated: "2024-01-20T10:30:00Z",
    url: "https://legacy-cobol-docs.pages.dev",
    repositories: [
      {
        id: "1",
        name: "legacy-cobol-system",
        provider: "github",
        url: "https://github.com/acme/legacy-cobol-system",
        branch: "main",
        lastCommit: "abc123f",
        lines: 180000,
      },
      {
        id: "2",
        name: "cobol-utilities",
        provider: "github",
        url: "https://github.com/acme/cobol-utilities",
        branch: "main",
        lastCommit: "def456a",
        lines: 50000,
      },
    ],
    language: "COBOL",
    totalLines: 230000,
    webhookStatus: "active",
    views: 1247,
    downloads: 89,
    template: "technical",
    outputs: ["docusaurus", "pdf", "readme"],
    team: [
      { name: "John Doe", role: "Admin", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah Wilson", role: "Editor", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Johnson", role: "Viewer", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    analytics: {
      views: [
        { date: "2024-01-15", views: 45 },
        { date: "2024-01-16", views: 67 },
        { date: "2024-01-17", views: 89 },
        { date: "2024-01-18", views: 123 },
        { date: "2024-01-19", views: 156 },
        { date: "2024-01-20", views: 178 },
      ],
      topPages: [
        { path: "/api/reference", views: 234 },
        { path: "/getting-started", views: 189 },
        { path: "/architecture", views: 156 },
      ],
    },
    generations: [
      {
        id: "1",
        status: "completed",
        startedAt: "2024-01-20T10:30:00Z",
        completedAt: "2024-01-20T10:35:00Z",
        duration: "5m 23s",
        trigger: "webhook",
        commit: "abc123f",
        changes: ["Updated API documentation", "Added new endpoints", "Fixed typos"],
      },
      {
        id: "2",
        status: "completed",
        startedAt: "2024-01-19T14:15:00Z",
        completedAt: "2024-01-19T14:20:00Z",
        duration: "4m 56s",
        trigger: "manual",
        commit: "def456a",
        changes: ["Major refactoring", "Updated architecture diagrams"],
      },
      {
        id: "3",
        status: "failed",
        startedAt: "2024-01-18T09:00:00Z",
        completedAt: "2024-01-18T09:02:00Z",
        duration: "2m 15s",
        trigger: "webhook",
        commit: "ghi789b",
        error: "Parse error in COBOL module",
      },
    ],
  }

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

  const getGenerationStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "github":
        return <Github className="h-4 w-4" />
      case "gitlab":
        return <GitBranch className="h-4 w-4" />
      default:
        return <GitBranch className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </a>
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
              {getStatusBadge(project.status)}
              <Badge variant="outline">{project.language}</Badge>
            </div>
            <p className="text-slate-600">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Globe className="mr-2 h-4 w-4" />
            View Site
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Views</p>
                <p className="text-2xl font-bold">{project.views.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Downloads</p>
                <p className="text-2xl font-bold">{project.downloads}</p>
              </div>
              <Download className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Lines of Code</p>
                <p className="text-2xl font-bold">{project.totalLines.toLocaleString()}</p>
              </div>
              <Code2 className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Last Updated</p>
                <p className="text-2xl font-bold">{project.lastUpdated}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="generations">Generations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Basic details about this documentation project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Created</span>
                    <span className="text-sm text-slate-600">{project.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Template</span>
                    <Badge variant="outline" className="capitalize">
                      {project.template}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Output Formats</span>
                    <div className="flex gap-1">
                      {project.outputs.map((output) => (
                        <Badge key={output} variant="secondary" className="text-xs">
                          {output}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Repositories</span>
                    <span className="text-sm text-slate-600">{project.repositories.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Access */}
            <Card>
              <CardHeader>
                <CardTitle>Team Access</CardTitle>
                <CardDescription>Team members with access to this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Generations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Generations</CardTitle>
              <CardDescription>Latest documentation generation runs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.generations.slice(0, 3).map((generation) => (
                  <div key={generation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getGenerationStatusIcon(generation.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium capitalize">{generation.status}</p>
                          <Badge variant="outline" className="text-xs">
                            {generation.trigger}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                          {generation.status === "failed" ? generation.error : generation.changes?.[0]}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(generation.startedAt).toLocaleString()} • {generation.duration}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentation Preview</CardTitle>
              <CardDescription>Live preview of your generated documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-slate-50 p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-slate-600">{project.url}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.url} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in New Tab
                    </a>
                  </Button>
                </div>
                <div className="h-96 bg-white">
                  <iframe
                    src={project.url}
                    className="w-full h-full"
                    title="Documentation Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repositories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Repositories</CardTitle>
                  <CardDescription>Source code repositories for this documentation project</CardDescription>
                </div>
                <Button>
                  <Github className="mr-2 h-4 w-4" />
                  Add Repository
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.repositories.map((repo) => (
                  <div key={repo.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getProviderIcon(repo.provider)}
                        <div>
                          <h3 className="font-semibold">{repo.name}</h3>
                          <p className="text-sm text-slate-600">{repo.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4 text-sm">
                      <div>
                        <span className="text-slate-500">Branch:</span>
                        <p className="font-medium">{repo.branch}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Last Commit:</span>
                        <p className="font-medium font-mono">{repo.lastCommit}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Lines of Code:</span>
                        <p className="font-medium">{repo.lines.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Status:</span>
                        <Badge className="bg-green-100 text-green-800">Connected</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generation History</CardTitle>
                  <CardDescription>Complete history of documentation generation runs</CardDescription>
                </div>
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Regenerate Now
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.generations.map((generation) => (
                  <div key={generation.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getGenerationStatusIcon(generation.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold capitalize">{generation.status}</h3>
                            <Badge variant="outline" className="text-xs">
                              {generation.trigger}
                            </Badge>
                            <Badge variant="secondary" className="text-xs font-mono">
                              {generation.commit}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            {new Date(generation.startedAt).toLocaleString()} • Duration: {generation.duration}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Logs
                      </Button>
                    </div>
                    {generation.status === "failed" ? (
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-sm text-red-800">{generation.error}</p>
                      </div>
                    ) : (
                      generation.changes && (
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-sm font-medium text-green-800 mb-2">Changes:</p>
                          <ul className="text-sm text-green-700 space-y-1">
                            {generation.changes.map((change, index) => (
                              <li key={index}>• {change}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
                <CardDescription>Documentation views in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <TrendingUp className="h-8 w-8 mr-2" />
                  Views chart would go here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most viewed documentation pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.analytics.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{page.path}</p>
                        <p className="text-sm text-slate-600">{page.views} views</p>
                      </div>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Export Analytics</CardTitle>
              <CardDescription>Download detailed analytics and usage reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Configure project details and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" defaultValue={project.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" defaultValue={project.description} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Update Documentation</Label>
                    <p className="text-sm text-slate-600">Automatically regenerate when code changes</p>
                  </div>
                  <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>Manage automatic updates via webhooks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Webhooks</Label>
                    <p className="text-sm text-slate-600">Receive updates from your repositories</p>
                  </div>
                  <Switch checked={webhookEnabled} onCheckedChange={setWebhookEnabled} />
                </div>
                {webhookEnabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="webhook-url"
                          value="https://api.docuforge.dev/webhooks/abc123"
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-secret">Webhook Secret</Label>
                      <div className="flex gap-2">
                        <Input id="webhook-secret" type="password" value="••••••••••••" readOnly />
                        <Button variant="outline" size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <div>
                  <h3 className="font-medium text-yellow-900">Archive Project</h3>
                  <p className="text-sm text-yellow-700">Archive this project and stop all updates</p>
                </div>
                <Button variant="outline" size="sm">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h3 className="font-medium text-red-900">Delete Project</h3>
                  <p className="text-sm text-red-700">Permanently delete this project and all data</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
