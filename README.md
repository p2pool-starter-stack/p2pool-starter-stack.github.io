# P2Pool Starter Stack — organization website

The marketing / showcase site for the **P2Pool Starter Stack** — an orchestrator
([Pithead](https://github.com/p2pool-starter-stack/pithead)) and the miners that feed it
([RigForge](https://github.com/p2pool-starter-stack/rigforge)) — plus the node-starter stacks to come.

Built with **[Hugo](https://gohugo.io/)** (extended). Industrial-cypherpunk look, dark + `#F26822`,
zero third-party requests (system fonts only — nothing phones home, in keeping with the privacy ethos).

## Run it locally

You need [Hugo **extended**](https://gohugo.io/installation/) (≥ 0.162). On macOS: `brew install hugo`.

```bash
hugo server          # live reload at http://localhost:1313
```

## Build

```bash
hugo --gc --minify   # static output to ./public
```

## Test

CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs on every push/PR and is two checks:

```bash
# 1. Strict build — any Hugo warning (deprecation, missing data, …) fails the build
hugo --gc --minify --panicOnWarning --baseURL "http://localhost/"

# 2. Link / anchor / image check on the built site (internal only, deterministic)
#    https://github.com/wjdp/htmltest  — config in .htmltest.yml
htmltest
```

Both must pass before `main` deploys. External links are skipped by default so CI never
flakes on a third-party outage — run `htmltest` with `CheckExternal: true` to audit them.

## Where the content lives

All landing-page copy is in **[`data/content.yaml`](data/content.yaml)** — edit text there, not in the
templates. The page is assembled by [`layouts/index.html`](layouts/index.html) from that data.

```
data/content.yaml        ← all copy (hero, stats, projects, roadmap, ethos, FAQ, CTA)
layouts/index.html       ← single-page assembly
layouts/partials/        ← head / header / footer / icon set / schema (JSON-LD)
assets/css/main.css      ← the entire visual system
assets/js/main.js        ← reveal-on-scroll, header state, copy-to-clipboard
static/img/              ← marks + dashboard screenshot + og-card
static/favicon.svg       ← P2Pool Starter Stack layered mark
static/robots.txt        ← crawl rules (search + AI assistants explicitly welcome)
```

The icon/mark set is inline SVG in [`layouts/partials/icon.html`](layouts/partials/icon.html)
(`{{ partial "icon.html" "pithead" }}`), so every mark inherits color from CSS via `currentColor`.

## Discoverability (SEO / GEO)

The site is tuned to be found — and cited — when people (or their AI assistants) ask how to mine
Monero privately. The copy is keyword-aware without being spammy, and three machine-readable layers
back it up:

- **[`layouts/partials/schema.html`](layouts/partials/schema.html)** emits one `application/ld+json`
  graph: an `Organization`, a `WebSite`, a `SoftwareApplication` for each of Pithead and RigForge
  (free, MIT, OS-tagged), and a `FAQPage`. The FAQ entries are generated from the same
  `data/content.yaml → faq` block the page renders, so the visible Q&A and the structured data never
  drift. Built through `jsonify | safeJS`, so escaping is always valid.
- **[`layouts/partials/head.html`](layouts/partials/head.html)** carries the title/description,
  canonical, Open Graph + Twitter card (`static/img/og-card.png`), and `robots: max-image-preview:large`.
- **[`static/robots.txt`](static/robots.txt)** allows everything and explicitly welcomes answer-engine
  crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) plus the auto-generated `sitemap.xml`.

After editing the FAQ or any project copy, paste the built page into Google's
[Rich Results Test](https://search.google.com/test/rich-results) to confirm the JSON-LD still validates.

## Deploy

This repo is the org's GitHub Pages site (`p2pool-starter-stack.github.io`), served at
<https://p2pool-starter-stack.github.io/>.

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with Hugo and publishes on every
push to `main`. In the repo's **Settings → Pages**, set **Source: GitHub Actions** once and it deploys
automatically thereafter.

To put it on a custom domain later: add `static/CNAME` containing the domain and set `baseURL` in
`hugo.toml`.

— MIT, like everything else here.
