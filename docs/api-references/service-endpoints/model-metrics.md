# Model Performance Metrics

<table data-header-hidden data-full-width="true"><thead><tr><th width="220" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><a href="model-metrics.md#get-model-performance-metrics">Get model performance metrics</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/models/metrics</code></td></tr></tbody></table>

`GET /models/metrics` reports how fast models are responding **right now** — `ttft_ms`, `tps` and `duration_ms` as p50/p75/p90/p99 over a short sliding window, per model.\
No API key is required for this request. You can also open [the endpoint](https://api.aimlapi.com/models/metrics) directly in a browser.

Use it to pick between models that are otherwise interchangeable, or to check whether slowness you are seeing is on your side. These are the same numbers the model cards in the dashboard show.

{% hint style="warning" %}
**A higher percentile of `tps` is better, not worse.** These are percentiles of the measured value itself, so `p99` of `ttft_ms` or `duration_ms` is the slow tail — but `p99` of `tps` is the *fastest* requests, and `p50` is the typical one. Comparing models on `tps` p99 compares their best cases.
{% endhint %}

{% hint style="info" %}
A model that served no successful requests inside the window is **absent from `models` entirely**. That is "no data", not "zero latency" — and since only successful requests are measured, a model that is failing everything drops off the list rather than showing bad numbers.

`aliases` does not split on commas: repeat the parameter, as in `?aliases=openai/gpt-5&aliases=google/veo-3`. Names are matched exactly against the `id` and `aliases` from the [Complete Model List](complete-model-list.md).
{% endhint %}

### Get model performance metrics

Returns latency percentiles per model over the current window.

{% openapi-operation spec="model-metrics" path="/models/metrics" method="get" %}
[OpenAPI model-metrics](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/model-metrics.json)
{% endopenapi-operation %}
