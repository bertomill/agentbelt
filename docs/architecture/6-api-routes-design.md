# 6. API Routes Design

## 6.1 Lead Submission API

### Endpoint: `/api/leads`
```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'
import { Resend } from 'resend'
import { rateLimit } from '@/utils/rate-limit'

export async function POST(request: NextRequest) {
  // Rate limiting check
  const rateLimitResult = await rateLimit(request)
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  // Validate and sanitize input
  const body = await request.json()
  const validatedData = validateLeadData(body)

  if (!validatedData.success) {
    return NextResponse.json(
      { error: validatedData.error },
      { status: 400 }
    )
  }

  // Store in database
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      ...validatedData.data,
      user_agent: request.headers.get('user-agent'),
      ip_address: getClientIP(request)
    }])
    .select()

  // Send email notification
  await sendLeadNotification(validatedData.data)

  // Track analytics event
  // (Client-side GA4 event triggered on success)

  return NextResponse.json({ success: true, id: data[0].id })
}
```

## 6.2 Chat AI Response API

### Endpoint: `/api/chat`
```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  const { message, sessionId } = await request.json()

  // Pre-configured responses for common queries
  const response = await generateChatResponse(message)

  // Log interaction for analytics
  await logChatInteraction(sessionId, message, response)

  return NextResponse.json({ response })
}

// Pre-configured AI responses
const chatResponses = {
  'workflow automation': 'I can help automate repetitive tasks...',
  'custom ai tools': 'We build bespoke AI solutions...',
  'data intelligence': 'Transform your data into insights...',
  'pricing': 'Our projects typically start at...',
  'timeline': 'Most implementations take 2-4 weeks...'
}
```
