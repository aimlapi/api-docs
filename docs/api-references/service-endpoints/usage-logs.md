# Usage Logs

`GET /v2/logs` returns **one row per request** — what it cost, how many tokens it used, whether it succeeded, and the ids you need to tie it back to your own systems.\
To make a request, you only need your AIMLAPI key obtained from your [account dashboard](https://aimlapi.com/app/keys).

Use it when a total is not enough: finding the requests behind an unexpected bill, listing what failed, or attributing spend to your own customers.\
For the totals themselves, see [API Key Usage](api-key-usage.md).

## Choosing the time window and the key

Identical to [API Key Usage](api-key-usage.md): pass **either** `period` **or** both `start` and `end`, the window cannot exceed 92 days, and `key_prefix` selects which key you are asking about — omitted means your own, and naming a different key requires a management key.

## Filtering

| Parameter | Keeps requests that…                                                        |
| --------- | --------------------------------------------------------------------------- |
| `model`   | were made to this model — `source/alias` (`openai/gpt-5`) or a bare alias    |
| `status`  | ended as `succeeded` or as `failed`                                          |

Both accept several values by **repeating the parameter** — `?status=succeeded&status=failed` — and several values are combined with OR. `model` accepts at most 50 values.

{% hint style="warning" %}
These filters do **not** split on commas, unlike the ones on the [Model Catalogue](models-catalogue.md). `?model=a,b` is read as one model literally named `a,b`, so it matches nothing and you get an empty page rather than an error. `?status=succeeded,failed` is not a valid status at all and returns `400`.

Model names are matched exactly, so `openai/gpt-5` and `gpt-5` both work but a differently-cased spelling does not.
{% endhint %}

```bash
# everything that failed in the last day
curl -H 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  'https://api.aimlapi.com/v2/logs?period=24h&status=failed'
```

{% hint style="info" %}
Unlike `/v2/usage`, this endpoint lists **failed requests too**. A failed request is billed nothing — the hold is rolled back — so it appears here with a zero `cost` and is absent from the usage totals. That is why a row count here can exceed the `requests` figure `/v2/usage` reports for the same window.
{% endhint %}

## Paging

Rows come back newest first. `limit` (1–100, default 50) and `offset` walk the result set; `pagination.total` is the number of rows matching your query and `pagination.has_more` tells you whether to keep going.

```bash
curl -H 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  'https://api.aimlapi.com/v2/logs?period=7d&limit=100&offset=100'
```

## Tying a row back to your own request

Each row carries three ids:

| Field               | What it is                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `inference_id`      | The inference. Also returned in the `x-inference-id` response header, and used as the charge's `reference_id` |
| `request_id`        | The individual HTTP call                                                                                   |
| `client_request_id` | The `X-Client-Request-Id` **you** sent with the request                                                    |

`client_request_id` is the one to reach for when you want your own identifier — an order number, a customer id — instead of ours. Send it as a request header and it comes back here unchanged. See [Request Tracing and Cost Headers](../../capabilities/request-tracing-and-cost.md).

{% hint style="warning" %}
`client_request_id` is `null` for requests made before this field existed, and for any request that did not carry the header. Treat `null` as "not supplied", never as a match.
{% endhint %}

## Get request logs

Returns the requests made in the window, with cost, tokens and correlation ids.

{% openapi-operation spec="logs-v2" path="/v2/logs" method="get" %}
[OpenAPI logs-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/logs-v2.json)
{% endopenapi-operation %}

## Errors

| Code  | When                                                                                                            |
| ----- | ----------------------------------------------------------------------------------------------------------------- |
| `400` | Neither `period` nor `start`+`end`, or both; a malformed date or period; `end` earlier than `start`; window over 92 days |
| `401` | Missing or invalid key                                                                                          |
| `403` | A regular key naming another key's prefix                                                                       |
| `404` | The prefix is not yours, or is outside your key's scopes                                                        |
| `429` | Over 200 requests per 60 seconds                                                                                |

{% hint style="info" %}
These figures come from the analytics pipeline and are meant for **attribution and budgeting**. For the account ledger — what actually moved your balance, including top-ups — use [`GET /v2/billing/transactions`](account-balance.md#get-account-transactions).
{% endhint %}
