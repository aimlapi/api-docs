# Docs preview

Renders `docs/` on your computer the way docs.aimlapi.com shows it, so you can see a page before it is merged.
GitBook renders the real site on its own servers from `main`; this is a local stand-in for reviewing drafts.

```bash
pnpm preview
```

Run it from the repo root, then open http://127.0.0.1:4000. Saving any file under `docs/` reloads the browser.
It needs Node 20+ and pnpm. The first run installs this package's four dependencies.

| Option | What it does |
| --- | --- |
| `--port 4100` | Listens on another port. If the port is taken, the next free one is used. |
| `--offline` | Skips API specs that are not in the checkout. Those blocks show a notice instead. |
| `--check` | Renders every page once, lists the problems it finds, and exits. |
| `--verbose` | With `--check`, also lists every missing image. |

## It cannot touch the published docs

- It only reads the checkout. Nothing is written to `docs/`, and nothing is sent to GitBook or GitHub.
- It listens on `127.0.0.1` only.
- This package lives outside `docs/`, the only folder GitBook syncs (see `.gitbook.yaml`).

On macOS and Windows the preview prints a warning when the repo has files whose names differ only in letter case,
such as `Google/` and `google/`. Such a checkout can hold only one file of each pair, so `git status` shows the
others as modified. Commit only the files you changed (`git add <file>`, never `git add -A`). Otherwise the other
file of the pair gets overwritten on the live site.

## What it draws

- **Navigation:** the sidebar, groups, breadcrumbs and previous/next links from `SUMMARY.md`. Page URLs follow
  GitBook's rules and match the live site. A page that `SUMMARY.md` does not list is still shown, with a note.
- **GitBook blocks:** `hint`, `tabs`, `code` (title, wrap, line numbers, expandable), `columns`, `stepper`,
  `content-ref`, `embed`, `file` and `include`.
- **Markdown and HTML:** cards tables, `<details>`, `<figure>`, buttons, footnotes, frontmatter (`description`,
  `icon`, `hidden`, `layout`) and the redirects in `.gitbook.yaml`.
- **API blocks** (`openapi-operation`, `openapi`, `swagger`): the parameters and body with nested fields,
  the responses, `x-codeSamples` or a generated cURL, and a response example. A spec stored in this repo is read
  from your checkout, so edits to it show up at once. Any other spec is downloaded.
- **Problems:** a block the preview does not know, a broken link, or a spec that will not load is listed at the
  bottom of the page, and in the `--check` report.

## What it does not do

The local version leaves out several parts of the live site:

- **Search** only matches page titles.
- **Not drawn:** GitBook's AI search, page feedback, "Copy page", and integrations such as the chat widget.
- **Page icons** come from the free Font Awesome set, so a few icons GitBook draws are missing.
- **Images** under `docs/.gitbook/assets` show a placeholder when they are not in your checkout. This happens with
  a sparse clone.
- **Missing specs:** GitBook marks some spec links as broken (`/broken/openapi/…`). GitBook shows a stored copy of
  those specs, which the preview cannot reach.
- **Online resources:** fonts and icons load from Google Fonts and cdnjs. Without network the page falls back to
  system fonts.

## Development

```bash
cd packages/preview
pnpm install
pnpm test     # node --test
pnpm check    # renders the whole repo once
```

`site.json` holds what GitBook keeps outside the repo: the site title, its URL and the header links.
