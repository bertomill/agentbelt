# 6. Layout System

## 6.1 Container Classes

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

## 6.2 Grid System

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
