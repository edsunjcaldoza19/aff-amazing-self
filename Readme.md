# Amazing Self Affiliate Area

Responsive HTML recreation of the Amazing Self affiliate resource website, rebuilt from the saved source pages in `incoming/`.

## Pages

- `index.html` — affiliate program signup and introduction
- `overview.html` — affiliate overview and product information
- `promotion-links.html` — ClickBank hoplink generator
- `emails.html` — email swipe copy
- `banners.html` — banner resources
- `images.html` — product image resources
- `articles.html` — affiliate articles and reports
- `reviews.html` — pre-written review copy

## Project structure

```text
.
├── assets/
│   ├── main.js
│   └── styles.css
├── images/
├── incoming/             # ignored browser-saved source files
├── index.html
└── Readme.md
```

`incoming/` is retained locally as reference material but is excluded by `.gitignore`. The recreated pages use shared styles from `assets/styles.css` and shared interactions from `assets/main.js`.

## Features

- Responsive desktop, tablet, and mobile layouts
- Shared navigation and footer across affiliate resource pages
- Mobile navigation menu
- Hoplink generation with ClickBank ID, tracking ID, and landing page selection
- Copy-to-clipboard controls for links and promotional snippets
- Expandable email swipe sections
- Help dialogs for ClickBank and tracking IDs
- Local product, banner, background, and favicon assets

## Running locally

Open `index.html` directly in a browser, or serve the folder with any static HTTP server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

The signup and login forms retain the original external destinations. Hoplink saving uses browser `localStorage` for this static recreation.
