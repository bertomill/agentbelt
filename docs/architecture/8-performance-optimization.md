# 8. Performance Optimization

## 8.1 Core Web Vitals Strategy

### Largest Contentful Paint (LCP < 2.5s)
- Hero section images optimized with Next.js Image component
- Critical CSS inlined in `<head>`
- Font preloading with `next/font`
- Resource hints for external services

### First Input Delay (FID < 100ms)
- Minimal JavaScript on initial load
- Chat widget loaded asynchronously after user interaction
- Form validation optimized for performance

### Cumulative Layout Shift (CLS < 0.1)
- Fixed dimensions for all images
- Skeleton loaders for dynamic content
- Reserved space for external widgets

## 8.2 Next.js Optimization

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

## 8.3 Bundle Optimization

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
