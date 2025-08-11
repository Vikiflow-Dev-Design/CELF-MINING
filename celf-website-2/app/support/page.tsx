import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { SupportHero } from "@/src/components/sections/support/hero-section";
import { SupportCategoriesSection } from "@/src/components/sections/support/support-categories-section";
import { FAQSupportSection } from "@/src/components/sections/support/faq-support-section";
import { ContactSupportSection } from "@/src/components/sections/support/contact-support-section";
import { KnowledgeBaseSection } from "@/src/components/sections/support/knowledge-base-section";
import { CommunityHelpSection } from "@/src/components/sections/support/community-help-section";
import { StatusSection } from "@/src/components/sections/support/status-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      <main>
        <SupportHero />
        <ScrollingTextSection />
        <SupportCategoriesSection />
        <FAQSupportSection />
        <KnowledgeBaseSection />
        <CommunityHelpSection />
        <ContactSupportSection />
        <StatusSection />
      </main>

      <Footer />
    </div>
  );
}
