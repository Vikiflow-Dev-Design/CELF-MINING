import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { ContactHero } from "@/src/components/sections/contact/hero-section";
import { ContactFormSection } from "@/src/components/sections/contact/contact-form-section";
import { ContactInfoSection } from "@/src/components/sections/contact/contact-info-section";
import { FAQContactSection } from "@/src/components/sections/contact/faq-contact-section";
import { SupportOptionsSection } from "@/src/components/sections/contact/support-options-section";
import { OfficeLocationsSection } from "@/src/components/sections/contact/office-locations-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <ContactHero />
        <ScrollingTextSection />
        <ContactFormSection />
        <ContactInfoSection />
        <SupportOptionsSection />
        <FAQContactSection />
        <OfficeLocationsSection />
      </main>
      
      <Footer />
    </div>
  );
}
