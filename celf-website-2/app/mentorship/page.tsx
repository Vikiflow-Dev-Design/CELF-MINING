import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { MentorshipHero } from "@/src/components/sections/mentorship/hero-section";
import { MentorshipOverviewSection } from "@/src/components/sections/mentorship/mentorship-overview-section";
import { MentorshipTypesSection } from "@/src/components/sections/mentorship/mentorship-types-section";
import { MentorProfilesSection } from "@/src/components/sections/mentorship/mentor-profiles-section";
import { MentorshipProcessSection } from "@/src/components/sections/mentorship/mentorship-process-section";
import { SuccessStoriesSection } from "@/src/components/sections/mentorship/success-stories-section";
import { BecomeMentorSection } from "@/src/components/sections/mentorship/become-mentor-section";
import { MentorshipStatsSection } from "@/src/components/sections/mentorship/mentorship-stats-section";
import { ApplicationSection } from "@/src/components/sections/mentorship/application-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <MentorshipHero />
        <ScrollingTextSection />
        <MentorshipOverviewSection />
        <MentorshipTypesSection />
        <MentorProfilesSection />
        <MentorshipProcessSection />
        <SuccessStoriesSection />
        <MentorshipStatsSection />
        <BecomeMentorSection />
        <ApplicationSection />
      </main>
      
      <Footer />
    </div>
  );
}
