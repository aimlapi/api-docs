---
description: >-
  Low-latency speech-to-speech models over WebSocket: endpoints, authentication,
  client secrets for browsers, billing, limits and errors.
icon: microphone
---

# Realtime Models

## Overview

Realtime (live) models hold a continuous, two-way voice conversation over a single WebSocket connection. You stream microphone audio in, and the model streams spoken audio (and, where supported, text) back while the user is still in the conversation. Turn detection, interruptions and function calling happen inside the session, so you do not send a separate request for every reply.

Each model family keeps **its provider's own WebSocket protocol**. If you already use the official OpenAI or Google GenAI SDKs, you only change the base URL and the API key.

{% hint style="info" %}
You can try realtime models in the [Playground](https://aimlapi.com/app/): open the model picker and choose the **Realtime** tab.
{% endhint %}

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

## How a session works

1. **Connect.** Open a WebSocket to the model's endpoint (see the table below). Your server authenticates with an API key in a header; a browser authenticates with a short-lived [client secret](./#browsers-client-secrets).
2. **Configure.** Send the session configuration in the protocol of the model family: `session.update` (OpenAI Realtime, xAI), `session.start` (GPT-Live) or `setup` (Gemini Live).
3. **Talk.** Stream input audio events (`input_audio_buffer.append`, `session.input_audio.append` or `realtimeInput`) and receive the model's audio, transcripts and tool calls as server events.
4. **Close.** Close the socket (or send `session.close` on GPT-Live). Billing stops when the session ends.

If a connection cannot be admitted (bad key, insufficient balance, unknown model, too many sessions), the WebSocket upgrade is refused with an ordinary HTTP status and a JSON error body, and no session is billed. See [Errors and close codes](./#errors-and-close-codes).

## Endpoints

All realtime endpoints are served on `api.aimlapi.com`.

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `wss://api.aimlapi.com/v1/realtime?model=<model id>` | WebSocket | OpenAI Realtime protocol: `openai/gpt-realtime-2.1`, `openai/gpt-realtime-2.1-mini`, `x-ai/grok-voice-think-fast-2.0` |
| `wss://api.aimlapi.com/v1/live/sessions` | WebSocket | OpenAI GPT-Live protocol: `openai/gpt-live-1` (the model is named in the first `session.start` event, not in the URL) |
| `wss://api.aimlapi.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent` | WebSocket | Gemini Live protocol with an API key: `google/gemini-3.8-live` (the model is named in the first `setup` message). `v1alpha` is accepted too |
| `wss://api.aimlapi.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained` | WebSocket | Gemini Live with a client secret (the Google GenAI SDKs' ephemeral-token path). `v1beta` is accepted too |
| `https://api.aimlapi.com/v1/realtime/models` | `GET` | Lists the realtime models available to your key, with endpoints, live prices and limits |
| `https://api.aimlapi.com/v1/realtime/client_secrets` | `POST` | Mints a short-lived, single-use client secret for a browser |

{% hint style="warning" %}
Realtime models are not listed by the general `GET /v1/models` endpoint. Use `GET /v1/realtime/models`.
{% endhint %}

## All Available Realtime Models

<table data-header-hidden="false" data-header-sticky data-full-width="true"><thead><tr><th width="280">Model ID</th><th width="110">Developer</th><th width="150">Protocol</th><th>Billing</th><th>Max session</th></tr></thead><tbody><tr><td><a href="OpenAI/gpt-realtime-2.1.md">openai/gpt-realtime-2.1</a></td><td>OpenAI</td><td>OpenAI Realtime</td><td>Tokens, per response</td><td>60 min</td></tr><tr><td><a href="OpenAI/gpt-realtime-2.1-mini.md">openai/gpt-realtime-2.1-mini</a></td><td>OpenAI</td><td>OpenAI Realtime</td><td>Tokens, per response</td><td>60 min</td></tr><tr><td><a href="OpenAI/gpt-live-1.md">openai/gpt-live-1</a></td><td>OpenAI</td><td>GPT-Live</td><td>Per second of session</td><td>60 min</td></tr><tr><td><a href="xAI/grok-voice-think-fast-2.0.md">x-ai/grok-voice-think-fast-2.0</a></td><td>xAI</td><td>OpenAI Realtime (xAI dialect)</td><td>Per second of session + per text item</td><td>60 min</td></tr><tr><td><a href="Google/gemini-3.8-live.md">google/gemini-3.8-live</a></td><td>Google</td><td>Gemini Live</td><td>Tokens, per turn</td><td>10 min</td></tr></tbody></table>

Model IDs are case-sensitive. Each model also accepts the aliases listed on its page (for example, `gpt-realtime-2.1` for `openai/gpt-realtime-2.1`).

## Authentication

### Servers: API key in a header

From your backend, send your AI/ML API key in **one** header when you open the WebSocket:

```
Authorization: Bearer <YOUR_AIMLAPI_KEY>
```

The `api-key` and `x-api-key` headers are accepted as well, and on the Gemini Live endpoint also `x-goog-api-key` (what the Python Google GenAI SDK sends). Send exactly one credential: two credential headers, or a header and a client secret together, are refused.

{% hint style="danger" %}
Never put a credential in the URL. A connection with `?key=`, `?api_key=`, `?token=` or a similar query parameter is refused with `400 credential_in_query`, valid key or not. The only exception is a client secret passed as `access_token` on Gemini's `…Constrained` path.
{% endhint %}

### Browsers: client secrets

A browser must never hold your API key. A connection that carries an API key together with a browser `Origin` header is refused (`403 browser_requires_client_secret`), and so is an API key in a WebSocket subprotocol. Instead:

1. Your **server** calls `POST /v1/realtime/client_secrets` with your API key and receives a short-lived secret (`aiml_ek_…`).
2. Your server hands the secret to the page.
3. The **browser** opens the session with the secret. A secret opens **one** session and is used up the moment it is presented, even if that connection is then refused.

The mint endpoint refuses requests that look like they come from a browser (`400 browser_requires_server_mint` when the request carries `Origin`, `Sec-Fetch-Site` or `Sec-Fetch-Dest`). If your server proxies the browser's request, strip those headers.

#### Mint request

`POST https://api.aimlapi.com/v1/realtime/client_secrets` with `Authorization: Bearer <YOUR_AIMLAPI_KEY>` and a JSON body (unknown fields are refused):

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `session.model` | string | Yes | The model ID or alias the secret is for. The secret opens a session on this model only. |
| `session.type` | `"realtime"` \| `"live"` | No | Session kind, as in OpenAI's API (`"live"` for GPT-Live). |
| `session.*` (other fields) | object | No | **OpenAI GPT Realtime models only.** Session configuration (for example `instructions`, `audio.output.voice`) checked against the same rules as a `session.update`, applied as the session's first update, and locked for the session: the browser cannot change these fields (`field_locked`). Other models bind the model only and refuse extra fields (`unsupported_parameter`). |
| `expires_after.seconds` | integer | No | How long the secret can be used: 10–600 seconds, default 60. Gemini Live secrets travel in a URL and live at most 60 seconds. `expires_after.anchor` may only be `"created_at"`. |
| `origin` | string | No | Bind the secret to one browser origin, exactly as the browser sends it, for example `https://app.example.com`. A connection from any other origin is refused. |
| `max_session_seconds` | integer | No | Maximum length of the session: 10–3,600 seconds, default 900; never more than the model's own maximum. |
| `max_spend_usd` | number | No | Spending cap of the session, up to 50, default 2. It counts what has been charged **plus** what is currently reserved for the next part of the session, so the session ends when the next reservation would cross it. It must cover at least the start of a session on the model; otherwise the mint is refused with the minimum amount in the error message. |

The mint also checks your balance: it must cover the start of a session on the model (`402 insufficient_quota` otherwise).

#### Mint response

```json
{
  "value": "aiml_ek_…",
  "expires_at": 1767225660,
  "session": {
    "type": "realtime",
    "model": "openai/gpt-realtime-2.1",
    "instructions": "You are a friendly receptionist."
  },
  "origin": "https://app.example.com",
  "max_session_seconds": 900,
  "max_spend_usd": 2
}
```

`expires_at` is a Unix timestamp in seconds. `session` echoes the canonical model ID and any configuration bound to the secret. The response is sent with `Cache-Control: no-store`; do not cache or log the secret.

Mint limits: 60 secrets per minute per key (300 per account), and at most 100 unused secrets outstanding per key (500 per account). Over a limit the mint answers `429` (`rate_limit_exceeded` or `too_many_client_secrets`) with a `Retry-After` header.

#### Using a secret in the browser

| Endpoint | How to send the secret |
| --- | --- |
| `/v1/realtime`, `/v1/live/sessions` | As WebSocket subprotocols: `realtime` **and** `openai-insecure-api-key.<secret>` (both are required) |
| Gemini `…BidiGenerateContentConstrained` | The secret in the form the mint returns (`auth_tokens/aiml_ek_…`) as the `access_token` query parameter (the JavaScript Google GenAI SDK does this when you pass the secret as its API key) |

```javascript
// In the browser: `secret` came from your server.
const ws = new WebSocket(
  "wss://api.aimlapi.com/v1/realtime?model=openai/gpt-realtime-2.1",
  ["realtime", `openai-insecure-api-key.${secret}`],
);
```

A server-side SDK can also present a client secret in the `Authorization: Bearer` header instead of an API key.

## Listing models and prices

`GET https://api.aimlapi.com/v1/realtime/models` with your API key in a header returns the realtime models your key may use (a key restricted to a list of models sees only those), with the connection path, the **current customer price**, and the limits that apply.

{% code overflow="wrap" %}
```json
{
  "object": "list",
  "data": [
    {
      "id": "openai/gpt-realtime-2.1-mini",
      "object": "model",
      "name": "GPT Realtime 2.1 Mini",
      "owned_by": "openai",
      "endpoint": "/v1/realtime?model=openai%2Fgpt-realtime-2.1-mini",
      "browser_endpoint": "/v1/realtime?model=openai%2Fgpt-realtime-2.1-mini",
      "protocol": "openai-realtime",
      "pricing": {
        "unit": "token",
        "usd_per_million": {
          "input_text": 0.6,
          "input_text_cached": 0.06,
          "output_text": 2.4,
          "input_audio": 10,
          "input_audio_cached": 0.3,
          "output_audio": 20,
          "input_image": 0.8,
          "input_image_cached": 0.08
        }
      },
      "limits": {
        "max_session_seconds": 3600,
        "idle_timeout_seconds": 300,
        "max_output_tokens": 4096,
        "max_context_tokens": 32000
      }
    }
  ]
}
```
{% endcode %}

Per-second models report `"pricing": {"unit": "second", "usd_per_minute": …, "credits_per_minute": …}` (and `usd_per_text_item` where a text item fee applies). For Gemini Live, `browser_endpoint` is the `…Constrained` path that client secrets use.

{% hint style="success" %}
The prices on these pages are the list prices at the time of writing. `GET /v1/realtime/models` is the authoritative source of the live price.
{% endhint %}

## Billing

Realtime sessions are charged from your account balance, the same as any other model. There are three billing units:

| Unit | Models | How it is charged |
| --- | --- | --- |
| **Per second of session** | `openai/gpt-live-1`, `x-ai/grok-voice-think-fast-2.0` | Every second the session is open, **idle and muted time included**, rounded up to whole seconds. xAI also charges a fee for every `conversation.item.create` you send (a tool result excepted). |
| **Tokens, per response** | `openai/gpt-realtime-2.1`, `openai/gpt-realtime-2.1-mini` | Each model response is charged by the input and output tokens (text, audio, cached input) the provider reports for it. Idle time costs nothing. |
| **Tokens, per turn** | `google/gemini-3.8-live` | Each turn is charged by the tokens it consumed, including the whole conversation context the turn re-reads. Idle time costs nothing. |

**Reservations.** Because a session is open-ended, the platform reserves credit ahead of use:

* Per-second models: the first 60 seconds are reserved before the connection is accepted, then the session is extended in 30-second windows, each reserved before the previous one runs out. You are charged only for the seconds used.
* Token models: before a response (or turn) starts, the worst case of that response is reserved; after it ends, you are charged the actual usage and the rest is released.

If the next reservation cannot be made (your balance, your key's spending limit, your hourly realtime ceiling, or a client secret's `max_spend_usd` would be crossed), the session receives a warning or error event with code `insufficient_quota` and closes with code `4402` at the end of the part already paid for (on token models, after the current response finishes).

To start a session, your balance must be at least $1 and cover the first reservation.

## Limits

### Who can use realtime models

Realtime sessions are available to accounts with at least **$10 of completed payments**, the first of them at least 24 hours old (or verified). Other accounts are refused with `403 realtime_not_eligible`.

### Concurrent sessions and hourly spend

The limits grow with the total you have paid in:

| Lifetime payments | Concurrent sessions per account | Concurrent sessions per key | Realtime spend ceiling (rolling hour) |
| --- | --- | --- | --- |
| $10 – $49 | 2 | 2 | $10 |
| $50 – $499 | 10 | 5 | $50 |
| $500 and more | 25 | 5 | $200 |

Per provider, an account can hold at most 15 concurrent OpenAI sessions and 3 concurrent xAI sessions. Over a concurrency limit, a new connection is refused with `429 concurrency_limit`; past the hourly ceiling, with `403 realtime_spend_ceiling`. New sessions can also be started at most 20 per minute per key and 60 per minute per account (`429 rate_limit_exceeded`).

### Session clocks

| Limit | Value |
| --- | --- |
| Maximum session length | 60 minutes (Gemini Live: 10 minutes). A `max_duration_soon` warning arrives 60 seconds before; the session then closes with `4409`. |
| Idle timeout, per-second models | 120 seconds without any message from the client (pings do not count). An `idle_timeout_soon` warning arrives at 100 seconds; the session then closes with `4408`. |
| Idle timeout, token models | 300 seconds without any message from the client, then `4408`. |
| First event (GPT-Live, Gemini Live) | The first `session.start` or `setup` must arrive within 10 seconds. |
| Keep-alive | The server pings the socket every 20 seconds. A client that stops answering pings is disconnected. |

### Event limits

| Limit | Value |
| --- | --- |
| Maximum WebSocket message | 1 MiB (`1009` close above it) |
| One audio append | 256 KiB of audio before base64 encoding |
| Client events | 50 per second (burst 200) |
| Input audio | 1.5x real time |
| Text items | 5 per second (burst 20) |
| `response.create`, `session.update` | 1 per second each (burst 2) |

An event over a rate limit is dropped and answered with an `error` event `rate_limit_exceeded`; the third such event closes the session with `4429`. An event the model's policy does not accept (an unknown event type or field, a forbidden option) is answered with an `error` event naming the parameter; repeated violations close the session with `1008`.

### Options the platform fixes

To keep every response within what was reserved, some session options are enforced on top of the provider's protocol: built-in voices only, output capped at 4,096 tokens per response on token models, the conversation truncated (OpenAI) or compressed (Gemini) past 32,000 tokens, and no provider-side tools (remote MCP servers, web search), stored prompts, tracing or session resumption. Each model page lists what applies to it.

## Errors and close codes

### Refused connections

A connection that is not admitted gets an HTTP response instead of a WebSocket, in the usual error format:

```json
{
  "error": {
    "message": "Too many concurrent realtime sessions for this key or account. Close one and retry.",
    "type": "rate_limit_error",
    "param": null,
    "code": "concurrency_limit"
  }
}
```

| Status | `code` | Meaning |
| --- | --- | --- |
| 400 | `model_required`, `credential_in_query`, `ambiguous_credential`, `realtime_subprotocol_required` | Malformed connection request |
| 401 | `missing_api_key`, `invalid_authorization_header`, `api_key_required`, `api_key_in_subprotocol`, `client_secret_invalid` | Missing or invalid credential, or a used or expired client secret |
| 403 | `browser_requires_client_secret`, `realtime_not_eligible`, `realtime_spend_ceiling`, `err_insufficent_credits`, `api_key_quota_exceeded`, `model_not_allowed`, `client_secret_mismatch`, `client_secret_spend_limit` | Not allowed: account, balance, key limits, or a client secret for another model, endpoint or origin |
| 404 | `model_not_found` | The model is not a realtime model or not available |
| 429 | `concurrency_limit`, `rate_limit_exceeded` | Too many sessions; see `Retry-After` |
| 502 | `upstream_error` | The provider could not start the session |
| 503 | `capacity_exhausted`, `upstream_unavailable`, `realtime_disabled`, `service_unavailable` | Temporarily unavailable; see `Retry-After` |

An accepted connection carries an `x-aimlapi-session-id` response header. Quote it when you contact support.

### Error events

During a session, errors arrive as the protocol's own error event before the socket closes, so the official SDKs surface them. On the OpenAI Realtime and xAI protocols (GPT-Live sends the same event with `client_event_id` instead of `error.event_id`):

```json
{
  "type": "error",
  "event_id": "…",
  "error": {
    "type": "invalid_request_error",
    "code": "unknown_parameter",
    "message": "Unknown or unsupported parameter: 'session.prompt'.",
    "param": "session.prompt",
    "event_id": "your-client-event-id"
  }
}
```

Warnings that do not end the session yet use a separate event type:

```json
{
  "type": "aimlapi.warning",
  "event_id": "…",
  "warning": { "code": "idle_timeout_soon", "message": "The session is idle and will close in 20 s. Idle time is billed." }
}
```

Warning codes: `idle_timeout_soon`, `max_duration_soon`, `insufficient_quota`. On GPT-Live the same warnings arrive as its own notice event, `{"type": "info", "event_id": "…", "code": "…", "message": "…"}`. Gemini Live has no error event: an error is sent as a Google-style JSON message `{"error": {"code": 400, "status": "<code>", "message": "…"}}` before the close, and no warnings are sent.

### Close codes

| Code | Reason (`code` in the close frame) | Meaning |
| --- | --- | --- |
| 1000 | — | Normal close (by you, by the provider, or a lost connection) |
| 1003 | `binary_not_accepted` | Binary frame on a protocol that takes JSON only |
| 1007 | `invalid_json` | A frame was not valid UTF-8 JSON |
| 1008 | `policy_violation`, `invalid_first_frame` | Repeated policy violations, or a wrong/late first event (GPT-Live, Gemini Live) |
| 1009 | `message_too_big` | A message exceeded 1 MiB |
| 1011 | `upstream_error`, `upstream_timeout`, `internal_error` | Provider or internal failure |
| 1012 | `service_restart` | Server restart: reconnect to continue |
| 1013 | `slow_consumer` | Your client did not read fast enough |
| 4401 | `access_revoked` | The API key was disabled, deleted or rotated |
| 4402 | `insufficient_quota` | Balance, key spending limit, hourly ceiling or client secret cap reached |
| 4403 | `forbidden`, `model_not_allowed` | Access denied, or the key may no longer use this model |
| 4408 | `session_idle` | Idle timeout |
| 4409 | `max_duration` | Maximum session length reached |
| 4429 | `rate_limited` | Events sent faster than allowed |
| 4503 | `realtime_disabled` | Realtime sessions are temporarily disabled |

Codes `4000`–`4999` are final: do not reconnect automatically. `1012` and `1013` can be retried.

## Code example

A complete text turn on `openai/gpt-realtime-2.1-mini` with the official OpenAI SDKs. Only the base URL and the key differ from OpenAI's own examples. Model-specific examples (audio, GPT-Live, Gemini Live) are on each model's page.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
# pip install "openai[realtime]"
import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(
    # Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
    api_key="<YOUR_AIMLAPI_KEY>",
    base_url="https://api.aimlapi.com/v1",
)


async def main():
    async with client.realtime.connect(model="openai/gpt-realtime-2.1-mini") as connection:
        await connection.conversation.item.create(
            item={
                "type": "message",
                "role": "user",
                "content": [{"type": "input_text", "text": "Say hi in two words."}],
            }
        )
        await connection.response.create(response={"output_modalities": ["text"]})

        async for event in connection:
            if event.type == "response.output_text.delta":
                print(event.delta, end="", flush=True)
            elif event.type == "response.done":
                print("\nUsage:", event.response.usage)
                break
            elif event.type == "error":
                print("Error:", event.error)
                break


asyncio.run(main())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// npm i openai ws
import OpenAI from "openai";
import { OpenAIRealtimeWS } from "openai/realtime/ws";

const client = new OpenAI({
  // Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
  apiKey: "<YOUR_AIMLAPI_KEY>",
  baseURL: "https://api.aimlapi.com/v1",
});

const rt = new OpenAIRealtimeWS({ model: "openai/gpt-realtime-2.1-mini" }, client);

rt.socket.on("open", () => {
  rt.send({
    type: "conversation.item.create",
    item: {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "Say hi in two words." }],
    },
  });
  rt.send({ type: "response.create", response: { output_modalities: ["text"] } });
});

rt.on("response.output_text.delta", (event) => process.stdout.write(event.delta));
rt.on("response.done", (event) => {
  console.log("\nUsage:", event.response.usage);
  rt.close();
});
rt.on("error", (error) => console.error("Error:", error.message ?? error));
```
{% endcode %}
{% endtab %}
{% endtabs %}
