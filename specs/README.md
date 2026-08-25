The `/specs` directory is the single source of truth for the project.

Every product decision, feature proposal, implementation plan, architectural
change, engineering milestone, and technical decision should be reflected
somewhere inside this directory.

The goal is to ensure that every human developer and AI coding agent
understands:

- What the product is trying to achieve.
- What work is planned.
- What is currently being implemented.
- What has already shipped.
- Why architectural decisions were made.
- What should be built next.

The specification system should always stay synchronized with the actual state
of the project.

---

# Directory Structure

```text
/specs
README.md
roadmap.md
backlog.md
progress.md
changelog.md

active/
completed/
decisions/
```

Each file serves a different purpose and should only contain the type of
information it is responsible for.

---

# Documentation Flow

Typical development follows this lifecycle:

```
Idea
    ↓
roadmap.md
    ↓
backlog.md
    ↓
active/<feature>.md
    ↓
Implementation
    ↓
progress.md
    ↓
completed/<feature>.md
    ↓
changelog.md
```

Architecture decisions can occur at any stage and should be documented inside
`decisions/`.

---

# File Responsibilities

## roadmap.md

Purpose:

Describe where the product is going.

Contents include:

- Long-term vision
- Major milestones
- Planned releases
- Platform evolution
- Infrastructure goals
- Scaling plans
- Technical debt initiatives
- Future features

Do **not** include implementation details.

Update when priorities or long-term direction changes.

---

## backlog.md

Purpose:

Maintain a prioritized list of work that has not started.

Examples:

- New features
- Bugs
- Refactoring
- Performance improvements
- Security tasks
- Research spikes
- Infrastructure work

Each backlog item should eventually become an Active Specification before
implementation begins.

Once work starts, remove the item from the backlog.

---

## progress.md

Purpose:

Track the current engineering state.

Examples:

- Features in progress
- Recently completed work
- Known blockers
- Testing status
- Deployment readiness
- Integration progress

This document answers:

> "What is happening right now?"

Keep this file current throughout development.

---

## changelog.md

Purpose:

Maintain a historical record of delivered work.

Each completed release should record:

- Date
- Version
- Features shipped
- Bug fixes
- Database migrations
- Infrastructure changes
- Breaking changes
- Security updates

Never remove historical entries.

Append new releases chronologically.

---

# Active Specifications

Location:

```
active/
```

Each active specification represents one feature, system, service, or
engineering initiative currently under development.

Examples:

```
active/
    auth-system.md
    billing-service.md
    notifications.md
    analytics.md
```

Each specification should be self-contained.

Recommended sections include:

```markdown
# Overview

# Goals

# Requirements

# User Stories

# Architecture

# API Design

# Database Changes

# UI/UX

# Security

# Dependencies

# Implementation Plan

# Acceptance Criteria

# Open Questions

# Progress Notes
```

An active specification is the primary implementation document.

Developers and AI agents should consult it before writing code.

---

# Completed Specifications

Location:

```
completed/
```

When a feature has been:

- implemented,
- tested,
- deployed,
- and accepted,

move its specification from:

```
active/
```

to

```
completed/
```

Do not rewrite history.

Completed specifications should preserve:

- implementation decisions
- rollout strategy
- lessons learned
- production notes
- migration details

These documents provide historical context and simplify future maintenance.

---

# Architecture Decision Records (ADRs)

Location:

```
decisions/
```

Architecture Decision Records capture important engineering choices.

Examples:

```
0001-use-nestjs.md
0002-adopt-event-driven.md
0003-use-prisma.md
0004-adopt-openapi.md
```

Each ADR should contain:

```markdown
# Title

## Status

Accepted / Proposed / Deprecated

## Context

Why was a decision needed?

## Decision

What was chosen?

## Alternatives Considered

What other options were evaluated?

## Consequences

Benefits

Tradeoffs

Risks

Future implications
```

Create a new ADR whenever a significant technical decision is made.

Never overwrite an existing ADR.

If direction changes later, create a new ADR referencing the previous one.

---

# Recommended Development Workflow

## 1. Plan

Update `roadmap.md` when introducing major initiatives.

---

## 2. Prioritize

Add new work to `backlog.md`.

---

## 3. Start Development

Create:

```
active/<feature>.md
```

Document:

- requirements
- architecture
- APIs
- implementation plan
- acceptance criteria

---

## 4. Implement

Write code according to the active specification.

Update `progress.md` continuously.

If implementation changes the original design, update the specification before
continuing.

The specification should always reflect reality.

---

## 5. Record Decisions

Whenever an important technical choice is made:

Create a new ADR inside:

```
decisions/
```

Explain:

- why the decision was made
- alternatives considered
- expected consequences

---

## 6. Complete

After successful deployment:

- Move the specification into `completed/`
- Update `changelog.md`
- Remove the item from `progress.md`
- Remove the item from `backlog.md`

---

# AI Agent Guidelines

Before implementing any code:

1. Read `roadmap.md` to understand long-term direction.
2. Read `backlog.md` for pending work.
3. Read `progress.md` for current implementation status.
4. Read all relevant files in `active/`.
5. Read related ADRs in `decisions/`.

During implementation:

- Follow the active specification.
- Keep documentation synchronized with implementation.
- Update progress as work advances.
- Document new architectural decisions.
- Do not implement undocumented major features.

After implementation:

- Update the active specification to match the final implementation.
- Record completed work in `changelog.md`.
- Archive the specification into `completed/`.

---

# Documentation Principles

- Documentation is the source of truth.
- Code should follow the specification.
- Specifications should evolve alongside implementation.
- Every architectural decision should be documented.
- Historical records should never be rewritten.
- Keep documents concise, accurate, and current.
- Prefer updating existing documents over creating duplicate information.
- Ensure every feature has a clear lifecycle from planning to completion.

Following these practices ensures that both human contributors and AI agents can
reliably understand the project's current state, future direction, historical
context, and architectural rationale without relying on tribal knowledge.
