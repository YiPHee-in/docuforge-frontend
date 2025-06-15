import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Github, Zap } from "lucide-react"

export function CTA() {
  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Zap className="h-8 w-8" />
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">Ready to transform your documentation?</h2>

            <p className="mt-4 text-xl opacity-90">
              Join thousands of developers who've already modernized their legacy systems
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                <Github className="mr-2 h-5 w-5" />
                Connect Your Repository
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
              >
                Schedule Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm opacity-75">
              <span>✓ 5 docs free</span>
              <span>✓ No credit card required</span>
              <span>✓ 2-minute setup</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
