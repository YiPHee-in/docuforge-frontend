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
import { FileText, Globe, Download, Settings, Zap } from "lucide-react"

export function ConfigureGeneration() {
  const [config, setConfig] = useState({
    projectName: "Legacy COBOL Documentation",
    description: "",
    template: "technical",
    outputs: ["docusaurus", "pdf"],
    includeApi: true,
    includeDiagrams: true,
    includeComments: true,
    webhookEnabled: true,
    webhookUrl: "",
    branchFilter: "main,develop",
    customBranding: false,
  })

  const templates = [
    {
      id: "technical",
      name: "Technical Documentation",
      description: "Comprehensive technical docs with API references and architecture diagrams",
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "business",
      name: "Business Documentation",
      description: "Business-focused documentation with process flows and user guides",
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, minimal documentation focused on essential information",
      preview: "/placeholder.svg?height=200&width=300",
    },
  ]

  const outputFormats = [
    { id: "docusaurus", name: "Docusaurus Site", icon: Globe, description: "Interactive documentation website" },
    { id: "pdf", name: "PDF Report", icon: Download, description: "Printable documentation report" },
    { id: "readme", name: "ReadMe.com", icon: FileText, description: "Sync to ReadMe.com platform" },
    { id: "confluence", name: "Confluence", icon: FileText, description: "Export to Confluence pages" },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Configure Documentation</h1>
        <p className="text-lg text-slate-600">Customize how your documentation will be generated and delivered</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>Basic information about your documentation project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      value={config.projectName}
                      onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your project..."
                      value={config.description}
                      onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Options</CardTitle>
                  <CardDescription>Choose what to include in your documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include API Documentation</Label>
                      <p className="text-sm text-slate-600">Generate interactive API docs from code</p>
                    </div>
                    <Switch
                      checked={config.includeApi}
                      onCheckedChange={(checked) => setConfig({ ...config, includeApi: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Architecture Diagrams</Label>
                      <p className="text-sm text-slate-600">Auto-generate system architecture diagrams</p>
                    </div>
                    <Switch
                      checked={config.includeDiagrams}
                      onCheckedChange={(checked) => setConfig({ ...config, includeDiagrams: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Code Comments</Label>
                      <p className="text-sm text-slate-600">Extract and format inline code comments</p>
                    </div>
                    <Switch
                      checked={config.includeComments}
                      onCheckedChange={(checked) => setConfig({ ...config, includeComments: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="template" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Template</CardTitle>
                  <CardDescription>Select a template that matches your documentation needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          config.template === template.id ? "border-blue-500 bg-blue-50" : "border-slate-200"
                        }`}
                        onClick={() => setConfig({ ...config, template: template.id })}
                      >
                        <img
                          src={template.preview || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h3 className="font-semibold mb-2">{template.name}</h3>
                        <p className="text-sm text-slate-600">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="output" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Output Formats</CardTitle>
                  <CardDescription>Choose how you want to receive your documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {outputFormats.map((format) => (
                      <div
                        key={format.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          config.outputs.includes(format.id) ? "border-blue-500 bg-blue-50" : "border-slate-200"
                        }`}
                        onClick={() => {
                          const newOutputs = config.outputs.includes(format.id)
                            ? config.outputs.filter((id) => id !== format.id)
                            : [...config.outputs, format.id]
                          setConfig({ ...config, outputs: newOutputs })
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <format.icon className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold">{format.name}</h3>
                        </div>
                        <p className="text-sm text-slate-600">{format.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Self-Healing Documentation</CardTitle>
                  <CardDescription>Automatically update documentation when code changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Webhooks</Label>
                      <p className="text-sm text-slate-600">Automatically trigger updates on code changes</p>
                    </div>
                    <Switch
                      checked={config.webhookEnabled}
                      onCheckedChange={(checked) => setConfig({ ...config, webhookEnabled: checked })}
                    />
                  </div>

                  {config.webhookEnabled && (
                    <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Custom Webhook URL (Optional)</Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://your-domain.com/webhook"
                          value={config.webhookUrl}
                          onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branch-filter">Branch Filter</Label>
                        <Input
                          id="branch-filter"
                          placeholder="main,develop,staging"
                          value={config.branchFilter}
                          onChange={(e) => setConfig({ ...config, branchFilter: e.target.value })}
                        />
                        <p className="text-xs text-slate-500">Comma-separated list of branches to monitor</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Generation Summary</CardTitle>
              <CardDescription>Review your configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Project:</span>
                  <span className="font-medium">{config.projectName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Template:</span>
                  <span className="font-medium capitalize">{config.template}</span>
                </div>
                <div className="flex justify-between">
                  <span>Output formats:</span>
                  <span className="font-medium">{config.outputs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-updates:</span>
                  <Badge variant={config.webhookEnabled ? "default" : "secondary"}>
                    {config.webhookEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">Ready to Generate</div>
                  <div className="text-sm text-slate-600">Estimated time: 3-5 minutes</div>
                </div>

                <Button className="w-full" size="lg" onClick={() => (window.location.href = "/generate")}>
                  <Zap className="mr-2 h-4 w-4" />
                  Start Generation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900">Advanced Settings</h3>
                  <p className="text-yellow-800 text-sm mt-1">
                    Need custom parsers or enterprise features? Contact our team for advanced configuration options.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
