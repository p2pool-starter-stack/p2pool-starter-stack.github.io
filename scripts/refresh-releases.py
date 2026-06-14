#!/usr/bin/env python3
"""Refresh data/releases.json with each project's latest GitHub release tag.

Run locally (`python3 scripts/refresh-releases.py`) to update the committed
fallback, or in the deploy workflow to bake the current versions into the build.

Best-effort by design: on any network / API / rate-limit error it keeps the
existing committed value for that repo and exits 0, so it can never turn a deploy
red. The Hugo build only ever reads the local data file — it never calls out — so
CI stays deterministic and the site keeps its "zero third-party requests" promise.

Set GH_TOKEN (or GITHUB_TOKEN) to authenticate and dodge the unauthenticated
GitHub API rate limit (the deploy workflow passes the built-in token).
"""
from __future__ import annotations

import json
import os
import pathlib
import sys
import urllib.error
import urllib.request

ORG = "p2pool-starter-stack"
REPOS = ("pithead", "rigforge")
DATA = pathlib.Path(__file__).resolve().parent.parent / "data" / "releases.json"


def latest_tag(repo: str) -> str:
    url = f"https://api.github.com/repos/{ORG}/{repo}/releases/latest"
    req = urllib.request.Request(
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "pss-site-release-refresh",
        },
    )
    token = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.load(resp).get("tag_name", "")


def main() -> int:
    data: dict[str, str] = {}
    if DATA.exists():
        data = json.loads(DATA.read_text())

    for repo in REPOS:
        try:
            tag = latest_tag(repo)
            if tag:
                data[repo] = tag
                print(f"{repo}: {tag}")
            else:
                print(f"{repo}: no tag_name in response, keeping {data.get(repo)!r}", file=sys.stderr)
        except (urllib.error.URLError, OSError, ValueError) as exc:
            print(f"{repo}: keeping fallback {data.get(repo)!r} ({exc})", file=sys.stderr)

    DATA.write_text(json.dumps(data, indent=2) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
