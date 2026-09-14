# Mainnet proposal status: reproducible rollout blocker

Observed during read-only design verification on 2026-09-14. This finding predates the professional preview: the unchanged pilot reader at `a3f8559b` reproduces it. No wallet was connected and no transaction was submitted.

## Evidence

The configured public RPC, `https://rpc.gno.land:443`, reported `node_info.network = gnoland-1` and height **47293**. A JSON-RPC `abci_query` with path `vm/qrender` and the base64-encoded argument `gno.land/r/gov/dao:4` returned a description containing `bank:p:restricted_denoms`, followed by this realm-generated status line:

```text
- **PROPOSAL HAS BEEN ACCEPTED**
```

The overview displays the proposal as passed / awaiting execution. The detail page displays ACTIVE in both the professional preview and the unchanged reader.

## Confirmed parser mechanism

In `frontend/src/lib/dao/proposals.ts`, `getProposalDetail` scans the complete render with:

```ts
/(?:PROPOSAL HAS BEEN\s+)?(\w+ED|ACTIVE)/i
```

Running that exact expression against the captured public render returns **restricted**, from the description, before reaching the authoritative ACCEPTED line. `normalizeStatus` then defaults this unrecognized token to `open`. The fallback `Status:` expression never runs because the earlier match is truthy.

This also explains why generic fixtures with status-first text pass while the actual realm render fails. The current presentation tests validate display/state behavior; they do not certify the existing parser against every realm dialect.

## Separate implementation scope

Fix status extraction against the realm-generated structure, not arbitrary words in user-authored titles/descriptions/action bodies. Preserve existing dialect handling and create regression fixtures from the captured shape before changing the parser. Do not make the shared status normalizer treat arbitrary words ending in “ed” as terminal states.

Required regressions:

- ACCEPTED after a description containing `restricted_denoms` parses as passed.
- Words such as accepted/rejected/executed/active inside titles, descriptions or action bodies cannot override the genuine realm status.
- Open, accepted, denied/rejected and executed cases remain correct across supported GovDAO, basedao and daokit formats.
- Overview and detail agree; member/archive restrictions and existing vote/execute message payloads stay intact.
- Verify the live realm read again without connecting a wallet; test transaction-control consequences with mocks and a non-production environment.

Treat this as a mainnet rollout gate. It is deliberately not fixed inside the presentation PR because the resulting status controls transaction eligibility. The broader parser, source-completeness and action-extraction contract needs its own review.
