"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Zap, FileText, Globe, Download, AlertCircle, ArrowRight } from "lucide-react"

interface GenerationStep {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "error"
  progress: number
  duration?: string
  details?: string[]
}

export function GenerationProcess() {
  const [currentStep, setCurrentStep] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const [steps, setSteps] = useState<GenerationStep[]>([
    {
      id: "parsing",
      name: "Code Analysis",
      description: "Parsing source code with Tree-sitter WASM",
      status: "running",
      progress: 0,
      details: ["Analyzing COBOL modules...", "Processing Perl scripts...", "Extracting API endpoints..."],
    },
    {
      id: "ai-processing",
      name: "AI Documentation Generation",
      description: "Generating narrative documentation with Mistral 7B",
      status: "pending",
      progress: 0,
      details: [
        "Creating technical descriptions...",
        "Generating API documentation...",
        "Building knowledge graphs...",
      ],
    },
    {
      id: "diagrams",
      name: "Architecture Diagrams",
      description: "Creating system architecture and flow diagrams",
      status: "pending",
      progress: 0,
      details: ["Generating C4 diagrams...", "Creating sequence diagrams...", "Building dependency graphs..."],
    },
    {
      id: "compilation",
      name: "Site Compilation",
      description: "Building Docusaurus site and generating outputs",
      status: "pending",
      progress: 0,
      details: ["Compiling Docusaurus site...", "Generating PDF report...", "Preparing deployments..."],
    },
    {
      id: "deployment",
      name: "Deployment",
      description: "Deploying to Cloudflare Pages and configuring webhooks",
      status: "pending",
      progress: 0,
      details: ["Deploying to CDN...", "Setting up webhooks...", "Configuring domain..."],
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps]
        const current = newSteps[currentStep]

        if (current && current.status === "running") {
          current.progress += Math.random() * 15

          if (current.progress >= 100) {
            current.progress = 100
            current.status = "completed"
            current.duration = `${Math.floor(Math.random() * 30 + 10)}s`

            if (currentStep < newSteps.length - 1) {
              newSteps[currentStep + 1].status = "running"
              setCurrentStep((prev) => prev + 1)
            } else {
              setIsComplete(true)
            }
          }
        }

        return newSteps
      })

      // Update overall progress
      const completedSteps = steps.filter((step) => step.status === "completed").length
      const runningStep = steps.find((step) => step.status === "running")
      const runningProgress = runningStep ? runningStep.progress / 100 : 0

      setOverallProgress(((completedSteps + runningProgress) / steps.length) * 100)
    }, 500)

    return () => clearInterval(interval)
  }, [currentStep, steps.length])

  const getStepIcon = (step: GenerationStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "running":
        return <Zap className="h-5 w-5 text-blue-600 animate-pulse" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-slate-400" />
    }
  }

  const getStepStatus = (step: GenerationStep) => {
    switch (step.status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Documentation Generated Successfully!</h1>
          <p className="text-lg text-slate-600">Your documentation is ready and has been deployed to the cloud</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Documentation</h3>
              <p className="text-sm text-slate-600 mb-4">Your documentation site is live and accessible</p>
              <Button variant="outline" className="w-full">
                View Site
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Download className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">PDF Report</h3>
              <p className="text-sm text-slate-600 mb-4">Downloadable PDF documentation report</p>
              <Button variant="outline" className="w-full">
                Download PDF
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">API Documentation</h3>
              <p className="text-sm text-slate-600 mb-4">Interactive API documentation with examples</p>
              <Button variant="outline" className="w-full">
                View API Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => (window.location.href = "/dashboard")}>
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Generating Documentation</h1>
        <p className="text-lg text-slate-600">
          Please wait while we analyze your code and generate comprehensive documentation
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>
                {Math.round(overallProgress)}% complete • Estimated time remaining:{" "}
                {Math.max(0, 5 - Math.floor(overallProgress / 20))} minutes
              </CardDescription>
            </div>
            <Badge variant="secondary">
              {currentStep + 1} of {steps.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={step.id} className={step.status === "running" ? "border-blue-500" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStepIcon(step)}
                  <div>
                    <CardTitle className="text-lg">{step.name}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {step.duration && <span className="text-sm text-slate-500">{step.duration}</span>}
                  {getStepStatus(step)}
                </div>
              </div>
            </CardHeader>
            {(step.status === "running" || step.status === "completed") && (
              <CardContent>
                <Progress value={step.progress} className="mb-3" />
                {step.details && step.status === "running" && (
                  <div className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-600 rounded-full" />
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
