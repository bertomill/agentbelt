import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables if not in Next.js runtime
if (typeof window === 'undefined' && !process.env.NEXT_RUNTIME) {
  config({ path: '.env.local' })
}

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Supabase environment variables not configured. Some features may not work.')
  }
}

// Client-side Supabase client (for public operations)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Server-side Supabase client (for admin operations)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// TypeScript types for leads table
export interface Lead {
  id: string
  name: string
  email: string
  company?: string
  message: string
  created_at: string
  source: string
}

export interface LeadInsert {
  name: string
  email: string
  company?: string
  message: string
  source?: string
}

// Database utility functions for lead operations
export class LeadService {
  /**
   * Insert a new lead into the database
   */
  static async createLead(leadData: LeadInsert): Promise<{ data: Lead | null; error: Error | null }> {
    try {
      if (!supabase) {
        return { data: null, error: new Error('Supabase client not configured') }
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([{
          ...leadData,
          source: leadData.source || 'website'
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating lead:', error)
        return { data: null, error: new Error(error.message) }
      }

      return { data: data as Lead, error: null }
    } catch (err) {
      console.error('Unexpected error creating lead:', err)
      return { data: null, error: err instanceof Error ? err : new Error('Unknown error') }
    }
  }

  /**
   * Get all leads (admin function)
   */
  static async getAllLeads(): Promise<{ data: Lead[] | null; error: Error | null }> {
    try {
      if (!supabaseAdmin) {
        return { data: null, error: new Error('Supabase admin client not configured') }
      }

      const { data, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching leads:', error)
        return { data: null, error: new Error(error.message) }
      }

      return { data: data as Lead[], error: null }
    } catch (err) {
      console.error('Unexpected error fetching leads:', err)
      return { data: null, error: err instanceof Error ? err : new Error('Unknown error') }
    }
  }

  /**
   * Get a specific lead by ID (admin function)
   */
  static async getLeadById(id: string): Promise<{ data: Lead | null; error: Error | null }> {
    try {
      if (!supabaseAdmin) {
        return { data: null, error: new Error('Supabase admin client not configured') }
      }

      const { data, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching lead:', error)
        return { data: null, error: new Error(error.message) }
      }

      return { data: data as Lead, error: null }
    } catch (err) {
      console.error('Unexpected error fetching lead:', err)
      return { data: null, error: err instanceof Error ? err : new Error('Unknown error') }
    }
  }

  /**
   * Test database connection
   */
  static async testConnection(): Promise<{ success: boolean; error: Error | null }> {
    try {
      if (!supabase) {
        return { success: false, error: new Error('Supabase client not configured') }
      }

      const { error } = await supabase
        .from('leads')
        .select('count')
        .limit(1)

      if (error) {
        console.error('Database connection test failed:', error)
        return { success: false, error: new Error(error.message) }
      }

      console.log('Database connection test successful')
      return { success: true, error: null }
    } catch (err) {
      console.error('Database connection test error:', err)
      return { success: false, error: err instanceof Error ? err : new Error('Unknown error') }
    }
  }
}