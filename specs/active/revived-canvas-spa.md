# Overview

Active implementation spec for The Revived Canvas static React SPA.

# Goals

- Ship production-ready landing and pricing experience from the original spec.
- Ensure static hosting compatibility for GitHub Pages.
- Keep specification documents synchronized with implemented state.

# Requirements

- React + Vite + Tailwind static SPA.
- Hash-based routing for static hosting compatibility, including `/`,
  `/pricing`, `/about`, `/contact`, `/privacy`, and `/terms`.
- Viewport-aware video playback using `IntersectionObserver`.
- Local font loading and custom brand palette.
- GitHub Pages deployment workflow.

# Implementation Plan

1. Implement SPA layout, home timeline, and pricing sections.
2. Add media assets and brand typography.
3. Extract reusable UI components and hooks.
4. Configure static deployment workflow.
5. Sync backlog/progress/changelog specs.

# Acceptance Criteria

- Home and pricing pages match required content structure and interactions.
- All required animation assets render and watermark labels display.
- Theme toggle works through `dark` class on root.
- CI workflow builds and deploys `dist` to GitHub Pages.
- `specs` files reflect current implementation status.

# Progress Notes

- Core UI and interaction implementation completed.
- Component split/refactor completed for maintainability.
- GitHub Pages workflow and Vite static base added.
- Global footer with legal links and dedicated Privacy/Terms pages added.
- Remaining work tracked in `specs/backlog.md`.
