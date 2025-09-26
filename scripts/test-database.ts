import { config } from 'dotenv'
import { LeadService, type LeadInsert } from '../lib/supabase'

// Load environment variables
config({ path: '.env.local' })

async function testDatabase() {
  console.log('🔍 Testing database connection and operations...\n')

  // Test 1: Database connection
  console.log('1. Testing database connection...')
  const connectionResult = await LeadService.testConnection()
  if (connectionResult.success) {
    console.log('✅ Database connection successful\n')
  } else {
    console.error('❌ Database connection failed:', connectionResult.error)
    return
  }

  // Test 2: Insert a test lead
  console.log('2. Testing lead insertion...')
  const testLead: LeadInsert = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test message for database testing.',
    source: 'test-script'
  }

  const insertResult = await LeadService.createLead(testLead)
  if (insertResult.error) {
    console.error('❌ Lead insertion failed:', insertResult.error)
    return
  } else {
    console.log('✅ Lead inserted successfully:', insertResult.data)
    console.log('   Lead ID:', insertResult.data?.id)
    console.log('   Created at:', insertResult.data?.created_at)
  }

  // Test 3: Fetch the inserted lead
  if (insertResult.data?.id) {
    console.log('\n3. Testing lead retrieval...')
    const fetchResult = await LeadService.getLeadById(insertResult.data.id)
    if (fetchResult.error) {
      console.error('❌ Lead retrieval failed:', fetchResult.error)
    } else {
      console.log('✅ Lead retrieved successfully:', fetchResult.data)
    }
  }

  // Test 4: Fetch all leads
  console.log('\n4. Testing all leads retrieval...')
  const allLeadsResult = await LeadService.getAllLeads()
  if (allLeadsResult.error) {
    console.error('❌ All leads retrieval failed:', allLeadsResult.error)
  } else {
    console.log('✅ All leads retrieved successfully')
    console.log(`   Total leads count: ${allLeadsResult.data?.length || 0}`)
    if (allLeadsResult.data && allLeadsResult.data.length > 0) {
      console.log('   Latest lead:', allLeadsResult.data[0])
    }
  }

  console.log('\n🎉 Database testing completed!')
}

// Run the test
testDatabase().catch(console.error)