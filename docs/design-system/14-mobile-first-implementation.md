# 14. Mobile-First Implementation

## 14.1 Touch Optimization

```css
/* Larger touch targets on mobile */
@media (max-width: 768px) {
  .btn {
    min-height: 48px;
    padding: var(--spacing-4) var(--spacing-6);
  }

  .form-input {
    min-height: 48px;
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .service-card {
    padding: var(--spacing-6);
    margin-bottom: var(--spacing-4);
  }
}
```

## 14.2 Mobile Content Strategy

- **Hero headline** remains impactful but shorter
- **Service descriptions** condensed to key benefits
- **Contact form** simplified with fewer fields
- **Chat widget** positioned to not block content
- **Calendar integration** optimized for small screens

---
