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

## Orchestrator Thread Rules
- Treat the main long-running repo thread as the control/orchestrator thread by default.
- In the orchestrator thread, decompose requested features or fixes before implementation.
- Do not directly implement feature work from the orchestrator thread unless the user explicitly asks.
- For each new feature or fix, propose worker ownership, validation, expected artifacts, and merge strategy first.
- Centralize merge decisions in the orchestrator thread after reviewing worker diffs and validation.

## Iteration Workflow
When the user gives feedback on an existing Codex-generated change, the orchestrator should not automatically create a new worker or worktree. First classify the feedback.

Same-diff iteration:
- UI tweaks
- Bug fixes in the current implementation
- Review feedback
- Small behavior adjustments
- Validation failures

Route same-diff iteration back to the original worker thread or worktree that produced the diff.

Independent follow-up:
- New feature
- Separate test effort
- Alternate architecture
- Security or performance review
- Risky refactor

Create a new worker thread or worktree for independent follow-up when isolation is useful.

Integration feedback:
- Conflicts between worker diffs
- Cherry-pick decisions
- Merge ordering
- Final cleanup

Keep integration feedback in the orchestrator, or create a dedicated integration worker if the review itself becomes substantial.

Default behavior:
- Iterate in the same worker or worktree when feedback modifies the existing diff.
- Create a new worktree only when the work should be independently reviewed, compared, or merged.
- Do not duplicate the same implementation across multiple worktrees unless explicitly exploring alternatives.

## Worker Thread Rules
- Use worker threads for implementation, investigation, review, testing, and integration planning.
- Write-heavy workers should use their own worktree.
- Read-only workers may inspect the main worktree when they are only producing findings.
- Avoid assigning two write-heavy workers to edit the same files unless one is explicitly experimental.
- Each worker should return changed files or findings, validation run, risks, and merge notes.

## Worktree Rules
- Prefer a worktree-first workflow for future feature work.
- Recommended worktree path: `../.worktrees/ares-[type]-[short-task]`.
- Recommended branch name: `codex/[type]-[short-task]`.
- Keep worktree diffs small and scoped to the worker's owned files.
- Do not delete worktrees or branches without explicit user approval.

## Subagent Rules
- Use parallel subagents only for bounded read-heavy work.
- Good subagent tasks include codebase exploration, test-gap analysis, risk review, performance review, security review, logs, and dependency analysis.
- Do not use subagents to make uncoordinated write-heavy changes in the same files.
- Summarize subagent findings before deciding on implementation or merge strategy.

## Coding Rules
- Do not add new dependencies without asking.
- Do not touch unrelated files.
- Preserve existing architecture unless explicitly asked to refactor.
- Prefer existing components and local helper APIs over new abstractions.
- Use the narrowest change that satisfies the request.
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

## Diff And Review Rules
- Show or summarize diffs before asking to merge worker changes.
- Review diffs for unrelated edits, secrets, unsafe auth/data access, responsive UI regressions, and missing validation.
- Prefer cherry-picking focused commits or manually applying focused diffs over broad merges when a worker branch contains extra churn.
- If a worker touches shared data/auth code, request a security or RLS-focused review before merge.

## Git Rules
- Do not commit, push, merge, rebase, delete branches, or delete worktrees unless the user explicitly asks.
- Keep diffs small and reviewable.
- Do not revert user changes unless explicitly asked.
- If the user asks for a commit, run relevant validation first and include the validation result in the final summary.
