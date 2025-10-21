import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

describe('Login Component', () => {
  it('renders login form', () => {
    const onLogin = vi.fn()
    render(<Login onLogin={onLogin} />)

    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('allows typing in email and password fields', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()
    render(<Login onLogin={onLogin} />)

    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })

  it('calls onLogin with email and password when form is submitted', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()
    render(<Login onLogin={onLogin} />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const signInButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(signInButton)

    // Wait for the simulated API call to complete
    await vi.waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123')
    }, { timeout: 2000 })
  })

  it('shows loading state when form is submitted', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()
    render(<Login onLogin={onLogin} />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const signInButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(signInButton)

    // Button should show loading text
    expect(screen.getByText('Signing in...')).toBeInTheDocument()
  })

  it('disables submit button during loading', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()
    render(<Login onLogin={onLogin} />)

    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const signInButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(signInButton)

    // Button should be disabled
    expect(signInButton).toBeDisabled()
  })
})

