# Usage Logs

<table data-header-hidden data-full-width="true"><thead><tr><th width="220" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><a href="usage-logs.md#get-request-logs">Get request logs</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v2/logs</code></td></tr></tbody></table>

`GET /v2/logs` returns **one row per request** — what it cost, how many tokens it used, whether it succeeded, and the [ids you need to tie it back to your own systems](../../capabilities/request-tracing-and-cost.md).\
The time window and key-selection rules are identical to [API Key Usage](api-key-usage.md); use that endpoint when you want totals rather than individual requests.

{% hint style="warning" %}
The `model` and `status` filters do **not** split on commas — repeat the parameter instead (`?status=succeeded&status=failed`). `?model=a,b` is read as one model literally named `a,b`, so it matches nothing and you get an empty page rather than an error.
{% endhint %}

{% hint style="info" %}
Unlike `/v2/usage`, this endpoint lists **failed requests too**, with a zero `cost`. A failed request is billed nothing — the hold is rolled back — so it never appears in the usage totals. That is why a row count here can exceed the `requests` figure `/v2/usage` reports for the same window.
{% endhint %}

### Get request logs

Returns the requests made in the window, with cost, tokens and correlation ids.

{% openapi-operation spec="logs-v2" path="/v2/logs" method="get" %}
[OpenAPI logs-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/logs-v2.json)
{% endopenapi-operation %}

***

### Errors

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
