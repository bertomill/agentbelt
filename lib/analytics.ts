// Google Analytics 4 configuration and utilities
type GtagCommand = 'config' | 'event' | 'js' | 'consent'
type GtagConfigParams = Record<string, string | number | boolean>
type GtagEventParams = Record<string, string | number | boolean>
type DataLayerEvent = [GtagCommand, string | Date, GtagConfigParams?] | unknown[]

declare global {
  interface Window {
    gtag: (
      command: GtagCommand,
      targetId: string | Date,
      config?: GtagConfigParams | GtagEventParams
    ) => void;
    dataLayer: DataLayerEvent[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || []

  // Define gtag function
  window.gtag = function(...args: [GtagCommand, string | Date, GtagConfigParams?]) {
    window.dataLayer.push(args)
  }

  // Configure GA4
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  })
}

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  const eventParams: GtagEventParams = {
    event_category: parameters?.category || 'engagement',
    ...(parameters?.label && { event_label: parameters.label }),
    ...(parameters?.value && { value: parameters.value }),
    ...parameters,
  }

  window.gtag('event', eventName, eventParams)
}

// Conversion events
export const trackConversion = {
  formStart: (formType: string) => {
    trackEvent('form_start', {
      category: 'conversion',
      label: formType,
    })
  },

  formSubmit: (formType: string, success: boolean = true) => {
    trackEvent('form_submit', {
      category: 'conversion',
      label: formType,
      success,
    })
  },

  chatOpen: () => {
    trackEvent('chat_open', {
      category: 'engagement',
      label: 'chat_widget',
    })
  },

  bookingAttempt: (source: string) => {
    trackEvent('booking_attempt', {
      category: 'conversion',
      label: source,
    })
  },

  ctaClick: (ctaText: string, location: string) => {
    trackEvent('cta_click', {
      category: 'engagement',
      label: ctaText,
      location,
    })
  }
}

// Scroll depth tracking
export const initScrollTracking = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  const scrollDepths = [25, 50, 75, 90]
  const scrollTracked: number[] = []

  const trackScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
        scrollTracked.push(depth)
        trackEvent('scroll_depth', {
          category: 'engagement',
          label: `${depth}%`,
          value: depth,
        })
      }
    })
  }

  // Throttled scroll event listener
  let ticking = false
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScrollDepth()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll)
}

// Form abandonment tracking
export const trackFormAbandonment = (formType: string, fieldName: string) => {
  trackEvent('form_abandonment', {
    category: 'conversion',
    label: formType,
    field: fieldName,
  })
}