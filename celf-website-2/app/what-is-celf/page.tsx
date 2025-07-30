import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { WhatIsCelfHero } from "@/src/components/sections/what-is-celf/hero-section";
import { TokenOverviewSection } from "@/src/components/sections/what-is-celf/token-overview-section";
import { MissionSection } from "@/src/components/sections/what-is-celf/mission-section";
import { MiningExplanationSection } from "@/src/components/sections/what-is-celf/mining-explanation-section";
import { TokenomicsSection } from "@/src/components/sections/what-is-celf/tokenomics-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function WhatIsCelfPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <WhatIsCelfHero />
        <ScrollingTextSection />
        <TokenOverviewSection />
        <MissionSection />
        <MiningExplanationSection />
        <TokenomicsSection />
      </main>

      <Footer />
    </div>
  );
}
