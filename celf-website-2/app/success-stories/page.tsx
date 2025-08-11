import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { SuccessStoriesHero } from "@/src/components/sections/success-stories/hero-section";
import { SuccessStoriesContent } from "@/src/components/sections/success-stories/content-section";

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <SuccessStoriesHero />
        <SuccessStoriesContent />
      </main>

      <Footer />
    </div>
  );
}


