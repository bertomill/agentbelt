# 2. Color System

## 2.1 Primary Color Palette

```css
/* Tailwind CSS v4 Color Tokens */
@theme {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;  /* Primary Brand */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
}
```

**Primary Blue (#3b82f6)**: Trust, reliability, technology competence
- Use for: Primary CTAs, links, brand elements
- Accessibility: AAA compliant on white backgrounds

## 2.2 Secondary Colors

```css
@theme {
  /* Success Green - Results & Metrics */
  --color-success-50: #f0fdf4;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;

  /* Warning Orange - Urgency & Attention */
  --color-warning-50: #fffbeb;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;

  /* Neutral Grays - Text & Backgrounds */
  --color-gray-25: #fcfcfd;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
}
```

## 2.3 Semantic Colors

```css
@theme {
  /* Light Mode */
  --color-background: #ffffff;
  --color-background-alt: var(--color-gray-50);
  --color-surface: #ffffff;
  --color-surface-elevated: var(--color-gray-25);

  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-text-on-primary: #ffffff;

  --color-border: var(--color-gray-200);
  --color-border-hover: var(--color-gray-300);
  --color-border-focus: var(--color-primary-500);

  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    --color-background: var(--color-gray-950);
    --color-background-alt: var(--color-gray-900);
    --color-surface: var(--color-gray-900);
    --color-surface-elevated: var(--color-gray-800);

    --color-text-primary: var(--color-gray-50);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);

    --color-border: var(--color-gray-800);
    --color-border-hover: var(--color-gray-700);
  }
}
```
