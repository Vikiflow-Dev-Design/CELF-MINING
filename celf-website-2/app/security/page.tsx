import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { SecurityHero } from "@/src/components/sections/security/hero-section";
import { SecurityMeasuresSection } from "@/src/components/sections/security/security-measures-section";
import { DataProtectionSection } from "@/src/components/sections/security/data-protection-section";
import { BestPracticesSection } from "@/src/components/sections/security/best-practices-section";
import { ReportingSection } from "@/src/components/sections/security/reporting-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <SecurityHero />
        <ScrollingTextSection />
        <SecurityMeasuresSection />
        <DataProtectionSection />
        <BestPracticesSection />
        <ReportingSection />
      </main>

      <Footer />
    </div>
  );
}
