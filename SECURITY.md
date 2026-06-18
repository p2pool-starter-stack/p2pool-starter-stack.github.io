# Security Policy

This repository is the source for the P2Pool Starter Stack website
(<https://p2pool-starter-stack.github.io/>) — a static [Hugo](https://gohugo.io/) site with no
backend and no third-party requests at runtime (system fonts only; nothing phones home). The main
security surface is the **build and deploy pipeline** rather than the served pages, but we still
want to hear about anything that could mislead visitors or compromise the site.

## Supported versions

The live site is whatever is on the latest `main` — it deploys on every push. There are no release
branches; please check against current `main` before reporting.

| Version        | Supported          |
|----------------|--------------------|
| latest `main`  | ✅                 |
| anything older | ❌ (please update) |

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Use GitHub's private vulnerability reporting instead: go to the **Security** tab and click
**"Report a vulnerability"**. This opens a private advisory visible only to the maintainers, where
we can triage and coordinate a fix and disclosure with you.

When you report, it helps to include:

- A description of the issue and its impact.
- Steps to reproduce, and the affected area (a rendered page, the build/deploy workflow, the
  `scripts/refresh-releases.py` release-refresh script, a third-party GitHub Action, etc.).
- Any relevant logs or links.

**In scope, for example:** a way to inject content into the built site, a compromised or unpinned
dependency/Action in the build, leaked credentials in the repo or CI, or a weakness in the deploy
pipeline. **Out of scope:** issues in third-party services we merely link to, and anything that
requires an already-compromised maintainer machine.

We aim to acknowledge reports promptly and will keep you posted as we work on a fix.
