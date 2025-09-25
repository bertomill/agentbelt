# 11. Performance Considerations

## 11.1 Critical CSS Strategy

```html
<!-- Inline critical CSS in <head> -->
<style>
  /* Hero section styles - above the fold */
  .hero-section { /* styles */ }
  .hero-headline { /* styles */ }
  .btn-primary { /* styles */ }
</style>

<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/main.css"></noscript>
```

## 11.2 Image Optimization

```html
<!-- Next.js Image component with optimization -->
<Image
  src="/images/hero-background.jpg"
  alt=""
  width={1920}
  height={1080}
  priority
  sizes="100vw"
  style={{
    width: '100%',
    height: 'auto',
  }}
/>

<!-- Lazy loading for below-fold images -->
<Image
  src="/images/case-study-1.jpg"
  alt="E-commerce automation case study dashboard"
  width={600}
  height={400}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
/>
```

## 11.3 Bundle Optimization

```typescript
// Dynamic imports for heavy components
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
  loading: () => <div className="w-16 h-16 bg-gray-100 animate-pulse rounded" />
})

const CalendarEmbed = dynamic(() => import('@/components/CalendarEmbed'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse rounded" />
})

// Code splitting by route
const AboutPage = dynamic(() => import('@/pages/about'))
```
