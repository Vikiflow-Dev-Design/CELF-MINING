import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { HowItWorksHero } from "@/src/components/sections/how-it-works/hero-section";
import { SystemOverviewSection } from "@/src/components/sections/how-it-works/system-overview-section";
import { MiningProcessSection } from "@/src/components/sections/how-it-works/mining-process-section";
import { TokenEconomySection } from "@/src/components/sections/how-it-works/token-economy-section";
import { ScholarshipJourneySection } from "@/src/components/sections/how-it-works/scholarship-journey-section";
import { TechnologySection } from "@/src/components/sections/how-it-works/technology-section";
import { FAQSection } from "@/src/components/sections/how-it-works/faq-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <HowItWorksHero />
        <ScrollingTextSection />
        <SystemOverviewSection />
        <MiningProcessSection />
        {/* <TokenEconomySection /> */}
        <ScholarshipJourneySection />
        <TechnologySection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
