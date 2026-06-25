# AGENTS.md

This file is the operating guide for AI agents working in this repository.

## Project

Ares is a Next.js marketplace for agent markets. Users browse public markets, open a market page, and signed-in users can create new markets. Markets are stored in Supabase and authentication is handled by Privy.

## Stack

- Runtime/package manager: Bun
- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Auth: Privy
- Database: Supabase Postgres
- Deployment: Vercel

## Core Commands

- Install dependencies: `bun install`
- Run locally: `bun run dev`
- Lint: `bun lint`
- Build: `bun run build`

After each completed code change, run `bun lint` and `bun run build`, then create a git commit that includes only files relevant to the change.

## Repo Conventions

- Keep UI consistent with the current Ares/Polymarket-inspired style: clean white surfaces, light borders, restrained shadows, rounded but not bubbly cards unless an existing component uses that shape.
- Prefer small, direct changes over new abstractions.
- Use existing components and patterns before introducing new ones.
- Do not add broad refactors while implementing product requests.
- Do not edit generated or unrelated dirty files unless the task requires it.
- Never commit `.env.local` or real secret values.

## Data Model

Markets are backed by Supabase in `public.markets`.

The frontend-facing market shape is defined in `src/lib/markets.ts`. Keep this as the compatibility layer between database rows and UI components. If the database schema changes, update:

- `supabase/migrations/*`
- `src/lib/supabase/types.ts`
- `src/lib/markets.ts`
- Any route/API code that reads or writes the changed fields

Public market reads should remain available to anonymous users. Browser clients must not write directly to Supabase tables.

## Auth and Security

- Privy is the source of user identity.
- Use Privy access tokens for authenticated API requests.
- Server routes verify tokens with `@privy-io/node`.
- Server writes to Supabase use `SUPABASE_SERVICE_ROLE_KEY`.
- Service role keys and Privy verification keys are server-only. They must never be exposed through `NEXT_PUBLIC_*`.
- RLS must stay enabled on public Supabase tables.

## Agent/Subagent Workflow

Use subagents when work benefits from parallel investigation or separation of concerns. Good splits:

- UI agent: component structure, responsive behavior, visual polish.
- Backend agent: schema, API routes, Supabase policies, data mapping.
- Auth/payments agent: Privy, wallets, USDC/payment flows.
- QA agent: lint/build, route checks, browser verification, deployment smoke tests.

Subagents should return findings and proposed patches, not silently change unrelated files. The primary agent remains responsible for final integration, verification, and the commit.

## Backend Direction

Keep backend infrastructure lightweight until product usage demands more:

- Prefer one simple table before adding normalized schemas.
- Prefer route handlers over extra backend services.
- Add queues/workflows only when agent execution requires durable async work.
- Add storage only when market creation needs user-uploaded images or files.
- Add analytics tables only when we need real play/usage counts.

## Agent Execution Roadmap

When implementing real agent runs, use this sequence:

1. Persist a run record tied to `market_id` and `creator/user_id`.
2. Store user input and agent status.
3. Execute the agent server-side.
4. Stream or poll output into the market workspace.
5. Record cost, token usage, and completion metadata.
6. Increment market play counts after successful starts.

Avoid building a complex orchestration layer until a single synchronous or short async route is no longer enough.

## Verification Checklist

Before committing:

- `bun lint`
- `bun run build`
- Confirm touched routes still load locally when relevant.
- For Supabase work, verify the migration has been applied and public reads still work.
- For auth work, verify signed-out and signed-in states do the right thing.

## Deployment Notes

Vercel deployments require the same server-only env vars used locally:

- `PRIVY_VERIFICATION_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Client-safe env vars:

- `NEXT_PUBLIC_PRIVY_APP_ID`
- `NEXT_PUBLIC_PRIVY_CLIENT_ID`
- `NEXT_PUBLIC_SOLANA_RPC_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
