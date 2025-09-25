# 3. Typography System

## 3.1 Font Configuration

```css
/* Using Geist fonts (already configured in layout.tsx) */
@theme {
  --font-family-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: 'Geist Mono', ui-monospace, 'SF Mono', monospace;
}
```

## 3.2 Type Scale

```css
@theme {
  /* Display Sizes - Hero Headlines */
  --font-size-display-2xl: 4.5rem;   /* 72px */
  --font-size-display-xl: 3.75rem;   /* 60px */
  --font-size-display-lg: 3rem;      /* 48px */
  --font-size-display-md: 2.25rem;   /* 36px */
  --font-size-display-sm: 1.875rem;  /* 30px */

  /* Heading Sizes */
  --font-size-h1: 2.25rem;    /* 36px */
  --font-size-h2: 1.875rem;   /* 30px */
  --font-size-h3: 1.5rem;     /* 24px */
  --font-size-h4: 1.25rem;    /* 20px */
  --font-size-h5: 1.125rem;   /* 18px */
  --font-size-h6: 1rem;       /* 16px */

  /* Body Text */
  --font-size-body-xl: 1.25rem;  /* 20px */
  --font-size-body-lg: 1.125rem; /* 18px */
  --font-size-body-md: 1rem;     /* 16px */
  --font-size-body-sm: 0.875rem; /* 14px */
  --font-size-body-xs: 0.75rem;  /* 12px */

  /* Line Heights */
  --line-height-display: 1.1;
  --line-height-heading: 1.2;
  --line-height-body: 1.6;
  --line-height-body-tight: 1.4;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

## 3.3 Typography Classes

```css
/* Hero Display Text */
.text-display-2xl {
  font-size: var(--font-size-display-2xl);
  line-height: var(--line-height-display);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.025em;
}

.text-display-xl {
  font-size: var(--font-size-display-xl);
  line-height: var(--line-height-display);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
}

/* Headings */
.text-h1 {
  font-size: var(--font-size-h1);
  line-height: var(--line-height-heading);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.01em;
}

.text-h2 {
  font-size: var(--font-size-h2);
  line-height: var(--line-height-heading);
  font-weight: var(--font-weight-semibold);
}

/* Body Text */
.text-body-xl {
  font-size: var(--font-size-body-xl);
  line-height: var(--line-height-body);
}

.text-body-lg {
  font-size: var(--font-size-body-lg);
  line-height: var(--line-height-body);
}
```

## 3.4 Responsive Typography

```css
/* Mobile-First Responsive Scaling */
@media (max-width: 640px) {
  .text-display-2xl {
    font-size: 2.5rem; /* 40px on mobile */
  }

  .text-display-xl {
    font-size: 2rem; /* 32px on mobile */
  }

  .text-h1 {
    font-size: 1.75rem; /* 28px on mobile */
  }
}
```
