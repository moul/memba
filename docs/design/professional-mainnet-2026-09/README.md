# Memba: professional mainnet design study

**14 September 2026 · Audit and proposals · Awaiting discussion**

Memba has substantial functionality, but its presentation still asks users to interpret a developer-oriented ecosystem dashboard. The strongest opportunity is to make everyday governance and treasury work immediately understandable, while preserving technical depth and truthful network status.

**Recommendation for discussion:** A, Quiet Confidence, as the primary visual direction; develop an equally deliberate dark theme informed by B. Keep Memba's teal identity and a restrained, distinct treatment for network governance. Audience priority, theme default, navigation, and branding remain unapproved.

## Read this study

1. [Audit: findings and coverage of every feature family](AUDIT.md)
2. [Three art directions and concrete UX proposals](PROPOSALS.md)
3. [Safe collaboration proposal and decision gates](WORKING-AGREEMENT.md)
4. [Route and page inventory](INVENTORY.md)

![Three visual directions](assets/directions.png)

![Governance concept on desktop and mobile](assets/governance-desktop-mobile.png)

These are generated discussion sketches with illustrative data. They are not implemented screens or final specifications. The monogram in the first board is a placeholder, not a proposed approved logo. See the limitations in PROPOSALS.md before using either board for development.

## Scope and evidence

Only the Memba repository is in scope. This branch adds design documentation and concept images; it changes no application code, configuration, dependencies, contracts, or deployment settings.

The study combines three user screenshots, a source-based heuristic review at `e20d261b`, and limited public, disconnected browser inspection. It inventories all routed feature families, including gated features and plugins. It does **not** certify every authenticated flow, every deployment, accessibility conformance, or contract security. Coverage depth and remaining validation are explicit in the audit.

The shared `/Memba` checkout was on `main` at `4a7081ec`, clean and two commits behind its local `origin/main` reference. The isolated worktree was created from that reference at `e20d261b` on `docs/professional-design-audit`. This records the exact audit snapshot rather than claiming it was the latest deployed version.

## Decisions to discuss

- Which audience leads: DAO/treasury teams, mainstream communities, or operators?
- A, B, C, or a specific combination? Light-first, dark-first, or system default?
- Can we simplify the top-level navigation and move discovery/community features into a clearly accessible Explore area?
- Preserve the current emblem, refine it, or explore branding separately?
- Is the validators table or the DAO proposal experience the best first design proof?

After these decisions, prepare an implementation-plan proposal with dependency order, bounded PRs, ownership, acceptance criteria, compatibility checks, and rollback. This study deliberately does not begin that implementation.
