import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  it('renders login form when not logged in', () => {
    render(<App />)
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
  })

  it('allows user to login and displays welcome message', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Fill in login form
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    // Submit form
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(signInButton)

    // Wait for login to complete
    expect(await screen.findByText('Welcome!')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('increments counter when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Login first
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    // Wait for dashboard
    await screen.findByText('Welcome!')

    // Test counter
    const incrementButton = screen.getByRole('button', { name: /increment/i })
    await user.click(incrementButton)
    
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('decrements counter when decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Login first
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    // Wait for dashboard
    await screen.findByText('Welcome!')

    // Increment first, then decrement
    const incrementButton = screen.getByRole('button', { name: /increment/i })
    const decrementButton = screen.getByRole('button', { name: /decrement/i })
    
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(decrementButton)
    
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('resets counter when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Login first
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    // Wait for dashboard with longer timeout
    await screen.findByText('Welcome!', {}, { timeout: 2000 })

    // Increment then reset
    const incrementButton = screen.getByRole('button', { name: /increment/i })
    const resetButton = screen.getByRole('button', { name: /reset/i })
    
    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(resetButton)
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('logs out user when logout button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Login first
    await user.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    // Wait for dashboard with longer timeout
    await screen.findByText('Welcome!', {}, { timeout: 2000 })

    // Logout
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    await user.click(logoutButton)

    // Should be back at login screen
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
  })
})

