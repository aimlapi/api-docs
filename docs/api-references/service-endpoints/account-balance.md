# Account Balance

<table data-header-hidden data-full-width="true"><thead><tr><th width="220" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><a href="account-balance.md#get-balance-info">Get balance info</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v2/billing</code></td></tr><tr><td valign="top"><a href="account-balance.md#get-detailed-billing-info">Get detailed billing info</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v2/billing/detail</code></td></tr><tr><td valign="top"><a href="account-balance.md#get-account-transactions">Get account transactions</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v2/billing/transactions</code></td></tr><tr><td valign="top"><a href="account-balance.md#get-account-balance-info">Get account balance info</a> <em>(legacy)</em></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v1/billing/balance</code></td></tr></tbody></table>

To make a request, you only need your AIMLAPI key obtained from your [account dashboard](https://aimlapi.com/app/keys).

### Get balance info

Returns a user's balance.

{% openapi-operation spec="billing-v2" path="/v2/billing" method="get" %}
[OpenAPI billing-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-v2.json)
{% endopenapi-operation %}

***

### Get detailed billing info

Returns detailed billing information, balance and auto top-up settings.

{% openapi-operation spec="billing-detail-v2" path="/v2/billing/detail" method="get" %}
[OpenAPI billing-detail-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-detail-v2.json)
{% endopenapi-operation %}

***

### Get account transactions

The account money feed: one entry per balance movement, either a successful top-up or a charge carrying the model that produced it. Authenticate with a **regular** AIML API key — there is no `key_prefix`, because a wallet belongs to the account, not to a key.

For a `MODEL_USAGE` charge, `reference_id` is the inference id — the same value returned in the `x-inference-id` response header and reported as `inference_id` in [Usage Logs](usage-logs.md).

{% hint style="info" %}
This is the account ledger — the same figures that move your balance — so it is what you reconcile against. [API Key Usage](api-key-usage.md) and [Usage Logs](usage-logs.md) come from the analytics pipeline instead, and are meant for attribution and budgeting.

A charge lands **after** you saw your response, and for async video after the generation reports `completed`, so reconciling the instant a generation finishes will under-count. Failed requests are never charged and have no entry here at all.
{% endhint %}

{% hint style="warning" %}
Page with the cursor, never with an offset. The ledger grows at the head, so a numeric offset silently skips or repeats entries between pages. Pass `pagination.next_cursor` back as `cursor` — it is opaque and accepted only in the exact form we issued, so re-encoding it is rejected with `400`.
{% endhint %}

Returns the account's balance movements, newest first.

{% openapi-operation spec="billing-transactions-v2" path="/v2/billing/transactions" method="get" %}
[OpenAPI billing-transactions-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-transactions-v2.json)
{% endopenapi-operation %}

#### Errors

| Code  | When                                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------------------------ |
| `400` | `to` not later than `from`; an unknown query parameter; `limit` outside 1–100; an unknown `direction` or `type`; a malformed or re-encoded cursor |
| `401` | Missing or invalid key                                                                                           |
| `403` | A management key — this route is for regular keys                                                                |

***

### Get account balance info

{% hint style="warning" %}
This endpoint is considered legacy and is scheduled for future deprecation.\
Please plan to migrate to the `/v2/billing` and `/v2/billing/detail` endpoints documented above.
{% endhint %}

{% openapi-operation spec="billing-test-1" path="/v1/billing/balance" method="get" %}
[OpenAPI billing-test-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-balance-v1.json)
{% endopenapi-operation %}
