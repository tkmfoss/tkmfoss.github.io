# FOSS Cell TKMCE – Project Documentation

This document summarizes the responsive navbar, manifesto, community, and layout improvements implemented in the project.

## Development

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run build
npm run lint
```

---

## Summary of Changes

### Files modified
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/AnnouncementBanner.tsx`
- `src/pages/Manifesto.tsx`
- `src/pages/Community.tsx`
- `src/pages/Home.tsx`
- `src/App.tsx`
- `src/index.css`

### 1. Mobile Navbar Redesign and Hamburger Animation
**File:** `src/components/Navbar.tsx`

- Replaced the desktop-only hamburger icon swap with an animated 3-line hamburger that transforms into an `×` using CSS transitions (~300ms, `ease-in-out`).
- Converted the mobile menu into a dropdown below the navbar with compact, touch-friendly rows and themed styling.
- Added dropdown open/close animation using opacity and subtle downward movement (~250ms).
- Added backdrop blur/dark overlay behind the dropdown, with correct stacking:
  - Backdrop: `z-[35]`
  - Navbar: `z-40`
  - Dropdown: `z-50`
- Restricted the overlay to mobile using `lg:hidden`.
- Added Escape and click-away handling.
- Locked background scrolling while the menu is open and restored it correctly, including scrollbar-width compensation to prevent layout shift.
- Made closed menu links unfocusable and non-interactive using `inert` and `tabIndex`.
- Added accessibility attributes: `aria-expanded`, `aria-controls`, `aria-hidden`.
- Preserved desktop navigation and existing styling.

### 2. Manifesto Comparison Mobile Simplification
**File:** `src/pages/Manifesto.tsx`

- Kept the existing desktop side-by-side comparison table (`hidden md:block`).
- Added a compact mobile comparison list (`md:hidden`) with:
  - uppercase criterion label
  - green `+` Free software line
  - red `−` Proprietary line
- Used thin separators and compact spacing.
- Preserved all comparison text without rewriting content.
- Replaced the mobile horizontal-scroll hint with `// FIELD COMPARISON`.

### 3. Mobile Background Blur for Navbar Menu
**File:** `src/components/Navbar.tsx`

- Replaced immediate unmounting of the click-away layer with a persistent overlay.
- Added `backdrop-blur-sm` and `bg-black/50`.
- Added smooth 250ms fade-in/fade-out transition.
- Used `motion-reduce:transition-none`.
- Overlay closes the menu when clicked and does not block navbar/dropdown interaction.

### 4. Compact Footer and Hide Directory on Mobile
**File:** `src/components/Footer.tsx`

- Hid the entire `// DIRECTORY` section on mobile only using `hidden md:block`.
- Preserved all directory destinations; verified corresponding links already exist in the mobile hamburger menu.
- Reduced mobile-only vertical padding/spacing:
  - outer padding
  - grid gap
  - section spacing
  - directory/network list spacing
  - bottom bar spacing
- Reduced network link row padding while preserving 40px mobile touch targets.
- Tightened technology tag spacing.
- Left desktop layout unchanged via responsive overrides.

### 5. Mobile Navbar Fixed Position
**Files:**
- `src/components/Navbar.tsx`
- `src/App.tsx`
- `src/components/AnnouncementBanner.tsx`
- `src/index.css`

- Changed the navbar from `sticky top-0` to `fixed lg:sticky top-0 left-0 right-0` so it remains visible on mobile.
- Added a mobile-only spacer when no announcement is active to prevent content from being hidden.
- Added `mt-20 lg:mt-0` to the announcement banner so it renders below the fixed mobile navbar.
- Changed relevant horizontal overflow utilities from `overflow-x: hidden` to `overflow-x: clip` in `src/App.tsx` and `src/index.css` to address sticky/fixed positioning containment issues.
- Preserved desktop behavior and existing theme.

### 6. Compact Contact/Social Media Cards
**File:** `src/pages/Community.tsx`

- Removed temporary compact single-line links.
- Restored original card-style Contact cards for all breakpoints.
- Applied mobile-only compact spacing:
  - padding
  - header/description/action gaps
  - card grid gap
- Added `line-clamp-2` to descriptions while retaining full text.
- Allowed titles and URLs to wrap safely without horizontal overflow.
- Preserved desktop card content and styling unchanged.

### 7. FAQ Accordion
**File:** `src/pages/Community.tsx`

- Converted the statically displayed FAQ list into an accordion.
- Questions render as keyboard-accessible buttons with `aria-expanded` and `aria-controls`.
- Answers are collapsed by default.
- Supports multiple open items.
- Added smooth height and opacity transitions (~250ms) using `grid-rows-[0fr]` / `grid-rows-[1fr]`.
- Added a rotating `+` / `−` indicator.
- Preserved question numbers, wording, answers, and `// FAQ_DATABASE` styling.
- Respected `prefers-reduced-motion`.

### 8. Freedoms Mobile Swipe Carousel
**File:** `src/pages/Manifesto.tsx`

- Added a mobile-only horizontal snap-scroll carousel for “THE FOUR FUNDAMENTAL FREEDOMS”.
- Shows one complete freedom card at a time.
- Preserved identifier, title, description, and system execution command.
- Added:
  - native touch swipe support
  - keyboard arrow navigation
  - swipe hint with terminal-style pulse animation
  - animated dots
- Fixed long command overflow inside its own container (`overflow-x-auto`) to avoid page-level horizontal scrolling.
- Used native scrolling; no new dependencies.
- Left desktop four-card grid unchanged using `hidden md:grid`.
- Removed previous/next buttons and numeric counter per refinement request.
- Respected `prefers-reduced-motion`.

### 9. Single Global CLI Launcher
**Files:**
- `src/App.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/pages/Home.tsx`

- Kept only the persistent floating CLI launcher in the bottom-right corner.
- Removed duplicate CLI buttons from:
  - navbar ticker
  - navbar action area
  - mobile dropdown
  - footer directory
  - Home hero section
  - Home system-status card
- Updated component props and calls to remove now-unused `onOpenTerminal` handlers.
- Improved floating launcher safe-area handling with responsive bottom insets.
- Preserved terminal modal, launcher styling, borders, colors, typography, and keyboard accessibility.

### Verification performed
- `npm run build` — succeeded after each major implementation pass.
- `npm run lint` — passed with only pre-existing warnings:
  - `src/pages/Events.tsx`
  - `src/pages/Home.tsx`
  - (Fast refresh component export warnings)
- Browser/live visual testing is not available in this environment; responsive and animation behavior was implemented using established Tailwind/React patterns.