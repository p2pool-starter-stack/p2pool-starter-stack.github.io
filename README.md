# Hardrock — organization website

The marketing / showcase site for the **Hardrock** collective — an orchestrator
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
data/content.yaml        ← all copy (hero, stats, projects, roadmap, ethos, CTA)
layouts/index.html       ← single-page assembly
layouts/partials/        ← head / header / footer / icon set
assets/css/main.css      ← the entire visual system
assets/js/main.js        ← reveal-on-scroll, header state, copy-to-clipboard
static/img/              ← marks + dashboard screenshot
static/favicon.svg       ← Hardrock crystal mark
```

The icon/mark set is inline SVG in [`layouts/partials/icon.html`](layouts/partials/icon.html)
(`{{ partial "icon.html" "pithead" }}`), so every mark inherits color from CSS via `currentColor`.

## Deploy

This repo is the org's GitHub Pages site (`p2pool-starter-stack.github.io`), served at
<https://p2pool-starter-stack.github.io/>.

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with Hugo and publishes on every
push to `main`. In the repo's **Settings → Pages**, set **Source: GitHub Actions** once and it deploys
automatically thereafter.

To put it on a custom domain later: add `static/CNAME` containing the domain and set `baseURL` in
`hugo.toml`.

— MIT, like everything else here.
