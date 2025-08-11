import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { TermsHero } from "@/src/components/sections/terms/hero-section";
import { TermsContent } from "@/src/components/sections/terms/terms-content";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <TermsHero />
        <ScrollingTextSection />
        <TermsContent />
      </main>

      <Footer />
    </div>
  );
}
