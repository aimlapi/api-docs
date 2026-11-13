---
description: >-
  Get a signed HTTP request when an asynchronous job ends instead of polling:
  which requests support webhook_url, event payloads, signature verification,
  retries, secret rotation and the delivery log.
---

# Webhooks

Pass `webhook_url` with an asynchronous request, and when the job ends AI/ML API sends an HTTP `POST` with the result to that address. You do not have to poll for the status.

Events follow the [Standard Webhooks](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md) specification: every request is signed with HMAC-SHA256, so you can check that it came from us and was not changed. The Standard Webhooks libraries, and `client.webhooks.unwrap()` in the OpenAI SDKs, can verify our events.

| Action                       | Endpoint                                  |
| ---------------------------- | ----------------------------------------- |
| Create or rotate the secret  | `POST /v1/webhooks/secret`                |
| List the active secrets      | `GET /v1/webhooks/secret`                 |
| List delivered events        | `GET /v1/webhooks/events`                 |
| Get an event and its attempts | `GET /v1/webhooks/events/{event_id}`     |
| Re-send an event             | `POST /v1/webhooks/events/{event_id}/retry` |

***

## Where webhooks work

| Capability                                 | Request                                                     | Events                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Video generation                           | `POST /v2/video/generations`                                | `video.completed`, `video.failed`, `video.cancelled`                                       |
| Music and audio generation                 | `POST /v2/generate/audio`                                   | `audio.completed`, `audio.failed`, `audio.cancelled`                                       |
| Speech-to-text                             | `POST /v1/stt/create`                                       | `transcription.completed`, `transcription.failed`, `transcription.cancelled`               |
| Image generation ([some models](#images)) | `POST /v1/images/generations`                               | `image.completed`, `image.failed`, `image.cancelled`                                       |
| Responses                                  | `POST /v1/responses` with `background: true`                | `response.completed`, `response.incomplete`, `response.failed`, `response.cancelled`       |
| [Batches](batch-processing.md)             | `POST /v1/batches` with `input_file_id`                     | `batch.completed`, `batch.failed`, `batch.cancelled`, `batch.expired`                      |

* `webhook_url` on any other endpoint or model returns `400 webhook_url_not_supported`. The field is never passed on to a provider.
* `webhook_url` works on requests made with an API key. [Sandbox](sandbox-mode.md) requests do not support it.
* On `/v1/responses`, `webhook_url` needs `background: true` and does not work with `store: false`.
* `"webhook_url": null` is the same as leaving the field out.
* There is no account-wide webhook address: each request names its own `webhook_url`. The signing secret is shared by the whole workspace.

## 1. Create a signing secret

Before a request can carry `webhook_url`, your workspace needs a signing secret (on an account with no organization, the secret is yours). A request with `webhook_url` and no secret returns `400 webhook_secret_required`.

The secret signs the events of every member of the workspace, so only an **organization owner or a workspace admin** can create or rotate it, from the dashboard or with a [management API key](../faq/how-can-i-work-with-my-api-keys.md#management-keys). An inference API key gets `403 webhook_secret_owner_only`, whatever its permissions.

{% openapi-operation spec="webhook-secret-rotate" path="/v1/webhooks/secret" method="post" %}
[OpenAPI webhook-secret-rotate](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/webhook-secret-rotate.json)
{% endopenapi-operation %}

The answer holds `secret`, which starts with `whsec_`. **It is shown only once**: store it where your receiver can read it.

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json

# Insert your management API key instead of <YOUR_AIMLAPI_MANAGEMENT_KEY>
MANAGEMENT_KEY = "<YOUR_AIMLAPI_MANAGEMENT_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {"Authorization": f"Bearer {MANAGEMENT_KEY}"}

response = requests.post(f"{BASE_URL}/webhooks/secret", headers=headers, json={})
print(json.dumps(response.json(), indent=2))
```
{% endcode %}

</details>

<details>

<summary>Response</summary>

```json5
{
  "secret": "whsec_<YOUR_SECRET>",
  "created_at": 1794585600,
  "previous_retires_at": null,
  "created_by": {
    "kind": "management_key",
    "user_id": "123456",
    "api_key_id": "789"
  }
}
```

</details>

Any member can see which secrets sign events now, with the dashboard or a management API key. The secrets themselves are never shown again.

{% openapi-operation spec="webhook-secret-get" path="/v1/webhooks/secret" method="get" %}
[OpenAPI webhook-secret-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/webhook-secret-get.json)
{% endopenapi-operation %}

## 2. Send a request with `webhook_url`

Add `webhook_url` to the body of a supported request:

{% code overflow="wrap" %}
```python
import requests

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com"

response = requests.post(
    f"{BASE_URL}/v2/video/generations",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "model": "<VIDEO_MODEL_ID>",
        "prompt": "A cheetah turns toward the camera",
        "webhook_url": "https://example.com/hooks/aimlapi",
    },
)
print(response.json())
```
{% endcode %}

### Address rules

The address must be:

* `https`, on port 443 or 8443;
* a host name, not an IP address;
* public: no single-label names such as `localhost`, and no names that end in `.local`, `.localhost`, `.internal`, `.lan`, `.home.arpa` or similar private suffixes;
* without a user name, password or `#fragment`, and at most 2048 characters.

Any other address returns `400 invalid_webhook_url`, with the same message whatever the reason. Before each attempt the host name is resolved again, and an address that points to a private, loopback, link-local, shared or reserved network is not called (for IPv6, only global unicast addresses are called). Such an attempt fails as `unreachable`.

### Images

`POST /v1/images/generations` with `webhook_url` does not wait for the image. It answers at once with the generation ID, and the image comes in the event:

```json
{ "id": "abc123", "status": "queued" }
```

Nothing is charged until the image is ready, so this answer carries no cost. The price is the same with and without `webhook_url`, and the event's `data.result` is what `GET /v1/images/generations/{id}` returns, with the images as links.

Image models that support `webhook_url`: `blackforestlabs/flux-2-pro`, `blackforestlabs/flux-2-pro-preview`, `blackforestlabs/flux-2-max`, `blackforestlabs/flux-2-flex`, `blackforestlabs/flux-2-klein-4b`, `blackforestlabs/flux-2-klein-9b`, `blackforestlabs/flux-pro-1.1`, `blackforestlabs/flux-pro-1.1-ultra`, `flux/schnell`, `flux/dev` and `flux-pro`. Any other image model returns `400 webhook_url_not_supported`: call it without `webhook_url` to get the image in the response.

## 3. Receive the event

Every event is a `POST` with a JSON body and these headers:

| Header              | Value                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `content-type`      | `application/json`                                                                                                            |
| `user-agent`        | `AIMLAPI-Webhooks/1.0`                                                                                                        |
| `webhook-id`        | The event ID, `evt_…`. The same on every attempt and on a re-send                                                             |
| `webhook-timestamp` | Unix time in seconds when this attempt was sent                                                                               |
| `webhook-signature` | `v1,<base64 signature>`. During a [secret rotation](#rotate-the-secret) there are two, separated by a space                  |

The body is the same bytes on every attempt. Its envelope:

| Field        | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `object`     | Always `event`                                                              |
| `id`         | The event ID, the same as `webhook-id`                                      |
| `type`       | The event type, for example `video.completed`                               |
| `created_at` | Unix time in seconds when the job ended                                     |
| `data`       | What ended: a generation, a response or a batch (see below)                 |

### Generations and responses

<details>

<summary>Example: video.completed</summary>

```json5
{
  "object": "event",
  "id": "evt_3YpQx8Kq2LmN5rT7vW9zAb",
  "type": "video.completed",
  "created_at": 1794057600,
  "data": {
    "id": "abc123",
    "object": "video.generation",
    "status": "completed",
    "model": "<VIDEO_MODEL_ID>",
    "error": null,
    "result": { "…": "the same body as GET by ID" },
    "result_truncated": false
  }
}
```

</details>

| Field              | Description                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | ID of the generation or response: the one the submit request returned                                                                                            |
| `object`           | `video.generation`, `image.generation`, `audio.generation`, `transcription` or `response`                                                                         |
| `status`           | The job's status, as `GET` by ID shows it                                                                                                                         |
| `model`            | The model of the request                                                                                                                                          |
| `error`            | `null`, or on a `….failed` event `{"code": "generation_failed"}` or `{"code": "deadline_exceeded"}`                                                               |
| `result`           | The same body as `GET` by ID: `GET /v2/video/generations?generation_id=…`, `GET /v1/images/generations/{id}`, `GET /v2/generate/audio?generation_id=…`, `GET /v1/stt/{id}` or `GET /v1/responses/{id}` |
| `result_truncated` | `false` when `result` is in the event                                                                                                                             |

`response.incomplete` means the response stopped early; its partial output is in `data.result`.

`data.result.meta` carries the cost and the duration, as `GET` by ID does: `meta.usage.credits_used`, `meta.usage.usd_spent` and `meta.metrics.duration_ms`. If the charge is not recorded within a few seconds of the end, the event goes without `meta.usage`, and `GET` by ID shows it once it lands.

**Large results.** A result over 64 KiB, or one that was not ready when the event went out, comes as `"result": null` and `"result_truncated": true`, with `result_url` (where to `GET` it with your API key) and `result_expires_at` (Unix seconds, or `null`). If that time had already passed when the event was sent, `result_expired` is `true` and `result_url` is `null`: the job finished, and its result is gone.

### Batches

<details>

<summary>Example: batch.completed</summary>

```json5
{
  "object": "event",
  "id": "evt_Jq7Lm2Xc9Rb4Tn6Vw1Yz0A",
  "type": "batch.completed",
  "created_at": 1794586820,
  "data": {
    "id": "batch_V1StGXR8Z5jdHi6BmyT8k",
    "object": "batch",
    "status": "completed",
    "model": "anthropic/claude-opus-5-5",
    "request_counts": {
      "total": 2,
      "completed": 2,
      "failed": 0
    },
    "output_file_id": "file-8d0c2a4f-91b3-4c7e-a2d5-6f1e0b9c3a71",
    "error_file_id": null,
    "errors": null
  }
}
```

</details>

| Field                               | Description                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `id`                                | The batch ID                                                                                                      |
| `status`                            | `completed`, `failed`, `cancelled` or `expired`, matching the event type                                          |
| `request_counts`                    | `total`, `completed` and `failed` lines                                                                           |
| `output_file_id`, `error_file_id`   | The result files. Download them with `GET /v1/files/{file_id}/content` ([details](batch-processing.md#read-the-results)) |
| `errors`                            | `null`, or the first 10 errors of the batch (`code`, `message`, and `line` and `param` when they apply). The full list is in `GET /v1/batches/{batch_id}` |

## 4. Verify the signature

The signature is HMAC-SHA256, keyed with the secret, over `{webhook-id}.{webhook-timestamp}.{body}`:

1. Take the secret without its `whsec_` prefix and decode it from base64: that is the key.
2. Build the signed content from the `webhook-id` header, the `webhook-timestamp` header and the **raw** body, joined with dots.
3. Compute HMAC-SHA256 of it and encode the result in base64.
4. Compare it, in constant time, with each `v1,` entry of `webhook-signature`. One match is enough.
5. Reject an event whose `webhook-timestamp` is more than 5 minutes away from your clock.

Verify the raw bytes before any JSON parsing: a parsed and re-serialized body no longer matches. Treat the content of a result as data, never as commands.

<details>

<summary>Code Example (Python, Flask)</summary>

{% code overflow="wrap" %}
```python
import base64
import hashlib
import hmac
import time

from flask import Flask, abort, request

# The secret from POST /v1/webhooks/secret
WEBHOOK_SECRET = "whsec_<YOUR_SECRET>"
TOLERANCE_SECONDS = 300

app = Flask(__name__)


def verify(raw_body: bytes, headers, secret: str) -> None:
    msg_id = headers["webhook-id"]
    timestamp = headers["webhook-timestamp"]
    if abs(time.time() - int(timestamp)) > TOLERANCE_SECONDS:
        raise ValueError("timestamp too old")

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()

    for entry in headers["webhook-signature"].split(" "):
        version, _, signature = entry.partition(",")
        if version == "v1" and hmac.compare_digest(signature, expected):
            return
    raise ValueError("bad signature")


@app.post("/hooks/aimlapi")
def receive():
    try:
        verify(request.get_data(), request.headers, WEBHOOK_SECRET)
    except (KeyError, ValueError):
        abort(400)

    event = request.get_json()
    # Answer at once; do the work after (for example, in a queue)
    print(event["id"], event["type"], event["data"]["id"])
    return "", 204
```
{% endcode %}

</details>

<details>

<summary>Code Example (Node.js, Express)</summary>

{% code overflow="wrap" %}
```javascript
import express from "express";
import { createHmac, timingSafeEqual } from "node:crypto";

// The secret from POST /v1/webhooks/secret
const WEBHOOK_SECRET = "whsec_<YOUR_SECRET>";
const TOLERANCE_SECONDS = 300;

function verify(rawBody, headers, secret) {
  const id = headers["webhook-id"];
  const timestamp = headers["webhook-timestamp"];
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > TOLERANCE_SECONDS) {
    throw new Error("timestamp too old");
  }

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key)
    .update(`${id}.${timestamp}.`)
    .update(rawBody)
    .digest();

  const match = (headers["webhook-signature"] ?? "").split(" ").some((entry) => {
    const [version, signature] = entry.split(",");
    if (version !== "v1" || !signature) {
      return false;
    }
    const given = Buffer.from(signature, "base64");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
  if (!match) {
    throw new Error("bad signature");
  }
}

const app = express();

// Keep the raw bytes: the signature covers them, not the parsed JSON
app.post("/hooks/aimlapi", express.raw({ type: "application/json" }), (req, res) => {
  try {
    verify(req.body, req.headers, WEBHOOK_SECRET);
  } catch {
    return res.sendStatus(400);
  }

  const event = JSON.parse(req.body.toString("utf8"));
  // Answer at once; do the work after (for example, in a queue)
  console.log(event.id, event.type, event.data.id);
  res.sendStatus(204);
});

app.listen(3000);
```
{% endcode %}

</details>

## 5. Answer quickly and expect repeats

* **Answer any `2xx` within 8 seconds** and do the work afterwards. A slower answer counts as a failed attempt. Later attempts wait up to 30 seconds.
* **Delivery is at least once and in no particular order.** Use `webhook-id` to drop a repeat: it stays the same on every attempt and on a manual re-send.

### Retries

If your endpoint does not answer `2xx`, the event is sent again after 5 seconds, 30 seconds, 2 minutes, 10 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 8 hours, 12 hours, 20 hours and 24 hours, with up to 10% jitter after the first retry. Retries stop 72 hours after the job ended; the event then ends as `dead` with `dead_reason: attempts_exhausted`, and you can [re-send it](#see-and-re-send-events).

| Your endpoint answers           | What happens                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| `2xx`                           | Delivered                                                                                    |
| `410 Gone`                      | Stops: the event ends as `gone`, with no more attempts                                      |
| `3xx`                           | Counts as a failure. Redirects are not followed                                             |
| Any other status, or no answer  | Retried on the schedule above                                                                |
| `Retry-After` with a failure    | The next attempt waits at least that long, up to 1 hour                                     |

An endpoint that fails five times in a row, or answers `429`, `502`, `503` or `504`, gets one attempt at a time until it answers `2xx` again. At most 60 requests a minute go from one workspace to one IP address, or to one /24 network (/48 for IPv6); further events wait their turn.

{% hint style="warning" %}
If the API key that started a job is revoked or disabled, its events stop at once: they end as `dead` with `dead_reason: revoked` and cannot be re-sent.
{% endhint %}

## Rotate the secret

`POST /v1/webhooks/secret` on a workspace that already has a secret creates a new one, with the same rights as creating it. The old secret keeps signing for a grace period, and `webhook-signature` carries both signatures meanwhile, so you can switch your receivers without downtime.

* `grace_seconds` sets the grace period: from `300` (5 minutes) to `604800` (7 days). The default is 24 hours. A lower value returns `400`.
* There is no immediate revocation. After a leak, rotate with `{"grace_seconds": 300}` and update your receivers within those 5 minutes.
* While an older secret is still in its grace period, another rotation returns **`409 webhook_secret_in_grace`** with `previous_retires_at`, and nothing changes: it would end that grace period for every receiver that still uses the older secret. Wait until then, or send `{"force": true}` to end the older secret's grace period now. The current secret still gets its own grace period.

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests

# Insert your management API key instead of <YOUR_AIMLAPI_MANAGEMENT_KEY>
MANAGEMENT_KEY = "<YOUR_AIMLAPI_MANAGEMENT_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {"Authorization": f"Bearer {MANAGEMENT_KEY}"}

response = requests.post(
    f"{BASE_URL}/webhooks/secret",
    headers=headers,
    json={"grace_seconds": 3600},
)
if response.status_code == 409:
    print("An older secret is still in its grace period:", response.json())
else:
    new = response.json()
    print("New secret (shown once):", new["secret"])
    print("The previous secret signs until:", new["previous_retires_at"])
```
{% endcode %}

</details>

## See and re-send events

Every event is logged with its attempts. Use the log to check why your endpoint did not get an event, and to send it again.

{% openapi-operation spec="webhook-events-list" path="/v1/webhooks/events" method="get" %}
[OpenAPI webhook-events-list](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/webhook-events-list.json)
{% endopenapi-operation %}

{% openapi-operation spec="webhook-event-get" path="/v1/webhooks/events/{event_id}" method="get" %}
[OpenAPI webhook-event-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/webhook-event-get.json)
{% endopenapi-operation %}

{% openapi-operation spec="webhook-event-retry" path="/v1/webhooks/events/{event_id}/retry" method="post" %}
[OpenAPI webhook-event-retry](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/capabilities/webhook-event-retry.json)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {"Authorization": f"Bearer {API_KEY}"}

# Events of one generation or batch
events = requests.get(
    f"{BASE_URL}/webhooks/events",
    headers=headers,
    params={"task_id": "batch_V1StGXR8Z5jdHi6BmyT8k"},
).json()

for event in events["data"]:
    print(event["id"], event["type"], event["state"], event["dead_reason"])

    # The attempts of the event
    detail = requests.get(f"{BASE_URL}/webhooks/events/{event['id']}", headers=headers).json()
    print(json.dumps(detail["attempt_log"], indent=2))

    # Send it again if it did not arrive
    if event["state"] in ("dead", "gone"):
        retry = requests.post(f"{BASE_URL}/webhooks/events/{event['id']}/retry", headers=headers)
        print("Re-send:", retry.status_code, retry.json())
```
{% endcode %}

</details>

**Whose events you see.** An API key sees the events of the jobs it started; a member signed in to the dashboard sees all of their own. An organization owner or workspace admin sees the events of every member of the workspace, and may re-send them, but never another member's `body`: such an event comes with `body: null` and `body_withheld: true`. A key also sees only events of the endpoints its permissions allow, and an owner's or admin's key only other members' events of the models its model list allows. An event you may not see returns `404`, the same as an unknown ID.

**Event states.** `pending` (waiting for its next attempt), `delivering` (an attempt is running), `delivered`, `gone` (your endpoint answered `410`) and `dead` (no more attempts). `dead_reason` says why an event is dead:

| `dead_reason`        | Meaning                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `attempts_exhausted` | No `2xx` within 72 hours of attempts                                                                 |
| `revoked`            | The API key that started the job was revoked or disabled. Cannot be re-sent                          |
| `no_signing_secret`  | The workspace had no signing secret when the event was due                                           |
| `invalid_url`        | The address no longer passes the [address rules](#address-rules)                 |
| `client_backlog`     | More than 10,000 events of the workspace were waiting. Re-send it once your endpoint is back         |
| `expired`            | The event is past its 7-day body retention                                                           |

**Re-sending.** A re-send uses the same `webhook-id` and the same body, and the address is checked again before it is called. A re-send of a finished event gets the whole retry schedule again. It returns:

* `409` while an attempt is running;
* `410` when the event is past its retention or its API key was revoked;
* `429` past the limit: 10 a minute and 200 a day per workspace, 5 a day per event.

**Retention.** An event keeps its body for 7 days and its log for 30 days. The log shows each attempt with its time, its duration and the class of the status (`2xx`, `3xx`, `4xx`, `5xx`), or `timeout` / `unreachable`. Your server's answer is never stored.

## Errors

The request that carries `webhook_url` is refused, before any job starts and before anything is charged, with:

| Status | `code`                        | Meaning                                                                         |
| ------ | ----------------------------- | ------------------------------------------------------------------------------- |
| 400    | `webhook_url_not_supported`   | The endpoint or model does not support `webhook_url`, or it is a sandbox request |
| 400    | `invalid_webhook_url`         | The address breaks the [address rules](#address-rules)      |
| 400    | `webhook_secret_required`     | The workspace has no signing secret yet: `POST /v1/webhooks/secret`             |

The secret endpoints answer:

| Status | `code`                      | Meaning                                                                                                                   |
| ------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 400    | (none)                      | `grace_seconds` is out of range, or the body has an unknown field                                                         |
| 403    | `webhook_secret_owner_only` | Only an organization owner or a workspace admin can create or rotate the secret, from the dashboard or with a management API key |
| 409    | `webhook_secret_in_grace`   | An older secret is still in its grace period. Wait for `previous_retires_at`, or send `"force": true`                     |
