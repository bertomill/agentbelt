# 3. System Architecture

## 3.1 High-Level Architecture

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

## 3.2 Application Architecture

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
