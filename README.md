# Daisy Electron

An Electron application built with React, TypeScript, Tailwind CSS, and DaisyUI.

## Features

- ⚡ **Vite** - Lightning fast bundling and hot module replacement
- ⚛️ **React 19** - Modern React with hooks
- 📘 **TypeScript** - Type-safe code
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🌼 **DaisyUI** - Beautiful component library
- 🖥️ **Electron** - Cross-platform desktop application

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

To run the application in development mode with hot reload:

1. Start the Vite dev server (in one terminal):
```bash
npm run dev
```

2. Start Electron (in another terminal):
```bash
npm start
```

Alternatively, you can just run:
```bash
npm start
```

This will compile the TypeScript main process and start Electron in development mode.

### Building

To build the application for production:

```bash
npm run build
```

To create distributable packages:

```bash
npm run electron:build
```

## Project Structure

```
daisy-electron/
├── src/
│   ├── App.tsx           # Main React component
│   ├── main.tsx          # React entry point
│   ├── index.html        # HTML template
│   ├── input.css         # Tailwind CSS input
│   └── vite-env.d.ts     # Vite type definitions
├── main.ts               # Electron main process
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm start` - Compile and run Electron in development mode
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run electron:build` - Create distributable packages
- `npm run compile` - Compile TypeScript main process

## Technologies

- [Electron](https://www.electronjs.org/) - Build cross-platform desktop apps
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [DaisyUI](https://daisyui.com/) - Tailwind CSS component library

## License

ISC

