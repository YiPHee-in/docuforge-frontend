import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Zap, RefreshCw, FileText, GitBranch, Shield, Workflow, Database, Globe } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Code2,
      title: "Universal Code Ingestion",
      description:
        "Support for GitHub, GitLab, Bitbucket, and direct ZIP uploads. Parse COBOL, Perl, and 25+ languages in your browser.",
      badge: "Core",
    },
    {
      icon: Zap,
      title: "AI-Powered Generation",
      description:
        "Mistral 7B creates narrative documentation, API specs, and architecture diagrams from your codebase automatically.",
      badge: "AI",
    },
    {
      icon: RefreshCw,
      title: "Self-Healing Documentation",
      description:
        "Automatic updates via webhooks. Creates pull requests when code changes, keeping docs synchronized.",
      badge: "Automation",
    },
    {
      icon: FileText,
      title: "Multi-Format Output",
      description: "Generate Docusaurus sites, PDF reports, OpenAPI specs, and sync to ReadMe.com or Confluence.",
      badge: "Export",
    },
    {
      icon: GitBranch,
      title: "Universal Webhooks",
      description: "Single endpoint works with all Git providers. Native PR/MR creation with change reports.",
      badge: "Integration",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliance, RBAC, audit trails, and air-gapped deployment options for sensitive codebases.",
      badge: "Security",
    },
    {
      icon: Workflow,
      title: "Knowledge Graphs",
      description: "Visual code relationships using Apache AGE. Understand complex system dependencies at a glance.",
      badge: "Visualization",
    },
    {
      icon: Database,
      title: "Legacy Language Support",
      description: "Browser-based Tree-sitter parsing for COBOL, JCL, RPG, and other mainframe languages.",
      badge: "Legacy",
    },
    {
      icon: Globe,
      title: "Global CDN Deployment",
      description: "Automatic hosting on Cloudflare Pages with versioning, search, and dark mode support.",
      badge: "Hosting",
    },
  ]

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to modernize documentation
          </h2>
          <p className="mt-4 text-lg text-slate-600">From legacy systems to modern APIs, DocuForge handles it all</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
