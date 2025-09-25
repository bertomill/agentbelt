# AgentBelt Technical Architecture Document

## 1. Executive Summary

This document defines the complete technical architecture for the AgentBelt AI agency landing page. The solution leverages Next.js 15 with React 19, deployed on Vercel, integrated with Supabase for data persistence, and optimized for performance and conversion. The architecture supports all 20 stories across 3 epics with a focus on rapid deployment and maintainability.

### Key Architecture Decisions
- **Static Site Generation (SSG)** with API routes for dynamic functionality
- **Serverless-first** approach using Vercel Functions
- **Database-as-a-Service** with Supabase for minimal operational overhead
- **Edge-optimized** deployment with Vercel's global CDN
- **Component-based** architecture with TypeScript for type safety

## 2. Technology Stack

### Frontend Stack
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library with concurrent features
- **TypeScript 5.x** - Type safety and developer experience
- **Tailwind CSS v4** - Utility-first styling with custom theme
- **Framer Motion** - Animations and scroll triggers
- **React Hook Form** - Form handling and validation

### Backend & Infrastructure
- **Vercel** - Hosting and serverless functions
- **Supabase** - PostgreSQL database and authentication
- **Resend.com** - Transactional email service
- **Cal.com** - Calendar booking integration
- **Crisp** - Chat widget with AI capabilities
- **Google Analytics 4** - Analytics and conversion tracking

### Development Tools
- **Turbopack** - Fast development and builds
- **ESLint 9** - Code quality with Next.js rules
- **PostCSS** - CSS processing for Tailwind
- **GitHub Actions** - CI/CD pipeline (if needed)

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client        │    │   Vercel Edge   │    │  External APIs  │
│                 │    │                 │    │                 │
│ Next.js App     │────│ Static Assets   │    │ Supabase DB     │
│ React Components│    │ API Routes      │────│ Resend Email    │
│ Tailwind CSS    │    │ Serverless Fns  │    │ Cal.com API     │
│ Framer Motion   │    │                 │    │ Crisp Chat      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 3.2 Application Architecture

**App Router Structure:**
```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Landing page (SSG)
├── privacy/page.tsx       # Privacy policy (SSG)
├── terms/page.tsx         # Terms of service (SSG)
├── globals.css            # Global styles and theme
└── api/
    ├── leads/route.ts     # Lead submission endpoint
    ├── chat/route.ts      # Chat AI responses
    └── webhooks/
        └── cal/route.ts   # Calendar booking webhook
```

## 4. Component Architecture

### 4.1 Component Hierarchy

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

### 4.2 Core Components Design

#### HeroSection Component
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

#### ContactForm Component
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

## 5. Database Schema

### 5.1 Supabase Tables

#### Leads Table
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
```

#### Chat Interactions Table (Optional)
```sql
CREATE TABLE chat_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  response_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5.2 Database Configuration

**Environment Variables:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Connection Setup:**
```typescript
// utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Type definitions
export interface Lead {
  id: string
  name: string
  email: string
  company?: string
  message: string
  source: string
  created_at: string
}
```

## 6. API Routes Design

### 6.1 Lead Submission API

#### Endpoint: `/api/leads`
```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'
import { Resend } from 'resend'
import { rateLimit } from '@/utils/rate-limit'

export async function POST(request: NextRequest) {
  // Rate limiting check
  const rateLimitResult = await rateLimit(request)
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  // Validate and sanitize input
  const body = await request.json()
  const validatedData = validateLeadData(body)

  if (!validatedData.success) {
    return NextResponse.json(
      { error: validatedData.error },
      { status: 400 }
    )
  }

  // Store in database
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      ...validatedData.data,
      user_agent: request.headers.get('user-agent'),
      ip_address: getClientIP(request)
    }])
    .select()

  // Send email notification
  await sendLeadNotification(validatedData.data)

  // Track analytics event
  // (Client-side GA4 event triggered on success)

  return NextResponse.json({ success: true, id: data[0].id })
}
```

### 6.2 Chat AI Response API

#### Endpoint: `/api/chat`
```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  const { message, sessionId } = await request.json()

  // Pre-configured responses for common queries
  const response = await generateChatResponse(message)

  // Log interaction for analytics
  await logChatInteraction(sessionId, message, response)

  return NextResponse.json({ response })
}

// Pre-configured AI responses
const chatResponses = {
  'workflow automation': 'I can help automate repetitive tasks...',
  'custom ai tools': 'We build bespoke AI solutions...',
  'data intelligence': 'Transform your data into insights...',
  'pricing': 'Our projects typically start at...',
  'timeline': 'Most implementations take 2-4 weeks...'
}
```

## 7. Integration Architecture

### 7.1 Email Service (Resend)

```typescript
// utils/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(lead: LeadData) {
  await resend.emails.send({
    from: 'noreply@agentbelt.vercel.app',
    to: 'owner@agentbelt.com',
    subject: `New Lead: ${lead.name} from ${lead.company || 'N/A'}`,
    html: generateLeadEmailTemplate(lead)
  })
}

// Email template with proper formatting
function generateLeadEmailTemplate(lead: LeadData): string {
  return `
    <h2>New Lead Submission</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Company:</strong> ${lead.company || 'Not provided'}</p>
    <p><strong>Message:</strong></p>
    <p>${lead.message}</p>
    <p><strong>Source:</strong> ${lead.source}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `
}
```

### 7.2 Calendar Integration (Cal.com)

```typescript
// components/CalendarEmbed.tsx
export function CalendarEmbed() {
  useEffect(() => {
    // Load Cal.com widget
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          typeof namespace === "string" && (cal.ns[namespace] = api) && p(api, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", {
      origin: "https://cal.com"
    });

    Cal("ui", {
      theme: "light",
      styles: {
        branding: {
          brandColor: "#3B82F6"
        }
      },
      hideEventTypeDetails: false,
      layout: "month_view"
    });
  }, [])

  return (
    <div
      data-cal-link="your-username/consultation"
      data-cal-config='{"layout":"month_view"}'
      className="w-full h-96"
    />
  )
}
```

### 7.3 Chat Widget Integration (Crisp)

```typescript
// components/ChatWidget.tsx
declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
  }
}

export function ChatWidget() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_ID!;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);

    // Configure chat widget
    window.$crisp.push(["set", "user:company", ["AgentBelt Visitor"]]);
    window.$crisp.push(["set", "session:segments", [["website-visitor"]]]);

    // Pre-configure AI responses
    window.$crisp.push(["on", "message:received", function(message: any) {
      // Track chat engagement
      gtag('event', 'chat_interaction', {
        event_category: 'engagement',
        event_label: 'message_sent'
      });
    }]);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // Widget renders itself
}
```

### 7.4 Analytics Implementation (GA4)

```typescript
// utils/analytics.ts
export function trackEvent(eventName: string, parameters: object) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// Pre-defined events for conversion tracking
export const events = {
  formStart: () => trackEvent('form_start', { event_category: 'engagement' }),
  formSubmit: (formType: string) => trackEvent('form_submit', {
    event_category: 'conversion',
    form_type: formType
  }),
  chatOpen: () => trackEvent('chat_open', { event_category: 'engagement' }),
  calendarView: () => trackEvent('calendar_view', { event_category: 'engagement' }),
  bookingAttempt: () => trackEvent('booking_attempt', { event_category: 'conversion' })
}
```

## 8. Performance Optimization

### 8.1 Core Web Vitals Strategy

#### Largest Contentful Paint (LCP < 2.5s)
- Hero section images optimized with Next.js Image component
- Critical CSS inlined in `<head>`
- Font preloading with `next/font`
- Resource hints for external services

#### First Input Delay (FID < 100ms)
- Minimal JavaScript on initial load
- Chat widget loaded asynchronously after user interaction
- Form validation optimized for performance

#### Cumulative Layout Shift (CLS < 0.1)
- Fixed dimensions for all images
- Skeleton loaders for dynamic content
- Reserved space for external widgets

### 8.2 Next.js Optimization

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://client.crisp.chat; connect-src 'self' https://*.supabase.co https://api.resend.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';"
        }
      ],
    },
  ],
}
```

### 8.3 Bundle Optimization

```typescript
// Dynamic imports for heavy components
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
  loading: () => <div className="chat-widget-placeholder" />
})

const CalendarEmbed = dynamic(() => import('@/components/CalendarEmbed'), {
  ssr: false,
  loading: () => <div className="calendar-skeleton" />
})
```

## 9. Security Architecture

### 9.1 Security Headers

```typescript
// Security configuration in next.config.ts
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://client.crisp.chat",
      "connect-src 'self' https://*.supabase.co https://api.resend.com https://cal.com",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "frame-src https://cal.com"
    ].join('; ')
  }
]
```

### 9.2 Input Validation

```typescript
// utils/validation.ts
import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  message: z.string().min(10).max(1000),
  source: z.string().default('website')
})

export function validateLeadData(data: unknown) {
  try {
    const validated = leadSchema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    return { success: false, error: 'Invalid input data' }
  }
}
```

### 9.3 Rate Limiting

```typescript
// utils/rate-limit.ts
import { NextRequest } from 'next/server'

const rateLimit = new Map()

export async function rateLimitCheck(request: NextRequest) {
  const ip = getClientIP(request)
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 5

  const requests = rateLimit.get(ip) || []
  const validRequests = requests.filter((time: number) => now - time < windowMs)

  if (validRequests.length >= maxRequests) {
    return { success: false, remaining: 0 }
  }

  validRequests.push(now)
  rateLimit.set(ip, validRequests)

  return { success: true, remaining: maxRequests - validRequests.length }
}
```

## 10. Testing Strategy

### 10.1 Unit Testing

```typescript
// __tests__/components/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/ContactForm'

describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<ContactForm />)

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    })

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      })
    })
  })
})
```

### 10.2 Integration Testing

```typescript
// __tests__/api/leads.test.ts
import { POST } from '@/app/api/leads/route'
import { NextRequest } from 'next/server'

describe('/api/leads', () => {
  it('creates lead successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.id).toBeDefined()
  })

  it('rejects invalid email', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message'
      })
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })
})
```

## 11. Deployment Configuration

### 11.1 Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

### 11.2 Environment Variables

```env
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email
RESEND_API_KEY=re_your-api-key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Chat Widget
NEXT_PUBLIC_CRISP_WEBSITE_ID=your-crisp-id

# Calendar
NEXT_PUBLIC_CAL_USERNAME=your-cal-username

# Security
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://agentbelt.vercel.app
```

### 11.3 Build Optimization

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "type-check": "tsc --noEmit"
  }
}
```

## 12. Epic Implementation Roadmap

### Epic 1: Foundation & Hero Experience (Week 1, Days 1-3)

#### Day 1: Project Setup
- **Story 1.1**: Repository & Deployment Setup (2 hours)
- **Story 1.2**: Database & Email Infrastructure (3 hours)
- **Story 1.3**: Analytics & Security Foundation (2 hours)

#### Day 2-3: Core Landing Page
- **Story 1.4**: Hero Section Implementation (4 hours)
- **Story 1.5**: Basic Contact Form (3 hours)
- **Story 1.6**: Form Backend & Database Integration (3 hours)
- **Story 1.7**: Email Notifications & Backup (2 hours)
- **Story 1.8**: Basic Navigation & Footer (2 hours)

**Deliverable**: Functional landing page with lead capture

### Epic 2: Services & Interactive AI Demo (Week 1, Days 4-5)

#### Day 4: Services Content
- **Story 2.1**: Services Section Layout (3 hours)
- **Story 2.2**: Service Card Content & Details (3 hours)
- **Story 2.3**: Chat Widget Basic Integration (2 hours)

#### Day 5: Interactive Features
- **Story 2.4**: AI Chat Configuration & Demo Scenarios (4 hours)
- **Story 2.5**: Calendar Integration Setup (3 hours)
- **Story 2.6**: Mobile Experience Optimization (2 hours)

**Deliverable**: Complete interactive experience with AI demo

### Epic 3: Trust & Conversion Optimization (Week 2, Days 1-4)

#### Day 1-2: Content & Trust
- **Story 3.1**: Case Studies Content Creation (4 hours)
- **Story 3.2**: Case Studies Section Implementation (3 hours)
- **Story 3.3**: Trust Signals & Social Proof (3 hours)

#### Day 3-4: Analytics & Polish
- **Story 3.4**: Conversion Analytics Implementation (3 hours)
- **Story 3.5**: Technical SEO & Meta Configuration (3 hours)
- **Story 3.6**: Performance Optimization & Final Polish (4 hours)

**Deliverable**: Production-ready landing page optimized for conversions

### Epic 4: Launch Preparation (Week 2, Day 5)

- Cross-browser testing
- Performance audit
- Content review
- Analytics verification
- Production deployment

## 13. Technical Risks and Mitigation

### High Priority Risks

#### Risk 1: Third-Party Service Downtime
- **Mitigation**: Implement graceful degradation for Crisp chat and Cal.com
- **Fallback**: Contact form remains functional if external services fail

#### Risk 2: Performance Impact from External Scripts
- **Mitigation**: Lazy load all third-party widgets
- **Monitoring**: Lighthouse CI in deployment pipeline

#### Risk 3: Email Deliverability Issues
- **Mitigation**: Implement backup notification via database triggers
- **Alternative**: Google Sheets webhook as secondary notification

### Medium Priority Risks

#### Risk 4: Mobile Experience on Older Devices
- **Mitigation**: Progressive enhancement approach
- **Testing**: Device lab testing on iOS Safari and Android Chrome

#### Risk 5: Database Connection Limits
- **Mitigation**: Connection pooling via Supabase
- **Monitoring**: Database performance metrics

## 14. Development Guidelines

### 14.1 Code Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route groups
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── layout/           # Layout components
├── lib/                  # Utilities and configurations
│   ├── supabase.ts       # Database client
│   ├── email.ts          # Email service
│   ├── validation.ts     # Input validation
│   └── analytics.ts      # Analytics utilities
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
└── __tests__/           # Test files
```

### 14.2 Component Standards

- Use TypeScript interfaces for all props
- Implement proper error boundaries
- Follow accessibility best practices
- Include loading and error states
- Write unit tests for complex logic

### 14.3 Performance Standards

- All pages must achieve Lighthouse score >90
- First Contentful Paint <1.8 seconds
- Largest Contentful Paint <2.5 seconds
- Cumulative Layout Shift <0.1
- First Input Delay <100ms

## 15. Monitoring and Analytics

### 15.1 Key Metrics Dashboard

#### Conversion Funnel
1. **Page Views** → Landing page visits
2. **Engagement** → Scroll depth >50%
3. **Interest** → Chat opens or form starts
4. **Conversion** → Form submissions
5. **Qualified Leads** → Calendar bookings

#### Technical Metrics
- Core Web Vitals scores
- Error rates and types
- API response times
- Database performance
- Third-party service uptime

### 15.2 Google Analytics 4 Setup

```typescript
// Custom events configuration
const customEvents = {
  page_view: 'Landing page viewed',
  scroll_50: 'Scrolled 50% of page',
  form_start: 'Contact form started',
  form_submit: 'Contact form submitted',
  chat_open: 'Chat widget opened',
  chat_message: 'Chat message sent',
  calendar_view: 'Calendar widget viewed',
  booking_attempt: 'Booking attempted',
  external_link: 'External link clicked'
}
```

## 16. Post-Launch Optimization Plan

### Phase 1: Performance Monitoring (Days 1-7)
- Monitor Core Web Vitals
- Track conversion rates
- Identify performance bottlenecks

### Phase 2: Conversion Optimization (Days 8-14)
- A/B test headlines and CTAs
- Optimize form placement
- Refine chat responses

### Phase 3: Content Enhancement (Days 15-30)
- Add real case studies
- Expand service descriptions
- Create additional trust signals

## 17. Conclusion

This architecture provides a solid foundation for the AgentBelt landing page that meets all requirements while maintaining flexibility for future enhancements. The solution balances performance, security, and functionality within the specified constraints and timeline.

The serverless architecture with Vercel deployment ensures scalability while minimizing operational overhead. Integration with Supabase, Resend, and other services provides robust functionality without significant complexity.

Key success factors:
- Focus on Core Web Vitals and performance
- Comprehensive error handling and graceful degradation
- Clear separation of concerns in code organization
- Thorough testing strategy for critical paths
- Monitoring and analytics for continuous improvement

The architecture supports the goal of generating 10 qualified leads per month while establishing AgentBelt's credibility in the AI consulting space.