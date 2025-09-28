import { NextRequest, NextResponse } from 'next/server'
import { withRateLimit, formRateLimit, apiRateLimit } from './rate-limit'

export interface ApiError {
  message: string
  status: number
  code?: string
}

export class ValidationError extends Error {
  status = 400
  code = 'VALIDATION_ERROR'
  
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class RateLimitError extends Error {
  status = 429
  code = 'RATE_LIMIT_EXCEEDED'
  resetTime: number
  
  constructor(message: string, resetTime: number) {
    super(message)
    this.name = 'RateLimitError'
    this.resetTime = resetTime
  }
}

/**
 * API Route Handler with Error Handling and Rate Limiting
 */
export function withApiHandler(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: {
    methods?: string[]
    rateLimit?: 'form' | 'api' | 'strict' | false
    requireAuth?: boolean
  } = {}
) {
  return async (req: NextRequest) => {
    const startTime = Date.now()
    const method = req.method || 'GET'
    const url = req.url
    
    try {
      // Method validation
      if (options.methods && !options.methods.includes(method)) {
        return NextResponse.json(
          { error: `Method ${method} not allowed` },
          { status: 405, headers: { Allow: options.methods.join(', ') } }
        )
      }

      // Rate limiting
      if (options.rateLimit) {
        let result
        
        if (options.rateLimit === 'form') {
          result = withRateLimit(formRateLimit, req)
        } else if (options.rateLimit === 'api') {
          result = withRateLimit(apiRateLimit, req)
        } else {
          result = withRateLimit(formRateLimit, req) // Default to form rate limit
        }

        if (result) {
          
          if (!result.success) {
            const resetDate = new Date(result.resetTime).toISOString()
            
            return NextResponse.json(
              { 
                error: 'Rate limit exceeded',
                message: 'Too many requests. Please try again later.',
                resetTime: resetDate
              },
              { 
                status: 429,
                headers: {
                  'X-RateLimit-Limit': result.limit.toString(),
                  'X-RateLimit-Remaining': result.remaining.toString(),
                  'X-RateLimit-Reset': result.resetTime.toString(),
                  'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString()
                }
              }
            )
          }

          // Add rate limit headers to successful responses
          req.headers.set('x-ratelimit-limit', result.limit.toString())
          req.headers.set('x-ratelimit-remaining', result.remaining.toString())
          req.headers.set('x-ratelimit-reset', result.resetTime.toString())
        }
      }

      // Call the actual handler
      const response = await handler(req)
      
      // Add timing header
      const duration = Date.now() - startTime
      response.headers.set('X-Response-Time', `${duration}ms`)
      
      // Log successful request
      console.log(`${method} ${url} - ${response.status} (${duration}ms)`)
      
      return response

    } catch (error) {
      const duration = Date.now() - startTime
      
      // Handle different error types
      if (error instanceof ValidationError) {
        console.warn(`Validation error: ${error.message}`)
        return NextResponse.json(
          { error: error.message, code: error.code },
          { status: error.status }
        )
      }
      
      if (error instanceof RateLimitError) {
        console.warn(`Rate limit exceeded: ${error.message}`)
        return NextResponse.json(
          { 
            error: error.message, 
            code: error.code,
            resetTime: new Date(error.resetTime).toISOString()
          },
          { 
            status: error.status,
            headers: {
              'Retry-After': Math.ceil((error.resetTime - Date.now()) / 1000).toString()
            }
          }
        )
      }

      // Handle known API errors
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        const apiError = error as ApiError
        console.error(`API error: ${apiError.message}`)
        return NextResponse.json(
          { error: apiError.message, code: apiError.code },
          { status: apiError.status }
        )
      }

      // Handle unexpected errors
      console.error(`Unexpected error in ${method} ${url} (${duration}ms):`, error)
      
      // Don't expose internal errors in production
      const message = process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : error instanceof Error ? error.message : 'Unknown error'

      return NextResponse.json(
        { 
          error: message,
          code: 'INTERNAL_ERROR',
          requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        },
        { status: 500 }
      )
    }
  }
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  body: Record<string, unknown>,
  requiredFields: string[]
): void {
  const missingFields = requiredFields.filter(field => !body[field])
  
  if (missingFields.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missingFields.join(', ')}`
    )
  }
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}