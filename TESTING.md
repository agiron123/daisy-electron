# Testing Guide

This project uses **Vitest** for testing React components.

## Running Tests

### Watch Mode (Interactive)
Runs tests in watch mode and re-runs them when files change:
```bash
npm test
```

### Run Once
Runs all tests once and exits:
```bash
npm run test:run
```

### UI Mode
Opens Vitest's UI for exploring and debugging tests:
```bash
npm run test:ui
```

### Coverage
Generates code coverage reports (requires @vitest/coverage package):
```bash
npm run test:coverage
```

## Test Files

Test files should:
- Be placed alongside the component they test (e.g., `App.test.tsx` next to `App.tsx`)
- Use the `.test.tsx` or `.spec.tsx` extension
- Import testing utilities from `@testing-library/react`

## Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

### Testing User Interactions

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('handles button clicks', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### Testing with Mocks

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('calls callback when form is submitted', async () => {
    const onSubmit = vi.fn()
    render(<MyComponent onSubmit={onSubmit} />)
    
    // ... interact with component
    
    expect(onSubmit).toHaveBeenCalledWith(expectedData)
  })
})
```

## Configuration

Test configuration is defined in:
- `vite.config.ts` - Vitest settings
- `src/test/setup.ts` - Global test setup
- `tsconfig.json` - TypeScript types for testing

## Useful Testing Library Queries

- `getByRole()` - Find by ARIA role (preferred)
- `getByText()` - Find by text content
- `getByPlaceholderText()` - Find input by placeholder
- `getByLabelText()` - Find input by label
- `findByText()` - Async version that waits for element

## Tips

1. Use `findBy*` queries when waiting for async operations
2. Prefer `getByRole()` for better accessibility testing
3. Use `userEvent` instead of `fireEvent` for more realistic interactions
4. Mock external dependencies (APIs, modules) using `vi.mock()`
5. Keep tests focused on user behavior, not implementation details

## Learn More

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/react)
- [Testing Library Cheat Sheet](https://testing-library.com/docs/react-testing-library/cheatsheet)

