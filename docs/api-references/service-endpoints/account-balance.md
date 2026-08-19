# Account Balance

## Get account balance info

{% hint style="warning" %}
This endpoint is considered legacy and is scheduled for future deprecation.\
Please plan to migrate to the new `/v2/billing` and `/v2/billing/detail` endpoints documented below.
{% endhint %}

You can query your account balance and other billing details through this API.\
To make a request, you only need your AIMLAPI key obtained from your [account dashboard](https://aimlapi.com/app/keys).

{% openapi-operation spec="billing-test-1" path="/v1/billing/balance" method="get" %}
[OpenAPI billing-test-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-balance-v1.json)
{% endopenapi-operation %}

## Get balance info

Returns a user's balance.

{% openapi-operation spec="billing-v2" path="/v2/billing" method="get" %}
[OpenAPI billing-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-v2.json)
{% endopenapi-operation %}

## Get detailed billing info

Returns detailed billing information, balance and auto top-up settings.

{% openapi-operation spec="billing-detail-v2" path="/v2/billing/detail" method="get" %}
[OpenAPI billing-detail-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-detail-v2.json)
{% endopenapi-operation %}

## Get account transactions

`GET /v2/billing/transactions` answers "where did the balance go". Each entry is one movement of money — either a **successful top-up** or a **charge**, and a charge carries the model that produced it.

Authenticate with a **regular** AIML API key. There is no `key_prefix` here: a wallet belongs to the account, not to a key, so the endpoint always answers for the account behind the key you used.

{% hint style="info" %}
This is the account ledger — the same figures that move your balance — so it is what you reconcile against. [API Key Usage](api-key-usage.md) and [Usage Logs](usage-logs.md) come from the analytics pipeline instead, and are meant for attribution and budgeting.
{% endhint %}

### Reading an entry

`amount` is **always positive**; `direction` is what carries the sign — `TOPUP` for money in, `CHARGE` for money out. `type` says what produced the entry: `PAYMENT`, `BONUS`, `REFUND`, `ADJUSTMENT`, `MODEL_USAGE`, `CREDITS_EXPIRED` or `INIT`.

`reference_id` is what makes an entry joinable to something you already have. For a `MODEL_USAGE` charge it is the **inference id** — the same value returned in the `x-inference-id` response header, reported as `inference_id` in [Usage Logs](usage-logs.md), and, for an async generation, the `generation_id` that submit returned. For a payment it is the payment transaction id. It is `null` when there is nothing on your side to point at, such as a bonus, an expiry or a manual adjustment.

`model` is `null` on top-ups, on charges that are not model usage, and in the rare case where the model could not be resolved.

```bash
# every charge, newest first
curl -H 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  'https://api.aimlapi.com/v2/billing/transactions?direction=CHARGE&limit=100'
```

### Paging through the ledger

Paging is **cursor-based**. Take `pagination.next_cursor` from a response and pass it back as `cursor` to get the next page; it is `null` once you reach the end.

{% hint style="warning" %}
Do not page this endpoint by offset, and do not rebuild the cursor. The ledger grows at the head, so a numeric offset silently skips or repeats entries between pages. The cursor is opaque and is accepted **only in the exact form we issued** — re-encoding it is rejected with `400`.
{% endhint %}

{% hint style="info" %}
A charge lands **after** you saw your response — it is applied when the request completes on the billing side, and for async video after the generation reports `completed`. Reconciling the instant a generation finishes will under-count. Failed requests are not charged at all, so they have no entry here.

Timestamps are UTC, and a balance may legitimately go negative — overdraft is allowed.
{% endhint %}

Returns the account's balance movements, newest first.

{% openapi-operation spec="billing-transactions-v2" path="/v2/billing/transactions" method="get" %}
[OpenAPI billing-transactions-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-transactions-v2.json)
{% endopenapi-operation %}

### Errors

| Code  | When                                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------------------------ |
| `400` | `to` not later than `from`; an unknown query parameter; `limit` outside 1–100; an unknown `direction` or `type`; a malformed or re-encoded cursor |
| `401` | Missing or invalid key                                                                                           |
| `403` | A management key — this route is for regular keys                                                                |
