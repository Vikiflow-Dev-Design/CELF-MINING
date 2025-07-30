import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { SocialsHero } from "@/src/components/sections/socials/hero-section";
import { SocialPlatformsSection } from "@/src/components/sections/socials/social-platforms-section";
import { CommunityHighlightsSection } from "@/src/components/sections/socials/community-highlights-section";
import { SocialStatsSection } from "@/src/components/sections/socials/social-stats-section";
import { ContentCalendarSection } from "@/src/components/sections/socials/content-calendar-section";
import { FollowUsSection } from "@/src/components/sections/socials/follow-us-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function SocialsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <SocialsHero />
        <ScrollingTextSection />
        <SocialPlatformsSection />
        <CommunityHighlightsSection />
        <SocialStatsSection />
        <ContentCalendarSection />
        <FollowUsSection />
      </main>
      
      <Footer />
    </div>
  );
}
