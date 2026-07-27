# API Key Usage

Query how much a given API key spent over a period of time.\
To make a request, you only need your AIMLAPI key obtained from your [account dashboard](https://aimlapi.com/app/keys).

Both endpoints take the same parameters and differ only in what they return: `/v2/usage/detail` adds a per-model breakdown.

## Choosing the time window

Pass **either** `period` **or** both `start` and `end` — not both at once:

* `period` is relative — `24h`, `7d`, that is a positive integer followed by `h` or `d`.
* `start` and `end` are absolute ISO-8601 timestamps.

The window cannot exceed **92 days**. For a longer report, request several windows and add them up.

{% hint style="info" %}
A timestamp without a UTC offset is read as **UTC**, not as your local time. Pass an explicit offset (`2026-07-01T00:00:00+03:00`) if you mean something else.

The response always echoes `start` and `end` resolved to UTC, so you can see exactly which window was measured.
{% endhint %}

## Choosing the key

| Your key | `key_prefix` | Result |
| ---------------- | ------------------------ | ---------------- |
| any key | omitted | its own spend |
| management key | provided | that key's spend |
| regular key | provided, its own prefix | its own spend |
| regular key | provided, another prefix | `403` |

Any key can read its own spend. Reading the spend of a **different** key requires a management key.

## Get key usage

Returns the total spend for a key over the requested window.

{% openapi-operation spec="usage-v2" path="/v2/usage" method="get" %}
[OpenAPI usage-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/usage-v2.json)
{% endopenapi-operation %}

## Get detailed key usage

Returns the same total plus a per-model breakdown, sorted by spend.

{% openapi-operation spec="usage-detail-v2" path="/v2/usage/detail" method="get" %}
[OpenAPI usage-detail-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/usage-detail-v2.json)
{% endopenapi-operation %}

## Good to know

* **`spend` is the authoritative total.** In the detailed response it is computed from the total rather than by adding up `models`, so the two can differ by a few nano-dollars. That is expected.
* **Unfinished work is not counted.** A video generation that is still running is excluded until it completes.
* **This is not your balance.** These endpoints answer "what did this key cost", which is useful for cost attribution and budgeting. For your current balance use [Account Balance](account-balance.md).
* **Polling?** Prefer `period`. Responses are cached briefly per exact window, and a hand-built timestamp that changes on every call never reuses that cache.

## Errors

| Code | Meaning |
| ----- | ---------------------------------------------------------------------------------------------------------------------- |
| `400` | No window given, both window forms given at once, a malformed date or period, `end` earlier than `start`, or over 92 days |
| `401` | Missing or invalid API key |
| `403` | A regular key asked for another key's prefix |
| `404` | The prefix does not belong to your account |
| `429` | Too many requests |
