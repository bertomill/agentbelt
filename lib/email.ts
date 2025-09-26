import { Resend } from 'resend'
import { config } from 'dotenv'
import { Lead } from './supabase'

// Load environment variables if not in Next.js runtime
if (typeof window === 'undefined' && !process.env.NEXT_RUNTIME) {
  config({ path: '.env.local' })
}

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
const FROM_EMAIL = 'noreply@agentbelt.vercel.app'
const ADMIN_EMAIL = 'admin@agentbelt.vercel.app' // You can change this to your actual admin email

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// Email service class
export class EmailService {
  /**
   * Send lead notification email to admin
   */
  static async sendLeadNotification(lead: Lead): Promise<{ success: boolean; error?: any }> {
    try {
      const template = this.generateLeadNotificationTemplate(lead)
      
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      if (error) {
        console.error('Error sending lead notification:', error)
        return { success: false, error }
      }

      console.log('Lead notification sent successfully:', data)
      return { success: true }
    } catch (err) {
      console.error('Unexpected error sending lead notification:', err)
      return { success: false, error: err }
    }
  }

  /**
   * Send welcome email to lead
   */
  static async sendWelcomeEmail(lead: Lead): Promise<{ success: boolean; error?: any }> {
    try {
      const template = this.generateWelcomeTemplate(lead)
      
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [lead.email],
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      if (error) {
        console.error('Error sending welcome email:', error)
        return { success: false, error }
      }

      console.log('Welcome email sent successfully:', data)
      return { success: true }
    } catch (err) {
      console.error('Unexpected error sending welcome email:', err)
      return { success: false, error: err }
    }
  }

  /**
   * Test email service connection
   */
  static async testConnection(): Promise<{ success: boolean; error?: any }> {
    try {
      // Send a test email to verify the service is working
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: 'AgentBelt Email Service Test',
        html: '<h1>Email Service Test</h1><p>This is a test email to verify the Resend email service is working correctly.</p>',
        text: 'Email Service Test - This is a test email to verify the Resend email service is working correctly.',
      })

      if (error) {
        console.error('Email service test failed:', error)
        return { success: false, error }
      }

      console.log('Email service test successful:', data)
      return { success: true }
    } catch (err) {
      console.error('Email service test error:', err)
      return { success: false, error: err }
    }
  }

  /**
   * Generate lead notification email template
   */
  private static generateLeadNotificationTemplate(lead: Lead): EmailTemplate {
    const subject = `New Lead: ${lead.name} from ${lead.company || lead.source}`
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Lead Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #495057; }
            .value { margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Lead Received</h1>
              <p>A new lead has been submitted through AgentBelt.</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${lead.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${lead.email}</div>
              </div>
              ${lead.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${lead.company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${lead.message}</div>
              </div>
              <div class="field">
                <div class="label">Source:</div>
                <div class="value">${lead.source}</div>
              </div>
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date(lead.created_at).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const text = `
New Lead Notification

Name: ${lead.name}
Email: ${lead.email}
${lead.company ? `Company: ${lead.company}` : ''}
Message: ${lead.message}
Source: ${lead.source}
Submitted: ${new Date(lead.created_at).toLocaleString()}
    `

    return { subject, html, text }
  }

  /**
   * Generate welcome email template
   */
  private static generateWelcomeTemplate(lead: Lead): EmailTemplate {
    const subject = `Welcome to AgentBelt, ${lead.name}!`
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to AgentBelt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #007bff; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; }
            .cta { background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Welcome to AgentBelt!</h1>
            </div>
            <div class="content">
              <p>Hi ${lead.name},</p>
              <p>Thank you for your interest in AgentBelt! We've received your message and our team will get back to you shortly.</p>
              <p>Here's what you can expect:</p>
              <ul>
                <li>A personalized response within 24 hours</li>
                <li>A detailed consultation about your AI agent needs</li>
                <li>Custom solutions tailored to your business</li>
              </ul>
              <p>In the meantime, feel free to explore our resources and learn more about how AI agents can transform your business.</p>
              <a href="https://agentbelt.vercel.app" class="cta">Visit AgentBelt</a>
              <p>Best regards,<br>The AgentBelt Team</p>
            </div>
          </div>
        </body>
      </html>
    `

    const text = `
Welcome to AgentBelt!

Hi ${lead.name},

Thank you for your interest in AgentBelt! We've received your message and our team will get back to you shortly.

Here's what you can expect:
- A personalized response within 24 hours
- A detailed consultation about your AI agent needs
- Custom solutions tailored to your business

In the meantime, feel free to explore our resources and learn more about how AI agents can transform your business.

Visit us at: https://agentbelt.vercel.app

Best regards,
The AgentBelt Team
    `

    return { subject, html, text }
  }
}