# 9. Responsive Breakpoints

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
