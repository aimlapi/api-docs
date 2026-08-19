# Model Performance Metrics

`GET /models/metrics` reports how fast models are responding **right now** — latency percentiles measured over a short sliding window, per model.\
No API key is required for this request. You can also open [the endpoint](https://api.aimlapi.com/models/metrics) directly in a browser.

Use it to pick between models that are otherwise interchangeable, or to check whether slowness you are seeing is on your side. These are the same numbers the model cards in the dashboard show.

## What is measured

| Metric        | Meaning                                        | Applies to             |
| ------------- | ---------------------------------------------- | ---------------------- |
| `ttft_ms`     | Time to first token, in milliseconds           | Streaming text models  |
| `tps`         | Output tokens per second                       | Text models            |
| `duration_ms` | End-to-end request duration, in milliseconds   | Every model            |

Each is reported as `p50`, `p75`, `p90` and `p99` over the window. `window_seconds` tells you how long that window is — currently 300 seconds — and `generated_at` when the figures were computed.

{% hint style="warning" %}
**A higher percentile of `tps` is better, not worse.** These are percentiles of the measured value itself, so `p99` of `ttft_ms` or `duration_ms` is the slow tail — but `p99` of `tps` is the *fastest* requests, and `p50` is the typical one. Comparing models on `tps` p99 compares their best cases.
{% endhint %}

## Reading the response

```json
{
  "window_seconds": 300,
  "generated_at": "2026-08-19T12:00:05.000Z",
  "models": [
    {
      "alias": "openai/gpt-5",
      "endpoint": "/v1/chat/completions",
      "metrics": {
        "ttft_ms": { "p50": 412, "p75": 588, "p90": 910, "p99": 2140 },
        "tps": { "p50": 51.7, "p75": 64.1, "p90": 78.4, "p99": 96.2 },
        "duration_ms": { "p50": 1830, "p75": 2450, "p90": 3900, "p99": 9100 }
      }
    }
  ]
}
```

Two absences mean different things, and both are easy to misread:

* **A missing metric key** — say no `ttft_ms` on an image model — means the metric does not apply to that model, not that it is zero.
* **A model missing from `models` entirely** means it served no successful requests inside the window. That is "no data", not "no traffic ever" and certainly not "zero latency". Only successful requests are measured, so a model that is failing everything disappears from this list rather than showing bad numbers.

{% hint style="info" %}
The response carries no request counts. A model at the top of the list is not necessarily the busiest one, and you cannot tell from here how many samples a percentile is based on — over a five-minute window, a rarely used model's `p99` may rest on very few requests.
{% endhint %}

## Asking about specific models

Repeat `aliases` once per model:

```bash
curl 'https://api.aimlapi.com/models/metrics?aliases=openai/gpt-5&aliases=google/veo-3'
```

Names are matched **exactly** against the `id` and `aliases` from the [Model Catalogue](models-catalogue.md), and up to 100 may be given. Omit the parameter to get every measured model.

{% hint style="warning" %}
Unlike the catalogue filters, this parameter does **not** split on commas. `?aliases=a,b` is read as one model literally named `a,b` and matches nothing, returning an empty list rather than an error. Repeat the parameter instead.

Any query parameter other than `aliases` is rejected with `400`.
{% endhint %}

## Get model performance metrics

Returns latency percentiles per model over the current window.

{% openapi-operation spec="model-metrics" path="/models/metrics" method="get" %}
[OpenAPI model-metrics](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/model-metrics.json)
{% endopenapi-operation %}
