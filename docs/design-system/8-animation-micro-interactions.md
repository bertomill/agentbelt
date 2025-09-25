# 8. Animation & Micro-interactions

## 8.1 Scroll-Triggered Animations

```css
/* Fade in from bottom animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Stagger animations for service cards */
.service-card:nth-child(1) { animation-delay: 0ms; }
.service-card:nth-child(2) { animation-delay: 150ms; }
.service-card:nth-child(3) { animation-delay: 300ms; }

/* Intersection Observer trigger classes */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

## 8.2 Loading States

```css
.loading-skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-100) 25%,
    var(--color-gray-50) 50%,
    var(--color-gray-100) 75%
  );
  background-size: 200% 100%;
  animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.btn-loading {
  position: relative;
  color: transparent;
}

.btn-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid var(--color-text-on-primary);
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```
