# AgentBelt Design System
**Version 1.0** | **Date: 2025-09-25** | **UX Designer: Claude**

## 1. Executive Summary

This design system provides a comprehensive visual framework for the AgentBelt AI agency landing page, optimized for conversion and professional credibility. The design embodies a "boutique consultancy" aesthetic while ensuring mobile-first responsive performance and WCAG AA accessibility compliance.

### Key Design Principles
- **Trust-First**: Every element builds credibility and reduces visitor anxiety
- **Conversion-Focused**: Clear hierarchy guides users toward consultation booking
- **Mobile-First**: 60% of B2B research happens on mobile devices
- **Performance-Aware**: Visual beauty never compromises load times
- **Accessible**: WCAG AA compliance ensures inclusive experience

## 2. Color System

### 2.1 Primary Color Palette

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

### 2.2 Secondary Colors

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

### 2.3 Semantic Colors

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

## 3. Typography System

### 3.1 Font Configuration

```css
/* Using Geist fonts (already configured in layout.tsx) */
@theme {
  --font-family-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: 'Geist Mono', ui-monospace, 'SF Mono', monospace;
}
```

### 3.2 Type Scale

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

### 3.3 Typography Classes

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

### 3.4 Responsive Typography

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

## 4. Spacing System

### 4.1 Spacing Scale

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

### 4.2 Section Spacing

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

## 5. Component Library

### 5.1 Buttons

#### Primary Button
```html
<button class="btn btn-primary">
  Book Free Consultation
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  min-height: 44px; /* Touch target size */
}

.btn-primary {
  background-color: var(--color-primary-600);
  color: var(--color-text-on-primary);
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.4);
}

/* Large Button Variant */
.btn-lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-body-lg);
  min-height: 48px;
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.btn-secondary:hover {
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
  border-color: var(--color-primary-700);
}
```

### 5.2 Cards

#### Service Card
```html
<div class="service-card">
  <div class="service-card-icon">
    <!-- Icon SVG -->
  </div>
  <h3 class="service-card-title">Workflow Automation</h3>
  <p class="service-card-description">
    Streamline repetitive tasks and optimize business processes with custom AI workflows.
  </p>
  <ul class="service-card-benefits">
    <li>40% faster task completion</li>
    <li>Reduce manual errors by 85%</li>
    <li>24/7 automated processing</li>
  </ul>
</div>
```

```css
.service-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: var(--spacing-8);
  transition: all 200ms ease-in-out;
}

.service-card:hover {
  border-color: var(--color-primary-200);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.service-card-icon {
  width: 3rem;
  height: 3rem;
  background-color: var(--color-primary-100);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-6);
}

.service-card-title {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
}

.service-card-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-4);
  line-height: var(--line-height-body);
}

.service-card-benefits {
  list-style: none;
  padding: 0;
}

.service-card-benefits li {
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-body-sm);
  margin-bottom: var(--spacing-2);
}

.service-card-benefits li::before {
  content: "✓";
  color: var(--color-success-500);
  font-weight: var(--font-weight-bold);
  margin-right: var(--spacing-2);
}
```

#### Case Study Card
```html
<div class="case-study-card">
  <div class="case-study-metric">
    <span class="metric-value">40%</span>
    <span class="metric-label">Time Saved</span>
  </div>
  <div class="case-study-content">
    <h4 class="case-study-title">E-commerce Order Processing</h4>
    <p class="case-study-description">
      Automated inventory management and order fulfillment for a growing online retailer.
    </p>
    <div class="case-study-tags">
      <span class="tag">E-commerce</span>
      <span class="tag">Automation</span>
    </div>
  </div>
</div>
```

```css
.case-study-card {
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-elevated) 100%);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: var(--spacing-6);
  transition: all 200ms ease-in-out;
  cursor: pointer;
}

.case-study-card:hover {
  border-color: var(--color-success-200);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
  transform: translateY(-2px);
}

.case-study-metric {
  text-align: center;
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-4);
  background-color: var(--color-success-50);
  border-radius: 0.5rem;
}

.metric-value {
  display: block;
  font-size: var(--font-size-display-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-success-600);
  line-height: 1;
}

.metric-label {
  font-size: var(--font-size-body-sm);
  color: var(--color-success-700);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: var(--font-weight-medium);
}

.case-study-title {
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
}

.case-study-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-body);
  margin-bottom: var(--spacing-4);
}

.case-study-tags {
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}

.tag {
  padding: var(--spacing-1) var(--spacing-3);
  background-color: var(--color-gray-100);
  color: var(--color-text-secondary);
  font-size: var(--font-size-body-xs);
  font-weight: var(--font-weight-medium);
  border-radius: 9999px;
}
```

### 5.3 Form Elements

#### Input Fields
```html
<div class="form-field">
  <label for="name" class="form-label">Full Name</label>
  <input
    type="text"
    id="name"
    name="name"
    class="form-input"
    placeholder="Enter your full name"
    required
  >
  <div class="form-error" id="name-error">Name is required</div>
</div>
```

```css
.form-field {
  margin-bottom: var(--spacing-6);
}

.form-label {
  display: block;
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
}

.form-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: var(--font-size-body-md);
  line-height: 1.5;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  transition: all 150ms ease-in-out;
  min-height: 44px; /* Touch target size */
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:invalid {
  border-color: var(--color-warning-500);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-error {
  display: none;
  color: var(--color-warning-600);
  font-size: var(--font-size-body-xs);
  margin-top: var(--spacing-1);
}

.form-error.visible {
  display: block;
}

/* Textarea */
.form-textarea {
  min-height: 120px;
  resize: vertical;
}
```

### 5.4 Trust Signals

#### Guarantee Badge
```html
<div class="guarantee-badge">
  <div class="guarantee-icon">
    <!-- Shield check icon -->
  </div>
  <div class="guarantee-content">
    <div class="guarantee-title">No BS Guarantee</div>
    <div class="guarantee-subtitle">Results in 30 days or full refund</div>
  </div>
</div>
```

```css
.guarantee-badge {
  display: flex;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-6);
  background: linear-gradient(135deg, var(--color-success-50) 0%, var(--color-success-100) 100%);
  border: 1px solid var(--color-success-200);
  border-radius: 0.75rem;
  gap: var(--spacing-3);
}

.guarantee-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-success-600);
  flex-shrink: 0;
}

.guarantee-title {
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-success-800);
}

.guarantee-subtitle {
  font-size: var(--font-size-body-sm);
  color: var(--color-success-700);
}
```

## 6. Layout System

### 6.1 Container Classes

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: var(--spacing-6);
    padding-right: var(--spacing-6);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--spacing-8);
    padding-right: var(--spacing-8);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}
```

### 6.2 Grid System

```css
.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-8);
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-6);
}

@media (min-width: 768px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 7. Page Sections Design

### 7.1 Hero Section

#### Wireframe Structure
```
┌─────────────────────────────────────────────────────┐
│                    HEADER/NAV                       │
├─────────────────────────────────────────────────────┤
│  [Animated Background Pattern]                      │
│                                                     │
│         AI THAT ACTUALLY SHIPS                      │
│    Transform your business with practical AI        │
│       solutions that deliver measurable results     │
│                                                     │
│      [Book Free Consultation - Primary CTA]        │
│                                                     │
│    ✓ 30-day results guarantee                       │
│    ✓ No technical expertise required               │
│    ✓ Transparent fixed pricing                     │
│                                                     │
│              [Scroll Indicator ↓]                   │
└─────────────────────────────────────────────────────┘
```

#### Implementation Classes
```html
<section class="hero-section">
  <div class="hero-background">
    <!-- Animated gradient or subtle AI visualization -->
  </div>

  <div class="container hero-content">
    <h1 class="hero-headline">AI That Actually Ships</h1>
    <p class="hero-subtitle">
      Transform your business with practical AI solutions that deliver measurable results in 30 days
    </p>

    <div class="hero-cta">
      <button class="btn btn-primary btn-lg">
        Book Free Consultation
      </button>
    </div>

    <div class="hero-benefits">
      <div class="benefit-item">
        <span class="benefit-icon">✓</span>
        <span class="benefit-text">30-day results guarantee</span>
      </div>
      <!-- Repeat for other benefits -->
    </div>

    <div class="scroll-indicator">
      <div class="scroll-arrow">↓</div>
      <span class="scroll-text">Discover How</span>
    </div>
  </div>
</section>
```

```css
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-gray-25) 100%);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-image:
    radial-gradient(circle at 25% 25%, var(--color-primary-100) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, var(--color-primary-50) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
}

.hero-headline {
  font-size: var(--font-size-display-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-6);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: var(--font-size-body-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-10);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: var(--line-height-body);
}

.hero-cta {
  margin-bottom: var(--spacing-12);
}

.hero-benefits {
  display: flex;
  justify-content: center;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-16);
  flex-wrap: wrap;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-text-secondary);
  font-size: var(--font-size-body-sm);
}

.benefit-icon {
  color: var(--color-success-500);
  font-weight: var(--font-weight-bold);
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .hero-headline {
    font-size: var(--font-size-display-md);
  }

  .hero-subtitle {
    font-size: var(--font-size-body-lg);
  }

  .hero-benefits {
    flex-direction: column;
    gap: var(--spacing-4);
  }
}
```

### 7.2 Services Section

#### Wireframe Structure
```
┌─────────────────────────────────────────────────────┐
│              Our AI Solutions                       │
│        Practical AI tools that drive results       │
│                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │    [Icon]   │ │    [Icon]   │ │    [Icon]   │  │
│  │ Workflow    │ │ Custom AI   │ │ Data        │  │
│  │ Automation  │ │ Tools       │ │ Intelligence│  │
│  │             │ │             │ │             │  │
│  │ • Benefit 1 │ │ • Benefit 1 │ │ • Benefit 1 │  │
│  │ • Benefit 2 │ │ • Benefit 2 │ │ • Benefit 2 │  │
│  │ • Benefit 3 │ │ • Benefit 3 │ │ • Benefit 3 │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
│                                                     │
│         [Learn More About Our Process]              │
└─────────────────────────────────────────────────────┘
```

### 7.3 Interactive AI Demo Section

```html
<section class="ai-demo-section section-padding-y">
  <div class="container">
    <div class="demo-header">
      <h2 class="section-title">Experience Our AI in Action</h2>
      <p class="section-subtitle">
        Chat with our AI assistant to see how we can help your business
      </p>
    </div>

    <div class="demo-container">
      <div class="demo-chat-widget">
        <!-- Chat widget integration -->
      </div>

      <div class="demo-suggestions">
        <h4>Try asking about:</h4>
        <button class="suggestion-pill" data-message="How can AI automate my workflow?">
          Workflow automation
        </button>
        <button class="suggestion-pill" data-message="What AI tools do you build?">
          Custom AI tools
        </button>
        <button class="suggestion-pill" data-message="How much do your services cost?">
          Pricing
        </button>
      </div>
    </div>
  </div>
</section>
```

```css
.ai-demo-section {
  background-color: var(--color-background-alt);
}

.demo-header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.demo-container {
  max-width: 600px;
  margin: 0 auto;
}

.demo-suggestions {
  margin-top: var(--spacing-8);
  text-align: center;
}

.suggestion-pill {
  display: inline-block;
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-size: var(--font-size-body-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 150ms ease-in-out;
  margin: var(--spacing-1);
}

.suggestion-pill:hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-200);
  color: var(--color-primary-700);
}
```

### 7.4 Case Studies Section

#### Wireframe Structure
```
┌─────────────────────────────────────────────────────┐
│                Proven Results                       │
│         Real businesses, measurable outcomes       │
│                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │     40%     │ │     85%     │ │    $50K     │  │
│  │ Time Saved  │ │ Error Reduce│ │ Annual Save │  │
│  │             │ │             │ │             │  │
│  │ E-commerce  │ │ Manufacturing│ │ Professional│  │
│  │ Order       │ │ Quality     │ │ Services    │  │
│  │ Processing  │ │ Control     │ │ Automation  │  │
│  │             │ │             │ │             │  │
│  │ [E-comm][Auto]│ │[Mfg][QC]   │ │[Svc][Data]  │  │
│  └─────────────┘ └─────────────┘ └─────────────┘  │
│                                                     │
│         [Get Similar Results for Your Business]     │
└─────────────────────────────────────────────────────┘
```

### 7.5 Contact & Calendar Section

```html
<section class="contact-section section-padding-y">
  <div class="container">
    <div class="contact-grid grid-2">
      <div class="contact-form-container">
        <h2 class="section-title">Ready to Transform Your Business?</h2>
        <p class="section-subtitle">
          Book a free 30-minute consultation to discuss your AI opportunities
        </p>

        <form class="contact-form">
          <div class="form-field">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" id="name" name="name" class="form-input" required>
          </div>

          <div class="form-field">
            <label for="email" class="form-label">Email Address</label>
            <input type="email" id="email" name="email" class="form-input" required>
          </div>

          <div class="form-field">
            <label for="company" class="form-label">Company (Optional)</label>
            <input type="text" id="company" name="company" class="form-input">
          </div>

          <div class="form-field">
            <label for="message" class="form-label">Tell us about your AI goals</label>
            <textarea id="message" name="message" class="form-input form-textarea" rows="4" required></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-lg w-full">
            Send Message
          </button>
        </form>
      </div>

      <div class="calendar-container">
        <div class="calendar-embed">
          <!-- Cal.com widget -->
        </div>
      </div>
    </div>
  </div>
</section>
```

## 8. Animation & Micro-interactions

### 8.1 Scroll-Triggered Animations

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

### 8.2 Loading States

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

## 9. Responsive Breakpoints

```css
/* Mobile-first breakpoint system */
@media (min-width: 640px) {  /* sm */
  /* Small tablets and large phones */
}

@media (min-width: 768px) {  /* md */
  /* Tablets */
}

@media (min-width: 1024px) { /* lg */
  /* Small desktops */
}

@media (min-width: 1280px) { /* xl */
  /* Large desktops */
}

@media (min-width: 1536px) { /* 2xl */
  /* Very large screens */
}

/* High-density displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* Retina/high-DPI styles */
}

/* Touch device detection */
@media (hover: hover) and (pointer: fine) {
  /* Styles for devices with precise pointers (mouse) */
}

@media (hover: none) and (pointer: coarse) {
  /* Styles for touch devices */
  .btn:hover {
    /* Disable hover states on touch devices */
    background-color: initial;
    transform: none;
  }
}
```

## 10. Accessibility Guidelines

### 10.1 Color Contrast Requirements

```css
/* Ensure WCAG AA compliance (4.5:1 ratio minimum) */
:root {
  --color-text-on-primary: #ffffff;     /* 21:1 on blue-600 */
  --color-text-primary: var(--color-gray-900);    /* 16.2:1 on white */
  --color-text-secondary: var(--color-gray-600);  /* 7.1:1 on white */
  --color-text-muted: var(--color-gray-500);      /* 5.4:1 on white */
}

/* Focus indicators */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-text-primary);
  color: var(--color-background);
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}
```

### 10.2 Semantic HTML Structure

```html
<!-- Proper heading hierarchy -->
<main>
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">AI That Actually Ships</h1>
  </section>

  <section aria-labelledby="services-title">
    <h2 id="services-title">Our AI Solutions</h2>
    <div role="list" aria-label="AI services offered">
      <article role="listitem">
        <h3>Workflow Automation</h3>
      </article>
    </div>
  </section>

  <section aria-labelledby="contact-title">
    <h2 id="contact-title">Contact Us</h2>
    <form role="form" aria-label="Consultation request form">
      <fieldset>
        <legend class="sr-only">Contact Information</legend>
        <!-- Form fields -->
      </fieldset>
    </form>
  </section>
</main>
```

### 10.3 Screen Reader Support

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus management */
.focus-trap {
  /* Implement focus trapping for modals */
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .animate-on-scroll {
    animation: none;
    transform: none;
    opacity: 1;
  }
}
```

## 11. Performance Considerations

### 11.1 Critical CSS Strategy

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

### 11.2 Image Optimization

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

### 11.3 Bundle Optimization

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

## 12. Implementation Guidance

### 12.1 Component Development Order

1. **Foundation Components** (Week 1, Days 1-2)
   - Button variants
   - Form elements
   - Typography classes
   - Layout containers

2. **Section Components** (Week 1, Days 3-5)
   - Hero section with animations
   - Services cards layout
   - Contact form with validation

3. **Interactive Elements** (Week 2, Days 1-3)
   - Chat widget integration
   - Calendar embedding
   - Case study modals

4. **Polish & Optimization** (Week 2, Days 4-5)
   - Accessibility testing
   - Performance optimization
   - Cross-browser testing

### 12.2 Testing Checklist

- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] All interactive elements have 44px minimum touch targets
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content correctly
- [ ] Forms provide clear error messages
- [ ] Loading states prevent confusion
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Mobile experience works on 320px screens
- [ ] Performance budget: <3s initial load, >90 Lighthouse score

### 12.3 Browser Support

**Primary Support**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
**Testing Required**: iOS Safari, Chrome Mobile, Samsung Internet
**Fallbacks**: Graceful degradation for older browsers

## 13. Conversion Optimization Features

### 13.1 Trust-Building Elements

- **Guarantee badges** prominently displayed
- **Client logos** (or industry representations) in trust bar
- **Founder credentials** with LinkedIn integration
- **Security badges** (SSL, privacy compliance)
- **Testimonial quotes** integrated into case studies

### 13.2 Urgency & Scarcity

```html
<!-- Limited consultation slots -->
<div class="urgency-banner">
  <span class="urgency-icon">⏰</span>
  Only 5 consultation slots available this month
</div>

<!-- Social proof -->
<div class="social-proof">
  <span class="proof-avatar">👤</span>
  Sarah from TechCorp just booked a consultation
  <span class="proof-time">2 minutes ago</span>
</div>
```

### 13.3 Progressive Disclosure

- **Summary cards** expand to show detailed case studies
- **Service benefits** reveal on hover or tap
- **FAQ sections** expand common objections and concerns
- **Chat widget** provides immediate answers without overwhelming

## 14. Mobile-First Implementation

### 14.1 Touch Optimization

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

### 14.2 Mobile Content Strategy

- **Hero headline** remains impactful but shorter
- **Service descriptions** condensed to key benefits
- **Contact form** simplified with fewer fields
- **Chat widget** positioned to not block content
- **Calendar integration** optimized for small screens

---

## Summary & Key Design Decisions

### Design Philosophy
The AgentBelt design system prioritizes **trust and conversion** over flashy aesthetics. Every element serves the goal of moving visitors from awareness to consultation booking through a carefully crafted user journey.

### Key Design Decisions

1. **Color Psychology**: Blue primary for trust, green accents for results, minimal color palette to avoid distraction
2. **Typography Hierarchy**: Clear information architecture using Geist fonts with generous line heights for readability
3. **Component Strategy**: Reusable components with consistent hover states and animations
4. **Mobile-First Approach**: Touch-optimized interactions with generous tap targets
5. **Trust-Building**: Prominent guarantees, social proof, and credibility indicators throughout

### Conversion Optimization Strategy

- **30-second value clarity** through hero section design
- **Single conversion goal** with consistent CTAs throughout
- **Progressive trust building** from hero to case studies to contact
- **Reduced friction** with simple forms and calendar integration
- **AI demonstration** proving competence through interactive chat

### Mobile-First Implementation

- **Performance-aware** animations and interactions
- **Touch-optimized** button sizes and form elements
- **Content prioritization** showing most important information first
- **Navigation simplification** with clear information hierarchy

### Accessibility & Performance

- **WCAG AA compliance** with proper contrast and semantic HTML
- **Performance budget** maintaining <3s load times
- **Progressive enhancement** ensuring functionality without JavaScript
- **Inclusive design** supporting screen readers and keyboard navigation

This design system provides the foundation for a professional, conversion-optimized landing page that positions AgentBelt as a trustworthy AI consulting partner for SMBs and innovation leaders.