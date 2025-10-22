# Copilot Instructions for Daisy Electron

## Architecture Overview

This is a modern Electron desktop application with a dual-process architecture:
- **Main process** (`main.ts`): Handles window creation and system interactions
- **Renderer process** (`src/`): React frontend with TypeScript, Tailwind CSS v4, and DaisyUI

Key architectural decisions:
- Security-first: `nodeIntegration: false` and `contextIsolation: true` in webPreferences
- Development/production split: Vite dev server at localhost:5173 in dev, static files in production
- TypeScript compilation: Main process uses separate compilation (`npm run compile`) to CommonJS

## Development Workflow

### Critical Commands
```bash
# Development (requires TWO terminals or use npm start)
npm run dev      # Terminal 1: Start Vite dev server
npm start        # Terminal 2: Compile main.ts + start Electron

# OR single command (recommended)
npm start        # Compiles main.ts then starts electron in dev mode

# Building
npm run build           # Build renderer for production
npm run electron:build  # Create distributable packages (outputs to /release)
```

### Hot Reload Behavior
- Renderer: Automatic via Vite HMR
- Main process: Requires restart after `main.ts` changes - run `npm start` again

## Component Patterns

### DaisyUI Integration
Components use DaisyUI classes extensively. Key patterns:
- Layout: `min-h-screen bg-base-200` for full-height backgrounds
- Cards: `card w-96 bg-base-100 shadow-xl` for content containers
- Buttons: `btn btn-primary` with loading states `btn-disabled loading`
- Form controls: `input input-bordered` with validation styling

Example from `Login.tsx`:
```tsx
<div className="card w-full max-w-md bg-base-100 shadow-2xl">
  <input type="email" className="input input-bordered" />
  <button className={`btn btn-primary ${isLoading ? 'loading btn-disabled' : ''}`}>
```

### State Management
Uses React hooks with prop drilling. Current pattern:
- App-level state in `App.tsx` for user session and global state
- Component-level state with `useState` for local interactions
- Props interface typing: `interface ComponentProps { onAction: (data: Type) => void }`

## Testing Standards

### Vitest + Testing Library Setup
- Test files: `*.test.tsx` alongside components
- Global setup: `src/test/setup.ts` imports jest-dom matchers
- Mock patterns: Use `vi.fn()` for prop functions, `vi.waitFor()` for async operations

### Common Test Patterns
```tsx
// User interaction testing
const user = userEvent.setup()
await user.type(screen.getByPlaceholderText('Enter your email'), 'test@example.com')
await user.click(screen.getByRole('button', { name: /sign in/i }))

// Async state testing
expect(await screen.findByText('Welcome!')).toBeInTheDocument()
```

## Styling System

### Tailwind CSS v4 + DaisyUI
- Input file: `src/input.css` with `@import "tailwindcss"` and `@plugin "daisyui"`
- Path alias: `@/` maps to `./src/` (configured in `vite.config.ts`)
- Theme system: Uses DaisyUI's semantic color tokens (`base-100`, `primary`, `neutral`)

### Component Structure
Follow this hierarchy for consistent styling:
1. Container: `min-h-screen bg-base-200` (page level)
2. Content wrapper: `flex items-center justify-center p-4` (centering)
3. Card: `card bg-base-100 shadow-xl` (content container)
4. Card body: `card-body` with specific content styling

## Build Configuration

### Electron Builder
- Output directory: `release/` 
- Includes: `dist/**/*` (Vite build output) + `main.js` (compiled main process)
- Platform builds: Check `release/` for platform-specific distributables

### TypeScript Configuration
- Main process: Separate compilation with `--module commonjs --target es2020`
- Renderer: Uses Vite's built-in TypeScript with `jsx: "react-jsx"`
- Path resolution: `@/` alias for src imports

## Key Files to Understand
- `main.ts`: Electron main process, window management, dev/prod loading logic
- `src/App.tsx`: Main component with session state and routing logic
- `vite.config.ts`: Build configuration, path aliases, test setup
- `package.json`: Scripts show the dual-process build workflow

## Common Gotchas
- Main process changes require `npm start` restart (no hot reload)
- DaisyUI classes may not show in IntelliSense but are valid
- Test async operations need `await screen.findBy*` for state changes
- Electron security: Never enable `nodeIntegration` in production