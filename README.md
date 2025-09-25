# AgentBelt - AI That Actually Ships

A high-converting landing page for AgentBelt, an AI agency focused on practical business implementations. This Next.js application showcases AI capabilities through interactive demonstrations, quantified case studies, and a frictionless lead capture system.

## 🎯 Project Overview

AgentBelt addresses the critical gap between AI's transformative potential and practical business implementation. We offer pragmatic AI solutions focused on rapid prototyping, measurable outcomes, and transparent pricing.

**Live Site:** [agentbelt.vercel.app](https://agentbelt.vercel.app)

### Key Features
- 🤖 **Interactive AI Chat Demo** - Showcase real AI capabilities
- 📊 **Quantified Case Studies** - Proven results with metrics
- 📱 **Mobile-First Design** - 60% of B2B research happens on mobile
- ⚡ **Performance Optimized** - Lighthouse score >90, Core Web Vitals compliant
- 🔒 **Security Hardened** - CSP headers, rate limiting, HTTPS everywhere
- 📈 **Conversion Optimized** - Targeting 5% visitor-to-contact conversion rate

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/spiralnote.git
cd spiralnote
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your actual API keys and configuration
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** to see the result.

## 🏗️ Tech Stack

- **Frontend:** Next.js 15.5.4, React 19.1.0, TypeScript
- **Styling:** Tailwind CSS v4 with PostCSS
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend.com for transactional emails
- **Chat:** Crisp chat widget with AI integration
- **Calendar:** Cal.com for booking consultations
- **Analytics:** Google Analytics 4
- **Deployment:** Vercel with automatic deployments
- **Performance:** Turbopack for fast builds and development

## 📂 Project Structure

```
spiralnote/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Landing page
│   ├── api/               # API routes
│   └── globals.css        # Global styles with Tailwind
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── docs/                  # Comprehensive project documentation
│   ├── prd/              # Product Requirements (sharded)
│   ├── architecture/     # Technical Architecture (sharded)
│   └── design-system/    # Design System & Guidelines (sharded)
└── public/               # Static assets
```

## 🧪 Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📋 Epic Implementation Roadmap

### Epic 1: Foundation & Hero Experience (Week 1)
- ✅ Repository & Deployment Setup
- 🔄 Database & Email Infrastructure
- ⏳ Analytics & Security Foundation
- ⏳ Hero Section Implementation
- ⏳ Basic Contact Form
- ⏳ Form Backend & Database Integration
- ⏳ Email Notifications & Backup
- ⏳ Basic Navigation & Footer

### Epic 2: Services & Interactive AI Demo (Week 1-2)
- ⏳ Services Section Layout
- ⏳ Service Card Content & Details
- ⏳ Chat Widget Basic Integration
- ⏳ AI Chat Configuration & Demo Scenarios
- ⏳ Calendar Integration Setup
- ⏳ Mobile Experience Optimization

### Epic 3: Trust & Conversion Optimization (Week 2)
- ⏳ Case Studies Content Creation
- ⏳ Case Studies Section Implementation
- ⏳ Trust Signals & Social Proof
- ⏳ Conversion Analytics Implementation
- ⏳ Technical SEO & Meta Configuration
- ⏳ Performance Optimization & Final Polish

## 🔧 Environment Setup

Required environment variables (see `.env.example`):

- **Supabase:** Database connection and API keys
- **Resend:** Email service API key
- **Google Analytics:** GA4 measurement ID
- **Crisp Chat:** Website ID for chat widget
- **Cal.com:** Username for calendar integration
- **Security:** Rate limiting secrets

## 🎨 Design System

The project follows a comprehensive design system optimized for:
- **Trust & Credibility:** Professional blue palette, clean typography
- **Conversion:** Strategic CTAs, trust signals, social proof
- **Mobile Experience:** Touch-friendly interactions, optimized layouts
- **Accessibility:** WCAG AA compliance, semantic HTML
- **Performance:** Optimized animations, lazy loading

See `docs/design-system/` for complete specifications.

## 🏭 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Domain will be automatically configured as `agentbelt.vercel.app`
4. Automatic deployments on every push to main branch

### Performance Targets
- Lighthouse Score: >90
- Core Web Vitals: All green
- First Contentful Paint: <1.5s
- Time to Interactive: <3s on 4G

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[PRD](docs/prd/index.md)** - Product Requirements & User Stories
- **[Architecture](docs/architecture/index.md)** - Technical Implementation Guide
- **[Design System](docs/design-system/index.md)** - Visual Design & Components

## 🤝 Contributing

This is currently a private project. For questions or suggestions, please contact the development team.

## 📄 License

Private - All Rights Reserved

---

**AgentBelt** - AI That Actually Ships 🚀