# Complete Model List

<table data-header-hidden data-full-width="true"><thead><tr><th width="220" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><a href="complete-model-list.md#get-the-model-catalogue">Get the model catalogue</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v1/models</code></td></tr><tr><td valign="top"><a href="complete-model-list.md#looking-up-one-model">Look up one model</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/model/{id}</code></td></tr></tbody></table>

`GET /v1/models` returns the live model catalogue — the machine-readable source for which models exist, what they are called, what they can do, and what they cost. Use it instead of scraping the model pages.\
No API key is required for this request. You can also simply open [this list](https://api.aimlapi.com/v1/models) in any web browser.

As of early 2026 the catalogue holds more than 400 models. By default each entry carries only its identity — pricing, modalities and capabilities are opt-in, so the default response stays small.

{% hint style="info" %}
`https://api.aimlapi.com/models` and `https://api.aimlapi.com/api/v1/models` serve exactly the same data. `/v1/models` is the canonical path and the one to use in new integrations — an OpenAI-compatible client configured with a base URL of `https://api.aimlapi.com/v1` reaches it by appending `/models`.
{% endhint %}

## Get the model catalogue

Returns the models matching the given filters, with the requested optional sections attached.

{% openapi-operation spec="models" path="/v1/models" method="get" %}
[OpenAPI models](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/models.json)
{% endopenapi-operation %}

## Asking for more per model

`include` attaches optional sections to each model — `pricing`, `modalities`, `capabilities`, or `all` (`?details=true` is a synonym for every section). Combine them freely, comma-separated. Unknown values are ignored rather than rejected, so a typo returns a valid response with that section missing.

```bash
curl 'https://api.aimlapi.com/v1/models?include=pricing,capabilities'

# what one specific model costs — a few kilobytes instead of the whole catalogue
curl 'https://api.aimlapi.com/v1/models?id=deepgram/aura-2&include=pricing'
```

## Filtering

Filters narrow _which models_ come back, and are independent of `include` — you can filter on capabilities without asking for the capabilities section.

* **Several values, one parameter — OR.** `?capabilities=text_to_video,image_to_video` returns models that do either.
* **Several parameters — AND.** `?output_modalities=video&capabilities=audio_generation` returns models that do both.
* Values are **case-insensitive**, and may be given comma-separated (`?tags=a,b`) or repeated (`?tags=a&tags=b`). Both forms merge.
* `id` matches **an id or an alias**. An omitted parameter filters nothing.

```bash
# every model that turns an image into video
curl 'https://api.aimlapi.com/v1/models?capabilities=image_to_video'
```

## Looking up one model

`GET /model/{id}` returns a single model in the same projection, wrapped as `{"object": "model", "data": {…}}` instead of a list. It takes the same `include` and `details` parameters.

```bash
curl 'https://api.aimlapi.com/model/openai/gpt-4o?include=pricing'
```

Model ids containing slashes go into the path as they are — no escaping. The lookup matches aliases as well as ids, is case-insensitive, and returns `404` for a name that matches neither.

{% hint style="info" %}
Note the two differences from the catalogue route. The path is singular — `/model/`, not `/models/` — and it is **not** registered under `/v1`.

`GET /v1/models?id=openai/gpt-4o` answers the same question and stays on the catalogue route. Use whichever fits: the filter returns a list, possibly empty; the lookup returns one model or a `404`.
{% endhint %}

## Output examples by model type

Each item represents a single model. The `info` block is the part that varies by category — context and output limits are meaningful for a text model and absent from an image or video one — while `id`, `aliases`, `type` and `tags` are always present.

#### Example output item for a chat model

{% code overflow="wrap" %}
```json
{
  "id": "openai/gpt-4o",
  "info": {
    "releasedAt": "2025-08-07",
    "name": "GPT-4o",
    "developer": "Open AI",
    "description": "Multimodal AI model by OpenAI enhancing human-computer interaction.",
    "contextLength": 128000,
    "outputMax": 16384,
    "cutoffAt": "2023-10-01",
    "url": "https://aimlapi.com/models/gpt-4o-2024-08-06-api",
    "docsUrl": "https://docs.aimlapi.com/api-references/text-models-llm/openai/gpt-4o",
    "docsJson": "https://api.aimlapi.com/docs-json?model=openai%2Fgpt-4o&endpoint=openai%2Fchat-completions"
  },
  "type": "openai/chat-completions",
  "aliases": ["gpt-4o"],
  "tags": ["playground:chat", "tier:tier_2"]
}
```
{% endcode %}

#### Example output item for an image model

{% code overflow="wrap" %}
```json
{
  "id": "openai/gpt-image-1",
  "info": {
    "releasedAt": "2025-10-13",
    "name": "GPT Image 1",
    "developer": "Open AI",
    "description": "GPT Image 1 is OpenAI's first-generation image generation model combining language understanding with visual synthesis.",
    "url": "",
    "docsUrl": "https://docs.aimlapi.com/api-references/image-models/openai/gpt-image-1",
    "docsJson": "https://api.aimlapi.com/docs-json?model=openai%2Fgpt-image-1&endpoint=openai%2Fimage-generations"
  },
  "type": "openai/image-generations",
  "aliases": ["gpt-image-1"],
  "tags": ["playground:image", "tier:tier_2"]
}
```
{% endcode %}

#### Example output item for a video model

{% code overflow="wrap" %}
```json
{
  "id": "google/veo-2.0-generate-001",
  "info": {
    "releasedAt": "2025-11-25",
    "name": "Veo 2 Text-to-Video",
    "developer": "Google",
    "description": "Veo2: Google's advanced text-to-video model",
    "url": "https://aimlapi.com/models/veo-2-text-to-video-api",
    "docsUrl": "https://docs.aimlapi.com/api-references/video-models/google/veo2-text-to-video",
    "docsJson": "https://api.aimlapi.com/docs-json?model=google%2Fveo-2.0-generate-001&endpoint=internal%2Fvideo-generations%2Fsubmit"
  },
  "type": "internal/video-generations/submit",
  "aliases": ["veo-2.0-generate-001"],
  "tags": ["playground:video", "tier:tier_2"]
}
```
{% endcode %}

#### What `include` adds

Asking for the optional sections attaches them to the same item:

{% code overflow="wrap" %}
```json
{
  "id": "openai/gpt-4o",
  "modalities": { "input": ["image", "text"], "output": ["text"] },
  "capabilities": [
    "file_input",
    "parallel_tool_calls",
    "streaming",
    "structured_output",
    "tools",
    "vision"
  ],
  "pricing": {
    "kind": "fixed",
    "currency": "USD",
    "units": [
      { "name": "token", "measure": "output", "price": 3.25, "per": 1000000 }
    ]
  }
}
```
{% endcode %}

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

const canonical = byName.get(myModelId); // undefined ⇒ not in the catalogue
```
{% endcode %}

The same map de-duplicates your list: two names resolving to one canonical id are one model, not two.

{% hint style="info" %}
A name missing from this map is not necessarily a model that went away — it may also be one that never existed here. [`GET /v1/models/deprecations`](model-deprecations.md) tells the two apart, and names the id to migrate to where there is one.
{% endhint %}

## Reading prices

With `?include=pricing`, each model carries a `pricing` block. Read `kind` first — it decides how the rest is shaped.

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

Here a 5-second 1080p generation costs `0.65 × 5 = $3.25`. Prices are in USD and are what you are charged.

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
