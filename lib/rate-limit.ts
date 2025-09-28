import { NextRequest } from 'next/server'

// Simple in-memory rate limiting (for production, consider Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
  error?: string
}

/**
 * Rate limiting utility function
 */
export function rateLimit(config: RateLimitConfig) {
  return (identifier: string): RateLimitResult => {
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Clean up old entries
    cleanupOldEntries(windowStart)

    // Get or create rate limit entry
    const entry = rateLimitMap.get(identifier) || { count: 0, resetTime: now + config.windowMs }

    // Reset if window has passed
    if (now > entry.resetTime) {
      entry.count = 0
      entry.resetTime = now + config.windowMs
    }

    // Check if limit exceeded
    if (entry.count >= config.maxRequests) {
      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        resetTime: entry.resetTime,
        error: 'Rate limit exceeded'
      }
    }

    // Increment count and update map
    entry.count++
    rateLimitMap.set(identifier, entry)

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - entry.count,
      resetTime: entry.resetTime
    }
  }
}

/**
 * Get IP address from request
 */
export function getClientIP(request: NextRequest): string {
  // Check for forwarded IP (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  // Check for real IP
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback (NextRequest doesn't have direct IP access)
  return 'unknown'
}

/**
 * Create rate limiter for form submissions
 */
export const formRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5 // 5 submissions per hour per IP
})

/**
 * Create rate limiter for API requests
 */
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes per IP
})

/**
 * Create rate limiter for sensitive operations
 */
export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 3 // 3 requests per minute per IP
})

/**
 * Clean up old rate limit entries to prevent memory leaks
 */
function cleanupOldEntries(windowStart: number) {
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < windowStart) {
      rateLimitMap.delete(key)
    }
  }
}

/**
 * Middleware helper for rate limiting
 */
export function withRateLimit(
  rateLimiter: ReturnType<typeof rateLimit>,
  request: NextRequest
): RateLimitResult {
  const clientIP = getClientIP(request)
  return rateLimiter(clientIP)
}