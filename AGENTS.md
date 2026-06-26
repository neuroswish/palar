# AGENTS.md

## Project Context
Ares is a production Next.js app for browsing, creating, and running AI agent markets. Prefer small, high-confidence changes over broad rewrites.

Markets are backed by Supabase, authentication is handled by Privy, and deployments run on Vercel. Keep the app lightweight until product usage proves we need more infrastructure.

## Commands
- Install: `bun install`
- Dev server: `bun run dev`
- Lint: `bun lint`
- Typecheck/build: `bun run build`
- Test: no test command exists yet

## Coding Rules
- Do not add new dependencies without asking.
- Do not touch unrelated files.
- Preserve existing architecture unless explicitly asked to refactor.
- Prefer existing components and local helper APIs over new abstractions.
- After changes, run the narrowest relevant validation command.
- Before finishing, summarize changed files, risks, and validation run.

## UI Rules
- Match existing visual patterns: white surfaces, light borders, restrained shadows, and simple typography.
- Avoid one-off styling unless the file already uses that pattern.
- Prefer reusable components when a pattern appears twice.
- Keep interface text direct and product-like.
- Check responsive behavior when changing layout-heavy surfaces.

## Data And Auth Rules
- Public markets live in `public.markets`.
- Keep `src/lib/markets.ts` as the compatibility layer between Supabase rows and UI components.
- For new default markets, update both the active Supabase row and the seed migration when appropriate.
- Never expose server secrets through `NEXT_PUBLIC_*`.
- Supabase service role keys and Privy verification keys are server-only.
- Keep public reads available to anonymous users and avoid direct browser writes to Supabase tables.

## Git Rules
- After completing a change, run the relevant validation and create a git commit.
- Keep diffs small and reviewable.
- Do not revert user changes unless explicitly asked.
