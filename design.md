# CineMatch — Design System

> **Single source of truth** for typography, color, spacing, components, animations, and design principles.
> Generated from full codebase analysis of all components.

---

## 1. Design Principles

These principles are non-negotiable. Every future component must honor all of them.

| Principle | Rule |
|---|---|
| **Calm editorial feel** | The UI should feel like a curated magazine, not a streaming dashboard. Whitespace is intentional. |
| **White cards on blush background** | Every interactive card surface is `bg-white`. The page background is white with soft crimson blush orbs (`bg-crimson/5`). |
| **No gradients on interactive surfaces** | Buttons use solid crimson (`#E11D48`) or white. No gradient fills on buttons or cards ever. |
| **No glassmorphism** | Never use `backdrop-blur` on card overlays or modals. The one exception is the Navbar which uses `backdrop-blur-md` as a deliberate chrome element. |
| **No dark overlays** | Modals use `bg-white/60` backdrops, never `bg-black/50` or dark scrim. Stays consistent with the warm blush page. |
| **No shadow-2xl or heavy drop shadows** | Use `shadow-sm` on cards, `shadow-lg` only on Navbar, `shadow-md shadow-crimson/20` only on the primary CTA button. |
| **Crimson is accent-only** | `#E11D48` is used for: active states, icons in badges, progress indicators, status text, and the primary action button. It is never used as a background for cards or containers. |
| **Serif for hero / modal headings** | Page-level `<h1>` titles use `font-bold tracking-tight` (sans-serif). Serif (`Playfair Display`) is reserved for the movie title on the Result screen and modal question headers. |
| **Uppercase labels are semantic markers** | Section labels (`THE STORY`, `DIRECTOR`, `STARRING`, etc.) use `text-xs font-bold tracking-widest uppercase`. They orient the user without adding visual noise. |
| **Transitions are short** | All transitions are 0.18–0.25s. Never use slow animations (>0.3s) on interactive elements. |

---

## 2. Typography

### Font Families

```js
// tailwind.config.js
fontFamily: {
  sans: ['Inter', 'sans-serif'],       // body, UI, labels, buttons
  serif: ['Playfair Display', 'serif'] // movie titles, modal question headers
}
```

Imported via Google Fonts:
```
Inter: weights 400, 500, 600, 700
Playfair Display: weights 600, 700 (normal + italic 600)
```

### Type Scale & Usage

| Role | Tailwind Classes | Example Usage |
|---|---|---|
| **Page hero h1** | `text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight` | "Pick your movie mood", "Refine your pick" |
| **Movie title (Result)** | `text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight` | "Stellar Drift" |
| **Modal header** | `font-serif text-xl font-bold text-slate-900 leading-snug` | "What would you like to do?" |
| **Card section h2** | `font-semibold text-slate-900` | "Era", "Length", "Language" |
| **Mood card title** | `font-bold text-slate-900` | "Want to cry" |
| **Uppercase section label** | `text-xs font-bold text-crimson tracking-widest uppercase` | "THE STORY", "DIRECTOR" |
| **Uppercase section label (neutral)** | `text-xs font-bold text-slate-400 tracking-widest uppercase` | "STARRING", "MOOD MATCH", "Tonight's pick 🎬" |
| **Uppercase section label (dark)** | `text-xs font-bold text-slate-900 tracking-widest` | "DETAILS" |
| **Body / description** | `text-slate-500` (base size) | Step subtitles |
| **Small body / card desc** | `text-xs text-slate-500 leading-relaxed` | Mood card descriptions |
| **Story / moodMatch text** | `text-sm text-slate-600 leading-relaxed` | Movie story, italic mood match |
| **Option row label** | `text-sm font-semibold text-slate-900` | Modal option primary text |
| **Option row subtext** | `text-xs text-slate-500 mt-0.5` | Modal option secondary text |
| **Metadata inline** | `text-sm font-medium text-slate-600` | Year, runtime, certificate |
| **Detail table key** | `text-slate-500` (text-sm) | "Genre", "Studio" |
| **Detail table value** | `font-semibold text-slate-900` | "Sci-Fi, Drama" |
| **Status badge** | `font-bold text-crimson` | "Trending #1" |
| **App wordmark** | `font-bold text-lg tracking-tight` | "CineMatch" |

---

## 3. Color Palette

### Tokens

| Token | Hex / Opacity | Usage |
|---|---|---|
| `crimson` | `#E11D48` | Primary accent: active states, icons, CTAs, status text, step dots |
| `crimson/5` | `#E11D48` @ 5% | Blush background orbs |
| `crimson/10` | `#E11D48` @ 10% | Icon badge backgrounds in option rows |
| `crimson/20` | `#E11D48` @ 20% | Primary button drop-shadow color (`shadow-crimson/20`) |
| `crimson/50` | `#E11D48` @ 50% | Disabled primary button background |
| `[#be123c]` | `#BE123C` | Primary button hover state, "Not feeling it?" link hover |
| **slate-900** | `#0F172A` | Primary text, headings |
| **slate-700** | `#334155` | Secondary button text, Navbar watch-party button |
| **slate-600** | `#475569` | Body text, metadata, filter option default state |
| **slate-500** | `#64748B` | Muted text: descriptions, detail table keys, card subtitles |
| **slate-400** | `#94A3B8` | Icons (chevron, share, more), cancel text, uppercase neutral labels |
| **slate-300** | `#CBD5E1` | ChevronRight color in option rows |
| **slate-200** | `#E2E8F0` | Inactive step dots, card borders (`border-slate-200`) |
| **slate-100** | `#F1F5F9` | Subtle backgrounds (`bg-slate-50/100`), dividers, actor avatar bg |
| **slate-50** | `#F8FAFC` | Hover state on ghost buttons and filter option rows |
| **white** | `#FFFFFF` | Card surfaces, modal card, Navbar background (`bg-white/80`) |
| **white/60** | `#FFFFFF` @ 60% | Modal backdrop — soft tint over blush page |
| **emerald-100 / emerald-700** | `#D1FAE5` / `#047857` | Rating badge only |
| **Mood icon colors** | Various (`pink`, `amber`, `blue`, `green`, `purple`, `red`, `rose`, `cyan`) | Mood card icon badges only — each mood has its own semantic pair |

### Semantic Color Rules

- **Background page**: `bg-white` with two `bg-crimson/5 blur-[120px]` orbs (pointer-events: none)
- **Card surface**: `bg-white`
- **Card border**: `border border-slate-200` (or `border-slate-100` for nested cards)
- **Selected card border**: `border-crimson bg-crimson/5 shadow-[0_0_0_1px_rgba(225,29,72,1)]`
- **Filter pill active**: `bg-crimson text-white shadow-md shadow-crimson/20`
- **Filter pill default**: `text-slate-600 hover:bg-slate-50`
- **Primary button**: `bg-crimson text-white shadow-md shadow-crimson/20 hover:bg-[#be123c]`
- **Secondary button**: `bg-white border border-slate-200 text-slate-700 hover:bg-slate-50`
- **Ghost / nav button**: `text-slate-600 hover:text-slate-900 transition-colors`
- **Back button**: `bg-slate-100 text-slate-700 hover:bg-slate-200` (disabled: `text-slate-400 cursor-not-allowed`)
- **Icon accent badge**: `bg-crimson/10 text-crimson`

---

## 4. Spacing & Layout

### Page Shell

```
BlushBackground: min-h-screen w-full bg-white p-4 sm:p-8 flex flex-col items-center
  └── Inner wrapper: relative z-10 w-full max-w-6xl flex flex-col items-center
        ├── Navbar (shrink-0)
        └── MainCard (flex-1 flex flex-col)
```

### MainCard

```
w-full max-w-5xl bg-white rounded-[2rem] shadow-xl shadow-slate-200/50
border border-slate-100 p-8 sm:p-12 flex-1 flex flex-col
```

- Corner radius: `rounded-[2rem]` (32px) — unique to the outer container
- Internal padding: `p-8` mobile, `p-12` desktop
- Uses `flex flex-col` and passes `flex-1` to children so content fills the card height

### Step Content Layout

All step panels use `motion.div` with `className="flex flex-col flex-1"`.

- Header: `text-center mb-10`
- Grid gaps: `gap-4` (mood cards), `gap-6` (filter cards), `gap-6 lg:gap-8` (result layout)

### Result Screen Grid

```
grid-cols-1 lg:grid-cols-[210px_1fr_230px] gap-6 lg:gap-8
  ├── LEFT col: 210px — poster + action buttons
  ├── MIDDLE col: 1fr — movie info, story, cast
  └── RIGHT col: 230px — detail table, mood match, "not feeling it?"
```

### Navbar

```
w-full max-w-5xl bg-white/80 backdrop-blur-md shadow-sm border border-slate-100
rounded-full px-6 py-3 flex items-center justify-between mb-8 shrink-0
```

### StepDots

```
flex items-center justify-center gap-2.5 mb-8
  each dot: h-2 rounded-full
  inactive: w-2 bg-slate-200
  active: w-7 bg-crimson (spring animated)
  complete: bg-crimson opacity-50
```

### Common Padding Patterns

| Pattern | Classes |
|---|---|
| Filter card interior | `p-6` with `mb-6` between header and content |
| Detail/mood match card | `p-5` |
| Modal card header | `px-6 pt-6 pb-5` |
| Modal option rows | `px-6 py-4` |
| Modal cancel button area | `px-6 pb-6 pt-2` |
| Footer button row | `mt-10 pt-6` |

---

## 5. Component Patterns

### 5.1 Mood Card (MoodSelection)

```tsx
// Container
<button className={`
  relative text-left p-6 rounded-2xl border transition-all duration-200
  ${isSelected
    ? 'border-crimson bg-crimson/5 shadow-[0_0_0_1px_rgba(225,29,72,1)]'
    : isDisabled
    ? 'border-slate-200 bg-white opacity-40 cursor-not-allowed'
    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
  }
`}>

// Selected checkmark badge (top-right)
<div className="absolute top-4 right-4 w-5 h-5 bg-crimson rounded-full flex items-center justify-center">
  <svg>…checkmark path…</svg>
</div>

// Icon badge
<div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${mood.color}`}>
  <Icon className="w-5 h-5" />
</div>

// Text
<h3 className="font-bold text-slate-900 mb-1">{mood.name}</h3>
<p className="text-xs text-slate-500 leading-relaxed">{mood.desc}</p>
```

### 5.2 Filter Card (Filters)

```tsx
// Card wrapper
<div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

  // Card header
  <div className="flex items-center gap-2 mb-6">
    <Icon className="w-5 h-5 text-crimson" />
    <h2 className="font-semibold text-slate-900">Era</h2>
  </div>

  // Pill options
  <div className="space-y-2">
    <button className={`
      w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors
      ${isActive
        ? 'bg-crimson text-white shadow-md shadow-crimson/20'
        : 'text-slate-600 hover:bg-slate-50'
      }
    `}>
      {label}
    </button>
  </div>
</div>
```

### 5.3 Primary Action Button

```tsx
<button className="
  w-full bg-crimson hover:bg-[#be123c] text-white rounded-xl py-3.5
  font-medium flex items-center justify-center gap-2
  shadow-md shadow-crimson/20 transition-colors
">
  <Icon className="w-5 h-5 fill-current" />
  Watch Trailer
</button>
```

### 5.4 Secondary / Outline Button

```tsx
<button className="
  w-full bg-white border border-slate-200 hover:bg-slate-50
  text-slate-700 rounded-xl py-3.5 font-medium
  flex items-center justify-center gap-2 transition-colors
">
  <Icon className="w-5 h-5" />
  Add to Watchlist
</button>
```

### 5.5 Navigation Pill Buttons (Footer)

```tsx
// Back
<button className="px-8 py-3 rounded-full font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all" />

// Next / primary
<button className="px-8 py-3 rounded-full font-medium text-white bg-crimson hover:bg-[#be123c] shadow-md shadow-crimson/20 transition-all" />
```

### 5.6 Icon Badge (Option Rows in Modal)

```tsx
<div className="w-9 h-9 rounded-lg bg-crimson/10 text-crimson flex items-center justify-center shrink-0">
  <Icon className="w-4 h-4" />
</div>
```

> In MoodSelection cards, icon badges use `w-10 h-10 rounded-full` and per-mood colors (not crimson/10).

### 5.7 Option Row (Modal)

```tsx
<button className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors">
  {/* Icon badge */}
  <div className="w-9 h-9 rounded-lg bg-crimson/10 text-crimson flex items-center justify-center shrink-0">
    <Icon className="w-4 h-4" />
  </div>
  {/* Text */}
  <div className="min-w-0 flex-1">
    <p className="text-sm font-semibold text-slate-900">Primary label</p>
    <p className="text-xs text-slate-500 mt-0.5">Secondary description</p>
  </div>
  {/* Chevron */}
  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
</button>
```

### 5.8 Divider

```tsx
// Full-width divider (between list items)
<div className="h-px bg-slate-100" />

// Inset divider (respects container padding)
<div className="h-px bg-slate-100 mx-6" />
```

### 5.9 Uppercase Section Label

```tsx
// Crimson — used for content labels in Result
<h3 className="text-xs font-bold text-crimson tracking-widest mb-2">THE STORY</h3>

// Slate-400 — used for neutral section markers
<span className="text-sm font-bold text-slate-400 tracking-widest uppercase">Tonight's pick 🎬</span>

// Modal pre-header
<p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Options</p>
```

### 5.10 Detail Table Row

```tsx
<div className="flex justify-between border-b border-slate-200/60 pb-3">
  <span className="text-slate-500">Genre</span>
  <span className="font-semibold text-slate-900">{value}</span>
</div>
// Last row: remove border-b, use pb-1
```

### 5.11 Rating Badge

```tsx
<span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md flex items-center gap-1 text-sm font-medium">
  ⭐ {rating}
</span>
```

### 5.12 Certificate Tag

```tsx
<span className="border border-slate-200 px-2 py-0.5 rounded text-xs">{certificate}</span>
```

### 5.13 Actor Avatar

```tsx
<div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-2 border border-slate-200">
  <User className="w-6 h-6 text-slate-400" />
</div>
```

### 5.14 "Not Feeling It?" Overlay Modal

```tsx
// Trigger button
<button
  onClick={() => setModalOpen(true)}
  aria-haspopup="dialog"
  className="flex items-center gap-2 text-sm font-semibold text-crimson hover:text-[#be123c] transition-colors"
>
  <RotateCcw className="w-4 h-4" />
  Not feeling it?
</button>

// Overlay (rendered in AnimatePresence)
<motion.div
  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  transition={{ duration: 0.18 }}
  className="fixed inset-0 z-50 flex items-center justify-center"
  role="dialog" aria-modal="true"
>
  {/* Soft backdrop */}
  <div className="absolute inset-0 bg-white/60" onClick={() => setModalOpen(false)} />

  {/* Card */}
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.97 }}
    transition={{ duration: 0.2 }}
    className="relative w-full max-w-sm mx-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
  >
    {/* Header */}
    <div className="px-6 pt-6 pb-5">
      <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Options</p>
      <h2 className="font-serif text-xl font-bold text-slate-900 leading-snug">
        What would you like to do?
      </h2>
    </div>

    {/* Option rows … */}

    {/* Cancel */}
    <div className="px-6 pb-6 pt-2">
      <button
        onClick={() => setModalOpen(false)}
        className="w-full py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
      >
        Cancel
      </button>
    </div>
  </motion.div>
</motion.div>
```

---

## 6. Animation Conventions

All animations use **Framer Motion**. Never use raw CSS `@keyframes` for interactive transitions.

### 6.1 Step Transitions (AnimatePresence `mode="wait"`)

Applied to MoodSelection, Filters, and Result via their root `motion.div`:

```js
// Enter from left / exit to right (step forward)
initial: { opacity: 0, x: -20 }
animate: { opacity: 1, x: 0 }
exit:    { opacity: 0, x: 20 }
// No explicit transition — uses Framer defaults (~0.3s ease)
```

### 6.2 Result Screen Entry

```js
initial: { opacity: 0, scale: 0.98 }
animate: { opacity: 1, scale: 1 }
// No exit needed — Result is the final step
```

### 6.3 Movie Poster / Title Swap (AnimatePresence `mode="wait"`)

```js
// Poster
initial: { opacity: 0, scale: 0.96 }
animate: { opacity: 1, scale: 1 }
exit:    { opacity: 0, scale: 0.96 }
transition: { duration: 0.25 }

// Title / info block
initial: { opacity: 0, y: 8 }
animate: { opacity: 1, y: 0 }
exit:    { opacity: 0, y: -8 }
transition: { duration: 0.25 }

// Mood match text
initial/exit: { opacity: 0 }
animate: { opacity: 1 }
transition: { duration: 0.2 }
```

### 6.4 "Not Feeling It?" Modal (AnimatePresence)

```js
// Backdrop fade
initial: { opacity: 0 }
animate: { opacity: 1 }
exit:    { opacity: 0 }
transition: { duration: 0.18 }

// Card entrance
initial: { opacity: 0, y: 10, scale: 0.97 }
animate: { opacity: 1, y: 0, scale: 1 }
exit:    { opacity: 0, y: 10, scale: 0.97 }
transition: { duration: 0.2 }
```

### 6.5 StepDots (Framer `layout` + `animate`)

```js
// Each dot is a motion.div with layout=true and initial={false}
animate: {
  width: isActive ? 28 : 8,                          // px — expands active dot
  backgroundColor: isActive || isComplete ? '#E11D48' : '#E2E8F0',
  opacity: isComplete ? 0.5 : 1
}
transition: { type: 'spring', stiffness: 400, damping: 30 }

// Active dot shimmer (motion.span inside dot)
initial: { x: '-100%' }
animate: { x: '100%' }
transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
```

### 6.6 MainCard Entry

```js
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
// No transition override — uses defaults
```

### Animation Duration Reference

| Duration | Use Case |
|---|---|
| `0.18s` | Modal backdrop fade |
| `0.2s` | Modal card slide-in, moodMatch text fade |
| `0.25s` | Poster swap, title block swap |
| `0.2s` | `transition-colors` on buttons (CSS, not Framer) |
| Spring `400/30` | StepDots width/color morphing |
| `1.4s ∞` | StepDots shimmer loop |

---

## 7. Page Structure Overview

```
App (BlushBackground)
├── Navbar (fixed at top of z-10 content wrapper)
└── MainCard (rounded-[2rem], max-w-5xl, flex-col)
    ├── StepDots (3 dots, spring-animated, mb-8)
    ├── AnimatePresence mode="wait"
    │   ├── Step 1: MoodSelection — grid of 8 mood cards (1→2→4 cols)
    │   ├── Step 2: Filters — 3-column filter card grid (each with pill options)
    │   └── Step 3: Result — 3-column layout [poster | info | details+match]
    └── FooterButtons (hidden on step 3)
```

### BlushBackground Orbs

Two large blurred circles create the signature ambient warmth:
```tsx
// Top-right orb
<div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-crimson/5 blur-[120px] pointer-events-none" />
// Bottom-left orb
<div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-crimson/5 blur-[120px] pointer-events-none" />
```

### z-Index Layers

| Layer | z-index | Element |
|---|---|---|
| Background orbs | (no z, beneath z-10) | BlushBackground pseudo-blobs |
| Main content | `z-10` | Everything inside BlushBackground inner wrapper |
| Overlays / modals | `z-50` | `fixed inset-0 z-50` — "Not Feeling It?" modal |

---

## 8. Icons

The project uses **Lucide React** exclusively. No other icon sets.

| Icon | Usage |
|---|---|
| `Clapperboard` | Navbar logo mark |
| `Users` | Navbar "Watch Party Mode" |
| `Calendar`, `Clock`, `Globe` | Filter card headers (Era, Length, Language) |
| `Play` | "Watch Trailer" primary button |
| `Bookmark` | "Add to Watchlist" secondary button |
| `Share2`, `MoreVertical` | Result header action icons |
| `RotateCcw` | "Not feeling it?" trigger button |
| `Shuffle` | Modal option 1: Pick a new movie |
| `SlidersHorizontal` | Modal option 2: Change mood & type |
| `ChevronRight` | Modal option row trailing arrow |
| `User` | Actor avatar placeholder |
| `HeartCrack`, `Smile`, `Swords`, `Popcorn`, `Sparkles`, `Ghost`, `Heart`, `Map` | Mood card icons |

Icon size conventions:
- `w-4 h-4` — small inline / badge icons
- `w-5 h-5` — standard UI icons (navbar, filter headers, buttons)
- `w-6 h-6` — actor placeholder icon
- `fill-current` — only on `Play` icon (needs fill, not stroke)

---

## 9. Do's and Don'ts

### ✅ Do

- Use `rounded-2xl` for all standalone cards and modal containers
- Use `rounded-xl` for pill/option buttons inside cards
- Use `rounded-full` for navigation buttons (Back/Next in footer) and the Navbar
- Use `rounded-lg` for small icon badges
- Use `rounded-full` for actor avatars and mood card icon circles
- Use `transition-colors` for all color-changing hover states
- Use `transition-all` only on elements that also change size/shadow (footer buttons)
- Use `shrink-0` on icons and fixed-size elements inside flex rows
- Use `min-w-0 flex-1` on text blocks inside flex rows to prevent overflow
- Use `leading-relaxed` on multi-line body text (story, descriptions)
- Use `font-medium` weight for button labels
- Use `font-semibold` for option row primary labels and card section headers
- Use `font-bold` for mood card titles, uppercase labels, rating badge text
- Always wrap swappable content (poster, title, moodMatch) in `AnimatePresence mode="wait"`
- Use `aria-modal="true"` and `role="dialog"` on modals
- Close modals by clicking the backdrop (`onClick` on the absolute inset-0 backdrop div)

### ❌ Don't

- Don't use `backdrop-blur` on any modal or overlay (only the Navbar uses it)
- Don't use dark backdrops (`bg-black/*`, `bg-slate-900/*`) on overlays
- Don't use `shadow-2xl` anywhere — heaviest allowed is `shadow-lg` on Navbar
- Don't use `absolute` positioning for menu dropdowns — they clip inside overflow containers
- Don't mix serif and sans on the same heading level
- Don't use `font-serif` for body text, subtitles, or section labels
- Don't create new color tokens — use only the existing slate + crimson + emerald (rating) palette
- Don't use gradient backgrounds on buttons or cards
- Don't use more than 2 icon sizes in a single component
- Don't animate `height` or `width` directly — use `layout` prop or `scale` instead
- Don't set animation `duration` above `0.3s` for UI interactions
- Don't use `overflow-hidden` on a wrapper that contains an absolutely-positioned dropdown — lift the dropdown to `fixed` positioning instead
- Don't use `z-20` for important modals — use `z-50`
- Don't add `border-radius` tokens not in the existing scale (`rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`, `rounded-[2rem]`)

---

## 10. Responsive Breakpoints

CineMatch uses Tailwind's default breakpoints:

| Breakpoint | px | Usage |
|---|---|---|
| `sm` | 640px | Larger text sizes, page padding increase (`p-8`), show share/more buttons |
| `md` | 768px | Filter cards switch to 3-column grid |
| `lg` | 1024px | Result screen activates 3-column `[210px_1fr_230px]` layout; mood cards go 4-column |

The app is designed mobile-first. At small screens, all grids collapse to 1 column and content stacks vertically.

---

*Last updated: generated from full CineMatch codebase analysis (June 2026).*
