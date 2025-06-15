"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, GitBranch, Upload, Zap, ArrowRight, CheckCircle } from "lucide-react"

export function ConnectRepository() {
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [repoUrl, setRepoUrl] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const providers = [
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      description: "Connect your GitHub repositories",
      color: "bg-gray-900",
      connected: false,
    },
    {
      id: "gitlab",
      name: "GitLab",
      icon: GitBranch,
      description: "Connect your GitLab projects",
      color: "bg-orange-600",
      connected: false,
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      icon: GitBranch,
      description: "Connect your Bitbucket repositories",
      color: "bg-blue-600",
      connected: false,
    },
  ]

  const handleConnect = async (providerId: string) => {
    setIsConnecting(true)
    setSelectedProvider(providerId)
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnecting(false)
    // Redirect to repository selection
    window.location.href = "/repositories"
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Connect Your Repository</h1>
        <p className="text-lg text-slate-600">
          Choose how you'd like to import your codebase for documentation generation
        </p>
      </div>

      <Tabs defaultValue="git" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="git">Git Providers</TabsTrigger>
          <TabsTrigger value="upload">Direct Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="git" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {providers.map((provider) => (
              <Card key={provider.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${provider.color}`}>
                      <provider.icon className="h-6 w-6 text-white" />
                    </div>
                    {provider.connected && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{provider.name}</CardTitle>
                  <CardDescription>{provider.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => handleConnect(provider.id)}
                    disabled={isConnecting && selectedProvider === provider.id}
                  >
                    {isConnecting && selectedProvider === provider.id ? (
                      <>
                        <Zap className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        Connect {provider.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Or paste a repository URL</CardTitle>
              <CardDescription>
                Enter a public repository URL to analyze without connecting your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="repo-url">Repository URL</Label>
                <Input
                  id="repo-url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>
              <Button className="w-full" disabled={!repoUrl}>
                Analyze Repository
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload ZIP Archive
              </CardTitle>
              <CardDescription>Upload a ZIP file containing your source code for analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-slate-400 transition-colors">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop your ZIP file here</h3>
                <p className="text-slate-600 mb-4">or click to browse files</p>
                <Button>Choose File</Button>
                <p className="text-sm text-slate-500 mt-4">
                  Maximum file size: 100MB • Supported formats: .zip, .tar.gz
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Browser-Based Processing</h3>
                  <p className="text-blue-800 text-sm mt-1">
                    Your code is processed entirely in your browser using Tree-sitter WASM. No code is uploaded to our
                    servers, ensuring maximum privacy and security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
