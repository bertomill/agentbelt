import { NextRequest, NextResponse } from 'next/server'
import { LeadService } from '@/lib/supabase'
import { EmailService } from '@/lib/email'
import { withApiHandler, validateRequiredFields, validateEmail, sanitizeString, ValidationError } from '@/lib/api-middleware'

async function handlePOST(request: NextRequest) {
  const body = await request.json()
  const { name, email, company, message, source = 'website' } = body

  // Validate required fields using middleware
  validateRequiredFields(body, ['name', 'email', 'message'])

  // Validate email format
  if (!validateEmail(email)) {
    throw new ValidationError('Invalid email format')
  }

  // Sanitize inputs
  const sanitizedData = {
    name: sanitizeString(name),
    email: sanitizeString(email).toLowerCase(),
    company: company ? sanitizeString(company) : undefined,
    message: sanitizeString(message),
    source: sanitizeString(source)
  }

  // Create lead in database
  const result = await LeadService.createLead(sanitizedData)

  if (result.error || !result.data) {
    console.error('Database error creating lead:', result.error)
    throw new Error('Failed to save lead information')
  }

  // Send email notifications (don't fail the request if email fails)
  const emailPromises = [
    EmailService.sendLeadNotification(result.data),
    EmailService.sendWelcomeEmail(result.data)
  ]

  const emailResults = await Promise.allSettled(emailPromises)
  
  // Log email results but don't fail the request
  emailResults.forEach((emailResult, index) => {
    const emailType = index === 0 ? 'notification' : 'welcome'
    if (emailResult.status === 'rejected') {
      console.error(`Failed to send ${emailType} email:`, emailResult.reason)
    } else if (!emailResult.value.success) {
      console.error(`${emailType} email failed:`, emailResult.value.error?.message)
    } else {
      console.log(`${emailType} email sent successfully`)
    }
  })

  return NextResponse.json({
    success: true,
    message: 'Thank you for your submission! We\'ll be in touch soon.',
    leadId: result.data.id
  })
}

async function handleGET() {
  return NextResponse.json(
    { 
      message: 'AgentBelt Leads API', 
      version: '1.0.0',
      endpoints: {
        POST: 'Submit a new lead'
      }
    },
    { status: 200 }
  )
}

// Export handlers with middleware
export const POST = withApiHandler(handlePOST, {
  methods: ['POST'],
  rateLimit: 'form'
})

export const GET = withApiHandler(handleGET, {
  methods: ['GET'],
  rateLimit: 'api'
})