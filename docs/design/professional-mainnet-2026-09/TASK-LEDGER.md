# Pilot task ledger

Updated 2026-09-14. Owner: current design implementation session. Memba only. No background agents, automations, merges or deployments.

## Baseline and isolation

- Integration base: `98b8b762` (`origin/main` fetched before starting).
- Shared `Memba` checkout remains untouched on its existing `main` revision.
- P1 branch: `feat/system-theme-preference`.
- P1 worktree: `Memba-worktrees/system-theme-preference`.
- Separate active worktree `review-main-98b8b76` has validator accessibility work. Preserve semantic rows/sort buttons and incorporate landed changes when updating the pilot base; do not modify that checkout.
- Decisions: D-01 through D-08. Branding: 01 / Folded M selected, asset adoption separate.

| Task | Status | Owned files / dependency | Handoff |
|---|---|---|---|
| P0 Baseline | In review | This ledger; deterministic E2E fixture and pilot handoff | Base `98b8b762`; source/user-screenshot baseline, labelled rendered fixtures and read-only live inspection recorded. Remaining state gates are explicit. |
| P1 Theme preference | In review · [#1194](https://github.com/samouraiworld/memba/pull/1194) | `lib/themeStore.ts`, shared `ThemeSelect`, topbar/mobile/settings/palette callers, tests, changelog | Preserves palette and resolved `light/dark` contract. 5,002 unit tests, build/lint, backend/race and Buf passed. CI found iPhone clipping; narrower mobile header passes 20 local guardrails. Updated CI pending. |
| P2 Scoped foundations | In review · [#1195](https://github.com/samouraiworld/memba/pull/1195) | `Layout.tsx`, scoped pro stylesheet/config predicate, optional notice style tokens | Default-off presentation flag; Validators overview allowlist only. |
| P3 Validators presentation | In review · #1195 | `Validators.tsx`, scoped CSS, relevant validator tests | Same queries and metric derivation; responsive rendered proof. 5,016 unit tests passed; final build/lint and 16 preview browser cases passed after the inherited mobile-header correction. See the handoff for review limits. |
| P4 Optional interactions | Partial, provisional preview · #1195 | Narrow table control surface | Grouped All columns preview implemented; defaults require review. Per-column chooser, health filter and saved presets/density deferred. |
| P5 Pilot review | Awaiting user review | Reproducible preview, screenshots, validation evidence | Production flag stays off. Manual screen-reader, physical-device, connected-wallet and wider telemetry-state reviews remain rollout gates. |
| P6+ / B1 adoption | Not started | Navigation, broader feature waves, production branding | Require their respective review gates. |

## Handoff requirements

Record commit and PR URLs, base changes, exact validation commands/results, fixture vs live evidence, browser/state gaps and rollback before marking a task in review. One owner serializes shared shell/theme edits. Feature/deployment work in other sessions continues independently. Never reset another worktree or fold unrelated changes into these PRs.

## Implementation review links

- Theme foundation: [#1194](https://github.com/samouraiworld/memba/pull/1194), branch `feat/system-theme-preference`.
- Validators pilot: [#1195](https://github.com/samouraiworld/memba/pull/1195), branch `feat/validators-professional-pilot`, based on the theme branch. Worktree `Memba-worktrees/validators-professional-pilot`.
- [Pilot handoff with run commands and verification limits](https://github.com/samouraiworld/memba/blob/feat/validators-professional-pilot/docs/design/professional-mainnet-2026-09/PILOT-HANDOFF.md).

## Decisions for the rendered pilot review

1. Does the desktop density/spacing suit everyday professional work?
2. Keep the mobile network overview collapsed by default?
3. Keep the seven primary columns (six without uptime data) and grouped All columns, or refine column selection next?
4. Approve the Light / true Black treatment for the next feature family?

These decisions concern the working preview. No production release or global navigation change follows automatically.
