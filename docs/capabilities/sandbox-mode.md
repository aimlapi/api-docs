---
description: >-
  Test your integration for free: sandbox mode returns answers in the live response format without calling a
  model and without charging your balance.
---

# Sandbox Mode

Sandbox mode returns API responses in the same format as live ones, without calling a model and without charging anything. Use it to check your own code: how it parses text, streams, tool calls, images, asynchronous video and errors, before you spend credits on real requests.

* The request goes through the usual checks: your API key, the model id, the model list of your key and the validation of the request body against the schema of that model.
* No provider is called, and nothing is reserved or charged. Sandbox works with a zero balance.
* Every sandbox response marks itself as one (see [How to recognise a sandbox response](#how-to-recognise-a-sandbox-response)).
* The content of the answers is fixed. It does not depend on your prompt.

{% hint style="info" %}
Sandbox is for testing an integration, not for judging a model. Use live requests to compare models or check the quality of their answers.
{% endhint %}

***

## Turn sandbox on

There are three ways. They all give the same mode.

| Method       | How                                                        | Best for                                                              |
| ------------ | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| Model prefix | `"model": "sandbox/openai/gpt-4o-mini"` (case-insensitive) | Any SDK or no-code tool: you change one string                        |
| Header       | `X-AIMLAPI-Sandbox: 1` (or `true`) with the usual model id | Setting it once as a default header of your SDK client               |
| Sandbox key  | An API key created with `"mode": "sandbox"`                | A key for test environments that can never run a live request ([details](#sandbox-api-keys)) |

* The prefix works in front of any model id from [`GET /v1/models`](../api-references/service-endpoints/complete-model-list.md): `sandbox/<model id>`.
* In a sandbox response, `model` keeps the `sandbox/` prefix, even when you sent a live model id together with the header or a sandbox key.
* With the prefix as the only switch, one request cannot mix sandbox and live models (for example in `models` or fallback models). Such a request returns `400 sandbox_mixed_models`. The header and a sandbox key switch every model of the request to sandbox.
* Header values: `1` or `true` turn sandbox on; `0`, `false` or an empty value keep the request live. Case and surrounding spaces are ignored.

{% hint style="warning" %}
Any other value of `X-AIMLAPI-Sandbox`, including the header sent twice, returns `400 sandbox_header_invalid`. The request runs neither in sandbox nor live, so a typo never turns a test request into a paid one.
{% endhint %}

## How to recognise a sandbox response

| Where                                                   | Value                                                                       |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| `x-aimlapi-sandbox` response header                     | `true`, on the request and on every poll of an asynchronous task             |
| `model` in the response body                            | Starts with `sandbox/`                                                      |
| `system_fingerprint` (Chat Completions)                 | `aimlapi-sandbox`                                                           |
| Cost headers `x-aimlapi-credits-used`, `x-aimlapi-usd-spent` | `0`                                                                    |
| `meta.usage` in the body                                | `{"credits_used": 0, "usd_spent": 0}`                                       |
| [Usage Logs](../api-references/service-endpoints/usage-logs.md) | The row has `"sandbox": true` and a zero cost                       |

The text of every sandbox answer also says that it came from the sandbox. `x-aimlapi-sandbox` is listed in `Access-Control-Expose-Headers`, so browser code can read it.

## What works as in production

| Check                                 | In sandbox                                                                                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API key, bans and account restrictions | The same as for live requests                                                                                                                                |
| Invalid request body                  | The same `400` as the live model returns                                                                                                                     |
| Unknown model                         | The same `404`                                                                                                                                               |
| Key limited to a list of models       | Checked against the id without the prefix: a key that may not call `openai/gpt-4o` gets the same `403 model_not_allowed` for `sandbox/openai/gpt-4o`          |
| Pinned provider (`provider`)          | The same provider selection, and the same `400` when no provider matches                                                                                    |
| Balance                               | Not checked: sandbox works with a zero balance (one exception for file uploads, see [Limitations](#limitations))                                            |

## Supported endpoints

| Capability                 | Endpoint                                                                 | Asynchronous            |
| -------------------------- | ------------------------------------------------------------------------ | ----------------------- |
| Chat Completions (JSON and SSE) | `POST /v1/chat/completions`                                         | No                      |
| Responses                  | `POST /v1/responses`, read `GET /v1/responses/<id>`                      | With `background: true` |
| Messages (Anthropic)       | `POST /v1/messages`                                                      | No                      |
| Images                     | `POST /v1/images/generations`, `POST /v1/images/edits`                   | No                      |
| Embeddings                 | `POST /v1/embeddings`                                                    | No                      |
| Text-to-speech             | `POST /v1/tts`                                                           | No                      |
| OCR                        | `POST /v1/ocr`                                                           | No                      |
| Decisions                  | `POST /v1/decisions`                                                     | No                      |
| Video                      | `POST /v2/video/generations`, poll `GET /v2/video/generations?id=<id>`   | Yes                     |
| Music                      | `POST /v2/generate/audio`, poll `GET /v2/generate/audio?id=<id>`         | Yes                     |
| Speech-to-text             | `POST /v1/stt/create`, poll `GET /v1/stt/<generation_id>`                | Yes                     |
| Message Batches            | `POST /v1/batches`, poll `GET /v1/batches?batch_id=<id>`, cancel `POST /v1/batches/cancel/<id>` | Yes |

* Message Batches here means the [inline format](batch-processing.md#legacy-inline-format). A batch created from a file (`input_file_id`) is always live: a sandbox request returns `400 sandbox_unsupported`.
* The Azure OpenAI-compatible chat route works like Chat Completions.
* Routers work on Chat Completions only (`sandbox/<router id>`). The router does not choose a model; the answer comes from the chat sandbox. On other endpoints a router returns `400 sandbox_unsupported`.
* Any other endpoint, and Text-to-speech with `"stream": true`, returns `400 sandbox_unsupported`.

### Not supported

[Realtime Sessions](realtime-sessions.md) (including `POST /v1/realtime/client_secrets`), Agent Tools ([Toolbox](../quickstart/toolbox.md)) and [MCP](../quickstart/mcp.md) have no sandbox. On these services:

* the `X-AIMLAPI-Sandbox` header with any value other than `0`, `false` or empty returns `400 sandbox_unsupported`, and the request runs neither in sandbox nor live;
* a sandbox key returns `403 sandbox_key_not_allowed`.

In the Playground, the realtime voice and video modes and the composer's **Tools** button are unavailable while **Sandbox** is on.

## Default responses

| Endpoint                                  | What comes back                                                                                                                                                                                                                  |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chat Completions                          | A short text with `finish_reason: "stop"` and plausible `usage`. When the request has `tools` and `tool_choice` is not `none`: a tool call                                                                                         |
| Responses, Messages                       | The same, in the format of these APIs. With `tools`: a tool call                                                                                                                                                                 |
| Images                                    | `{"data": [...]}` with `n` links (1 to 10) to static PNG images matched to `size`. With `response_format: "b64_json"`, each item has `"b64_json": null` and the image is at `url`                                                   |
| Embeddings                                | A vector of length `dimensions`; without it, 1536 (3072 for `openai/text-embedding-3-large`). `dimensions` above 3072 is capped at 3072. The same input always gives the same vector. `encoding_format: "base64"` is supported |
| Text-to-speech                            | `{"audio": {"url": ...}}`: a link to a short fixed phrase in the format from `response_format` (`mp3` by default)                                                                                                                            |
| OCR                                       | A fixed page of text                                                                                                                                                                                                             |
| Decisions                                 | Fixed answers to your questions, in the format of the model you called                                                                                                                                                           |
| Video, Music, Speech-to-text, Message Batches | An asynchronous task (see [Asynchronous tasks](#asynchronous-tasks))                                                                                                                                                        |

* `usage` is an estimate: about one token per four characters. It is not the token count of a real model, so do not use it to predict a bill.
* A token limit in the request cuts a text answer to `limit × 4` characters and marks it as cut: `max_tokens` or `max_completion_tokens` in Chat Completions gives `finish_reason: "length"`, `max_output_tokens` in Responses gives `status: "incomplete"`, and `max_tokens` in Messages gives `stop_reason: "max_tokens"`.
* Chat Completions with `logprobs: true` returns `"logprobs": {"content": [], "refusal": null}`: no tokens were generated, so the list is empty.
* Media links point at files under `https://api.aimlapi.com/sandbox-assets/`. They open without an API key. Images and videos show the AI/ML API logo and a "Sandbox" caption with their size.
* Provider-specific fields are not reproduced: the response follows the public schema of the endpoint.
* `previous_response_id` (Responses) is ignored.

## Scenario markers

To get a specific answer, put a marker in the main text of the request. The first marker found is used; case does not matter; unknown markers are ignored.

| Marker                 | Result                                                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[sandbox:text]`       | A short text, even when `tools` are present                                                                                                                     |
| `[sandbox:long]`       | A long text of about 12,000 characters. A token limit cuts it, as described in [Default responses](#default-responses) |
| `[sandbox:tool]`       | A tool call with arguments that match the JSON Schema of the tool (needs `tools`)                                                                              |
| `[sandbox:json]`       | JSON that follows the schema of the request: `response_format.json_schema` in Chat Completions, `text.format` in Responses, `output_config.format` in Messages. Without a schema, `{"sandbox": true}`. A request with a schema gets such JSON without the marker too. Chat Completions with `response_format: {"type": "json_object"}` gets `{"sandbox": true, "model": "<model id>"}` |
| `[sandbox:error=403]`  | The `403` "out of funds" error, as returned for live requests                                                                                                   |
| `[sandbox:error=429]`  | A `429` rate-limit error with `Retry-After: 1`                                                                                                                  |
| `[sandbox:error=500]`  | A `500` error in the OpenAI error format (internal provider error)                                                                                             |
| `[sandbox:error=503]`  | A `503` error in the OpenAI error format (provider unavailable)                                                                                                 |
| `[sandbox:fail]`       | The asynchronous task ends in failure, in the same shape as a failed live task (Video, Music)                                                                   |
| `[sandbox:slow=<ms>]`  | The answer arrives after a pause of 0 to 20,000 ms; larger values are capped at 20,000                                                                          |

Where the main text is read:

| Endpoint                    | Main text                                                                 |
| --------------------------- | ------------------------------------------------------------------------- |
| Chat Completions, Messages  | The last message with `role: "user"` (a string or its text parts)         |
| Responses                   | `input` if it is a string; otherwise the last item with `role: "user"`    |
| Images, Video, Music        | `prompt`                                                                  |
| Embeddings                  | `input` (a string, or the first string in the list)                       |
| Text-to-speech              | `input` or `text`                                                         |
| Decisions                   | The whole request body                                                    |

OCR, Speech-to-text and Message Batches have no main text, so markers do not apply to them.

{% hint style="info" %}
`400` and `404` are not scenarios. Send a really invalid body, or a model that does not exist such as `sandbox/does-not-exist`, and you get the same error a live request gets.
{% endhint %}

**Tool-calling loop.** The first request with `tools` returns `finish_reason: "tool_calls"`. Send a second request that adds the assistant message and a `role: "tool"` message with your result, with the same `tools`: the sandbox answers with a final text. Responses (`function_call_output` item) and Messages (`tool_result` block) work the same way.

`[sandbox:fail]` on synchronous endpoints answers as if there were no marker. `[sandbox:tool]` without `tools` gives the default short answer. On endpoints without tools (Images, Embeddings and others) these markers change nothing.

## Streaming

`"stream": true` returns the same SSE stream as a live request. The text of each choice arrives in at most 40 deltas, with a 25 ms pause between the first 40 chunks; the rest arrives at once. Without `[sandbox:slow=...]` the whole stream takes about one second, whatever `n` is. Chat Completions always ends with a chunk that carries `usage` and `choices: []`, then `[DONE]`. Joining the deltas gives the same text as the non-streaming answer.

## Asynchronous tasks

Video, Music, Speech-to-text, Message Batches and Responses with `background: true` work like live tasks:

1. The submit request returns an id and the status `queued`.
2. Until the task is ready, a poll answers like a poll of an unfinished live task: `{"id": "<id>", "status": "generating"}`. The task is ready about 10 seconds after submission.
3. Then the poll returns the final result. For Video: `"status": "completed"` and a `video.url` you can open. For Music: `"status": "completed"` and `audio_file.url`.

* Video is picked by aspect ratio (`aspect_ratio`, `ratio`, or `resolution`/`size`; 16:9 by default) and length (`duration` of 8 seconds or more gives a 10-second clip, otherwise 5 seconds).
* With `[sandbox:fail]`, the final poll returns `"status": "failed"` and an `error` object, the same shape a failed live generation returns.
* Cancelling a batch answers like a live cancel: `{"id": "<id>", "status": "cancelled", "output": null, "usage": []}`. Cancelled before it was ready, the batch later polls as `cancelled` without results; cancelled after, it polls as finished.
* A finished answer is kept for one hour. After that, a poll for the same id returns `404`, as for a task that does not exist.

## Sandbox API keys

A sandbox key runs every request in sandbox, even with a live model id and without the header. Give it to test environments and CI: it can never start a paid request.

* Create it in the dashboard (**API Keys**, then **Create API key** with the **Sandbox key** switch on) or with [`POST /v1/keys`](../api-references/service-endpoints/api-key-management.md) and `"mode": "sandbox"`. The mode is set at creation and cannot be changed. Responses of `/v1/keys` include `mode`: `live` or `sandbox`.
* A sandbox key works on inference endpoints (submit, poll, cancel), [`GET /v2/usage`](../api-references/service-endpoints/api-key-usage.md), `GET /v2/usage/detail` and [`GET /v2/logs`](../api-references/service-endpoints/usage-logs.md). Everything else returns `403 sandbox_key_not_allowed` ("Sandbox API keys can only be used for inference, polling, usage and logs."), including billing, Agent Tools, MCP and Realtime.
* Polls and cancels made with a sandbox key see sandbox tasks only. A live task of the same account returns `404`, as if it did not exist.
* A sandbox key cannot be a management key: `400 sandbox_management_key`.

{% code overflow="wrap" %}

```bash
curl https://api.aimlapi.com/v1/keys \
  --header 'Authorization: Bearer <YOUR_MANAGEMENT_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{"name": "ci-sandbox", "mode": "sandbox"}'
```

{% endcode %}

## Logs and usage

* Sandbox requests appear in [`GET /v2/logs`](../api-references/service-endpoints/usage-logs.md) and on the dashboard **Logs** page with `"sandbox": true`, a **Sandbox** badge and a zero cost.
* `GET /v2/logs` takes `sandbox=include|exclude|only` (default `include`) to list sandbox rows with live ones, leave them out, or list them alone.
* Sandbox requests are not counted in the totals of [`GET /v2/usage`](../api-references/service-endpoints/api-key-usage.md): nothing was charged.

## Limits

| Limit                            | Value                         |
| -------------------------------- | ----------------------------- |
| Sandbox requests per minute      | 60 per user                   |
| Sandbox requests per day         | 1,000 per user (UTC day)      |

The limit is per user, not per key. Above it, the API returns `429` with `Retry-After` (seconds until the window resets) and the message "Sandbox rate limit exceeded: 60 requests per minute, 1000 per day." Sandbox requests also count towards the general per-second request limits.

Limits of a single request:

| What                                                     | Limit                                                        | Above the limit                                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Embeddings inputs                                        | 2,048                                                        | `400 sandbox_unsupported`                                                                               |
| Embeddings values (inputs × `dimensions`)                | 512,000 (for example 166 inputs at 3072 or 333 at 1536)      | `400 sandbox_unsupported`                                                                               |
| Requests in a batch                                      | 1,000                                                        | `400 sandbox_unsupported`                                                                               |
| `n` in Chat Completions                                  | 128                                                          | Reduced to 128                                                                                          |
| Generated JSON (tool arguments, `json_schema`)           | 64 KB; with `n` above 4, the choices share 256 KB            | What does not fit, and nesting deeper than 8 levels, comes back as `null`; the JSON stays valid          |
| A stored answer (async tasks, Responses with `store`)    | 1 MB                                                         | Async task: `400 sandbox_unsupported` at submit. Responses without `background`: the answer arrives but cannot be read again by id (`404`), as with `store: false` |

Stored answers are kept for one hour, up to 32 MB per user per hour. Above that, submitting an asynchronous task returns `429` with "Sandbox rate limit exceeded: 32 MB of async answers per hour." and `Retry-After`. If the sandbox capacity of the platform is used up, the message is "Sandbox rate limit exceeded: async answers are at capacity, retry later."

## Errors

Sandbox errors use the same formats as live ones: `application/problem+json` for `400`, `403`, `404` and `429`, and the OpenAI error format for `500` and `503`. The code is in the top-level `code` field, next to `status` and `message`.

| Code                       | Status | When                                                                                                                                                          |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sandbox_header_invalid`   | 400    | `X-AIMLAPI-Sandbox` has a value other than `1`, `true`, `0`, `false` or empty. The request runs neither in sandbox nor live                                     |
| `sandbox_disabled`         | 400    | Sandbox is switched off. The request never runs live                                                                                                          |
| `sandbox_mixed_models`     | 400    | Sandbox and live models in one request when only the prefix selects sandbox                                                                                   |
| `sandbox_unsupported`      | 400    | Endpoint not supported, Text-to-speech with `stream: true`, a router outside Chat Completions, a request over a [limit](#limits), or the header on Realtime, Agent Tools or MCP |
| `sandbox_key_not_allowed`  | 403    | A sandbox key on an endpoint it may not use (see [Sandbox API keys](#sandbox-api-keys))                                                                       |
| `sandbox_management_key`   | 400    | Creating a sandbox key as a management key, or making a sandbox key one                                                                                       |

Agent Tools and Realtime answer in the OpenAI error format, and MCP in its own envelope; in all three the code is in `error.code`.

## Limitations

| Limitation                                                          | Details                                                                                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File uploads (`POST /v1/images/edits`, Speech-to-text) with a balance under $1 | The model id is a form field, and the balance check runs before the prefix is seen. Under $1, use the `X-AIMLAPI-Sandbox: 1` header or a sandbox key. From $1, the prefix in the form field works |
| Text-to-speech with `stream: true`                                  | Not supported: `400 sandbox_unsupported`                                                                                                                        |
| OCR, Speech-to-text, Message Batches                                | No scenario markers: the answer is always the same                                                                                                             |
| OCR with `google/gc-document-ai`                                    | Sandbox answers in the Mistral OCR shape, while the live model answers in the Document AI shape                                                                 |
| `previous_response_id`                                              | Ignored                                                                                                                                                         |
| Realtime, Agent Tools, MCP                                          | No sandbox: the header returns `400 sandbox_unsupported`, a sandbox key `403`                                                                                   |
| Answer content                                                      | Fixed. Not suitable for checking model quality                                                                                                                  |

## Going live

The response format does not change. Remove the switch you used:

| You used    | To go live                                                           |
| ----------- | -------------------------------------------------------------------- |
| The prefix  | Remove `sandbox/` from `model`                                       |
| The header  | Remove `X-AIMLAPI-Sandbox` (or the default header of your SDK client) |
| A sandbox key | Replace it with a live key                                         |

The same code then gets real answers and is charged for them. If your production logs still show requests with the **Sandbox** badge, part of your integration is still in test mode.

***

## Examples

The Python examples after the first one reuse its `client`.

<details>

<summary>Chat Completions with the model prefix (cURL, Python, JavaScript)</summary>

{% code overflow="wrap" %}

```bash
curl https://api.aimlapi.com/v1/chat/completions \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "sandbox/openai/gpt-4o-mini",
    "messages": [{"role": "user", "content": "Say hello"}]
  }'
```

{% endcode %}

```python
from openai import OpenAI

client = OpenAI(base_url="https://api.aimlapi.com/v1", api_key="<YOUR_AIMLAPI_KEY>")

response = client.chat.completions.create(
    model="sandbox/openai/gpt-4o-mini",
    messages=[{"role": "user", "content": "Say hello"}],
)
print(response.choices[0].message.content)
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({ baseURL: "https://api.aimlapi.com/v1", apiKey: "<YOUR_AIMLAPI_KEY>" });

const response = await client.chat.completions.create({
  model: "sandbox/openai/gpt-4o-mini",
  messages: [{ role: "user", content: "Say hello" }],
});
console.log(response.choices[0].message.content);
```

</details>

<details>

<summary>Response</summary>

{% code overflow="wrap" %}

```json
{
  "id": "chatcmpl-V1StGXR8Z5jdHi6BmyT8k",
  "object": "chat.completion",
  "created": 1793700000,
  "model": "sandbox/openai/gpt-4o-mini",
  "system_fingerprint": "aimlapi-sandbox",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "This is a sandbox response from AI/ML API for openai/gpt-4o-mini. No model was called and nothing was charged. For a real answer, send the request without the sandbox prefix and header, using a live API key.",
        "refusal": null
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 3,
    "completion_tokens": 52,
    "total_tokens": 55,
    "prompt_tokens_details": {"cached_tokens": 0},
    "completion_tokens_details": {"reasoning_tokens": 0}
  },
  "meta": {"usage": {"credits_used": 0, "usd_spent": 0}}
}
```

{% endcode %}

Response headers include `x-aimlapi-sandbox: true`.

</details>

<details>

<summary>Sandbox for a whole client with one header (Python, JavaScript)</summary>

The live model id stays in your code; the header switches the client to sandbox. Responses report `"model": "sandbox/openai/gpt-4o-mini"`.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key="<YOUR_AIMLAPI_KEY>",
    default_headers={"X-AIMLAPI-Sandbox": "1"},
)
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.aimlapi.com/v1",
  apiKey: "<YOUR_AIMLAPI_KEY>",
  defaultHeaders: { "X-AIMLAPI-Sandbox": "1" },
});
```

</details>

<details>

<summary>Streaming a long answer (Python)</summary>

```python
stream = client.chat.completions.create(
    model="sandbox/openai/gpt-4o-mini",
    stream=True,
    stream_options={"include_usage": True},
    messages=[{"role": "user", "content": "Write a long answer [sandbox:long]"}],
)
for chunk in stream:
    if chunk.choices:
        print(chunk.choices[0].delta.content or "", end="")
```

</details>

<details>

<summary>Tool call and the second step of the loop (Python)</summary>

```python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Weather for a city",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]
messages = [{"role": "user", "content": "Weather in Paris?"}]

first = client.chat.completions.create(model="sandbox/openai/gpt-4o-mini", messages=messages, tools=tools)
call = first.choices[0].message.tool_calls[0]  # finish_reason is "tool_calls"; arguments follow the schema

messages += [
    first.choices[0].message,
    {"role": "tool", "tool_call_id": call.id, "content": '{"temp_c": 18}'},
]
final = client.chat.completions.create(model="sandbox/openai/gpt-4o-mini", messages=messages, tools=tools)
print(final.choices[0].message.content)  # the final text
```

</details>

<details>

<summary>Asynchronous video (Python)</summary>

Use the id of any video model from the catalog.

{% code overflow="wrap" %}

```python
import time
import requests

API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com"
headers = {"Authorization": f"Bearer {API_KEY}"}

job = requests.post(
    f"{BASE_URL}/v2/video/generations",
    headers=headers,
    json={"model": "sandbox/google/veo-3.1-fast-generate-001", "prompt": "A red balloon over a field"},
).json()

while True:
    state = requests.get(f"{BASE_URL}/v2/video/generations", headers=headers, params={"id": job["id"]}).json()
    if state["status"] not in ("queued", "generating"):
        break
    time.sleep(2)

print(state)  # completed: state["video"]["url"]
```

{% endcode %}

Add `[sandbox:fail]` to `prompt` to test how your code handles a failed generation.

</details>

<details>

<summary>Errors on demand (cURL)</summary>

{% code overflow="wrap" %}

```bash
curl -i https://api.aimlapi.com/v1/chat/completions \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "sandbox/openai/gpt-4o-mini",
    "messages": [{"role": "user", "content": "Test retries [sandbox:error=429]"}]
  }'
```

{% endcode %}

The answer is `429` with `Retry-After: 1`. Use `403`, `500` or `503` to test the other branches, and `[sandbox:slow=3000]` to test a slow answer.

</details>
