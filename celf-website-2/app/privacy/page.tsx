import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { PrivacyContent } from "@/src/components/sections/privacy/privacy-content";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <PrivacyContent />
      </main>
      
      <Footer />
    </div>
  );
}
