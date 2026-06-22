# Portfolio Codebase — Context Map

A one-page personal portfolio site for **Sparsh Garg**. Single-page React app served as static files. **No build step, no bundler, no package manager** — everything runs in the browser via UMD scripts and in-browser Babel.

---

## Stack

- **React 18.3.1** via UMD `<script>` from unpkg
- **ReactDOM 18.3.1** via UMD
- **Babel Standalone 7.29.0** compiles JSX in the browser at load time
- **Plain CSS** (one file: `portfolio.css`) — no Tailwind, no CSS-in-JS
- **No bundler, no `package.json`, no `node_modules`** — open `index.html` directly or serve the folder statically
- Hosted on **GitHub Pages** (deployed from `main`)

Fonts: Plus Jakarta Sans (sans), JetBrains Mono (mono), Caveat (handwriting accent) — loaded from Google Fonts.

---

## File tree

```
Portfolio Sparsh/
├── index.html              # Single entry point. Loads React UMD + Babel + the five JSX files in order.
├── portfolio.css           # All styles. Design tokens at the top.
├── README.md               # About-me readme (not site copy).
├── tweaks-panel.jsx        # Detached/unused scratch panel. NOT loaded by index.html.
├── public/
│   ├── sparsh-headshot.jpg
│   ├── favicon.svg
│   ├── *.png / *.svg       # Brand logos: AWS, Amex, UW
│   └── tool-logos/         # Marquee tool icons (HTML, JS, Tableau, Power BI, etc.)
└── src/
    ├── data.jsx            # ALL site copy + project data as plain JS objects. Globals.
    ├── project-visuals.jsx # SVG/HTML mini-visualizations rendered inside each project card.
    ├── sections.jsx        # Navbar, Marquee, Experience, Skills, Contact components.
    ├── projects.jsx        # The Selected Work section (cards + modal).
    └── app.jsx             # Hero, useReveal scroll observer, top-level App composition.
```

---

## Script load order (set by `index.html`)

The five JSX files are loaded as `<script type="text/babel">` in this order. **Order matters** — later files read globals defined by earlier ones via `window` assignment:

1. `src/data.jsx`            → exports `personal`, `taglineOptions`, `marqueeItems`, `projects`, `experiences`, `education`, `leadership`, `skills` onto `window`
2. `src/project-visuals.jsx` → exports `ProjectVisual` onto `window`
3. `src/sections.jsx`        → exports `Navbar`, `Marquee`, `Experience`, `Skills`, `Contact` onto `window`
4. `src/projects.jsx`        → exports `Projects` onto `window`
5. `src/app.jsx`             → defines `Hero`, `App`, and mounts to `#root`

> Because globals are passed via `window`, every component file starts with a `/* global ... */` comment for ESLint and reads dependencies as bare identifiers.

---

## Data model (`src/data.jsx`)

All site content is here. Edit this file to change copy.

| Export          | Type     | Used by              | Notes                                                                 |
|-----------------|----------|----------------------|-----------------------------------------------------------------------|
| `personal`      | object   | `app.jsx`, `sections.jsx` | name, email, linkedin, github                                     |
| `taglineOptions`| array    | (currently unused)        | reserved for hero tagline A/B                                     |
| `marqueeItems`  | array    | `sections.jsx::Marquee`   | `{ label, logo?, monogram? }` — scrolling tools strip              |
| `projects`      | array    | `projects.jsx`            | see Project schema below                                          |
| `experiences`   | array    | `sections.jsx::Experience`| company/role/team/period/logo/bullets/tags                        |
| `education`     | array    | (rendered if Education section is enabled)                                                   |
| `leadership`    | array    | (rendered if Leadership section is enabled)                                                  |
| `skills`        | object   | `sections.jsx::Skills`    | tab → chip list                                                   |

### Project schema

```js
{
  key:        "unique-id",        // React key
  name:       "CompetitiveOS",
  category:   "AI · COMPETITIVE INTEL",  // shown as small monospace eyebrow
  tagline:    "one-line punch",          // shown above description
  desc:       "longer body copy",
  tags:       ["GraphRAG", "FastAPI"],   // small mono outlined chips
  status:     "live" | "shipped" | "developing",
  visual:     "force_graph" | "chat_mockup" | "input_to_outputs"
            | "pipeline_diagram" | "anomaly_chart" | "world_funnel"
            | "input_to_deck",
  size:       "" | "featured",           // "featured" = full-width hero card
  hue:        260,                       // 0-360, drives the radial glow color
  builtAt:    "amex" | "lovable" | null, // shows a small badge on the card
  link:       { type: "external", url: "https://..." }
           |  { type: "modal" },
  modal:      { headline, context, problem,
                approach: [...], results: [...], stack: [...] }   // only if link.type === "modal"
}
```

---

## Component map

### `src/app.jsx`
- `BrandImg` — `<img>` with `onError` fallback
- `Hero` — landing block: name, tagline, meta line, CTAs, "built at" logo row, portrait
- `useReveal` — IntersectionObserver hook that adds `.in` to `.reveal` elements as they enter view
- `App` — composes `<Navbar /> <Hero /> <Marquee /> <Projects /> <Experience /> <Contact />`
- Mounts to `#root` with `createRoot`

### `src/sections.jsx`
- `Navbar` — sticky nav, observes section ids to highlight active link
- `Marquee` — infinite-scroll strip of tools (duplicates `marqueeItems` for seamless loop)
- `Experience` + `ExperienceCard` + `ExperienceLogo` — timeline of roles
- `Skills` — tab-switched skill chip cloud
- `Contact` — final CTA card + footer

### `src/projects.jsx`
- `ProjectCard` — renders one card. Wraps in `<a target="_blank">` for external links, in a `<button>` that opens the modal for modal links.
- `ProjectModal` — center-screen modal with backdrop. Renders `modal.headline`, `context`, `problem`, numbered `approach`, bulleted `results`, `stack` chips.
- `Projects` — section wrapper. Uses CSS Grid; the first project (with `size: "featured"`) spans full width, the rest fall into a 2-column responsive grid.

### `src/project-visuals.jsx`
- `ProjectVisual({ kind })` — dispatcher. Returns the right mini-viz based on the project's `visual` field.
- One component per visual type — all subtle, terminal-feel, dark.

| Kind                | Component         | What it shows                                                          |
|---------------------|-------------------|------------------------------------------------------------------------|
| `force_graph`       | `ForceGraphVisual`| Animated NetworkX-style graph with semantic CI labels (Competitor, Signal, Capability, Initiative, Risk) — lime active node pulses, edges drift |
| `chat_mockup`       | `ChatVisual`      | PM interviewer Q → user A → AI evaluation panel with scored bars       |
| `input_to_outputs`  | `InputToOutputsVisual` | Goal input box → arrow → fanned campaign cards (cycles prompts) |
| `pipeline_diagram`  | `PipelineDiagramVisual`| Merchant attributes → segmentation branches → content selector → email; merchant token flows |
| `anomaly_chart`     | `AnomalyChartVisual`   | Smooth time-series with a flagged dip + email-alert icon       |
| `world_funnel`      | `WorldFunnelVisual`    | 22 scattered dots converging to a central dashboard tile; one dot killed |
| `input_to_deck`     | `InputToDeckVisual`    | Parameter form → fanned slide thumbnails + "hrs saved" counter |

---

## Styling (`portfolio.css`)

- **Design tokens** at the top of the file (`:root`) — colors, font stacks, glows. Always reach for these instead of hardcoded values.
- Color system:
  - Background: `--bg #0B0A09`, surface `--surface #17161A`
  - Text: `--text #F5F3EF`, soft `--text-soft #B8B3AD`, muted `--muted #8A8690`
  - Accents: `--lime #C5F24A` (LIVE / primary), `--cyan #3EC8F5`, `--indigo #7C7CFF`, `--coral #FF7A5A`
- Status pill colors:
  - `.status-live`       → lime green
  - `.status-shipped`    → muted purple
  - `.status-developing` → lavender / indigo
- `.reveal` / `.reveal.in` — fade-up on scroll (driven by `useReveal` in `app.jsx`)
- `.wrap` — 1240px max width, centered container
- `.sec-head` — section header (mono label + display title + subtitle + right-rail counter)
- Project visuals are absolutely positioned inside `.project-visual` (which fills the card top); each visual type has its own `.pv-*` namespace.
- Modal: `.modal-backdrop` + `.modal-panel` + `.modal-section` (kept namespaced to avoid collisions)
- Responsive break at ~960px collapses the projects grid to one column.

---

## How to run locally

No tooling needed.

```bash
# from the repo root
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or just open `index.html` directly in a browser. Babel compiles JSX on the fly — there is nothing to build, nothing to install.

---

## How to make common changes

| Task                              | File(s)                                                                 |
|-----------------------------------|-------------------------------------------------------------------------|
| Add / edit a project              | `src/data.jsx` (`projects` array)                                       |
| Change a project's mini-viz       | Add a new component in `src/project-visuals.jsx`, register it in `ProjectVisual`, set the project's `visual` field |
| Add / edit a job in Experience    | `src/data.jsx` (`experiences` array)                                    |
| Change hero copy or CTAs          | `src/app.jsx` (`Hero`)                                                  |
| Recolor / re-theme                | `:root` tokens at the top of `portfolio.css`                            |
| Add a new section                 | Define the component (anywhere), register it on `window`, add it to the `App` render tree in `app.jsx` |
| Update resume link                | `sections.jsx::Contact`                                                 |

---

## Gotchas

- **Order in `index.html` matters.** If you add a new JSX file that depends on globals, load it after its dependencies.
- **Everything is a global via `window`.** New components must do `Object.assign(window, { ... })` (or `window.X = X`) at the bottom of their file.
- **No JSX in `.js` files** — only `.jsx` loaded with `type="text/babel"`. Plain `.js` will not be transpiled.
- **Babel Standalone is slow on cold load.** That's expected — there is no precompiled bundle.
- **`tweaks-panel.jsx` is not wired up.** Treat it as scratch. Do not assume changes there affect the site.
- **Cache-busting query string** — `project-visuals.jsx?v=YYYY-MM-DD-N` is used to invalidate the CDN/browser cache when shipping a visuals change. Bump the version when editing that file.
