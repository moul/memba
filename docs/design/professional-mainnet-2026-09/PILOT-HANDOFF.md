# Professional Validators pilot — implementation handoff

Scope: P0–P5 prototype review following the authorized direction A and System / Light / Black theme policy. Selected branding 01 / Folded M remains a separate workstream.

Base: `98b8b762`, followed by theme foundation `ff71df72` (#1194). Branch `feat/validators-professional-pilot`, worktree `Memba-worktrees/validators-professional-pilot`. Shared `/Memba` checkout and other sessions' worktrees were not modified.

## Run and review

From this branch's `frontend` directory:

```sh
npm ci
VITE_ENABLE_PRO_UI=true npm run dev -- --host 127.0.0.1 --port 5188 --strictPort
```

Open `http://127.0.0.1:5188/mainnet/validators` or `/pearl/validators`. These pages read the real configured network. No fixtures enter ordinary runtime paths. The local preview currently has no custom monitoring environment configured, so mainnet may display raw addresses and explicitly unavailable monitoring metrics. This is distinct from fixture screenshots.

Run the deterministic browser proof with `npm run test:e2e:pro-ui`. It starts its own flag-on server on port 5189, rejects occupied ports, and fulfills network reads in Playwright. Screenshot headings identify **Test fixture**. The helper is under `frontend/e2e/helpers/proValidatorsFixture.ts`; never import it into application source.

The default build has no enabled presentation flag. The allowlist is exact known-network `/validators` overview routes, including their existing query tabs. Home, DAO, treasury, profile and hacker routes retain their existing presentation. The scoped stylesheet loads with the lazy Validators route.

## Implemented presentation contract

- Fluid available desktop width with 32px gutters (24px at smaller desktops).
- Black canvas, navigation, standard cards and table: `#000000`. Light canvas: white. Borders, readable secondary text and interaction feedback supply hierarchy.
- Compact five-metric desktop strip; mobile Network overview disclosure retains all stats and health details while bringing search/list forward.
- Primary desktop columns: rank, identity, voting power, share, uptime when monitoring exists, health and recent signatures. **All columns** restores active-since, profile/reviews when available, participation, missed blocks, transaction contribution and last downtime. Hiding an actively sorted optional field resets sorting to visible rank.
- Preserve native table rows, native sort buttons/announcements, nested links/copy buttons, pagination and URL tab state. Long addresses may truncate visually beside an exact copy action and full detail link.
- Distinct empty network roster / empty search messaging, recoverable first-load error, retained data with a visible failed-refresh message, and missing-monitoring explanation.
- No data query, endpoint, polling cadence, signature window, health computation, transaction, authentication or capability-gate changes.

## Review limits and next gate

This is the first working proof, not a completed full-product design system or production rollout. Review the default columns and mobile disclosure before expanding the interaction design. Per-column chooser, health filter and saved layouts remain deferred. Folded M asset replacement, new navigation and other feature families remain separate.

Automated checks do not substitute for a manual screen-reader review, physical-device testing, role-specific connected-wallet shell review, or a comprehensive stale/partial-telemetry state matrix. Those are rollout gates. No throughput/performance claims are made from a tiny fixture roster.

Rollback: keep `VITE_ENABLE_PRO_UI` absent/false; or revert this bounded presentation PR. Theme preference behavior is independently reviewable in #1194. No contract migrations or persistent validator-state migrations are needed.

## Local verification (2026-09-14)

- `npm test -- --maxWorkers=4`: 504 files passed, 5,016 tests passed; one existing skipped test.
- `npm run build`, `npm run lint`: passed. The final presentation refinements were followed by a fresh build/lint and browser matrix.
- `npm run test:e2e:pro-ui`: 16 passed across Chromium, Firefox, iPhone/WebKit and Pixel. Checks cover 320/390/1280/1440/1920px, default desktop table fit, black surfaces, mobile disclosure, optional columns, search/reset, sorting and deep-link tabs. Axe scans of the changed main content pass in both Light and Black (healthy fixture state).
- Background refresh failure retains the last roster; empty roster and first-load retry recovery have focused component coverage.
- Theme foundation #1194: full backend build/race suite and protobuf lint passed on the same backend/proto tree. No backend/proto files changed in this pilot.
- Live mainnet read-only inspection at 1440px and 390px confirms real roster rendering and explicit missing-monitoring presentation. No wallet transaction or authentication flow was exercised.
- Relative to P1, the Validators route CSS adds 1.72 kB gzip (4.35 → 6.07), route JS adds 0.66 kB gzip (9.40 → 10.06), and the main JS bundle adds 0.12 kB gzip (119.41 → 119.53). The main CSS bundle is unchanged. These are build-size observations, not load-time or rendering benchmarks.

CI and release review remain separate from these local results. No merge is authorized by this handoff.
