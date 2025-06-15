import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Hobbyist",
      price: "Free",
      description: "Perfect for solo developers and open source projects",
      features: [
        "5 docs per month",
        "10k LOC per document",
        "Basic templates",
        "Community support",
        "GitHub integration",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Starter",
      price: "$15",
      period: "/month",
      description: "Ideal for small teams and growing projects",
      features: [
        "50 docs per month",
        "50k LOC per document",
        "All templates",
        "Email support",
        "All Git providers",
        "PDF exports",
        "Basic webhooks",
      ],
      cta: "Start Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "$99",
      period: "/month",
      description: "For growing startups and development teams",
      features: [
        "Unlimited docs",
        "500k LOC per month",
        "Priority support",
        "Advanced webhooks",
        "Team permissions",
        "Custom branding",
        "API access",
        "Confluence sync",
      ],
      cta: "Start Trial",
      popular: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific requirements",
      features: [
        "Unlimited everything",
        "Air-gapped deployment",
        "Dedicated support",
        "SLA guarantees",
        "Custom integrations",
        "Compliance reports",
        "Training included",
        "Legacy language packs",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-slate-600">Choose the plan that fits your team size and requirements</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-slate-600">{plan.period}</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`mt-8 w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            All plans include: SSL certificates, global CDN, automatic backups, and 99.9% uptime SLA
          </p>
          <p className="mt-2 text-sm text-slate-600">Usage overages: $0.20 per credit (1 credit = 1k LOC)</p>
        </div>
      </div>
    </section>
  )
}
