# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the development server (http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a Next.js 15 application with Keycloak authentication integration using NextAuth.js v4. The project follows the App Router pattern with server components and server actions.

### Authentication Flow
- NextAuth.js configuration in `src/auth.ts` with Keycloak provider
- Middleware in `src/middleware.ts` protects all routes except API routes and static assets
- Auth handlers exposed via `src/app/api/auth/[...nextauth]/route.ts`
- Main page (`src/app/page.tsx`) shows different content based on authentication state

### Key Dependencies
- Next.js 15.4.3 with React 19
- NextAuth.js v4 for authentication
- Tailwind CSS v4 for styling
- TypeScript for type safety

### Environment Variables Required
- `KEYCLOAK_CLIENT_ID` - Keycloak client identifier
- `KEYCLOAK_CLIENT_SECRET` - Keycloak client secret
- `KEYCLOAK_ISSUER` - Keycloak issuer URL

### Project Structure
- `src/auth.ts` - NextAuth configuration and exports
- `src/middleware.ts` - Route protection middleware
- `src/app/page.tsx` - Main authenticated/unauthenticated page
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API endpoints