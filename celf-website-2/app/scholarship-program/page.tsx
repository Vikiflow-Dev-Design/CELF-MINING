import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { ScholarshipHero } from "@/src/components/sections/scholarship/hero-section";
import { ProgramOverviewSection } from "@/src/components/sections/scholarship/program-overview-section";
import { EligibilitySection } from "@/src/components/sections/scholarship/eligibility-section";
import { ApplicationProcessSection } from "@/src/components/sections/scholarship/application-process-section";
import { ScholarshipTypesSection } from "@/src/components/sections/scholarship/scholarship-types-section";
import { SuccessStoriesSection } from "@/src/components/sections/scholarship/success-stories-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function ScholarshipProgramPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <ScholarshipHero />
        <ScrollingTextSection />
        <ProgramOverviewSection />
        <EligibilitySection />
        <ApplicationProcessSection />
        <ScholarshipTypesSection />
        <SuccessStoriesSection />
      </main>

      <Footer />
    </div>
  );
}
