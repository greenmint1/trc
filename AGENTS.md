# AGENTS.md: The Revived Canvas Operating Contract

This file is the authoritative implementation contract for all coding agents
working in this repository.

Use it as a strict boundary for architecture, design, code quality, and
workflow behavior.

---

## 1. Mission and Product Reality

- Build and maintain a static React + Vite portfolio SPA for The Revived Canvas.
- Prioritize premium art-first presentation, smooth media playback, and
  frictionless mobile behavior.
- Treat this as a zero-backend application: no server APIs, no database, no SSR.
- Keep all delivery compatible with static hosting (especially GitHub Pages).

---

## 2. Current Stack and Runtime

- React 19 + TypeScript + Vite.
- React Router v7 in hash mode.
- Tailwind CSS with custom brand tokens.
- Vitest + Testing Library + JSDOM for tests.
- ESLint flat config with TypeScript + React Hooks rules.

Primary command set:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run test:watch
```

---

## 3. Architecture Map

### App shell and routing

- App entry is `src/main.tsx`.
- App shell and routes are in `src/App.tsx`.
- Routing is hash-based (`HashRouter`) to avoid static-host 404 problems.
- Route set: `/`, `/pricing`, `/about`, `/contact`, `/privacy`, `/terms`.
- Pages are lazy loaded via `React.lazy(...)` + `Suspense`.
- Footer placement is route-sensitive: render shell-level footer on non-home
  routes, but keep home-route footer inside the landing snap scroll stack
  (`src/pages/HomePage.tsx`) to preserve full-height snap behavior and correct
  audio-consent modal centering.

### Feature boundaries

- `src/pages/`: route-level containers and composition.
- `src/components/`: reusable UI and section components.
- `src/context/`: global video/audio state and provider.
- `src/hooks/`: viewport and preload media hooks.
- `src/data/`: static copy and package content.
- `src/types/`: shared UI/data contracts.
- `src/locales/en/pages/`: page-level translation JSON files (`home`, `pricing`, `about`, `contact`, `privacy`, `terms`).
- `src/locales/en/components/`: shared/reusable component translation JSON files (`common`, `footer`, `audioConsent`, and new feature components).
- Prefer the `@src/` alias for imports inside `src`; avoid relative import paths like `./` and `../` when referencing app code.
- When adding a new page/route, update `src/components/GeminiChatAssistant/useGeminiChatAssistant.ts`
  (`getAssistantNamespace`) and add the matching page translation JSON under
  `src/locales/en/pages/` so the assistant can use the new page context.
- Any new user-facing text added during implementation must be localized in
  `src/locales/en/components/` or `src/locales/en/pages/`; do not leave
  hardcoded UI copy in components/pages.
- If a new feature introduces a reusable component domain, create a dedicated
  JSON file in `src/locales/en/components/` and register it in
  `src/i18n/resources.ts`.

### Visual layering pattern

- Home page owns the scrolling timeline experience.
- Pricing/About/Contact use background video + overlay wrappers
  (`PageBackgroundVideo`, `PageBackgroundOverlay`) with foreground content.

---

## 4. Video and Audio System Rules (Critical)

The video/audio model is the most sensitive part of this app. Preserve behavior.

### Source of truth

- `VideoAudioProvider` in `src/context/VideoAudioProvider.tsx` is the global
  controller.
- Videos self-register through `VideoPanel` using `registerVideo` / `unregisterVideo`.

### Consent and mute model

- `hasAudioConsent` and `isSoundEnabled` are intentionally separate.
- Consent is granted only after explicit user action on landing modal.
- Turning sound off after consent must not re-show consent gate.
- Playback is still allowed when muted.

### Focus selection algorithm

When choosing which video can be audible:

1. Prefer entries with intersection ratio >= 0.55.
2. Fallback to entries with ratio > 0 if none meet threshold.
3. If a repeated `audioGroup` exists in view, prioritize grouped candidates.
4. Sort by `audioPriority` (lower wins), then visibility ratio (higher wins),
   then top-most position, then left-most position.

### Media application behavior

- Only the focused video may be audible when sound is enabled.
- Non-focused videos must stay muted.
- Invisible videos should pause.
- Visible videos should play when consent is available.

### Hook conventions

- `useVideoInViewport` uses IntersectionObserver thresholds
  `[0, 0.35, 0.6, 0.85]`.
- `useVideoPreload` gates initial landing render on first video readiness.

---

## 5. Styling and Design Contract

### Design direction

- Keep the visual language premium, minimal, and art-forward.
- Motion should be subtle and purposeful.
- Avoid ornamental UI noise that competes with artwork.

### Tailwind tokens (enforced)

Only use the configured brand palette and extensions from `tailwind.config.js`.

```js
const colors = {
  brand: {
    black: "#000000",
    darkGray: "#121212",
    white: "#FFFFFF",
    lightGray: "#F5F5F7",
    green: {
      DEFAULT: "#00F59B",
      hover: "#00D485",
      muted: "#102A20",
    },
  },
};
```

Also enforce:

- `fontFamily.body`: Lato/Roboto stack.
- `fontFamily.brand`: Cause/Roboto stack.
- `boxShadow.neon` for select accent emphasis only.

### Theming

- Dark mode is class-based (`darkMode: 'class'`).
- Theme toggles the `dark` class on `document.documentElement`.
- Theme key in local storage: `trc-theme`.

### Layout and responsiveness

- Keep timeline/video sections `h-full` and `overflow-hidden` to prevent nested
  scroll traps.
- Preserve snap-scrolling behavior on landing container.
- Respect existing responsive breakpoints and mobile-first flow.

---

## 6. Component and Code Conventions

- Prefer named exports for components, hooks, and helpers.
- Keep components focused: presentational components should not own global state.
- Centralize shared icons in `src/assets/svg/icons.tsx`; do not duplicate inline
  SVG icons in unrelated files.
- Keep static copy in `src/data/content.ts` unless there is a strong reason not to.
- Use TypeScript strict mode patterns and keep prop contracts explicit.
- Use concise, high-signal comments only where logic is non-obvious.
- **Always use the `AppRoute` enum from `src/types/app.ts` for route path
  strings.** Never use raw string literals like `"/pricing"` in `navigate()`,
  `<Route path>`, `<Link to>`, or `location.pathname` comparisons. Add new
  routes to the enum first, then reference the enum member everywhere.

---

## 7. Accessibility and UX Baseline

- Ensure all interactive controls have accessible labels.
- Preserve existing `aria-current`, `aria-expanded`, and button semantics.
- Avoid introducing keyboard traps in overlays/menus.
- Maintain readable contrast in both themes.
- Keep motion respectful of UX; avoid excessive animation churn.

---

## 7.1 Analytics Instrumentation Baseline

- Treat analytics as part of feature completeness, not an optional follow-up.
- For new user-facing features, add or update tracking for key intents:
  - page views for newly introduced routes/pages,
  - primary CTA clicks,
  - high-value outbound links,
  - critical navigation and settings interactions that affect conversion flow.
- Reuse the shared analytics utilities/hooks (do not duplicate ad-hoc tracking
  logic per component).
- Keep event naming consistent and descriptive so GA reporting remains usable.
- During implementation handoff, explicitly state what events were added or why
  no analytics changes were required.

---

## 8. Testing and Validation Expectations

- Maintain smoke coverage in `src/App.test.tsx` for core shell/navigation flows.
- Include `src/test/setup.ts` mocks when adding browser APIs unsupported in JSDOM.
- For changes in audio/video logic, add focused unit/integration tests for:
  - consent gating,
  - focus selection,
  - mute/play behavior.
- Run `npm run lint` and `npm run test` before finalizing substantial changes.

---

## 9. Specs-Driven Workflow (Required)

The `specs/` folder is a required process artifact, not optional docs.

- Align active coding work with `specs/active/`.
- Reflect in-flight status in `specs/progress.md`.
- Move finished work records into `specs/completed/` when appropriate.
- Record release history in `specs/changelog.md`.
- Capture important architecture tradeoffs in `specs/decisions/`.

If implementation diverges from spec docs, update specs in the same work cycle.

---

## 10. Known Repository Realities and Guardrails

- `react-router-dom` is used with hash routing despite older docs that mention
  state-tab switching.
- Global audio control lives in header + landing consent flow; individual panels
  should not add separate sound toggles.
- Hidden mobile menu markup can duplicate role queries in tests; account for this
  in Testing Library selectors.
- `src/App.css` still contains starter-style remnants and is a candidate for
  cleanup.
- Keep local static asset paths under `public/assets/animations` stable unless
  you update all references in `src/data/content.ts`.

---

## 11. Anti-Patterns to Avoid

- Do not add backend assumptions (fetch layers, API clients, server contracts)
  without explicit project direction changes.
- Do not replace HashRouter with BrowserRouter for static hosting.
- Do not bypass brand tokens with random one-off color values.
- Do not split audio consent and mute logic into component-local state.
- Do not add per-component icon duplicates when a shared icon already exists.
- Do not introduce heavy visual effects that distract from artwork.
- Do not use relative import paths for app code; use the `@src/` alias instead.

---

## 12. Environment and Content Config

- Optional environment variable: `VITE_GOOGLE_FORM_URL`.
- Fallback form URL is defined in `src/data/content.ts`.
- If modifying package CTA flow, verify all pricing buttons still route to the
  correct form destination.

---

## 13. Agent Completion Checklist

Before finalizing any significant change, verify:

1. Architecture behavior was preserved (especially media/audio rules).
2. Styling stays within brand tokens and established visual direction.
3. Responsive behavior was checked for landing and pricing experiences.
4. Tests and lint were run or any skipped validation is explicitly reported.
5. `specs/` documentation remains synchronized with implementation state.
