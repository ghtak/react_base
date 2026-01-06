# Micro Spec 01: Route Connection & Empty Page Creation

## Goal
Establish the routing configuration and create the initial blank page component to verify the URL is accessible.

## Requirements
1.  **Route Configuration**:
    - Ensure `src/routes/_main/sample.tsx` is correctly configured using `@tanstack/react-router`.
    - Path: `/sample` (under `_main` layout).
    - Component: `SamplePage`.

2.  **Base Page Component**:
    - File: `src/features/sample/pages/sample-page.tsx`.
    - Content: A simple `div` containing a header "Sample Page" to verify rendering.
    - Style: Basic padding to ensure it's not hidden behind navbars.

## Verification
-   Visit `/sample` path.
-   Verify "Sample Page" text is visible.
-   Verify Main Layout (Nav, etc.) is present around the page.
