import { config } from 'dotenv'
import { EmailService } from '../lib/email'
import { type Lead } from '../lib/supabase'

// Load environment variables
config({ path: '.env.local' })

async function testEmail() {
  console.log('📧 Testing email service functionality...\n')

  // Test 1: Email service connection
  console.log('1. Testing email service connection...')
  const connectionResult = await EmailService.testConnection()
  if (connectionResult.success) {
    console.log('✅ Email service connection successful\n')
  } else {
    console.error('❌ Email service connection failed:', connectionResult.error)
    return
  }

  // Test 2: Send lead notification email
  console.log('2. Testing lead notification email...')
  const testLead: Lead = {
    id: 'test-id-123',
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test message for email testing.',
    created_at: new Date().toISOString(),
    source: 'test-script'
  }

  const notificationResult = await EmailService.sendLeadNotification(testLead)
  if (notificationResult.success) {
    console.log('✅ Lead notification email sent successfully\n')
  } else {
    console.error('❌ Lead notification email failed:', notificationResult.error)
  }

  // Test 3: Send welcome email
  console.log('3. Testing welcome email...')
  const welcomeResult = await EmailService.sendWelcomeEmail(testLead)
  if (welcomeResult.success) {
    console.log('✅ Welcome email sent successfully\n')
  } else {
    console.error('❌ Welcome email failed:', welcomeResult.error)
  }

  console.log('🎉 Email testing completed!')
}

// Run the test
testEmail().catch(console.error)