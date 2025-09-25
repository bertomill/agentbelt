# Technical Assumptions

## Repository Structure: Monorepo
The project will use a monorepo structure containing the landing page code, with clear separation for potential future service additions. This aligns with the Next.js App Router architecture and allows for shared components and utilities as the agency grows.

## Service Architecture
**Monolith with Serverless Functions** - The landing page will be a static/SSG Next.js application with API routes handling dynamic functionality (form submissions, chat interactions). Leveraging Vercel's serverless functions for backend logic keeps infrastructure simple while maintaining scalability. No microservices needed for MVP scope.

## Testing Requirements
**Unit + Critical Path Integration** - Given the 2-week timeline and solo developer constraint, focus on unit tests for utility functions and critical integration tests for form submission and lead capture flows. E2E testing deferred to post-MVP. Manual testing for cross-browser compatibility and responsive design.

## Additional Technical Assumptions and Requests
- **Frontend Stack:** Next.js 15.5.4 with React 19.1.0, TypeScript for type safety, Tailwind CSS v4 with PostCSS for styling (all already initialized)
- **Development Tools:** Turbopack for fast builds, ESLint with Next.js config for code quality
- **Animation Library:** Framer Motion for scroll-triggered animations and micro-interactions
- **Deployment:** Vercel (seamless Next.js integration, generous free tier)
- **Database:** Supabase for lead storage (generous free tier, real-time capabilities if needed)
- **Form Handling:** React Hook Form for client-side validation, Next.js API routes for backend processing
- **Email Service:** Resend.com for transactional emails (better DX than SendGrid, 100 free emails/day)
- **Calendar Integration:** Cal.com (open-source, self-hostable if needed, better than Calendly for developers)
- **Chat Widget:** Crisp chat widget with custom AI integration via their API
- **Analytics:** Google Analytics 4 with custom events for conversion tracking
- **CDN/Security:** Cloudflare proxy for DDoS protection and global CDN (free tier)
- **Version Control:** Git with GitHub for repository hosting
- **Image Optimization:** Next.js built-in Image component with automatic optimization
- **Font Strategy:** Already configured Geist fonts via next/font for optimal loading
