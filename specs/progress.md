# Progress

## In Progress

- Active spec: `specs/active/revived-canvas-spa.md`.
- Repo has been split into `client/` and `server/`; the Gemini chat flow now posts to the Nest API.
- Preparing GitHub Pages deployment verification on `main` branch.

## Completed Recently

- Moved the Vite frontend into `client/` and introduced a NestJS `server/` app.
- Replaced the browser Gemini SDK call with a frontend fetch helper that posts to the Nest endpoint.
- Added a single Nest Gemini endpoint that reproduces the existing chat prompt construction and response fallback behavior.
- Added strict, typed `react-i18next` localization with modular namespaces
  under `public/locales/en/` and migrated component/page UI copy to
  selector-based `t(($) => ...)` calls.
- Added dedicated Privacy and Terms pages with legal copy and high-contrast
  readable layouts.
- Added global footer across app routes with legal navigation links and dynamic
  copyright year.
- Added GA4 integration (`G-HK9Z7WTK32`) via gtag bootstrap in `index.html`.
- Added reusable analytics hook (`src/hooks/useAnalytics.ts`) for consistent
  event tracking.
- Instrumented key CTA/navigation interactions (home pricing CTA, landing audio
  consent, pricing package CTAs, header/side-menu navigation and toggles,
  contact Instagram CTA).
- Built TypeScript React + Vite + Tailwind SPA implementation.
- Implemented landing timeline with viewport-aware video playback.
- Implemented pricing page with animated background and package cards.
- Added component-level refactor for maintainability (header icons, timeline,
  pricing cards/hero).
- Added class-based dark mode support in Tailwind config.
- Added GitHub Pages workflow and static base config.
- Added environment-based Google Form URL configuration
  (`VITE_GOOGLE_FORM_URL`).
- Added smoke tests for Home/Pricing rendering and tab switching
  (`src/App.test.tsx`).

## Blockers

- No code blockers currently.
- Production Google Form URL value still needs to be provided.

## Notes

- The server owns the Gemini API key and the prompt assembly; the client no longer imports `@google/genai`.

## Validation Status

- Lint: passing.
- Build: passing.
- Type check: passing (`npx tsc -b`).
- Tests: passing (`npm run test -- --run`).
