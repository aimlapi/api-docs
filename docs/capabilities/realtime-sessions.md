---
description: >-
  How realtime (live) voice sessions work over WebSocket: endpoints,
  authentication, client secrets for browsers, billing, limits and errors.
---

# Realtime Sessions

Realtime (live) models hold a continuous, two-way voice conversation over a single WebSocket connection. You stream microphone audio in, and the model streams spoken audio (and, where supported, text) back while the user is still in the conversation. Turn detection, interruptions and function calling happen inside the session, so you do not send a separate request for every reply.

Each model family keeps **its provider's own WebSocket protocol**. If you already use the official OpenAI or Google GenAI SDKs, you only change the base URL and the API key.

The list of realtime models and their API references is on the [Realtime Models](../api-references/realtime-models/) page.

{% hint style="info" %}
You can try realtime models in the [Playground](https://aimlapi.com/app/): open the model picker and choose the **Realtime** tab.
{% endhint %}

## How a session works

1. **Connect.** Open a WebSocket to the model's endpoint (see the table below). Your server authenticates with an API key in a header; a browser authenticates with a short-lived [client secret](#browsers-client-secrets).
2. **Configure.** Send the session configuration in the protocol of the model family: `session.update` (OpenAI Realtime, xAI), `session.start` (GPT-Live) or `setup` (Gemini Live).
3. **Talk.** Stream input audio events (`input_audio_buffer.append`, `session.input_audio.append` or `realtimeInput`) and receive the model's audio, transcripts and tool calls as server events.
4. **Close.** Close the socket (or send `session.close` on GPT-Live). Billing stops when the session ends.

If a connection cannot be admitted (bad key, insufficient balance, unknown model, too many sessions), the WebSocket upgrade is refused with an ordinary HTTP status and a JSON error body, and no session is billed. See [Errors and close codes](#errors-and-close-codes).

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

## Models

| Model ID | Developer | Protocol | Billing | Max session |
| --- | --- | --- | --- | --- |
| [openai/gpt-realtime-2.1](../api-references/realtime-models/OpenAI/gpt-realtime-2.1.md) | OpenAI | OpenAI Realtime | Tokens, per response | 60 min |
| [openai/gpt-realtime-2.1-mini](../api-references/realtime-models/OpenAI/gpt-realtime-2.1-mini.md) | OpenAI | OpenAI Realtime | Tokens, per response | 60 min |
| [openai/gpt-live-1](../api-references/realtime-models/OpenAI/gpt-live-1.md) | OpenAI | GPT-Live | Per second of session | 60 min |
| [x-ai/grok-voice-think-fast-2.0](../api-references/realtime-models/xAI/grok-voice-think-fast-2.0.md) | xAI | OpenAI Realtime (xAI dialect) | Per second of session + per text item | 60 min |
| [google/gemini-3.8-live](../api-references/realtime-models/Google/gemini-3.8-live.md) | Google | Gemini Live | Tokens, per turn | 10 min |

Model IDs are case-sensitive. Each model also accepts the aliases listed on its page (for example, `gpt-realtime-2.1` for `openai/gpt-realtime-2.1`). `x-ai/grok-voice-latest` and `grok-voice-latest` always open a session on `x-ai/grok-voice-think-fast-2.0`.

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

For GPT-Live, mint the secret with `"session": {"type": "live", "model": "openai/gpt-live-1"}`. For Gemini Live, mint it with `{"session": {"model": "google/gemini-3.8-live"}}`; the secret comes in the form `auth_tokens/aiml_ek_…` and is valid for at most 60 seconds.

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
| Gemini `…BidiGenerateContentConstrained` | The secret in the form the mint returns (`auth_tokens/aiml_ek_…`) as the `access_token` query parameter (the JavaScript Google GenAI SDK does this when you pass the secret as its API key), or in `Authorization: Token` |

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

## Billing

Realtime sessions are charged from your account balance, the same as any other model. There are three billing units:

| Unit | Models | How it is charged |
| --- | --- | --- |
| **Per second of session** | `openai/gpt-live-1`, `x-ai/grok-voice-think-fast-2.0` | Every second the session is open, **idle and muted time included**, rounded up to whole seconds. xAI also charges a fee for every `conversation.item.create` you send (a tool result excepted). |
| **Tokens, per response** | `openai/gpt-realtime-2.1`, `openai/gpt-realtime-2.1-mini` | Each model response is charged by the input and output tokens (text, audio, cached input) the provider reports for it. Idle time costs nothing. |
| **Tokens, per turn** | `google/gemini-3.8-live` | Each turn is charged by the tokens it consumed, including the whole conversation context the turn re-reads. Idle time costs nothing. |

### List prices

{% hint style="success" %}
The prices on this page are the list prices at the time of writing. [`GET /v1/realtime/models`](#listing-models-and-prices) is the authoritative source of the live price.
{% endhint %}

Per-second models:

| Model | Session time | Other fees |
| --- | --- | --- |
| `openai/gpt-live-1` | **$0.05 per minute**, charged per second from the session seconds OpenAI reports. Idle and muted time is billed; close the session when the conversation ends. | — |
| `x-ai/grok-voice-think-fast-2.0` | **$0.08 per minute**, charged per second of open session, idle time included. The session time is measured by our clock from connection to close. | **$0.004** for each `conversation.item.create` you send (a `function_call_output` excepted) |

Token models, USD per 1M tokens:

| Token type | `openai/gpt-realtime-2.1` | `openai/gpt-realtime-2.1-mini` | `google/gemini-3.8-live` |
| --- | --- | --- | --- |
| Input text | 4.00 | 0.60 | 0.75 |
| Input text, cached | 0.40 | 0.06 | — |
| Output text | 24.00 | 2.40 | 4.50 (the answer, its reasoning and the output transcription) |
| Input audio | 32.00 | 10.00 | 3.00 |
| Input audio, cached | 0.40 | 0.30 | — |
| Output audio | 64.00 | 20.00 | 12.00 |
| Input image / video | — | — | 1.00 |

* **OpenAI GPT Realtime models** are billed **per response**, from the token usage OpenAI reports in `response.done`. Every response re-reads the conversation so far, the instructions and the tool definitions as input. If a response ends without a usage report, it is charged by estimate: 10 tokens per second of user audio and 20 tokens per second of model audio.
* **Gemini 3.8 Live** is billed **per turn**, from the token usage Google reports when the turn completes. Each turn is charged for the whole conversation context it re-reads plus its new input. There is no discount for cached input. If a turn ends without a usage report, it is charged by estimate: 25 tokens per second of audio in each direction.

### Reservations

Because a session is open-ended, the platform reserves credit ahead of use:

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

To keep every response within what was reserved, some session options are enforced on top of the provider's protocol: built-in voices only, output capped at 4,096 tokens per response on token models, the conversation truncated (OpenAI) or compressed (Gemini) past 32,000 tokens, and no provider-side tools (remote MCP servers, web search), stored prompts, tracing or session resumption. The rules for each protocol are listed in [Protocols by model family](#protocols-by-model-family).

## Protocols by model family

The connection URL, authentication and session options of each model are on its API reference page. This section lists the client events each protocol accepts and the rules the platform applies to it.

### OpenAI Realtime

Models: [GPT Realtime 2.1](../api-references/realtime-models/OpenAI/gpt-realtime-2.1.md), [GPT Realtime 2.1 Mini](../api-references/realtime-models/OpenAI/gpt-realtime-2.1-mini.md). GPT Realtime 2.1 Mini is the smaller, lower-cost version of GPT Realtime 2.1, with the same protocol, session options and platform rules.

| | |
| --- | --- |
| Protocol | OpenAI Realtime (GA event names), compatible with the official OpenAI SDKs (`client.realtime.connect` in Python, `OpenAIRealtimeWS` in Node.js) |
| Browser endpoint | The same URL as the server endpoint, with subprotocols `realtime` and `openai-insecure-api-key.<client secret>` |
| SDK base URL | `https://api.aimlapi.com/v1` |
| Max session length | 60 minutes |
| Idle timeout | 300 seconds |

**Client events:** `session.update`, `input_audio_buffer.append`, `input_audio_buffer.commit`, `input_audio_buffer.clear`, `conversation.item.create`, `conversation.item.retrieve`, `conversation.item.truncate`, `conversation.item.delete`, `response.create`, `response.cancel`.

All server events from the model (`session.created`, `response.output_audio.delta`, `response.output_text.delta`, `response.done`, and so on) are passed to you as OpenAI sends them, except `rate_limits.updated`.

A `conversation.item.create` accepts `message` items (`input_text`, `input_audio`, `output_text` parts) and `function_call_output` items. To stream a microphone, send `input_audio_buffer.append` events with base64 PCM16 chunks (up to 256 KiB each). With the default `server_vad` turn detection the model answers when the user stops speaking.

**Platform rules:**

* **Responses are reserved before they start.** With turn detection on, the model still answers every turn automatically; the platform starts each response as soon as its worst-case cost has been reserved. Only one response runs at a time: a second `response.create` while one is in progress gets `conversation_already_has_active_response`.
* **Output and context caps.** Each response produces at most 4,096 output tokens, and the conversation is truncated once it passes 32,000 tokens after the instructions.
* **Not available:** input audio transcription (`audio.input.transcription` with a model), image input, stored prompts (`prompt`), `tracing`, `truncation`, `include`, `turn_detection.idle_timeout_ms`, out-of-band responses (`response.input`, `conversation: "none"`), custom voices, and tools other than `function` (remote MCP, hosted tools). Such a field is refused with an `error` event that names it.

### GPT-Live

Model: [GPT-Live](../api-references/realtime-models/OpenAI/gpt-live-1.md). A GPT-Live session takes a continuous audio stream, is configured once in its first event, and is billed by its duration rather than by tokens.

| | |
| --- | --- |
| Protocol | OpenAI GPT-Live, compatible with the official OpenAI Node.js SDK (`LiveWS`) |
| Browser endpoint | The same URL as the server endpoint, with subprotocols `realtime` and `openai-insecure-api-key.<client secret>`; mint the secret with `"session": {"type": "live", "model": "openai/gpt-live-1"}` |
| SDK base URL | `https://api.aimlapi.com/v1` |
| Max session length | 60 minutes |
| Idle timeout | 120 seconds without any client message (a warning arrives at 100 seconds) |

**Session flow:**

1. Open the socket and send **`session.start`** as the first event, within 10 seconds. Its `session.model` must be `openai/gpt-live-1` or `gpt-live-1`; any other first event closes the session with `1008 invalid_first_frame`. A `session.start` with a refused option gets an `error` event, and you can send a corrected one.
2. Wait for **`session.started`**, then stream input audio continuously with `session.input_audio.append`.
3. Receive the model's speech in `session.output_audio.delta` and cumulative billed seconds in `session.usage.updated`.
4. Send **`session.close`**; the session ends with `session.closed`, which carries the final usage.

**Client events after the start:** `session.input_audio.append`, `session.input_audio.mute`, `session.input_audio.unmute`, `session.instructions.append`, `session.thinking.append`, `session.commentary.append` (up to 4,096 characters of `content` each), `session.close`.

With the official OpenAI Node.js SDK, create the client with `baseURL: "https://api.aimlapi.com/v1"` and open the session with its `LiveWS` class; the events are the same.

**Platform rules:**

* **The session cannot be changed once started**: `session.update` is refused (`session_immutable`), and a second `session.start` too (`session_already_started`).
* **Not available:** Responses delegation (`delegation.type: "responses"`, `response.create`, `response.item.create`: `delegation_not_supported`), stored sessions (`store: true`: `store_not_supported`), custom voices (`unsupported_voice`), and binary WebSocket frames (closes with `1003`).

### xAI realtime voice

Model: [Grok Voice Think Fast 2.0](../api-references/realtime-models/xAI/grok-voice-think-fast-2.0.md). It speaks the OpenAI Realtime event names with xAI's own session shape: a top-level `voice` and `turn_detection`, a choice of JSON or raw binary audio transport, a reasoning effort switch, pronunciation replacements, and scripted lines (`force_message`).

| | |
| --- | --- |
| Protocol | xAI realtime voice (OpenAI Realtime event names, xAI session shape) |
| Browser endpoint | The same URL as the server endpoint, with subprotocols `realtime` and `openai-insecure-api-key.<client secret>` |
| Max session length | 60 minutes |
| Idle timeout | 120 seconds without any client message (a warning arrives at 100 seconds) |

**Client events:** `session.update`, `input_audio_buffer.append`, `input_audio_buffer.commit`, `input_audio_buffer.clear`, `conversation.item.create`, `conversation.item.delete`, `conversation.item.truncate`, `response.create`, `response.cancel`.

A `conversation.item.create` accepts `message` items (text and audio parts), `function_call`, `function_call_output` (only as the answer to a function call of the session, once) and `force_message` (one assistant `output_text` line of up to 1,000 characters, spoken verbatim).

To send binary audio frames, first set `session.audio.input.transport` to `binary`; events are always JSON text frames.

**Platform rules:**

* **Server VAD only.** Push-to-talk (`turn_detection: null` or another type) is refused with `turn_detection_locked`, because it would change how xAI bills the session.
* **Not available:** xAI's server tools (`web_search`, `x_search`, `file_search`, remote `mcp`), session resumption (`resumption_not_supported`), custom voices (`unsupported_voice`), and changing the model of a running session (`model_locked`).
* **Text items per window.** Each 30-second billing window covers up to 10 text items; past that, a `conversation.item.create` gets an `error` event `text_item_limit` until the next window starts.

### Gemini Live

Model: [Gemini 3.8 Live](../api-references/realtime-models/Google/gemini-3.8-live.md). Google's Live API model takes streamed speech, text and camera or screen frames, and answers with speech or text, with function calling.

| | |
| --- | --- |
| Protocol | Gemini Live (`BidiGenerateContent`), compatible with the official Google GenAI SDKs (`client.aio.live.connect` in Python, `ai.live.connect` in JavaScript) |
| SDK base URL | `https://api.aimlapi.com` |
| Max session length | 10 minutes |
| Idle timeout | 300 seconds without any client message |

The model is named in the first `setup` message, which must arrive within 10 seconds of connecting. Accepted forms: `gemini-3.8-live`, `google/gemini-3.8-live`, `models/gemini-3.8-live`, `models/google/gemini-3.8-live`. Another model, or another first message, closes the session with `1008 invalid_first_frame`. The `setup` is sent once.

{% hint style="warning" %}
**JavaScript SDK:** with a plain API key, `@google/genai` sends the key in the URL (`?key=`), which is refused (`400 credential_in_query`). From JavaScript, mint a [client secret](#browsers-client-secrets) on your server and pass it to the SDK as its API key with `apiVersion: "v1alpha"`. The Python SDK sends the key in a header and works with either.
{% endhint %}

**Client messages:** `setup` (first message only), `clientContent` (`turns`, `turnComplete`), `realtimeInput` (`audio`, `video`, `text`, `activityStart`, `activityEnd`, `audioStreamEnd`), `toolResponse` (`functionResponses`). Field names may be camelCase or snake_case.

| Input | Accepted |
| --- | --- |
| Audio | Raw 16-bit PCM at 16 kHz (`audio/pcm` or `audio/pcm;rate=16000`), up to 256 KiB per message |
| Images / video frames | `image/jpeg`, `image/png`, `image/webp`, up to 1 MiB each |
| Text | Up to 32,768 characters per part |

**Platform rules:**

* **Context compression.** Past 32,000 tokens the conversation is compressed down to 16,000 tokens (your own `contextWindowCompression` is replaced).
* **No resumption.** A session ends at its 10-minute limit; resuming with a `sessionResumption.handle` is refused (`session_resumption_not_supported`). Open a new session instead.
* **Not available:** input audio transcription (`input_transcription_not_supported`), Google Search and every tool other than function declarations, `thinkingConfig`, avatar video and the `VIDEO` response modality, cloned or multi-speaker voices, `safetySettings`, `labels`, proactive audio, and `fileData` parts.

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

## Code example with the OpenAI SDKs

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
