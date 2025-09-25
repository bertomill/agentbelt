# 7. Integration Architecture

## 7.1 Email Service (Resend)

```typescript
// utils/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(lead: LeadData) {
  await resend.emails.send({
    from: 'noreply@agentbelt.vercel.app',
    to: 'owner@agentbelt.com',
    subject: `New Lead: ${lead.name} from ${lead.company || 'N/A'}`,
    html: generateLeadEmailTemplate(lead)
  })
}

// Email template with proper formatting
function generateLeadEmailTemplate(lead: LeadData): string {
  return `
    <h2>New Lead Submission</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Company:</strong> ${lead.company || 'Not provided'}</p>
    <p><strong>Message:</strong></p>
    <p>${lead.message}</p>
    <p><strong>Source:</strong> ${lead.source}</p>
    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
  `
}
```

## 7.2 Calendar Integration (Cal.com)

```typescript
// components/CalendarEmbed.tsx
export function CalendarEmbed() {
  useEffect(() => {
    // Load Cal.com widget
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          typeof namespace === "string" && (cal.ns[namespace] = api) && p(api, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", {
      origin: "https://cal.com"
    });

    Cal("ui", {
      theme: "light",
      styles: {
        branding: {
          brandColor: "#3B82F6"
        }
      },
      hideEventTypeDetails: false,
      layout: "month_view"
    });
  }, [])

  return (
    <div
      data-cal-link="your-username/consultation"
      data-cal-config='{"layout":"month_view"}'
      className="w-full h-96"
    />
  )
}
```

## 7.3 Chat Widget Integration (Crisp)

```typescript
// components/ChatWidget.tsx
declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
  }
}

export function ChatWidget() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_ID!;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);

    // Configure chat widget
    window.$crisp.push(["set", "user:company", ["AgentBelt Visitor"]]);
    window.$crisp.push(["set", "session:segments", [["website-visitor"]]]);

    // Pre-configure AI responses
    window.$crisp.push(["on", "message:received", function(message: any) {
      // Track chat engagement
      gtag('event', 'chat_interaction', {
        event_category: 'engagement',
        event_label: 'message_sent'
      });
    }]);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // Widget renders itself
}
```

## 7.4 Analytics Implementation (GA4)

```typescript
// utils/analytics.ts
export function trackEvent(eventName: string, parameters: object) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// Pre-defined events for conversion tracking
export const events = {
  formStart: () => trackEvent('form_start', { event_category: 'engagement' }),
  formSubmit: (formType: string) => trackEvent('form_submit', {
    event_category: 'conversion',
    form_type: formType
  }),
  chatOpen: () => trackEvent('chat_open', { event_category: 'engagement' }),
  calendarView: () => trackEvent('calendar_view', { event_category: 'engagement' }),
  bookingAttempt: () => trackEvent('booking_attempt', { event_category: 'conversion' })
}
```
