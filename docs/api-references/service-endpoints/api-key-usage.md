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

| Your key       | `key_prefix`             | Result           |
| -------------- | ------------------------ | ---------------- |
| any key        | omitted                  | its own spend    |
| management key | provided                 | that key's spend |
| regular key    | provided, its own prefix | its own spend    |
| regular key    | provided, another prefix | `403`            |

Any key can read its own spend. Reading the spend of a **different** key requires a management key.

## Grouping the breakdown

`/v2/usage/detail` can additionally split the window into buckets. Pass `group_by`:

| Value       | Adds one entry per…               |
| ----------- | --------------------------------- |
| `day`       | day in the window                 |
| `model`     | model used in the window          |
| `day,model` | model per day                     |

```bash
curl -H 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  'https://api.aimlapi.com/v2/usage/detail?period=30d&group_by=day,model&tz=Europe/Berlin'
```

Each entry in the resulting `groups` array carries its `spend`, `tokens` and a `requests` object. Omitting `group_by` leaves the response exactly as it was.

`tz` sets where the day boundary falls; it defaults to UTC and only affects `group_by=day`. The top-level `start` and `end` stay UTC regardless.

{% hint style="warning" %}
**Reconcile against `requests.charged`, not `requests.total`.**

A failed request is billed nothing — the hold is rolled back — so it has no charge behind it. `requests.total` counts every request in the group, `requests.charged` only the billed ones, and the top-level `requests` is the charged count. So `requests` equals the sum of `groups[].requests.charged`, and it matches the sum of `groups[].requests.total` only in a window where nothing failed.
{% endhint %}

{% hint style="info" %}
`tz` must be a **canonical IANA zone name matched exactly** — `Europe/Berlin`, `UTC`. Offset forms (`+05:00`) and other-case spellings (`utc`) are rejected with `400`.

`group_by` and `tz` are accepted on `/v2/usage/detail` only. A flat total has nowhere to put a breakdown, so `/v2/usage` answers `400` rather than silently ignoring them.
{% endhint %}

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

{% hint style="info" %}
Need the individual requests rather than totals — what failed, what a specific call cost, which of your own customers it belonged to? See [Usage Logs](usage-logs.md).
{% endhint %}
