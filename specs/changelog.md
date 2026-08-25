# Changelog

## 2026-07-16

- Split the repo into `client/` and `server/`, moved the Vite SPA into `client/`, and added a NestJS Gemini proxy in `server/`.
- Replaced the browser-side Gemini SDK call with a frontend fetch helper that calls the Nest API.
- Added new legal routes and page components for Privacy Policy and Terms of
  Service.
- Added a global footer rendered across all pages with `Privacy` and `Terms`
  links.
- Added dynamic copyright string using `©` and current year.

## 2026-07-15

- Added Google Analytics 4 bootstrap script with measurement ID
  `G-HK9Z7WTK32` to `index.html`.
- Added `src/hooks/useAnalytics.ts` for typed, reusable event tracking.
- Added click tracking for key conversion/navigation actions:
  - Home page `View Pricing` CTA.
  - Landing audio consent `Turn on audio` CTA.
  - Pricing package CTA clicks in `PricingCard`.
  - Header and mobile side-menu navigation/settings interactions.
  - Contact page Instagram CTA.
- Validation run completed successfully with lint and tests passing.
