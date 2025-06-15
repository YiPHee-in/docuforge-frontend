import { Card } from "@/components/ui/card"

export function Stats() {
  const stats = [
    { label: "Documentation Time", value: "<5 min", description: "per 10k lines of code" },
    { label: "Accuracy Rate", value: "90%+", description: "with AI validation" },
    { label: "Languages Supported", value: "25+", description: "including legacy systems" },
    { label: "Doc Drift Reduction", value: "85%", description: "with self-healing" },
  ]

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="mt-2 font-semibold text-slate-900">{stat.label}</div>
              <div className="mt-1 text-sm text-slate-600">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
