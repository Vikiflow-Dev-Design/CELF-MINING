import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { HeroSection } from "@/src/components/sections/hero-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";
import { FeaturesSection } from "@/src/components/sections/features-section";
import { StatisticsSection } from "@/src/components/sections/statistics-section";
import { DownloadSection } from "@/src/components/sections/download-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-primary">
      <Navbar />

      <main>
        <HeroSection />
        <ScrollingTextSection />
        <FeaturesSection />
        <StatisticsSection />
        <DownloadSection />
      </main>

      <Footer />
    </div>
  );
}
