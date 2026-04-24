# Sparsh Garg — Portfolio

Single-page portfolio site. Plain HTML + CSS + a little React (Babel-in-browser — no build step).

## Run locally

Any static file server works. Easiest:

```bash
# Python 3
python3 -m http.server 8000
# or, with Node
npx serve .
```

Then open http://localhost:8000

> You must serve over HTTP — opening `index.html` directly via `file://` will fail because the `.jsx` files are loaded by the browser and most browsers block cross-origin fetches on `file://`.

## Structure

```
index.html            ← entry point
portfolio.css         ← all styles
tweaks-panel.jsx      ← in-page tweak controls (panel + controls)
src/
  data.jsx            ← all content lives here (experience, projects, skills, etc.)
  project-visuals.jsx ← animated visuals for each project card
  projects.jsx        ← Projects section
  sections.jsx        ← Navbar, Marquee, Numbers, Experience, About, Skills, Contact
  app.jsx             ← Hero + root <App> + Tweaks wrapper
public/               ← images & logos
```

**To update content** (experience, skills, projects, contact info), edit `src/data.jsx`.

## Deploy

This is a static site — drop it on anything:
- **GitHub Pages** — push to a repo, enable Pages on `main` branch, root folder. Done.
- **Vercel / Netlify** — "import project", framework: *Other*, root dir: `/`, no build command.
- **Cloudflare Pages** — same as Vercel.

## Git commands to push

From this directory:

```bash
git init
git add .
git commit -m "Portfolio redesign"
git branch -M main
git remote add origin git@github.com:sparshg1618/portfolio-ai.git   # or your repo
git push -u origin main --force    # --force if replacing the old repo contents
```

If you're updating an existing clone:

```bash
# Back up anything you want to keep
rm -rf ./*                          # clear the old site
# Copy the contents of the `site/` folder into your repo root
cp -r /path/to/site/. .
git add -A
git commit -m "Portfolio redesign"
git push
```

## Editing the design

- Colors, radii, spacing tokens → top of `portfolio.css`
- Hero copy + taglines → `src/data.jsx` (`taglineOptions`)
- Anything else visual → `portfolio.css` (sections are clearly commented)
