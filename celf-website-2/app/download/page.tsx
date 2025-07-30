import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { DownloadHero } from "@/src/components/sections/download/hero-section";
import { AppFeaturesSection } from "@/src/components/sections/download/app-features-section";
import { DownloadLinksSection } from "@/src/components/sections/download/download-links-section";
import { SystemRequirementsSection } from "@/src/components/sections/download/system-requirements-section";
import { AppScreenshotsSection } from "@/src/components/sections/download/app-screenshots-section";
import { GetStartedSection } from "@/src/components/sections/download/get-started-section";
import { TroubleshootingSection } from "@/src/components/sections/download/troubleshooting-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <DownloadHero />
        <ScrollingTextSection />
        <DownloadLinksSection />
        <AppFeaturesSection />
        <AppScreenshotsSection />
        <SystemRequirementsSection />
        <GetStartedSection />
        <TroubleshootingSection />
      </main>
      
      <Footer />
    </div>
  );
}
