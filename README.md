# Christel Media — Website

Marketing agency website for **Christel Media**, Düsseldorf.

## Tech stack

Vanilla HTML · CSS · JavaScript — no build tools, no dependencies, no framework.

- **Fonts:** Syne, Syne Mono, Epilogue (Google Fonts)
- **Icons:** Inline SVG
- **Hosting:** Any static host (Vercel, Netlify, GitHub Pages)

## Project structure

```
├── index.html        # Page markup
├── css/
│   └── styles.css    # Design system + all components + responsive breakpoints
├── js/
│   └── main.js       # Cursor · mobile nav · scroll reveal · smooth scroll
└── README.md
```

## Responsive breakpoints

| Breakpoint | Layout |
|------------|--------|
| ≤ 1280px   | Reduce padding |
| ≤ 1024px   | Hero stacks, 2-col services, 2-col process |
| ≤ 768px    | Hamburger nav, all sections single-column |
| ≤ 480px    | Smallest font sizes, single-col process |

## Development

Open `index.html` directly in a browser, or use any local server:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .

# VS Code
# Install "Live Server" extension, right-click index.html → Open with Live Server
```

## Deployment

The site is a single static directory — drop it on any host.

**Netlify / Vercel:** Connect this repo, no build command required, publish directory: `.` (root).

**GitHub Pages:** Settings → Pages → Source: Deploy from a branch → `main` / `/(root)`.

## Contact

hallo@christel.media · Düsseldorf
