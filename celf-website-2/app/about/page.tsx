import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { AboutHero } from "@/src/components/sections/about/hero-section";
import { FoundationStorySection } from "@/src/components/sections/about/foundation-story-section";
import { MissionVisionSection } from "@/src/components/sections/about/mission-vision-section";
import { TimelineSection } from "@/src/components/sections/about/timeline-section";
import { TeamSection } from "@/src/components/sections/about/team-section";
import { ValuesSection } from "@/src/components/sections/about/values-section";
import { ImpactSection } from "@/src/components/sections/about/impact-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <AboutHero />
        <ScrollingTextSection />
        <FoundationStorySection />
        <MissionVisionSection />
        <TimelineSection />
        <TeamSection />
        <ValuesSection />
        <ImpactSection />
      </main>

      <Footer />
    </div>
  );
}
