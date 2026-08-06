# Archaeologist Git Churn & Temporal Coupling Honesty Bounds

The honesty layer is the operational expression of the **G10DC Trellis Standard**: **the processing engine reasons over verified evidence with stated confidence, never hallucinates capabilities or impact.**

## Domain & Scope
**Domain**: Git Packfile & Commit History Analysis

## Core Epistemic Rules

1. **Temporal Coupling vs Causality: Co-committed files indicate statistical coupling, not architectural dependency.**
2. **Survival Curve Bounds: Line age analysis is sensitive to mass refactors (squash commits discount real age).**
3. **Confidence Rating: High (>50 commits analyzed), Medium (10-50 commits), Low (<10 commits).**

## Three-Tier Confidence Model

- **High Confidence**: Full AST/schema validation passing, deterministic evidence available, verified state.
- **Medium Confidence**: Heuristic analysis or partial indexing; requires agent verification step.
- **Low Confidence**: Inferred or unindexed target; candidate output ONLY, never auto-committed.

## Epistemic Invariant

> Absence of evidence is not evidence of absence. Output is presented as a structured candidate set with confidence scores so caveats cannot be silently dropped downstream.
