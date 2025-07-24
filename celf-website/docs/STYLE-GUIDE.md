# CELF Website Style Guide

## Overview

This comprehensive style guide defines the visual and content standards for the CELF website. It ensures consistency across all pages, components, and content while maintaining the brand identity and user experience.

## 🎨 Design System

### Colors

Our color system is built around accessibility and brand recognition:

- **Primary Blue**: `#1E40AF` - Main brand color for CTAs and key elements
- **Secondary Colors**: Success (`#10B981`), Warning (`#F59E0B`), Error (`#EF4444`), Info (`#06B6D4`)
- **Neutral Scale**: 9-step gray scale from white to black
- **Semantic Colors**: Text, background, and border color aliases

### Typography

Typography hierarchy supports clear information architecture:

- **Display Fonts**: Large headlines (64px, 56px, 48px)
- **Headings**: H1-H6 (40px down to 18px)
- **Body Text**: Large (18px), Medium (16px), Small (14px)
- **Utility Text**: Caption (12px), Overline (10px)

### Spacing

Consistent spacing system based on 4px grid:

- **Scale**: xs(4px), sm(8px), md(12px), lg(16px), xl(20px), 2xl(24px), 3xl(32px), 4xl(40px), 5xl(48px), 6xl(64px), 7xl(80px), 8xl(96px)
- **Usage**: Apply consistently for margins, padding, and gaps

## 🧩 Components

### Buttons

**Variants:**
- **Primary**: Main call-to-action buttons
- **Secondary**: Alternative actions
- **Outline**: Tertiary actions
- **Ghost**: Subtle navigation elements

**Sizes:**
- **XS**: 24px height for compact spaces
- **SM**: 32px height for secondary actions
- **MD**: 40px height for standard buttons
- **LG**: 48px height for important actions
- **XL**: 56px height for hero CTAs

**Usage Guidelines:**
- Use primary buttons sparingly (1-2 per page)
- Maintain minimum 44px touch target for mobile
- Include loading states for async actions

### Cards

**Variants:**
- **Default**: Standard content containers
- **Elevated**: Important or featured content
- **Outlined**: Emphasized content without shadows
- **Filled**: Subtle background containers

**Anatomy:**
- **Header**: Optional title and metadata
- **Content**: Main card content area
- **Footer**: Optional actions or additional info
- **Media**: Images or visual content

### Typography Components

**Usage:**
- **Display Large**: Hero headlines only
- **H1**: Page titles and main headers
- **H2**: Section headers
- **H3**: Subsection headers
- **Body Large**: Important introductory text
- **Body Medium**: Standard content text
- **Caption**: Metadata and fine print

## 📐 Layout System

### Grid System

12-column responsive grid with consistent gutters:

- **Breakpoints**: xs(0px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- **Containers**: Fluid, Fixed (1440px), Narrow (800px), Wide (1600px)
- **Gutters**: 16px on mobile, 24px on tablet, 32px on desktop

### Common Patterns

**Two Column**: Content and sidebar layouts
**Three Column**: Feature grids and service listings
**Four Column**: Team members, testimonials, stats
**Auto-fit**: Responsive card grids

### Section Layouts

**Hero**: Full viewport height with centered content
**Content**: Standard content sections with vertical rhythm
**Feature**: Alternating background colors for visual separation
**CTA**: Centered call-to-action sections

## 📝 Content Guidelines

### Writing Principles

1. **Clarity**: Write clearly and concisely
2. **Accessibility**: Use language accessible to all skill levels
3. **Consistency**: Maintain consistent terminology
4. **Helpfulness**: Focus on user goals
5. **Authenticity**: Be genuine and transparent

### Content Structure

**Landing Pages:**
- Hero → Statistics → Features → Testimonials → CTA

**Article Pages:**
- Header → Introduction → Content → Conclusion → Related

**Product Pages:**
- Hero → Overview → Features → Benefits → Pricing → FAQ → CTA

### Editorial Standards

- **Reading Level**: 8th grade or lower
- **Sentence Length**: 15-20 words average
- **Paragraph Length**: 3-4 sentences maximum
- **Active Voice**: Prefer active over passive voice

## 🖼️ Media Guidelines

### Images

**Technical Specs:**
- **Formats**: WebP (preferred), PNG, JPG
- **Quality**: 85% compression for web
- **Responsive**: Multiple sizes for different screens
- **Lazy Loading**: Implement for performance

**Aspect Ratios:**
- **Hero**: 16:9 for main banners
- **Cards**: 4:3 for content cards
- **Avatars**: 1:1 for profile images
- **Thumbnails**: 1:1 for small previews

**Alt Text:**
- Describe content and context
- Keep under 125 characters
- Use empty alt="" for decorative images

### Icons

**Style**: Outline with selective fills, 1.5px stroke width
**Sizes**: 16px, 24px, 32px, 48px
**Usage**: Functional navigation and content support
**Accessibility**: Include proper ARIA labels

## 🎯 Brand Voice

### Characteristics

- **Educational**: Informative without condescension
- **Approachable**: Friendly and accessible
- **Trustworthy**: Reliable and transparent
- **Innovative**: Forward-thinking and tech-focused
- **Inclusive**: Welcoming to diverse audiences

### Tone by Context

- **Marketing**: Enthusiastic and inspiring
- **Educational**: Clear and instructional
- **Support**: Helpful and patient
- **Legal**: Professional and precise
- **Community**: Warm and encouraging

### Preferred Terminology

- Use "cryptocurrency" not "crypto"
- Use "educational mining" not just "mining"
- Use "community" not "users" or "customers"
- Use "learning" not just "education"
- Use "platform" not "app" or "system"

## 🔍 SEO Guidelines

### Meta Data

**Title Tags:**
- 50-60 characters
- Format: "Primary Keyword | CELF"
- Unique for each page

**Meta Descriptions:**
- 150-160 characters
- Include call-to-action
- Use target keywords naturally

### Content Optimization

**Keywords:**
- One primary keyword per page
- 2-3 related secondary keywords
- 1-2% keyword density
- Natural integration in content

**Headings:**
- One H1 per page with primary keyword
- Proper heading hierarchy (H1→H2→H3)
- Descriptive and keyword-rich

## 📱 Responsive Design

### Mobile-First Approach

Design and develop for mobile first, then enhance for larger screens:

1. **Mobile** (320px-767px): Single column, stacked content
2. **Tablet** (768px-1023px): Two-column layouts, larger touch targets
3. **Desktop** (1024px+): Multi-column layouts, hover states

### Touch Targets

- Minimum 44px for interactive elements
- Adequate spacing between clickable items
- Consider thumb reach on mobile devices

## ♿ Accessibility

### Color Contrast

- **Normal Text**: 4.5:1 contrast ratio minimum
- **Large Text**: 3:1 contrast ratio minimum
- **Interactive Elements**: Clear focus indicators

### Keyboard Navigation

- All interactive elements keyboard accessible
- Logical tab order
- Visible focus indicators
- Skip links for main content

### Screen Readers

- Semantic HTML structure
- Descriptive alt text for images
- ARIA labels for complex interactions
- Proper heading hierarchy

## 🚀 Performance

### Optimization

- **Images**: Compressed and properly sized
- **Fonts**: Subset and preload critical fonts
- **CSS**: Minimize and combine stylesheets
- **JavaScript**: Code splitting and lazy loading

### Core Web Vitals

- **LCP**: Largest Contentful Paint < 2.5s
- **FID**: First Input Delay < 100ms
- **CLS**: Cumulative Layout Shift < 0.1

## 📋 Implementation Checklist

### Before Launch

- [ ] All components follow design system
- [ ] Content follows editorial guidelines
- [ ] Images optimized and have alt text
- [ ] SEO meta data complete
- [ ] Accessibility standards met
- [ ] Performance targets achieved
- [ ] Cross-browser testing complete
- [ ] Mobile responsiveness verified

### Ongoing Maintenance

- [ ] Regular content audits
- [ ] Performance monitoring
- [ ] Accessibility testing
- [ ] SEO optimization updates
- [ ] Design system consistency checks

---

*This style guide is a living document that should be updated as the design system evolves. For questions or suggestions, contact the design team.*
