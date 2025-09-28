'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GA_MEASUREMENT_ID, initGA, initScrollTracking } from '@/lib/analytics'

export default function GoogleAnalytics() {
  useEffect(() => {
    // Initialize GA after the script loads
    initGA()
    initScrollTracking()
  }, [])

  // Don't render anything if GA_MEASUREMENT_ID is not configured
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}