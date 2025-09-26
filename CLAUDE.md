# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
AgentBelt - A high-converting landing page for an AI agency focused on practical business implementations. Built with Next.js 15.5.4, TypeScript, and Tailwind CSS v4. The project uses the App Router (app directory) architecture and Turbopack for development and builds.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (with Turbopack)
npm run dev

# Build for production (with Turbopack)
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking (not included in scripts, run manually)
npx tsc --noEmit
```

## BMad Method Integration

This project includes the BMad Method for AI-driven planning and development. The BMad configuration and resources are located in `.bmad-core/`.

### BMad Commands (Prefix: BMad)
All BMad commands in Claude Code use the slash prefix `/BMad` followed by the command name:

- `/BMad help` - Show available BMad agents and workflows
- `/BMad agent [name]` - Transform into a specialized agent (e.g., pm, architect, dev)
- `/BMad task [name]` - Run a specific BMad task
- `/BMad workflow [name]` - Start a BMad workflow
- `/BMad status` - Show current BMad context and progress
- `/BMad kb-mode` - Access full BMad knowledge base

### BMad Project Structure
- `.bmad-core/` - BMad Method configuration and resources
  - `core-config.yaml` - BMad configuration settings
  - `agents/` - Specialized agent definitions
  - `tasks/` - Reusable task templates
  - `workflows/` - Structured development workflows
  - `templates/` - Document templates
  - `checklists/` - Quality assurance checklists

### BMad Document Locations
Per the BMad configuration, project documentation is organized as:
- `docs/prd/` - Product Requirements Documents (sharded)
- `docs/architecture/` - Architecture documentation (sharded)
- `docs/stories/` - User stories
- `docs/qa/` - QA assessments and test documentation

## Architecture

### Routing & Rendering
- **App Router** (app directory) - Server-first architecture with React Server Components by default
- **Layout System** - Root layout at app/layout.tsx provides the HTML structure and global styles
- **Font Optimization** - Uses next/font to load and optimize Geist (sans) and Geist Mono fonts with CSS variables

### Styling
- **Tailwind CSS v4** with PostCSS integration
- **CSS Variables** for theming with light/dark mode support
- **Custom theme tokens** defined inline using @theme directive in globals.css
- Theme variables: --background, --foreground automatically switch based on prefers-color-scheme

### Configuration Files
- **next.config.ts** - Next.js configuration (currently minimal)
- **tsconfig.json** - TypeScript with strict mode, bundler resolution, and @/* path alias
- **eslint.config.mjs** - ESLint v9 flat config with Next.js core-web-vitals and TypeScript rules
- **postcss.config.mjs** - PostCSS configuration for Tailwind CSS v4

## TypeScript Configuration
- Strict mode enabled for type safety
- Path alias: `@/*` maps to root directory for clean imports
- Target: ES2017
- Module resolution: bundler (optimized for Next.js)
- JSX: preserve (handled by Next.js compiler)

## Important Development Notes
- Turbopack is used for both dev and production builds (--turbopack flag)
- Server Components are the default - use "use client" directive only when needed for interactivity
- ESLint ignores: node_modules/, .next/, out/, build/, next-env.d.ts
- The project uses React 19.1.0 which includes the latest concurrent features