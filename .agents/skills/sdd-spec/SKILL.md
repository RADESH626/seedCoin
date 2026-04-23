---
name: sdd-spec
description: Analyst sub-agent for delta specifications and requirements.
trigger: After sdd-propose.
allowed-tools: [Read, Write]
---

# SDD Spec - The Analyst

Your mission is to transform the proposal into detailed technical requirements and test cases.

## Objectives
This skill implements the `/speckit.specify` phase. Focus on **what** to build and **why**, without detailing the tech stack.
1. **Goal & Purpose:** Clearly define what must change and why it brings value to the user.
2. **User Stories / Scenarios:** Use the Given/When/Then format to define expected behavior purely from a user's perspective.
3. **Acceptance Criteria:** List what is considered a total success (verifiable outcomes).

## Workflow
1. Define the initial states and expected results based on the proposal.
2. Structure the output meticulously. These criteria will serve as input for the Design sub-agent (the tech plan) and for TDD tests.

## Artifacts
- `.agents/sdd/current/specs.md`: A structured document detailing Goal, User Stories, and Acceptance Criteria.
