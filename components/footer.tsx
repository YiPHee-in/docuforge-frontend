import { FileText, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">DocuForge</span>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              AI-powered documentation that evolves with your codebase. Transform legacy systems into living knowledge
              bases.
            </p>
            <div className="mt-6 flex gap-4">
              <Github className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              <Twitter className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-slate-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-slate-900">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-slate-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-slate-600">
          <p>&copy; 2025 DocuForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
