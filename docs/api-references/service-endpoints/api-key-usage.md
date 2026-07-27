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
