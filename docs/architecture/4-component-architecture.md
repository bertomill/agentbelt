# 4. Component Architecture

## 4.1 Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── Navigation
│   └── Footer
├── HeroSection
│   ├── HeroContent
│   ├── AnimatedBackground
│   └── CTAButton
├── ServicesSection
│   ├── ServiceCard (x3)
│   └── ServiceDetails
├── InteractiveDemo
│   ├── ChatWidget
│   └── AIResponseHandler
├── CaseStudies
│   ├── CaseStudyCard (x3)
│   └── CaseStudyModal
├── TrustSignals
│   ├── ClientLogos
│   ├── Certifications
│   └── Guarantee
├── ContactSection
│   ├── ContactForm
│   ├── CalendarEmbed
│   └── FormValidation
└── Analytics
    ├── GAProvider
    └── EventTracking
```

## 4.2 Core Components Design

### HeroSection Component
```typescript
interface HeroSectionProps {
  headline: string;
  subtitle: string;
  ctaText: string;
  backgroundAnimation: boolean;
}

// Features:
// - Animated gradient background
// - Scroll-triggered animations
// - Mobile-responsive design
// - Semantic HTML structure
```

### ContactForm Component
```typescript
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  source: string;
}

// Features:
// - Real-time validation
// - Rate limiting protection
// - Loading states
// - Success/error messaging
// - Analytics event tracking
```
