# Agile-based Iterative Agent Development Methodology

This document defines the collaboration protocol between the User (Human) and the AI Agent. The goal is to maximize code quality, maintainability, and review efficiency through a structured, iterative process.

## 1. Core Concepts

### Macro Plan (The Roadmap)
- **Role**: Lightweight Index & Status Board.
- **Format**: Markdown Checklist (`- [ ]`).
- **Linking**: References Micro Specs using Wiki-links (`[[path/to/spec.md]]`) or standard Markdown links (`[Title](./path/to/spec.md)`).
- **Rule**: context-light. No implementation details.

### Micro Spec (The Detail & Test Contract)
- **Role**: Context-Heavy Requirement & Verification Document.
- **Format**: Detailed Markdown.
- **Key Section**: `## Verification / Testing`.
  - Because the spec is local, testing criteria must be specific (e.g., "Input 'abc' -> Expect Error").
  - **TDD Ready**: Ideally, the spec defines the test cases *before* coding starts.
- **Lifecycle**: Active during the specific task, archived afterwards.

## 2. The Iterative Workflow

1.  **Macro Planning**:
    - Define high-level roadmap in `*.plan.md`.

2.  **Micro Spec & Test Definition**:
    - Create `specs/XX-feature.md`.
    - **Define Success Criteria**: Explicitly state how to verify this specific feature.

3.  **Atomic Execution**:
    - Implement code *and* local tests based on the Spec.

4.  **Localized Verification**:
    - Run the specific test or verification step.

5.  **Refinement & Sync**:
    - Update Micro Spec if requirements changed.
    - Update Macro Plan status.

## 3. Benefits (The "Why")

- **Context Optimization**: AI focuses on one thing at a time.
- **Micro-Agility**: "Design -> Spec -> Implement -> Refine" cycle is extremely fast with AI.
- **Localized Testing**: Clear scope and success criteria for each atomic unit.
- **Scalability & Extensibility**:
    - Adding a new feature = Creating a new Micro Spec.
    - No need to "fitting everything into one giant plan".
    - Modifying runs less risk of breaking unrelated parts because boundaries are clear.
