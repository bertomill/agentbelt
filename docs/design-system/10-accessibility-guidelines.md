# 10. Accessibility Guidelines

## 10.1 Color Contrast Requirements

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

## 10.2 Semantic HTML Structure

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

## 10.3 Screen Reader Support

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
