# Professional design task ledger

Updated 2026-09-14. Autonomous pilot completion authorized; final review is consolidated in REVIEW.md. Owner: current design implementation session. Memba only. No background agents, automations, merges or deployments.

## Baseline and isolation

- Initial integration base: `98b8b762`; refreshed to `d49896a1` while preserving the landed validator accessibility and protobuf changes. Theme head `d3028e88`; pilot head `a3f8559b`.
- Shared `Memba` checkout remains untouched on its existing `main` revision.
- P1 branch: `feat/system-theme-preference`.
- P1 worktree: `Memba-worktrees/system-theme-preference`.
- Separate active worktree `review-main-98b8b76` has validator accessibility work. Preserve semantic rows/sort buttons and incorporate landed changes when updating the pilot base; do not modify that checkout.
- Decisions: D-01 through D-10. Branding: 01 / Folded M selected, asset adoption separate.

| Task | Status | Owned files / dependency | Handoff |
|---|---|---|---|
| P0 Baseline | In review | This ledger; deterministic E2E fixture and pilot handoff | Base `98b8b762`; source/user-screenshot baseline, labelled rendered fixtures and read-only live inspection recorded. Remaining state gates are explicit. |
| P1 Theme preference | In review · [#1194](https://github.com/samouraiworld/memba/pull/1194) | `lib/themeStore.ts`, shared `ThemeSelect`, topbar/mobile/settings/palette callers, tests, changelog | Preserves palette and resolved `light/dark` contract. Initial local 5,002 unit tests, build/lint, backend/race and Buf passed. Refreshed branch passes full remote CI, including Node 20/22, Chromium E2E and mobile guardrails. CI found iPhone clipping; narrower mobile header passes 20 local guardrails. Desktop CI exposed an ambiguous network-picker test after adding the theme picker; the semantic selector fix passes the three affected local tests. Corrected remote CI is green; evidence is linked in REVIEW.md. |
| P2 Scoped foundations | In review · [#1195](https://github.com/samouraiworld/memba/pull/1195) | `Layout.tsx`, scoped pro stylesheet/config predicate, optional notice style tokens | Default-off presentation flag; Validators overview allowlist only. |
| P3 Validators presentation | In review · #1195 | `Validators.tsx`, scoped CSS, relevant validator tests | Same queries and metric derivation; responsive rendered proof. Initial local 5,017 unit tests passed; final CI unit/build/lint checks and 36 local preview browser cases pass. Larger status/pagination text and resolved-incident contrast verified after the mainline refresh. See the handoff for review limits. |
| P4 Optional interactions | Implemented for final review · #1195 | Narrow table control surface | Grouped All columns plus health filter with Unknown implemented. Keyboard scrolling, filter/paging resets and missing data verified. Individual column preferences and saved presets/density deliberately deferred. |
| P5 Pilot review | Awaiting user review | Reproducible preview, screenshots, validation evidence | Production flag stays off. Mixed health and missing-signal states verified. Manual screen-reader, physical-device, browser zoom and connected-wallet reviews remain rollout gates. |
| P6 shell / B1 artwork | In review · [#1196](https://github.com/samouraiworld/memba/pull/1196) | `feat/professional-shell-brand`, stacked on #1195; own worktree and dependency cache. Shell flag, manifest-derived presentation, SVG/PNG identity package | 19 targeted unit tests, build/lint, 35 browser checks passed locally; additional mobile search-focus checks passed. Full CI is linked from the PR. [Review pack](https://github.com/samouraiworld/memba/blob/feat/professional-shell-brand/docs/design/professional-mainnet-2026-09/SHELL-BRAND-REVIEW.md). |
| P7 bodies / production brand activation | Next staged work | DAO/proposal body first; metadata/icons integration separately | Keep transaction and realm changes independently owned. No production flags or metadata have been activated. |

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

## Next-stage scope record

D-10 extends autonomous implementation into a review-only navigation shell and Folded M artwork. New branch `feat/professional-shell-brand` is based on pilot head `a3f8559b`; implementation commit `a0299c27`. Main was inspected at `08f8b04b` without changing the shared checkout. See [the shell handoff](https://github.com/samouraiworld/memba/blob/feat/professional-shell-brand/docs/design/professional-mainnet-2026-09/SHELL-BRAND-HANDOFF.md) for route mapping, token specifications and ownership boundaries.
