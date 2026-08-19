# Model Catalogue API

`GET /v1/models` returns the live model catalogue — the machine-readable source for which models exist, what they're called, what they can do, and what they cost.\
Use it instead of scraping the model pages. No API key is required for this request; you can also open [the endpoint](https://api.aimlapi.com/v1/models) directly in a browser.

By default each entry carries only its identity. Pricing, modalities and capabilities are opt-in, so the default response stays small.

## Asking for more per model

`include` attaches optional sections to each model. Combine values freely, comma-separated:

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

Every filter below narrows _which models_ come back. Filters are independent of `include`, so you can filter on capabilities without asking for the capabilities section.

<table data-search="false"><thead><tr><th>Parameter</th><th>Keeps models that…</th></tr></thead><tbody><tr><td><code>id</code></td><td>match this id <strong>or carry it as an alias</strong></td></tr><tr><td><code>type</code></td><td>are served through this endpoint type</td></tr><tr><td><code>tags</code></td><td>carry this tag, e.g. <code>playground:video</code></td></tr><tr><td><code>modalities</code></td><td>have it among input <strong>or</strong> output modalities</td></tr><tr><td><code>input_modalities</code></td><td>accept this input modality</td></tr><tr><td><code>output_modalities</code></td><td>produce this output modality</td></tr><tr><td><code>capabilities</code></td><td>declare this capability</td></tr></tbody></table>

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

## Get the model catalogue

Returns the full list of models matching the given filters, with the requested optional sections attached.

## GET /v1/models

```json
{"openapi":"3.0.0","info":{"title":"AIML API","version":"1.0.0"},"servers":[{"url":"https://api.aimlapi.com"}],"paths":{"/v1/models":{"get":{"operationId":"ModelsController_getModelsV2","parameters":[{"name":"id","in":"query","required":false,"description":"Keep models matching this id, or carrying it as an alias. Comma-separated or repeated values are OR'd together.","schema":{"type":"string"}},{"name":"type","in":"query","required":false,"description":"Keep models served through this endpoint type.","schema":{"type":"string"}},{"name":"tags","in":"query","required":false,"description":"Keep models carrying this tag, e.g. playground:video. Comma-separated or repeated values are OR'd together.","schema":{"type":"string"}},{"name":"modalities","in":"query","required":false,"description":"Keep models with this modality among either their input or output modalities.","schema":{"type":"string"}},{"name":"input_modalities","in":"query","required":false,"description":"Keep models accepting this input modality.","schema":{"type":"string"}},{"name":"output_modalities","in":"query","required":false,"description":"Keep models producing this output modality.","schema":{"type":"string"}},{"name":"capabilities","in":"query","required":false,"description":"Keep models declaring this capability, e.g. image_to_video. Comma-separated or repeated values are OR'd together; combining with other filter parameters is AND'd.","schema":{"type":"string"}},{"name":"include","in":"query","required":false,"description":"Attach optional sections to each model: pricing, modalities, capabilities, or all (?details=true is a synonym for all). Comma-separated. Unknown values are ignored rather than rejected.","schema":{"type":"string"}}],"responses":{"200":{"description":"The live model catalogue, filtered and expanded as requested. Responses carry an ETag; see Caching below.","content":{"application/json":{"schema":{"type":"object","properties":{"object":{"type":"string","description":"Always \"list\"."},"data":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Canonical unique identifier of the model."},"aliases":{"type":"array","nullable":true,"description":"Other names this model can still be requested under.","items":{"type":"string"}},"type":{"type":"string","description":"Endpoint type this model is served through."},"info":{"type":"object","description":"Model identity.","properties":{"name":{"type":"string","description":"Human-readable model name."},"developer":{"type":"string","description":"Organization or company that developed the model."}},"required":["name","developer"]},"tags":{"type":"array","description":"Free-form tags, e.g. playground:tts.","items":{"type":"string"}},"pricing":{"type":"object","nullable":true,"description":"Present only with ?include=pricing or all. See Reading prices below."},"modalities":{"type":"object","nullable":true,"description":"Present only with ?include=modalities or all. Input and output modalities the model handles."},"capabilities":{"type":"array","nullable":true,"description":"Present only with ?include=capabilities or all. Declared capabilities, e.g. image_to_video.","items":{"type":"string"}}},"required":["id","type","info","tags"]}}},"required":["object","data"]}}}}}}}}}}
```

## Looking up one model

`GET /model/{id}` returns a single model in the same projection, wrapped as `{"object": "model", "data": {…}}` instead of a list. It takes the same `include` and `details` parameters.

```bash
curl 'https://api.aimlapi.com/model/openai/gpt-4o?include=pricing'
```

Model ids containing slashes go into the path as they are — no escaping. The lookup matches **aliases as well as ids**, and is case-insensitive. A name that matches neither returns `404`.

{% hint style="info" %}
Note the two differences from the catalogue route. The path is singular — `/model/`, not `/models/` — and it is **not** registered under `/v1`, so it is `https://api.aimlapi.com/model/…` while the catalogue is `https://api.aimlapi.com/v1/models`.

`GET /v1/models?id=openai/gpt-4o` answers the same question and stays on the catalogue route. Use whichever fits: the filter returns a list, possibly empty; the lookup returns one model or a `404`.
{% endhint %}

## Checking whether a model is still available

{% hint style="warning" %}
Match against **`id` and `aliases` together**, not `id` alone. A model may be published under a canonical id while the name you integrated against lives on as an alias — the alias keeps working, but it is not the `id` any more, so an `id`-only comparison reports a live model as gone.
{% endhint %}

{% code overflow="wrap" %}
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
{% endcode %}

The same map de-duplicates your list: two names resolving to one canonical id are one model, not two.

## Reading prices

With `?include=pricing`, each model carries a `pricing` block. Read `kind` first:

| `kind`     | What it means                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| `fixed`    | one rate per unit, in `units[]`                                                                              |
| `variants` | the rate depends on request parameters — `dimensions` names them, `variants[]` quotes a rate per combination |
| `variable` | the rate cannot be quoted ahead of the request                                                               |

{% hint style="warning" %}
Always read `per` together with `price`. `price` is the charge for `per` units, and `per` is not the same across models — `1000000` for most token rates, `1000` for some, `1` for per-second and per-megapixel rates. Comparing bare `price` values across models compares different bases and will be wrong by orders of magnitude.
{% endhint %}

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

{% hint style="info" %}
The ETag covers the whole response, so it changes on any catalogue edit — a new model or a reworded description, not only a price change. Treat it as "something moved, re-read and diff", not as a price-change feed.
{% endhint %}
