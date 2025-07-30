import { Navbar } from "@/src/components/layout/navbar";
import { Footer } from "@/src/components/layout/footer";
import { BlogHero } from "@/src/components/sections/blog/hero-section";
import { FeaturedPostsSection } from "@/src/components/sections/blog/featured-posts-section";
import { BlogCategoriesSection } from "@/src/components/sections/blog/blog-categories-section";
import { RecentPostsSection } from "@/src/components/sections/blog/recent-posts-section";
import { BlogStatsSection } from "@/src/components/sections/blog/blog-stats-section";
import { NewsletterSection } from "@/src/components/sections/blog/newsletter-section";
import { PopularTagsSection } from "@/src/components/sections/blog/popular-tags-section";
import { ScrollingTextSection } from "@/src/components/sections/scrolling-text-section";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      <main>
        <BlogHero />
        <ScrollingTextSection />
        <FeaturedPostsSection />
        <BlogCategoriesSection />
        <RecentPostsSection />
        <BlogStatsSection />
        <PopularTagsSection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
}
