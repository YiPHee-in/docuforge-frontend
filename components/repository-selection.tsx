"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, GitBranch, Star, Eye, Calendar, Search, ArrowRight, Code2 } from "lucide-react"

export function RepositorySelection() {
  const [selectedRepos, setSelectedRepos] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const repositories = [
    {
      id: "1",
      name: "legacy-cobol-system",
      description: "Main COBOL application with 50+ years of business logic",
      language: "COBOL",
      size: "2.3M",
      lines: 230000,
      lastUpdated: "2 days ago",
      stars: 12,
      visibility: "private",
      branch: "main",
    },
    {
      id: "2",
      name: "api-gateway",
      description: "Node.js API gateway for microservices architecture",
      language: "JavaScript",
      size: "156K",
      lines: 15600,
      lastUpdated: "5 hours ago",
      stars: 45,
      visibility: "private",
      branch: "develop",
    },
    {
      id: "3",
      name: "perl-data-processor",
      description: "Legacy Perl scripts for data transformation",
      language: "Perl",
      size: "89K",
      lines: 8900,
      lastUpdated: "1 week ago",
      stars: 3,
      visibility: "private",
      branch: "master",
    },
    {
      id: "4",
      name: "documentation-site",
      description: "Current documentation built with Jekyll",
      language: "Markdown",
      size: "23K",
      lines: 2300,
      lastUpdated: "3 days ago",
      stars: 8,
      visibility: "public",
      branch: "gh-pages",
    },
  ]

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalLines = selectedRepos.reduce((sum, repoId) => {
    const repo = repositories.find((r) => r.id === repoId)
    return sum + (repo?.lines || 0)
  }, 0)

  const estimatedCredits = Math.ceil(totalLines / 1000)
  const estimatedCost = estimatedCredits * 0.2

  const handleRepoToggle = (repoId: string) => {
    setSelectedRepos((prev) => (prev.includes(repoId) ? prev.filter((id) => id !== repoId) : [...prev, repoId]))
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Select Repositories</h1>
        <p className="text-lg text-slate-600">Choose the repositories you'd like to generate documentation for</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    GitHub Repositories
                  </CardTitle>
                  <CardDescription>{repositories.length} repositories found in your account</CardDescription>
                </div>
                <Select defaultValue="updated">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Recently Updated</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="language">Language</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-4">
                {filteredRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      selectedRepos.includes(repo.id) ? "border-blue-500 bg-blue-50" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedRepos.includes(repo.id)}
                        onCheckedChange={() => handleRepoToggle(repo.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{repo.name}</h3>
                          <Badge variant={repo.visibility === "public" ? "default" : "secondary"}>
                            {repo.visibility === "public" ? <Eye className="h-3 w-3 mr-1" /> : null}
                            {repo.visibility}
                          </Badge>
                          <Badge variant="outline">{repo.language}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{repo.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Code2 className="h-3 w-3" />
                            {repo.lines.toLocaleString()} lines
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            {repo.branch}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {repo.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Cost Estimate</CardTitle>
              <CardDescription>Real-time pricing based on your selection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Selected repositories:</span>
                  <span className="font-medium">{selectedRepos.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total lines of code:</span>
                  <span className="font-medium">{totalLines.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Credits required:</span>
                  <span className="font-medium">{estimatedCredits}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Estimated cost:</span>
                    <span className="text-blue-600">${estimatedCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p>• 1 credit = 1,000 lines of code</p>
                <p>• $0.20 per credit</p>
                <p>• Free tier: 5 docs/month</p>
              </div>

              <Button
                className="w-full"
                disabled={selectedRepos.length === 0}
                onClick={() => (window.location.href = "/configure")}
              >
                Continue to Configuration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">Free Tier</div>
                <div className="text-sm text-green-800">
                  You have <strong>3 documents</strong> remaining this month
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
