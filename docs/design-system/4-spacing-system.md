# 4. Spacing System

## 4.1 Spacing Scale

```css
@theme {
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0\.5: 0.125rem;  /* 2px */
  --spacing-1: 0.25rem;      /* 4px */
  --spacing-1\.5: 0.375rem;  /* 6px */
  --spacing-2: 0.5rem;       /* 8px */
  --spacing-2\.5: 0.625rem;  /* 10px */
  --spacing-3: 0.75rem;      /* 12px */
  --spacing-3\.5: 0.875rem;  /* 14px */
  --spacing-4: 1rem;         /* 16px */
  --spacing-5: 1.25rem;      /* 20px */
  --spacing-6: 1.5rem;       /* 24px */
  --spacing-7: 1.75rem;      /* 28px */
  --spacing-8: 2rem;         /* 32px */
  --spacing-10: 2.5rem;      /* 40px */
  --spacing-12: 3rem;        /* 48px */
  --spacing-16: 4rem;        /* 64px */
  --spacing-20: 5rem;        /* 80px */
  --spacing-24: 6rem;        /* 96px */
  --spacing-32: 8rem;        /* 128px */
  --spacing-40: 10rem;       /* 160px */
  --spacing-48: 12rem;       /* 192px */
  --spacing-56: 14rem;       /* 224px */
  --spacing-64: 16rem;       /* 256px */
}
```

## 4.2 Section Spacing

```css
/* Section Padding Classes */
.section-padding-y {
  padding-top: var(--spacing-16);
  padding-bottom: var(--spacing-16);
}

@media (max-width: 768px) {
  .section-padding-y {
    padding-top: var(--spacing-12);
    padding-bottom: var(--spacing-12);
  }
}

.section-padding-x {
  padding-left: var(--spacing-6);
  padding-right: var(--spacing-6);
}

@media (min-width: 1024px) {
  .section-padding-x {
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);
  }
}
```
