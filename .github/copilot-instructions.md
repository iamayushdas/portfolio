# Copilot Instructions for AI Coding Agents

This codebase is a Next.js 14 portfolio site with TypeScript, Tailwind CSS, Prisma, Contentful, and Sanity integrations. Follow these guidelines to be productive and maintain project conventions:

## Architecture Overview
- **App Directory Structure**: Uses Next.js `app/` directory routing. Pages and components are organized by feature (e.g., `blog/`, `contact/`, `experience/`).
- **Global Layout**: The main layout is in `app/layout.tsx`, which wraps all pages with `Provider`, `Navbar`, and `FloatingSocialHandle`.
- **Component Organization**: Shared UI components are in `app/components/` and `components/ui/`. Feature-specific components are nested under their respective folders.
- **Styling**: Tailwind CSS is configured via `tailwind.config.ts` and used throughout for utility-first styling. Global styles are in `app/globals.css`.

## Data & Integrations
- **Prisma**: Database models are defined in `prisma/schema.prisma` (MySQL). Use `@prisma/client` for queries. Run `npm run postinstall` or `prisma generate` after schema changes.
- **Contentful**: API client is set up in `app/lib/contentful.ts` using environment variables `NEXT_PUBLIC_CONTENTFUL_SPACE` and `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`.
- **Sanity**: API client and image builder are in `app/lib/sanity.ts`. Project ID and dataset are hardcoded; update if needed.

## Developer Workflows
- **Start Dev Server**: `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`).
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Prisma Client Generation**: Automatically runs on install via `postinstall` script.
- **Environment Variables**: Store secrets in `.env.local` (not committed). Required for Contentful and database access.

## Project-Specific Patterns
- **TypeScript**: All code is written in TypeScript. Use strict typing for props and API responses.
- **Next.js Routing**: Use file-based routing in `app/` and nested folders for dynamic routes (e.g., `blog/[slug]/`).
- **Dark Mode**: Theme toggling is handled via `next-themes` and custom `ThemeButton` component.
- **Forms**: Contact and feedback forms are handled via API routes in `pages/api/` and Prisma models.

## External Dependencies
- **Contentful**: For blog/content data.
- **Sanity**: For images and additional content.
- **Prisma**: For guestbook and contact form data.
- **Tailwind CSS**: For all styling.

## Examples
- **Add a new page**: Create a folder in `app/` (e.g., `app/projects/`) and add `page.tsx`.
- **Add a new API route**: Add a file to `pages/api/` (e.g., `pages/api/contact.ts`).
- **Update database schema**: Edit `prisma/schema.prisma`, then run `prisma generate`.

## Key Files & Directories
- `app/layout.tsx`: Global layout and providers
- `app/components/`: Shared React components
- `components/ui/`: UI primitives
- `prisma/schema.prisma`: Database models
- `app/lib/contentful.ts`: Contentful client
- `app/lib/sanity.ts`: Sanity client
- `pages/api/`: API routes

---

If any section is unclear or missing important conventions, please provide feedback to improve these instructions.