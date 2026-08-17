---
hidden: true
icon: list-tree
---

# Model Catalogue API

## List models

`GET /v1/models` returns the live catalogue. It is the machine-readable source for which models exist, what they are called, what they can do, and what they cost — use it instead of scraping the model pages.

By default each entry carries only its identity. Pricing, modalities and capabilities are opt-in, so the default response stays small:

```bash
curl https://api.aimlapi.com/v1/models
```

```json
{
  "object": "list",
  "data": [
    {
      "id": "deepgram/aura-2",
      "aliases": ["aura-2", "aura-2-helena-en", "deepgram/aura-2-helena-en"],
      "type": "internal/text-to-speech",
      "info": { "name": "Aura-2", "developer": "Deepgram" },
      "tags": ["playground:tts"]
    }
  ]
}
```

{% openapi-operation spec="models-catalogue" path="/v1/models" method="get" %}
[Broken link](/broken/openapi/models-catalogue)
{% endopenapi-operation %}

## Asking for more per model

`include` attaches optional sections. Combine them freely, comma-separated:

```bash
curl 'https://api.aimlapi.com/v1/models?include=pricing'
curl 'https://api.aimlapi.com/v1/models?include=pricing,capabilities'
curl 'https://api.aimlapi.com/v1/models?include=all'
```

| Value          | Adds                                                |
| -------------- | --------------------------------------------------- |
| `pricing`      | the `pricing` block — rates, units, price bands     |
| `modalities`   | which input and output modalities the model handles |
| `capabilities` | declared capabilities, e.g. `image_to_video`        |
| `all`          | every section. `?details=true` is a synonym         |

Unknown values are ignored rather than rejected, so a typo returns a valid response with that section missing.

## Filtering

Every filter below narrows _which models_ come back. They are independent of `include`, so you can filter on capabilities without asking for the capabilities section.

| Parameter           | Keeps models that…                           |
| ------------------- | -------------------------------------------- |
| `id`                | match this id **or carry it as an alias**    |
| `type`              | are served through this endpoint type        |
| `tags`              | carry this tag, e.g. `playground:video`      |
| `modalities`        | have it among input **or** output modalities |
| `input_modalities`  | accept this input modality                   |
| `output_modalities` | produce this output modality                 |
| `capabilities`      | declare this capability                      |

Rules that apply to all of them:

* **Several values, one parameter — OR.** `?capabilities=text_to_video,image_to_video` returns models that do either.
* **Several parameters — AND.** `?output_modalities=video&capabilities=audio_generation` returns models that do both.
* Values are **case-insensitive**, and may be given comma-separated (`?tags=a,b`) or repeated (`?tags=a&tags=b`). Both forms merge.
* An omitted parameter filters nothing.

```bash
# every model that turns an image into video
curl 'https://api.aimlapi.com/v1/models?capabilities=image_to_video'

# what one specific model costs — a few kilobytes instead of the whole catalogue
curl 'https://api.aimlapi.com/v1/models?id=deepgram/aura-2&include=pricing'
```

## Checking whether a model is still available

Match against **`id` and `aliases` together**. A model may be published under a canonical id while the name you integrated against lives on as an alias — the alias keeps working, but it is not the `id` any more, so an `id`-only comparison reports a live model as gone.

```js
const res = await fetch('https://api.aimlapi.com/v1/models');
const { data } = await res.json();

const byName = new Map();
for (const model of data) {
  byName.set(model.id, model.id);
  for (const alias of model.aliases ?? []) byName.set(alias, model.id);
}

const canonical = byName.get(myModelId); // undefined ⇒ genuinely unavailable
```

The same map de-duplicates your list: two names resolving to one canonical id are one model, not two.

## Reading prices

With `?include=pricing`, each model carries a `pricing` block. Read `kind` first:

| `kind`     | What it means                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| `fixed`    | one rate per unit, in `units[]`                                                                              |
| `variants` | the rate depends on request parameters — `dimensions` names them, `variants[]` quotes a rate per combination |
| `variable` | the rate cannot be quoted ahead of the request                                                               |

**Always read `per` together with `price`.** `price` is the charge for `per` units, and `per` is not the same across models — `1000000` for most token rates, `1000` for some, `1` for per-second and per-megapixel rates. Comparing bare `price` values across models compares different bases and will be wrong by orders of magnitude.

```json
{
  "kind": "variants",
  "dimensions": ["resolution"],
  "variants": [
    { "when": { "resolution": "720p" },  "price": 0.39, "unit": "second", "per": 1 },
    { "when": { "resolution": "1080p" }, "price": 0.65, "unit": "second", "per": 1 }
  ]
}
```

Here a 5-second 1080p generation costs `0.65 × 5 = $3.25`.

Prices are in USD and are what you are charged.

## Caching

Responses carry an `ETag`. Send it back as `If-None-Match` and you get `304 Not Modified` with an empty body when nothing changed:

```bash
curl -I 'https://api.aimlapi.com/v1/models?include=pricing'
# etag: W/"1440a0-uH6NONsG/9An5njw3kqMcYY5k8w"

curl -H 'If-None-Match: W/"1440a0-uH6NONsG/9An5njw3kqMcYY5k8w"' \
     'https://api.aimlapi.com/v1/models?include=pricing'
# 304
```

The ETag covers the whole response, so it changes on any catalogue edit — a new model or a reworded description, not only a price change. Treat it as "something moved, re-read and diff", not as a price-change feed.
