# MEDY — Smart Multimodal Healthcare Assistant

A clean, professional healthcare frontend prototype built with **plain HTML, CSS and
JavaScript** — no frameworks. The UI is intentionally simple, but the navigation,
hover effects, active states and micro-interactions are polished to feel like a real
healthcare startup product.

Everything is developed on the **`master`** branch (the only branch).

---

## Features

- **Home** — premium hero, feature cards, CTA with smooth micro-interactions
- **About** — mission, how it works, future AI roadmap, medical safety note
- **Analyze** — the main multimodal input page: three input methods (Vision —
  future, Attachments, Understand), each with loading, result and error states
  (all **mock** — no real AI)
- High-quality navigation:
  - sticky navbar with subtle blur/shadow
  - active page state (pill + underline indicator)
  - smooth hover/focus/active transitions
  - animated mobile hamburger menu
  - short page fade transitions
- Result UI built from reusable cards:
  `claim-card`, `evidence-card`, `score-card`
- Reusable components: `navbar`, `footer`, `loading-state`, `promotion-card`,
  `file-preview`, `attachment-menu`, `analyze-input`
- Responsive on desktop, tablet and mobile (no horizontal scrolling)
- Accessibility basics: semantic HTML, ARIA labels, keyboard navigation, visible focus states
- API-ready architecture: the UI talks to `api.js`, which currently returns mock data

## Technology

| Area | Choice |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 (single stylesheet, CSS variables) |
| Behavior | Vanilla JavaScript (modular, namespaced) |
| Icons | Inline SVG (lucide-style), no external icon library |
| Fonts | Inter (Google Fonts) |
| Frameworks | None — no React, no Tailwind, no build step |

## Folder Structure

```
MEDY/
│
├── frontend/
│   ├── css/
│   │   └── index.css              # single stylesheet
│   ├── js/
│   │   ├── app.js                 # entry: icons, router, transitions, init
│   │   ├── api.js                 # mock API layer (future AI hook point)
│   │   ├── components/            # reusable UI pieces
│   │   │   ├── navbar.js
│   │   │   ├── footer.js
│   │   │   ├── loading-state.js
│   │   │   ├── claim-card.js
│   │   │   ├── evidence-card.js
│   │   │   ├── score-card.js
│   │   │   ├── promotion-card.js
│   │   │   ├── file-preview.js
│   │   │   ├── attachment-menu.js
│   │   │   └── analyze-input.js
│   │   └── pages/
│   │       ├── home.js
│   │       ├── about.js
│   │       └── analyze.js
│   └── index.html
│
├── README.md
└── .gitignore
```

## How to Run

The app is fully static. Open it directly in a browser:

```
frontend/index.html
```

Or serve it locally (recommended for the cleanest experience):

```bash
cd frontend
# Python
python -m http.server 8000
# then open http://localhost:8000
```

### Node syntax check (optional)

```bash
cd frontend
node --check js/api.js
node --check js/app.js
```

## Available Pages

| Route (hash) | Page |
| --- | --- |
| `#/home` | Home |
| `#/about` | About |
| `#/analyze` | Analyze |

Navigation is hash-based, so no server routing configuration is needed.

## Current Limitations

- Analysis results are **mock data** generated in `js/api.js` — no real AI is used.
- File uploads are previewed locally and never sent anywhere.
- No backend, database, authentication or real medical analysis.

## Future AI Integration

The architecture keeps AI logic isolated so it can be plugged in without touching the UI:

```
analyze-input.js
      ↓
api.js          ← swap the mock body for a fetch() to your AI endpoint
      ↓
claim-card.js / evidence-card.js / score-card.js
```

Planned future capabilities: medical vision (image analysis), sign-language
understanding, voice interaction and smart chat.

## Healthcare Disclaimer

MEDY is a demonstration/educational project. Output is **AI-generated mock
information and is not a medical diagnosis**. Always consult a qualified healthcare
professional for medical advice.
