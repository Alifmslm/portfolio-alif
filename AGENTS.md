# Agent guardrails

## Never break the user's dev server

- The user runs `next dev` themselves on port 3000 while agents work.
- `next dev` and `next build` share the `.next/` directory. Running
  `npm run build` while the dev server is up overwrites dev cache with
  production output, causing stale styles and
  `__webpack_modules__ is not a function` errors on reload.
- Therefore: NEVER run `npm run build` or `next build` for routine
  verification. Verify with `npx tsc --noEmit` and `npm run lint` instead.
- Only run a production build when the user explicitly asks for it, and
  afterwards tell them to stop dev, run `rm -rf .next`, and restart dev.
