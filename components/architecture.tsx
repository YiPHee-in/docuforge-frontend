import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Architecture() {
  return (
    <section className="bg-slate-50 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Built for Scale and Security</h2>
          <p className="mt-4 text-lg text-slate-600">Modern architecture designed for enterprise requirements</p>
        </div>

        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-center">System Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <svg viewBox="0 0 800 400" className="w-full h-auto">
                  {/* Frontend */}
                  <rect x="50" y="50" width="120" height="60" rx="8" fill="#3b82f6" />
                  <text x="110" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    Frontend
                  </text>
                  <text x="110" y="90" textAnchor="middle" fill="white" fontSize="10">
                    React + TypeScript
                  </text>

                  {/* Backend */}
                  <rect x="250" y="50" width="120" height="60" rx="8" fill="#10b981" />
                  <text x="310" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    Backend
                  </text>
                  <text x="310" y="90" textAnchor="middle" fill="white" fontSize="10">
                    FastAPI + Python
                  </text>

                  {/* AI Processing */}
                  <rect x="450" y="50" width="120" height="60" rx="8" fill="#8b5cf6" />
                  <text x="510" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    AI Processing
                  </text>
                  <text x="510" y="90" textAnchor="middle" fill="white" fontSize="10">
                    LiteLLM + Mistral
                  </text>

                  {/* Database */}
                  <rect x="150" y="180" width="120" height="60" rx="8" fill="#f59e0b" />
                  <text x="210" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    Database
                  </text>
                  <text x="210" y="220" textAnchor="middle" fill="white" fontSize="10">
                    Supabase PostgreSQL
                  </text>

                  {/* CI/CD */}
                  <rect x="350" y="180" width="120" height="60" rx="8" fill="#ef4444" />
                  <text x="410" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    CI/CD
                  </text>
                  <text x="410" y="220" textAnchor="middle" fill="white" fontSize="10">
                    Webhook Engine
                  </text>

                  {/* Output */}
                  <rect x="250" y="310" width="120" height="60" rx="8" fill="#06b6d4" />
                  <text x="310" y="335" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    Output
                  </text>
                  <text x="310" y="350" textAnchor="middle" fill="white" fontSize="10">
                    Docusaurus + CDN
                  </text>

                  {/* Arrows */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                  </defs>

                  <line
                    x1="170"
                    y1="80"
                    x2="250"
                    y2="80"
                    stroke="#64748b"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <line
                    x1="370"
                    y1="80"
                    x2="450"
                    y2="80"
                    stroke="#64748b"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <line
                    x1="310"
                    y1="110"
                    x2="210"
                    y2="180"
                    stroke="#64748b"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <line
                    x1="310"
                    y1="110"
                    x2="410"
                    y2="180"
                    stroke="#64748b"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <line
                    x1="310"
                    y1="240"
                    x2="310"
                    y2="310"
                    stroke="#64748b"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-slate-600">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">&lt; 2s</div>
                <div className="text-sm text-slate-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">SOC 2</div>
                <div className="text-sm text-slate-600">Compliant</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
