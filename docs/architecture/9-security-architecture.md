# 9. Security Architecture

## 9.1 Security Headers

```typescript
// Security configuration in next.config.ts
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://client.crisp.chat",
      "connect-src 'self' https://*.supabase.co https://api.resend.com https://cal.com",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "frame-src https://cal.com"
    ].join('; ')
  }
]
```

## 9.2 Input Validation

```typescript
// utils/validation.ts
import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  message: z.string().min(10).max(1000),
  source: z.string().default('website')
})

export function validateLeadData(data: unknown) {
  try {
    const validated = leadSchema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    return { success: false, error: 'Invalid input data' }
  }
}
```

## 9.3 Rate Limiting

```typescript
// utils/rate-limit.ts
import { NextRequest } from 'next/server'

const rateLimit = new Map()

export async function rateLimitCheck(request: NextRequest) {
  const ip = getClientIP(request)
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 5

  const requests = rateLimit.get(ip) || []
  const validRequests = requests.filter((time: number) => now - time < windowMs)

  if (validRequests.length >= maxRequests) {
    return { success: false, remaining: 0 }
  }

  validRequests.push(now)
  rateLimit.set(ip, validRequests)

  return { success: true, remaining: maxRequests - validRequests.length }
}
```
