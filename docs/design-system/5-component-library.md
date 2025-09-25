# 5. Component Library

## 5.1 Buttons

### Primary Button
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

### Secondary Button
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

## 5.2 Cards

### Service Card
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

### Case Study Card
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

## 5.3 Form Elements

### Input Fields
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

## 5.4 Trust Signals

### Guarantee Badge
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
