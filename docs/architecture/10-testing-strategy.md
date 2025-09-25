# 10. Testing Strategy

## 10.1 Unit Testing

```typescript
// __tests__/components/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/ContactForm'

describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<ContactForm />)

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn()
    render(<ContactForm onSubmit={mockSubmit} />)

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    })

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      })
    })
  })
})
```

## 10.2 Integration Testing

```typescript
// __tests__/api/leads.test.ts
import { POST } from '@/app/api/leads/route'
import { NextRequest } from 'next/server'

describe('/api/leads', () => {
  it('creates lead successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.id).toBeDefined()
  })

  it('rejects invalid email', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message'
      })
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
  })
})
```
