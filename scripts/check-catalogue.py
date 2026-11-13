#!/usr/bin/env python3
"""Check docs/ against the live model catalogue.

Fails when:
  - a model page lists an id that GET /v1/models does not serve (dead or mistyped id);
  - a relative .md link (SUMMARY, pages) points at a file that does not exist.
Warns (the fix belongs to the model card's docsUrl in the backend, or to the page) when:
  - a live model's docsUrl points at no page in docs/;
  - two pages list the same id and the page's name does not resemble it (a page copied from
    another model and not re-pointed).

usage: python3 scripts/check-catalogue.py [--models models.json]
Without --models it fetches https://api.aimlapi.com/v1/models.
"""
import argparse, difflib, json, os, posixpath, re, sys, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'docs')
HINT = re.compile(r'valid for the following (?:list of our )?models?:?(.*?){% endhint %}', re.S | re.I)
ID = re.compile(r'^\s*[*-]\s*`([^`]+)`', re.M)
LINK = re.compile(r'(?:href="|\]\(<?|content-ref url=")([^")#>\s]+\.md)')
# Pages that show a placeholder id on purpose.
PLACEHOLDER = {'<YOUR_MODEL>'}


def load_catalogue(path):
    if path:
        return json.load(open(path))['data']
    req = urllib.request.Request('https://api.aimlapi.com/v1/models', headers={'User-Agent': 'api-docs-catalogue-check'})
    return json.load(urllib.request.urlopen(req, timeout=60))['data']


def pages():
    for dp, _, fn in os.walk(ROOT):
        for f in fn:
            if f.endswith('.md'):
                p = os.path.join(dp, f)
                yield os.path.relpath(p, ROOT).replace(os.sep, '/'), open(p, encoding='utf-8').read()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--models')
    a = ap.parse_args()
    cat = load_catalogue(a.models)
    live = {m['id'] for m in cat} | {x for m in cat for x in (m.get('aliases') or [])}
    errors, warnings = [], []
    listed = {}
    for rel, txt in pages():
        h = HINT.search(txt)
        ids = ID.findall(h.group(1)) if h else []
        listed[rel] = set(ids)
        for i in ids:
            if i not in live and i not in PLACEHOLDER:
                errors.append(f'{rel}: lists `{i}`, which GET /v1/models does not serve')
        for href in LINK.findall(txt):
            if href.startswith(('http', '/')):
                continue
            base = '' if rel == 'SUMMARY.md' else posixpath.dirname(rel)
            tgt = posixpath.normpath(posixpath.join(base, href.replace('\\', '')))
            if not os.path.exists(os.path.join(ROOT, tgt)):
                errors.append(f'{rel}: links to missing {href}')
    for m in cat:
        url = (m.get('info') or {}).get('docsUrl') or ''
        if not url.startswith('https://docs.aimlapi.com/'):
            continue
        path = url.split('docs.aimlapi.com/', 1)[1].split('#')[0].rstrip('/')
        page = path + '.md' if path + '.md' in listed else path + '/README.md'
        if page not in listed:
            warnings.append(f'catalogue: {m["id"]} docsUrl {url} has no page in docs/')
            continue
    owners = {}
    for rel, ids in listed.items():
        for i in ids:
            owners.setdefault(i, []).append(rel)
    for i, rels in owners.items():
        rels = [r for r in rels if r.startswith('api-references/')]
        if len(rels) < 2:
            continue
        for rel in rels:
            stem = norm(posixpath.basename(rel)[:-3])
            if difflib.SequenceMatcher(None, stem, norm(i)).ratio() < 0.5:
                warnings.append(f'{rel}: lists `{i}`, also listed by {[r for r in rels if r != rel]}; copied page?')
    for w in sorted(set(warnings)):
        print(f'warning: {w}')
    for e in sorted(set(errors)):
        print(f'error: {e}')
    print(f'{len(set(errors))} error(s), {len(set(warnings))} warning(s)', file=sys.stderr)
    return 1 if errors else 0


def norm(i):
    """`anthropic/claude-sonnet-5.5`, `claude-sonnet-5-5` and `alibaba/wan2.6-i2v` vs `wan-2-6-i2v` compare equal."""
    return re.sub(r'[^a-z0-9]', '', i.lower().split('/')[-1])





if __name__ == '__main__':
    sys.exit(main())
