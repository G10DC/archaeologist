---
name: archaeologist
status: implemented
description: >-
  Git commit-touch-frequency counter. Shells out to `git log --name-only` over
  the last N commits and ranks files by how often they appear, as a raw churn
  proxy. Use for a quick "which files change most often" signal from git
  history. Never use for dependency analysis -- use trellis; never expect
  temporal coupling or complexity-weighted hotspots -- neither is computed.
---

# Archaeologist

**Git commit-touch-frequency counter.** Runs `git log --name-only --oneline -n <limit>` and counts how many of the last N commits touched each file. That count is the entire signal — a raw churn proxy, not a weighted hotspot score.

## What it actually does
Shells out to `git log` (default `-n 100`) via `execSync` — a real history read, not a mock —
splits it into commits, counts file occurrences, returns the top 20 by raw touch count.

## What it does not do (despite what the name suggests)
- **No temporal coupling** — doesn't detect files that change together in the same commit.
- **No complexity weighting** — churn isn't combined with cyclomatic complexity or any other metric.
- **No ownership or survival-curve data** — no author attribution, no time-series decay.
- **No packfile streaming** — shells out to `git`; doesn't parse `.pack`/`.idx` itself.

## Usage (library, not a CLI)

```js
import { ArchaeologistAnalyzer } from './lib/archaeologist.js';

const result = new ArchaeologistAnalyzer().analyzeGitHistory('/path/to/repo', 200);
// result.hotspots: [{ file, churn }, ...] top 20 by touch count
```

## When to use

- A fast, approximate "which files changed most in the last N commits" signal, as one input
  among several before deciding where to focus a refactor.

## When NOT to use

- **Files that change *together*** (temporal coupling) — not computed anywhere in this repo.
- **Complexity-weighted hotspots or ownership data** — not available.
- **Current dependency reachability, not historical churn** → use `trellis`.
