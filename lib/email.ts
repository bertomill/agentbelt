import { Resend } from 'resend'
import { Lead } from './supabase'

// Initialize Resend client with null safety
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

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
  static async sendLeadNotification(lead: Lead): Promise<{ success: boolean; error?: Error }> {
    try {
      if (!resend) {
        return { success: false, error: new Error('Email service not configured') }
      }

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
        return { success: false, error: new Error(error.message || 'Email send failed') }
      }

      console.log('Lead notification sent successfully:', data)
      return { success: true }
    } catch (err) {
      console.error('Unexpected error sending lead notification:', err)
      return { success: false, error: err instanceof Error ? err : new Error('Unknown error') }
    }
  }

  /**
   * Send welcome email to lead
   */
  static async sendWelcomeEmail(lead: Lead): Promise<{ success: boolean; error?: Error }> {
    try {
      if (!resend) {
        return { success: false, error: new Error('Email service not configured') }
      }

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
        return { success: false, error: new Error(error.message || 'Email send failed') }
      }

      console.log('Welcome email sent successfully:', data)
      return { success: true }
    } catch (err) {
      console.error('Unexpected error sending welcome email:', err)
      return { success: false, error: err instanceof Error ? err : new Error('Unknown error') }
    }
  }

  /**
   * Test email service connection
   */
  static async testConnection(): Promise<{ success: boolean; error?: Error }> {
    try {
      if (!resend) {
        return { success: false, error: new Error('Email service not configured') }
      }

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
        return { success: false, error: new Error(error.message || 'Email test failed') }
      }

      console.log('Email service test successful:', data)
      return { success: true }
    } catch (err) {
      console.error('Email service test error:', err)
      return { success: false, error: err instanceof Error ? err : new Error('Unknown error') }
    }
  }

  /**
   * Generate lead notification email template
   */
  private static generateLeadNotificationTemplate(lead: Lead): EmailTemplate {
    const subject = `New Lead: ${lead.name} from ${lead.company || 'Website'}`
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          🚀 New Lead Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #495057;">Contact Information</h3>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
          <p><strong>Company:</strong> ${lead.company || 'Not provided'}</p>
          <p><strong>Source:</strong> ${lead.source}</p>
          <p><strong>Submitted:</strong> ${new Date(lead.created_at).toLocaleString()}</p>
        </div>
        
        <div style="background: #fff; border: 1px solid #dee2e6; padding: 20px; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #495057;">Message</h3>
          <p style="line-height: 1.6;">${lead.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px;">
            AgentBelt Lead Management System<br>
            Visit us at: <a href="https://agentbelt.vercel.app">https://agentbelt.vercel.app</a>
          </p>
        </div>
      </div>
    `
    
    const text = `
New Lead Submission

Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company || 'Not provided'}
Source: ${lead.source}
Submitted: ${new Date(lead.created_at).toLocaleString()}

Message:
${lead.message}

---
AgentBelt Lead Management System
Visit us at: https://agentbelt.vercel.app
    `

    return { subject, html, text }
  }

  /**
   * Generate welcome email template
   */
  private static generateWelcomeTemplate(lead: Lead): EmailTemplate {
    const subject = 'Thank you for reaching out to AgentBelt!'
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff; text-align: center;">
          Welcome to AgentBelt! 🚀
        </h2>
        
        <p>Hi ${lead.name},</p>
        
        <p>Thank you for reaching out to AgentBelt! We&apos;ve received your message and are excited to help you explore AI solutions for your business.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #495057;">What Happens Next?</h3>
          <ul style="line-height: 1.6;">
            <li>Our team will review your inquiry within 24 hours</li>
            <li>We&apos;ll schedule a free 30-minute consultation call</li>
            <li>We&apos;ll discuss your specific AI needs and potential solutions</li>
            <li>If it&apos;s a good fit, we&apos;ll create a custom proposal for your project</li>
          </ul>
        </div>
        
        <p>In the meantime, feel free to explore our services and case studies on our website.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://agentbelt.vercel.app" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Visit Our Website
          </a>
        </div>
        
        <p>Best regards,<br>
        The AgentBelt Team</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px;">
            AgentBelt - AI That Actually Ships<br>
            Visit us at: <a href="https://agentbelt.vercel.app">https://agentbelt.vercel.app</a>
          </p>
        </div>
      </div>
    `
    
    const text = `
Welcome to AgentBelt! 🚀

Hi ${lead.name},

Thank you for reaching out to AgentBelt! We've received your message and are excited to help you explore AI solutions for your business.

What Happens Next?
- Our team will review your inquiry within 24 hours
- We'll schedule a free 30-minute consultation call  
- We'll discuss your specific AI needs and potential solutions
- If it's a good fit, we'll create a custom proposal for your project

In the meantime, feel free to explore our services and case studies on our website.

Visit us at: https://agentbelt.vercel.app

Best regards,
The AgentBelt Team
    `

    return { subject, html, text }
  }
}