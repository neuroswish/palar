# Codex Workflow

This repo uses the main long-running Codex thread as an orchestration thread. The default principle is: parallelize investigation, isolate editing, and centralize merging.

## Starting A New Feature

Start by writing a short task brief:

- Goal
- User-visible behavior
- Files or areas likely affected
- Known risks
- Validation expected

The orchestrator should then split the work into one or more worker tasks. Use a write-heavy worker only when code or docs need to change. Use read-only workers for investigation, review, logs, and test-gap analysis.

## Naming Worktrees And Branches

Use predictable names so stale work is easy to inspect.

Worktree paths:

```txt
../.worktrees/ares-[type]-[short-task]
```

Branch names:

```txt
codex/[type]-[short-task]
```

Examples:

```txt
../.worktrees/ares-feature-agent-runtime
../.worktrees/ares-fix-privy-balance
../.worktrees/ares-ui-market-page-polish
../.worktrees/ares-review-supabase-rls
```

```txt
codex/feature-agent-runtime
codex/fix-privy-balance
codex/ui-market-page-polish
codex/review-supabase-rls
```

## When To Use Worker Threads

Use worker threads when:

- A task requires substantial edits.
- A task may conflict with ongoing work.
- A feature can be split by ownership area.
- A risky experiment should not touch `main`.
- Review or investigation should happen in parallel.

Keep small one-file changes in the current thread only when the user explicitly asks for direct implementation.

## When To Use Subagents

Use subagents inside worker threads for bounded read-heavy work:

- Codebase exploration
- Test-gap analysis
- Risk review
- Performance review
- Security review
- Log review
- Dependency analysis

Do not use subagents for uncoordinated edits across the same files.

## Reviewing Diffs

Before merging worker output, inspect:

- Files changed
- Unrelated edits
- Secrets or unsafe environment usage
- Auth and Supabase access patterns
- UI consistency and responsive behavior
- Validation output
- Migration or data compatibility risk

Useful commands:

```sh
git status --short
git diff --stat
git diff
bun lint
bun run build
```

## Merge And Cherry-Pick Strategy

Prefer the smallest merge path that preserves reviewability.

- Use a normal merge when the worker branch is clean and focused.
- Use cherry-pick when only one or two focused commits are needed.
- Manually apply a diff when the branch contains useful work mixed with unrelated churn.
- Ask for another review when changes touch auth, payments, Supabase RLS, or deployment config.

Do not merge, commit, push, or delete worker branches unless the user explicitly asks.

## Cleaning Up Old Worktrees

Cleanup is explicit and approval-gated.

1. List worktrees:

```sh
git worktree list
```

2. Inspect each worktree:

```sh
git -C ../.worktrees/ares-[type]-[short-task] status --short --branch
```

3. Classify each one:

- `active`: keep
- `merged`: safe candidate after approval
- `abandoned`: ask before deleting
- `unknown`: do not touch

4. After approval, remove the worktree and branch:

```sh
git worktree remove ../.worktrees/ares-[type]-[short-task]
git branch -d codex/[type]-[short-task]
```

Use force deletion only when the user explicitly approves it.
