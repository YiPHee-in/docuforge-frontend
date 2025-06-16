import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Architecture } from "@/components/architecture";
import { Pricing } from "@/components/pricing";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <Stats />
      <Features />
      <Architecture />
      <Pricing />
      <CTA />
    </main>
  );
}
