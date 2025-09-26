import { config } from 'dotenv'
import { LeadService, type LeadInsert } from '../lib/supabase'
import { EmailService } from '../lib/email'

// Load environment variables
config({ path: '.env.local' })

async function testInfrastructure() {
  console.log('🧪 Testing Database & Email Infrastructure...\n')

  // Test 1: Database connection
  console.log('1. Testing Supabase database connection...')
  const connectionResult = await LeadService.testConnection()
  if (connectionResult.success) {
    console.log('✅ Database connection successful\n')
  } else {
    console.error('❌ Database connection failed:', connectionResult.error?.message)
    return
  }

  // Test 2: Email service connection
  console.log('2. Testing email service connection...')
  const emailConnectionResult = await EmailService.testConnection()
  if (emailConnectionResult.success) {
    console.log('✅ Email service connection successful\n')
  } else {
    console.error('❌ Email service connection failed:', emailConnectionResult.error?.message)
    console.log('⚠️  Note: This may fail if RESEND_API_KEY is not configured\n')
  }

  // Test 3: Database insert operation
  console.log('3. Testing lead creation in database...')
  const testLead: LeadInsert = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company Inc.',
    message: 'This is a test message to verify the database insert functionality.',
    source: 'infrastructure-test'
  }

  const createResult = await LeadService.createLead(testLead)
  if (createResult.data && !createResult.error) {
    console.log('✅ Lead created successfully with ID:', createResult.data.id)
    
    // Test 4: Email notification (if email service is working)
    if (emailConnectionResult.success) {
      console.log('\n4. Testing email notification...')
      const emailResult = await EmailService.sendLeadNotification(createResult.data)
      if (emailResult.success) {
        console.log('✅ Email notification sent successfully')
      } else {
        console.error('❌ Email notification failed:', emailResult.error?.message)
      }
    }
    
    console.log('\n✅ Infrastructure test completed successfully!')
    console.log('\n📋 Summary:')
    console.log('   - Database: ✅ Connected and functional')
    console.log('   - Email:', emailConnectionResult.success ? '✅ Connected and functional' : '❌ Not configured or failed')
    console.log('   - Test lead created with ID:', createResult.data.id)
    
  } else {
    console.error('❌ Lead creation failed:', createResult.error?.message)
    return
  }
}

// Run the test
testInfrastructure().catch(error => {
  console.error('💥 Infrastructure test failed:', error)
  process.exit(1)
})