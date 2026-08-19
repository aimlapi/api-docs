# Request Tracing and Cost Headers

Every inference response carries the ids and, where it can, the price of the call that produced it. That is enough to attribute spend per request without polling a reporting endpoint afterwards — and enough to tie our records to yours when something needs explaining.

This works on all inference endpoints; it is a property of the transport, not of a particular model.

## Attaching your own identifier

Send `X-Client-Request-Id` with the request and we store it, echo it back, and report it as `client_request_id` in [Usage Logs](../api-references/service-endpoints/usage-logs.md). Use whatever identifies the work on your side — an order number, a job id, a customer reference.

```bash
curl -sS -D - -o /dev/null \
  --url 'https://api.aimlapi.com/v1/chat/completions' \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --header 'X-Client-Request-Id: order-8f21c4' \
  --data '{"model": "openai/gpt-5", "messages": [{"role": "user", "content": "Hi"}]}'
```

The value must be **1–128 characters** from `A–Z`, `a–z`, `0–9`, `.`, `_`, `:` and `-`.

{% hint style="warning" %}
A value outside that alphabet — or longer than 128 characters — is **silently dropped**. Your request still runs and is still billed exactly as normal; you simply get no correlation back, and `client_request_id` stays `null` in the logs. A malformed header is never a reason to fail a request, so nothing in the response tells you it was ignored. If you generate these ids from user input, sanitise them on your side.
{% endhint %}

## What comes back

| Header                   | When it is present                                              |
| ------------------------ | --------------------------------------------------------------- |
| `x-inference-id`         | Always                                                          |
| `x-client-request-id`    | When you sent a valid `X-Client-Request-Id`                     |
| `x-aimlapi-credits-used` | Non-streaming JSON responses                                    |
| `x-aimlapi-usd-spent`    | Non-streaming JSON responses                                    |

`x-inference-id` is the handle for everything downstream. It is the id the charge is recorded under, so it comes back as `reference_id` in [`GET /v2/billing/transactions`](../api-references/service-endpoints/account-balance.md#get-account-transactions) and as `inference_id` in [Usage Logs](../api-references/service-endpoints/usage-logs.md). For an asynchronous generation it is the same id that submit returned as `generation_id`, so a submit and its polls share one id.

`x-aimlapi-credits-used` is an integer count of credits; `x-aimlapi-usd-spent` is the same amount in USD.

```js
const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json",
    "X-Client-Request-Id": "order-8f21c4",
  },
  body: JSON.stringify({
    model: "openai/gpt-5",
    messages: [{ role: "user", content: "Hi" }],
  }),
});

response.headers.get("x-inference-id");       // ours: V1StGXR8Z5jdHi6BmyT8k
response.headers.get("x-client-request-id");  // yours, echoed: order-8f21c4
response.headers.get("x-aimlapi-usd-spent");  // 0.001240000
```

{% hint style="info" %}
All four headers are listed in `Access-Control-Expose-Headers`, so a browser can read them on a cross-origin response. Without that a fetch from the browser sees the response but not these headers.
{% endhint %}

## When the cost is not in a header

Two response types deliberately carry no cost headers, because the price is not known by the time headers are sent.

**Streaming responses.** Headers flush before the first token, so the total cannot be there yet. The cost arrives in the final SSE chunk instead, under `meta.usage`:

{% code overflow="wrap" %}
```json
{
  "meta": {
    "usage": { "credits_used": 2480, "usd_spent": 0.00124 }
  }
}
```
{% endcode %}

**Binary audio (`wav`).** The cost only arrives in a summary after the audio itself, and holding the whole response back to fill in a header would mean buffering it in memory. Read the cost of these calls from [Usage Logs](../api-references/service-endpoints/usage-logs.md) instead.

The correlation headers — `x-inference-id` and `x-client-request-id` — are present in both cases; it is only the cost that moves.

{% hint style="info" %}
On the poll routes of an asynchronous generation, the inference id is a value **you** supply as a query parameter. If it does not look like an id we could have issued, the header is left out rather than the request failed — so an absent `x-inference-id` on a poll means the id you polled with was malformed.
{% endhint %}

## Following one request end to end

1. Send the request with your own `X-Client-Request-Id`.
2. Read `x-inference-id` from the response and keep it next to your own record.
3. Later, find the request in [Usage Logs](../api-references/service-endpoints/usage-logs.md) — by `client_request_id` if you sent one, otherwise by `inference_id` — for its status, tokens and cost.
4. Find the money it moved in [`GET /v2/billing/transactions`](../api-references/service-endpoints/account-balance.md#get-account-transactions), where the same inference id appears as `reference_id`.

{% hint style="warning" %}
The charge is recorded after your response was delivered — and, for async video, after the generation reports `completed`. A ledger entry that is not there yet the moment a call returns is expected, not missing.
{% endhint %}
