import { config } from 'dotenv'
import { LeadService, type LeadInsert } from '../lib/supabase'
import { EmailService } from '../lib/email'

// Load environment variables
config({ path: '.env.local' })

async function testIntegration() {
  console.log('🔄 Testing end-to-end lead capture and notification flow...\n')

  // Test 1: Simulate a lead form submission
  console.log('1. Simulating lead form submission...')
  const leadData: LeadInsert = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Example Corp',
    message: 'I am interested in your AI agent services for my company. Please contact me to discuss our needs.',
    source: 'website-contact-form'
  }

  // Step 1: Insert lead into database
  console.log('   📝 Inserting lead into database...')
  const insertResult = await LeadService.createLead(leadData)
  
  if (insertResult.error) {
    console.error('❌ Lead insertion failed:', insertResult.error)
    return
  }

  console.log('   ✅ Lead inserted successfully')
  console.log('   📄 Lead details:', insertResult.data)

  if (!insertResult.data) {
    console.error('❌ No lead data returned from insertion')
    return
  }

  // Step 2: Send notification email to admin
  console.log('\n2. Sending admin notification email...')
  const notificationResult = await EmailService.sendLeadNotification(insertResult.data)
  
  if (notificationResult.success) {
    console.log('   ✅ Admin notification sent successfully')
  } else {
    console.error('   ❌ Admin notification failed:', notificationResult.error)
  }

  // Step 3: Send welcome email to lead
  console.log('\n3. Sending welcome email to lead...')
  const welcomeResult = await EmailService.sendWelcomeEmail(insertResult.data)
  
  if (welcomeResult.success) {
    console.log('   ✅ Welcome email sent successfully')
  } else {
    console.error('   ❌ Welcome email failed:', welcomeResult.error)
  }

  // Test 2: Verify the lead was stored correctly
  console.log('\n4. Verifying lead storage...')
  const fetchResult = await LeadService.getLeadById(insertResult.data.id)
  
  if (fetchResult.error) {
    console.error('❌ Lead verification failed:', fetchResult.error)
  } else {
    console.log('✅ Lead verification successful')
    console.log('   📊 Stored lead data:', fetchResult.data)
  }

  // Test 3: Check if both emails and database operations succeeded
  console.log('\n5. Integration test summary:')
  const dbSuccess = !insertResult.error && !fetchResult.error
  const emailSuccess = notificationResult.success && welcomeResult.success
  
  console.log(`   📈 Database operations: ${dbSuccess ? '✅ SUCCESS' : '❌ FAILED'}`)
  console.log(`   📧 Email operations: ${emailSuccess ? '✅ SUCCESS' : '❌ FAILED'}`)
  
  if (dbSuccess && emailSuccess) {
    console.log('\n🎉 End-to-end integration test PASSED!')
    console.log('   The complete lead capture and notification flow is working correctly.')
  } else {
    console.log('\n❌ End-to-end integration test FAILED!')
    console.log('   Some components of the lead capture flow are not working properly.')
  }
}

// Run the integration test
testIntegration().catch(console.error)