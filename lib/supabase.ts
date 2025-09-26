import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables if not in Next.js runtime
if (typeof window === 'undefined' && !process.env.NEXT_RUNTIME) {
  config({ path: '.env.local' })
}

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (for public operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

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
  static async createLead(leadData: LeadInsert): Promise<{ data: Lead | null; error: any }> {
    try {
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
        return { data: null, error }
      }

      return { data: data as Lead, error: null }
    } catch (err) {
      console.error('Unexpected error creating lead:', err)
      return { data: null, error: err }
    }
  }

  /**
   * Get all leads (admin function)
   */
  static async getAllLeads(): Promise<{ data: Lead[] | null; error: any }> {
    try {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching leads:', error)
        return { data: null, error }
      }

      return { data: data as Lead[], error: null }
    } catch (err) {
      console.error('Unexpected error fetching leads:', err)
      return { data: null, error: err }
    }
  }

  /**
   * Get a specific lead by ID (admin function)
   */
  static async getLeadById(id: string): Promise<{ data: Lead | null; error: any }> {
    try {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching lead:', error)
        return { data: null, error }
      }

      return { data: data as Lead, error: null }
    } catch (err) {
      console.error('Unexpected error fetching lead:', err)
      return { data: null, error: err }
    }
  }

  /**
   * Test database connection
   */
  static async testConnection(): Promise<{ success: boolean; error?: any }> {
    try {
      const { error } = await supabase.from('leads').select('count', { count: 'exact', head: true })
      
      if (error) {
        console.error('Database connection test failed:', error)
        return { success: false, error }
      }

      return { success: true }
    } catch (err) {
      console.error('Database connection test error:', err)
      return { success: false, error: err }
    }
  }
}