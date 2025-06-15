import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, GitBranch, FileText } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:px-6 lg:py-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <GitBranch className="mr-2 h-4 w-4" />
            DocuForge 4.1 - Now with Universal Git Integration
          </Badge>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Transform Legacy Code into
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Living Documentation
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            AI-powered documentation that evolves with your codebase. From COBOL to modern APIs, generate beautiful docs
            in minutes, not months.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="px-8 py-3 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              <Github className="mr-2 h-5 w-5" />
              Connect Repository
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>5 docs free</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
