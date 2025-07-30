import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { LicenseContent } from "@/src/components/sections/license/license-content";

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <LicenseContent />
      </main>
      
      <Footer />
    </div>
  );
}
