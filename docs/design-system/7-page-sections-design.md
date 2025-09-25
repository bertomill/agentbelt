# 7. Page Sections Design

## 7.1 Hero Section

### Wireframe Structure
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

### Implementation Classes
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

## 7.2 Services Section

### Wireframe Structure
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

## 7.3 Interactive AI Demo Section

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

## 7.4 Case Studies Section

### Wireframe Structure
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

## 7.5 Contact & Calendar Section

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
