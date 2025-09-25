# Epic Details

## Epic 1: Foundation & Hero Experience

**Goal:** Establish the technical foundation with Next.js infrastructure, implement core services integrations, and deliver a compelling hero section with basic lead capture functionality. This epic creates a launchable landing page that can start generating leads immediately.

### Story 1.1: Repository & Deployment Setup

As a developer,
I want to configure version control and deployment pipeline,
so that the project has proper development workflow and hosting.

**Acceptance Criteria:**
1. GitHub repository created with clear README and project description
2. .env.example file documents all required environment variables
3. Vercel project connected to GitHub with automatic deployments enabled
4. Environment variables configured in Vercel dashboard
5. Domain configured as agentbelt.vercel.app
6. Deployment webhook tested to ensure builds trigger on git push
7. Basic folder structure created following Next.js App Router conventions

### Story 1.2: Database & Email Infrastructure

As a developer,
I want to set up data storage and email services,
so that the application can capture leads and send notifications.

**Acceptance Criteria:**
1. Supabase project created with appropriate plan selection
2. Leads table schema created (id, name, email, company, message, created_at, source)
3. Database connection string added to environment variables
4. Supabase client configured in utils/supabase.js with proper TypeScript types
5. Resend.com account created and domain verified
6. Email API key configured in environment variables
7. Test database insert and email send operations successful

### Story 1.3: Analytics & Security Foundation

As a developer,
I want to implement basic tracking and security measures,
so that we can monitor usage while protecting user data.

**Acceptance Criteria:**
1. Google Analytics 4 property created and tracking ID configured
2. GA4 tracking script added to root layout with proper consent handling
3. Basic security headers configured in next.config.ts (CSP, HSTS, CSRF protection)
4. HTTPS redirect enforced in production environment
5. Error boundary component created for graceful error handling
6. API route error handling middleware implemented
7. Rate limiting utility function created for form endpoints

### Story 1.4: Hero Section Implementation

As a visitor,
I want to immediately understand AgentBelt's value proposition,
so that I know this agency can solve my AI implementation challenges.

**Acceptance Criteria:**
1. Hero section displays "AI That Actually Ships" headline with compelling subtext
2. Background animation or AI visualization implemented without performance impact
3. Primary CTA button "Book Free Consultation" prominently positioned
4. Hero section fully responsive across mobile (320px+), tablet (768px+), desktop (1024px+)
5. Scroll indicator guides users to explore additional content
6. Page achieves <3 second initial load time on 4G connections
7. Semantic HTML structure with proper heading hierarchy for accessibility

### Story 1.5: Basic Contact Form

As a potential client,
I want to submit my information for consultation,
so that I can start discussing my AI needs with the agency.

**Acceptance Criteria:**
1. Contact form with fields: name (required), email (required), company (optional), message (required)
2. Client-side validation using React Hook Form with clear error messages
3. Form styling matches overall site design with proper focus states
4. Form submission disabled during processing with loading indicator
5. Success message displays after successful submission
6. Form resets after successful submission
7. Mobile form experience optimized for touch input

### Story 1.6: Form Backend & Database Integration

As a developer,
I want to process form submissions securely,
so that lead data is properly captured and stored.

**Acceptance Criteria:**
1. API route /api/leads handles POST requests with proper validation
2. Form data sanitized and validated on server side
3. Lead information stored in Supabase database with timestamp
4. Rate limiting implemented (max 5 submissions per IP per hour)
5. Server-side error handling with appropriate HTTP status codes
6. Request/response logging for debugging purposes
7. Database insertion errors handled gracefully with user feedback

### Story 1.7: Email Notifications & Backup

As the agency owner,
I want to receive immediate notifications when leads submit,
so that I can respond quickly to potential clients.

**Acceptance Criteria:**
1. Email notification sent via Resend when new lead submits
2. Email template includes all form data in readable format
3. Email contains lead source tracking (organic, direct, referral)
4. Google Sheets backup integration as failsafe data storage
5. Email delivery failures logged but don't break user experience
6. Notification emails sent from professional address (noreply@domain.com)
7. Email template includes timestamp and basic lead scoring

### Story 1.8: Basic Navigation & Footer

As a visitor,
I want to navigate the site and access important information,
so that I can find policies and additional details.

**Acceptance Criteria:**
1. Sticky header with logo/brand name and primary CTA button
2. Smooth scroll navigation to page sections (prepared for future sections)
3. Footer with links to Privacy Policy and Terms of Service
4. Privacy Policy page created with GDPR-compliant content
5. Terms of Service page created with basic legal protections
6. Footer includes copyright notice and social links (if available)
7. Mobile navigation works seamlessly with hamburger menu if needed

## Epic 2: Services & Interactive AI Demo

**Goal:** Showcase the three core service offerings with clear value propositions and implement the interactive AI chat widget that demonstrates real capabilities. This epic differentiates SpiralNote from competitors by proving AI competence.

### Story 2.1: Services Section Layout

As a potential client,
I want to understand what AI services are offered,
so that I can identify solutions for my business needs.

**Acceptance Criteria:**
1. Services section with clean three-column layout (mobile stacked)
2. Each service card includes custom icon, title, and 2-sentence description
3. Services: "Workflow Automation," "Custom AI Tools," "Data Intelligence"
4. Cards have subtle hover effects and consistent styling
5. Section heading and optional subtitle text
6. Proper spacing and visual hierarchy maintained
7. Section is accessible with proper ARIA labels and keyboard navigation

### Story 2.2: Service Card Content & Details

As a potential client,
I want to see specific benefits of each service,
so that I can understand how they apply to my situation.

**Acceptance Criteria:**
1. Workflow Automation card: Benefits include process optimization, task automation, efficiency gains
2. Custom AI Tools card: Benefits include bespoke solutions, API integrations, scalable implementations
3. Data Intelligence card: Benefits include insights extraction, predictive analytics, data visualization
4. Each card includes 2-3 specific bullet points with concrete examples
5. Optional "Learn More" interaction expands cards with additional details
6. Real-world use cases mentioned for each service type
7. Clear CTA at section bottom directing to consultation booking

### Story 2.3: Chat Widget Basic Integration

As a visitor,
I want to see a chat option available,
so that I can get quick answers about services.

**Acceptance Criteria:**
1. Crisp chat widget installed and positioned appropriately
2. Widget styled to match site design and branding
3. Chat loads asynchronously without impacting page performance
4. Widget positioning optimized for mobile and desktop
5. Basic availability message configured
6. Widget appears after 10-second delay or scroll trigger
7. Chat history persists during user session

### Story 2.4: AI Chat Configuration & Demo Scenarios

As a visitor,
I want to interact with an AI assistant,
so that I can see the agency's AI capabilities demonstrated.

**Acceptance Criteria:**
1. Pre-configured AI responses for common service questions
2. Demo scenarios showcase workflow automation examples
3. Chat responses feel natural and helpful, not robotic
4. Fallback to "schedule consultation" for complex queries
5. Chat includes suggested questions to guide interaction
6. Response time under 3 seconds for configured scenarios
7. Integration tracks chat engagement as analytics event

### Story 2.5: Calendar Integration Setup

As a potential client,
I want to book consultations directly from the website,
so that I can secure meeting time without email back-and-forth.

**Acceptance Criteria:**
1. Cal.com account created and configured with availability
2. Booking widget embedded in contact/CTA section
3. Calendar displays available times in visitor's timezone
4. Meeting type configured as 30-minute consultation call
5. Booking confirmation emails sent to both parties automatically
6. Meeting includes Zoom or Google Meet link automatically generated
7. Booking data captured in database for lead tracking

### Story 2.6: Mobile Experience Optimization

As a mobile visitor,
I want all interactive elements to work smoothly,
so that I can engage with the site regardless of device.

**Acceptance Criteria:**
1. Chat widget positioned appropriately on mobile screens
2. Calendar booking interface optimized for touch interaction
3. Service cards stack properly on mobile with readable text
4. All tap targets meet minimum size requirements (44px)
5. Form inputs work properly with mobile keyboards
6. No horizontal scrolling on any mobile screen size
7. Performance maintained with <3 second load on mobile networks

## Epic 3: Trust & Conversion Optimization

**Goal:** Build credibility through case studies and trust signals while optimizing conversion funnel. This epic transforms the landing page from functional to high-converting by addressing visitor doubts and providing social proof.

### Story 3.1: Case Studies Content Creation

As a potential client,
I want to see proven results from other businesses,
so that I can trust this agency delivers measurable value.

**Acceptance Criteria:**
1. Three case studies written with format: Challenge, Solution, Results
2. Each includes quantified metrics (time saved, efficiency gained, cost reduced)
3. Industries represented: e-commerce, professional services, manufacturing
4. Case studies use realistic but anonymized company scenarios
5. Results include specific percentages and timeframes
6. Each story highlights different service type (automation, tools, intelligence)
7. Content written in client-focused language, not technical jargon

### Story 3.2: Case Studies Section Implementation

As a visitor,
I want to quickly scan success stories,
so that I can assess whether this agency can help businesses like mine.

**Acceptance Criteria:**
1. Case studies section with card-based layout
2. Each card shows company type, key metric, and brief description
3. Hover or click reveals expanded details without navigation
4. Optional carousel functionality for mobile space optimization
5. Industry tags/badges for easy identification
6. Testimonial quotes integrated where appropriate
7. Section concludes with CTA: "Get Similar Results for Your Business"

### Story 3.3: Trust Signals & Social Proof

As a visitor,
I want to see credibility indicators,
so that I feel confident this agency is legitimate and capable.

**Acceptance Criteria:**
1. Trust bar with client industry logos or symbolic representations
2. Founder credentials section with relevant experience/background
3. "Results Guarantee" or "No BS Promise" prominently featured
4. Relevant certifications, partnerships, or technology badges
5. Security/compliance badges (SSL, privacy-compliant)
6. Optional: LinkedIn profile link or GitHub contributions showcase
7. All trust elements load without causing layout shift

### Story 3.4: Conversion Analytics Implementation

As the agency owner,
I want to track visitor behavior and conversions,
so that I can understand and optimize landing page performance.

**Acceptance Criteria:**
1. GA4 custom events configured: form_start, form_submit, chat_open, booking_attempt
2. Conversion funnel tracking: Page View → Engage → Contact → Book
3. Event parameters capture source, section, and user journey stage
4. Form abandonment tracking identifies where users drop off
5. Chat interactions tracked with engagement depth metrics
6. Scroll depth tracking to understand content consumption
7. Weekly automated report configured in Google Analytics

### Story 3.5: Technical SEO & Meta Configuration

As the agency owner,
I want the site optimized for search engines,
so that we can attract organic traffic for AI consulting searches.

**Acceptance Criteria:**
1. Title tags, meta descriptions optimized for AI consulting keywords
2. Open Graph and Twitter Card meta tags for social sharing
3. Structured data markup for organization and services
4. XML sitemap generated and submitted to Google Search Console
5. Robots.txt configured appropriately
6. Canonical URLs set to prevent duplicate content issues
7. Page focuses on keywords: "AI implementation," "business automation," "AI consulting"

### Story 3.6: Performance Optimization & Final Polish

As a visitor,
I want the site to load quickly and work flawlessly,
so that I have a professional experience that reflects agency quality.

**Acceptance Criteria:**
1. All images optimized with proper alt text and lazy loading
2. Lighthouse performance score >90 across all metrics
3. Core Web Vitals pass (LCP <2.5s, FID <100ms, CLS <0.1)
4. 404 page created with helpful navigation back to main content
5. All external links open in new tabs with appropriate rel attributes
6. Cross-browser testing completed (Chrome, Safari, Firefox, Edge)
7. Final content review for typos, consistency, and clarity
