import { NextRequest, NextResponse } from 'next/server'
import { LeadService } from '@/lib/supabase'
import { EmailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message, source = 'website' } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create lead in database
    const result = await LeadService.createLead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      message: message.trim(),
      source
    })

    if (result.error || !result.data) {
      console.error('Database error creating lead:', result.error)
      return NextResponse.json(
        { error: 'Failed to save lead information' },
        { status: 500 }
      )
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

  } catch (error) {
    console.error('Unexpected error in leads API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
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