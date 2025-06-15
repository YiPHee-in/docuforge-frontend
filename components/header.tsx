import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">DocuForge</span>
          <Badge variant="secondary" className="ml-2">
            4.1
          </Badge>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </a>
          <a href="#docs" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Documentation
          </a>
          <a href="#support" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Support
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <a href="/signin">Sign In</a>
          </Button>
          <Button asChild>
            <a href="/signup">Get Started</a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
