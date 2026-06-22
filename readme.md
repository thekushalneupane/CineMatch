# 🎬 CineMatch

A mood-based movie recommender. Instead of scrolling endlessly through a streaming app, pick how you're feeling — want to cry, need to laugh, edge of your seat — set a few filters, and get a single confident recommendation.

> **Status:** Frontend UI complete. Recommendation engine in progress.

---

## How it works

1. **Pick your mood(s)** — choose 1 or 2 from 8 moods (Want to cry, Need to laugh, Edge of my seat, Turn my brain off, Feel inspired, Get scared, Fall in love, Go on a journey)
2. **Set your filters** — era, length, and language
3. **Get your pick** — a recommended movie with poster, story, cast, rating, director, and studio
4. **Not feeling it?** — pick a different movie, or change your mood and filters
5. **Surprise Me** — skip the steps entirely and get a random pick instantly

---

## Project structure

```
cinematch/
├── frontend/          React + Vite + TypeScript UI
├── model/             Recommendation engine (in progress)
├── design.md          Design system reference
└── README.md          You are here
```

### `frontend/`

| | |
|---|---|
| **Framework** | React 18 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |

**Key screens** (`frontend/src/components/`)
- `Navbar.tsx` — logo + Surprise Me button
- `MoodSelection.tsx` — step 1, mood picker grid
- `Filters.tsx` — step 2, era/length/language pills
- `Result.tsx` — step 3, the recommendation card + "Not Feeling It?" flow
- `BlushBackground.tsx` — decorative full-page background layer

See **[`design.md`](./design.md)** for the design system — colors, typography, component patterns, and animation conventions.

---

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

---

## Roadmap

- [x] Frontend UI — mood selection, filters, result screen
- [x] "Not Feeling It?" flow (pick new movie / change mood)
- [x] Surprise Me button (UI + state wiring)
- [ ] Recommendation engine
- [ ] Connect frontend to live recommendations

---

## Contributing

This is a 2-person student project.

- **Frontend changes** → work inside `frontend/`, follow `design.md`
- **Model changes** → work inside `model/`

Open a Pull Request into `main` when a piece is ready — try to avoid pushing directly to `main` so the other person's work doesn't get clobbered.