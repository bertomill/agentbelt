# 14. Development Guidelines

## 14.1 Code Organization

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

## 14.2 Component Standards

- Use TypeScript interfaces for all props
- Implement proper error boundaries
- Follow accessibility best practices
- Include loading and error states
- Write unit tests for complex logic

## 14.3 Performance Standards

- All pages must achieve Lighthouse score >90
- First Contentful Paint <1.8 seconds
- Largest Contentful Paint <2.5 seconds
- Cumulative Layout Shift <0.1
- First Input Delay <100ms
