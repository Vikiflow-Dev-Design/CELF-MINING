import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { CommunityHero } from "@/src/components/sections/community/hero-section";
import { CommunityStatsSection } from "@/src/components/sections/community/community-stats-section";
import { CommunityFeaturesSection } from "@/src/components/sections/community/community-features-section";
import { SuccessStoriesSection } from "@/src/components/sections/community/success-stories-section";
import { CommunityForumsSection } from "@/src/components/sections/community/community-forums-section";
import { MentorshipSection } from "@/src/components/sections/community/mentorship-section";
import { EventsSection } from "@/src/components/sections/community/events-section";
import { JoinCommunitySection } from "@/src/components/sections/community/join-community-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <CommunityHero />
        <ScrollingTextSection />
        <CommunityStatsSection />
        <CommunityFeaturesSection />
        <SuccessStoriesSection />
        <CommunityForumsSection />
        <MentorshipSection />
        <EventsSection />
        <JoinCommunitySection />
      </main>
      
      <Footer />
    </div>
  );
}
