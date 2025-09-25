# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 15.5.4 application with TypeScript and Tailwind CSS v4, created with create-next-app. The project uses the App Router (app directory) architecture and Turbopack for development and builds.

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

- **app/** - Next.js App Router directory containing routes and layouts
  - `layout.tsx` - Root layout with Geist fonts and global styles
  - `page.tsx` - Homepage component
  - `globals.css` - Global Tailwind CSS styles
- **public/** - Static assets served at root URL
- **node_modules/** - Dependencies (git-ignored)
- **.next/** - Build output directory (git-ignored)

## Key Technologies

- **Next.js 15.5.4** with App Router and Turbopack
- **React 19.1.0**
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** using PostCSS
- **ESLint** with Next.js configuration

## TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to root directory
- Target: ES2017
- JSX: preserve
- Module resolution: bundler

## Important Notes

- This project uses Turbopack for both development and production builds
- Font optimization is handled via next/font with Geist and Geist Mono fonts
- ESLint is configured to check core-web-vitals and TypeScript
- The app uses server components by default in the App Router