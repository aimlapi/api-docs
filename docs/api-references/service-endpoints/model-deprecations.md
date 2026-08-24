# Model Deprecations

<table data-header-hidden data-full-width="true"><thead><tr><th width="220" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><a href="model-deprecations.md#get-the-deprecation-feed">Get the deprecation feed</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v1/models/deprecations</code></td></tr></tbody></table>

`GET /v1/models/deprecations` lists the models that are retiring, have already been withdrawn, or were folded into another model — with the date it happened and the id to move to.\
No API key is required for this request. You can also open [the feed](https://api.aimlapi.com/v1/models/deprecations) directly in a browser.

It exists to answer the one question [`GET /v1/models`](complete-model-list.md) structurally cannot. A model missing from the catalogue may have been withdrawn, may have been folded into another id that still works, or may never have existed — and the catalogue returns the same "not here" for all three. Treating them alike is how a model-sync job ends up disabling models that are still serving.

{% hint style="info" %}
`https://api.aimlapi.com/models/deprecations` and `https://api.aimlapi.com/api/v1/models/deprecations` serve exactly the same data, as does `deprecated` in place of `deprecations` on any of the three. `/v1/models/deprecations` is the canonical path and the one to use in new integrations.
{% endhint %}

### Get the deprecation feed

Returns the deprecation entries matching the given filters, newest first.

{% openapi-operation spec="model-deprecations" path="/v1/models/deprecations" method="get" %}
[OpenAPI model-deprecations](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/model-deprecations.json)
{% endopenapi-operation %}

***

## The three states

`status` is the field to branch on, and the difference between the three is what your integration should do next.

| `status`      | Does the id still work?                          | What to do                                                                     |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| `deprecated`  | **Yes** — still serving, retirement announced    | Plan the migration before `shutdown_at`. Nothing breaks today.                  |
| `superseded`  | **Yes** — folded into another model, still resolves | Nothing is broken. Switch to `replaced_by` when convenient.                     |
| `withdrawn`   | **No** — requests return `404`                   | Switch to `replaced_by`, or pick a replacement from the catalogue.              |

{% hint style="warning" %}
`superseded` is not a soft `withdrawn`. The id still resolves — it lives on as an alias of `replaced_by` — and `shutdown_at` is always `null` for these entries. Conflating the two is exactly the false positive this feed exists to prevent.

```bash
# a superseded id, resolved by the catalogue to the model it was folded into
curl 'https://api.aimlapi.com/v1/models?id=aura-2-zeus-en'
# -> {"object":"list","data":[{"id":"deepgram/aura-2", ...}]}
```
{% endhint %}

A `deprecated` model is read from its live model card, so it announces its own sunset while it still works. Once a real retirement date is set, it is dropped from `GET /v1/models` — but it keeps serving, and [`GET /model/{id}`](complete-model-list.md#looking-up-one-model) still returns its card with the sunset dates attached. The other two states come from a durable record instead: a withdrawn model has no card left to read.

## Response shape

```json
{
  "object": "list",
  "generated_at": "2026-08-24T13:59:21.643Z",
  "data": [
    {
      "id": "openai/gpt-5.3-chat",
      "aliases": ["gpt-5.3-chat"],
      "status": "withdrawn",
      "deprecated_at": "2026-08-10",
      "shutdown_at": "2026-08-10",
      "replaced_by": "openai/gpt-5.3-codex",
      "reason": "provider_delisted"
    },
    {
      "id": "aura-2-zeus-en",
      "aliases": ["deepgram/aura-2-zeus-en", "#g1_aura-2-zeus-en"],
      "status": "superseded",
      "deprecated_at": "2026-06-26",
      "shutdown_at": null,
      "replaced_by": "deepgram/aura-2",
      "reason": "consolidated"
    }
  ]
}
```

Dates are plain `YYYY-MM-DD`. `deprecated_at` is the date the provider announced the retirement, or the date we learned of it when they gave no notice; `shutdown_at` is the date it stopped, or will stop, serving. `reason` is `provider_delisted`, `consolidated` or `unknown` — and `null` on an entry read from a live model card.

Entries are ordered newest-first by the most recent date they carry, then by `id`. A model published under several endpoint types appears once: the sunset belongs to the model, not to the route.

{% hint style="warning" %}
Match your integrated model name against **`id` and `aliases` together**, never `id` alone. The name you originally integrated against is often the alias rather than the canonical id, and an `id`-only comparison will miss the entry that explains what happened to it.
{% endhint %}

## Filtering

Both filters are optional, and both fail open: an unrecognised value is ignored rather than rejected. This is a discovery surface, and a typo in a polling job should not turn every poll into a `400`.

* **`status`** — case-insensitive, comma-separated (`?status=superseded,withdrawn`) or repeated (`?status=superseded&status=withdrawn`). A parameter holding no recognised value filters nothing and returns the whole feed.
* **`since`** — plain `YYYY-MM-DD`, no time part. Keeps entries whose `deprecated_at` **or** `shutdown_at` falls on or after that date. Entries carrying neither date are dropped, because there is nothing to compare against.

```bash
# what has been withdrawn since the start of the month
curl 'https://api.aimlapi.com/v1/models/deprecations?status=withdrawn&since=2026-08-01'

# everything still serving with a retirement already announced
curl 'https://api.aimlapi.com/v1/models/deprecations?status=deprecated'
```

## Polling and caching

Responses carry a weak `ETag` and `Cache-Control: public, max-age=300`. Send the tag back as `If-None-Match` and you get `304 Not Modified` with an empty body when nothing changed:

```bash
curl -I 'https://api.aimlapi.com/v1/models/deprecations'
# etag: W/"-1EFj0Jxxt7B2mx5LT-MXoCShLk"

curl -H 'If-None-Match: W/"-1EFj0Jxxt7B2mx5LT-MXoCShLk"' \
     'https://api.aimlapi.com/v1/models/deprecations'
# 304
```

{% hint style="info" %}
The tag is computed over `data` only. `generated_at` changes on every call, so including it would make every poll a cache miss — the tag moves only when the feed's contents actually move. Polling daily is plenty; the payload is small and changes rarely.
{% endhint %}

## Keeping an integration in sync

The feed and the catalogue answer different halves of the same question, so read both. The catalogue says what you can use today; the feed explains anything the catalogue no longer lists.

{% code overflow="wrap" %}
```js
const [catalogue, feed] = await Promise.all([
  fetch('https://api.aimlapi.com/v1/models').then((r) => r.json()),
  fetch('https://api.aimlapi.com/v1/models/deprecations').then((r) => r.json()),
]);

// every live name -> its canonical id
const live = new Map();
for (const model of catalogue.data) {
  live.set(model.id, model.id);
  for (const alias of model.aliases ?? []) live.set(alias, model.id);
}

// every retired name -> the entry explaining it
const retired = new Map();
for (const entry of feed.data) {
  retired.set(entry.id, entry);
  for (const alias of entry.aliases ?? []) retired.set(alias, entry);
}

function check(modelId) {
  const entry = retired.get(modelId);

  if (entry?.status === 'withdrawn') {
    return { ok: false, migrateTo: entry.replaced_by }; // 404s now — must move
  }
  if (entry) {
    // deprecated or superseded: still serving, migrate on your own schedule
    return { ok: true, migrateTo: entry.replaced_by, by: entry.shutdown_at };
  }
  if (live.has(modelId)) {
    return { ok: true }; // healthy
  }
  return { ok: false, migrateTo: null }; // unknown name — check for a typo
}
```
{% endcode %}

The last branch is the one worth keeping separate. A name in neither list was never a model id here, which is a different problem from a model that went away — and it is the case a catalogue-only check silently reports as a deprecation.

{% hint style="info" %}
Looking for a replacement by hand rather than in code? [All Model IDs](../model-database.md) lists the current catalogue alongside its [deprecated models](../model-database.md#deprecated-no-longer-supported-models) section.
{% endhint %}
