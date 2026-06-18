# Contributing to the P2Pool Starter Stack site

Thanks for taking the time to contribute! Whether it's fixing a typo, tweaking copy,
or reworking a layout, contributions are very welcome. This guide covers the workflow.

## Before you start

- **Found a bug or have an idea?** Open an issue first. For anything beyond a small fix,
  please discuss it in an issue before writing code — it saves everyone time.
- Check the [open issues](https://github.com/p2pool-starter-stack/p2pool-starter-stack.github.io/issues)
  to see if someone's already on it.

## Dev environment

You need [Hugo **extended**](https://gohugo.io/installation/) (≥ 0.162). On macOS:
`brew install hugo`.

```bash
hugo server          # live reload at http://localhost:1313
```

Most landing-page copy lives in [`data/content.yaml`](data/content.yaml) — edit text there,
not in the templates. See the [README](README.md#where-the-content-lives) for the full file map.

## Development workflow

1. Fork the repo and create a branch off `main`.
2. Make your change. Keep it focused — one logical change per PR.
3. Run the same two checks CI does (no server, no network):

   ```bash
   hugo --gc --minify --panicOnWarning --baseURL "http://localhost/"   # strict build
   htmltest                                                            # link/anchor/image check
   ```
4. Update the README or other docs for any user-facing change.

## Opening a pull request

- Target the `main` branch and fill out the PR template.
- Link the issue your PR addresses (e.g. `Closes #123`).
- Make sure both checks above pass — CI will run the same ones.
- PRs require review before merging.

By contributing, you agree that your contributions are licensed under the project's
[MIT License](LICENSE). Thanks again! 🙌
