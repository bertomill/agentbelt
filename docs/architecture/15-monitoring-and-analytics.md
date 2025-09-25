# 15. Monitoring and Analytics

## 15.1 Key Metrics Dashboard

### Conversion Funnel
1. **Page Views** → Landing page visits
2. **Engagement** → Scroll depth >50%
3. **Interest** → Chat opens or form starts
4. **Conversion** → Form submissions
5. **Qualified Leads** → Calendar bookings

### Technical Metrics
- Core Web Vitals scores
- Error rates and types
- API response times
- Database performance
- Third-party service uptime

## 15.2 Google Analytics 4 Setup

```typescript
// Custom events configuration
const customEvents = {
  page_view: 'Landing page viewed',
  scroll_50: 'Scrolled 50% of page',
  form_start: 'Contact form started',
  form_submit: 'Contact form submitted',
  chat_open: 'Chat widget opened',
  chat_message: 'Chat message sent',
  calendar_view: 'Calendar widget viewed',
  booking_attempt: 'Booking attempted',
  external_link: 'External link clicked'
}
```
