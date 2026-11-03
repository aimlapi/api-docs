# GPT Realtime 2.1

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-realtime-2.1`

Alias: `gpt-realtime-2.1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

OpenAI's speech-to-speech model for live voice agents: it listens to streamed audio, detects the end of the user's turn, and answers with speech and text in the same session, with function calling. For a cheaper, faster variant see [GPT Realtime 2.1 Mini](gpt-realtime-2.1-mini.md).

General information about realtime sessions (authentication, client secrets, billing, limits, close codes) is on the [Realtime Models](../) overview page.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

## Protocol and endpoint

| | |
| --- | --- |
| Protocol | OpenAI Realtime (GA event names), compatible with the official OpenAI SDKs (`client.realtime.connect` in Python, `OpenAIRealtimeWS` in Node.js) |
| Server endpoint | `wss://api.aimlapi.com/v1/realtime?model=openai/gpt-realtime-2.1` with `Authorization: Bearer <YOUR_AIMLAPI_KEY>` |
| Browser endpoint | The same URL, with subprotocols `realtime` and `openai-insecure-api-key.<client secret>` |
| SDK base URL | `https://api.aimlapi.com/v1` |
| Max session length | 60 minutes |
| Idle timeout | 300 seconds |

### Client events

`session.update`, `input_audio_buffer.append`, `input_audio_buffer.commit`, `input_audio_buffer.clear`, `conversation.item.create`, `conversation.item.retrieve`, `conversation.item.truncate`, `conversation.item.delete`, `response.create`, `response.cancel`.

All server events from the model (`session.created`, `response.output_audio.delta`, `response.output_text.delta`, `response.done`, and so on) are passed to you as OpenAI sends them, except `rate_limits.updated`.

### Session options

| Option | Values |
| --- | --- |
| `instructions` | Up to 16,384 characters |
| `output_modalities` | `["audio"]`, `["text"]` or both |
| `audio.input.format`, `audio.output.format` | `{"type": "audio/pcm", "rate": 24000}`, `{"type": "audio/pcmu"}`, `{"type": "audio/pcma"}` |
| `audio.input.noise_reduction` | `{"type": "near_field"}`, `{"type": "far_field"}` or `null` |
| `audio.input.turn_detection` | `server_vad` (`threshold`, `prefix_padding_ms`, `silence_duration_ms`, `create_response`, `interrupt_response`), `semantic_vad` (`eagerness`, `create_response`, `interrupt_response`), or `null` for manual turns |
| `audio.output.voice` | Built-in voices: `alloy`, `ash`, `ballad`, `cedar`, `coral`, `echo`, `marin`, `sage`, `shimmer`, `verse` |
| `audio.output.speed` | 0.25 – 1.5 |
| `max_output_tokens` | Up to 4,096 (higher values and `"inf"` are lowered to 4,096) |
| `tools` | Up to 32 `function` tools, each JSON schema up to 64 KiB |
| `tool_choice` | `auto`, `none`, `required`, or a named function |

A `conversation.item.create` accepts `message` items (`input_text`, `input_audio`, `output_text` parts) and `function_call_output` items.

### Platform rules

* **Responses are reserved before they start.** With turn detection on, the model still answers every turn automatically; the platform starts each response as soon as its worst-case cost has been reserved. Only one response runs at a time: a second `response.create` while one is in progress gets `conversation_already_has_active_response`.
* **Output and context caps.** Each response produces at most 4,096 output tokens, and the conversation is truncated once it passes 32,000 tokens after the instructions.
* **Not available:** input audio transcription (`audio.input.transcription` with a model), image input, stored prompts (`prompt`), `tracing`, `truncation`, `include`, `turn_detection.idle_timeout_ms`, out-of-band responses (`response.input`, `conversation: "none"`), custom voices, and tools other than `function` (remote MCP, hosted tools). Such a field is refused with an `error` event that names it.

## Pricing

Billed **per response**, from the token usage OpenAI reports in `response.done`. Idle time is free.

| Token type | USD per 1M tokens |
| --- | --- |
| Input text | 4.00 |
| Input text, cached | 0.40 |
| Output text | 24.00 |
| Input audio | 32.00 |
| Input audio, cached | 0.40 |
| Output audio | 64.00 |

Every response re-reads the conversation so far, the instructions and the tool definitions as input. If a response ends without a usage report, it is charged by estimate: 10 tokens per second of user audio and 20 tokens per second of model audio. The live price is in [`GET /v1/realtime/models`](../#listing-models-and-prices).

## Code Example

A spoken reply to a text message: the model's audio arrives as base64 PCM16 (24 kHz) in `response.output_audio.delta` events, its transcript in `response.output_audio_transcript.delta`.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
# pip install websockets
import asyncio
import base64
import json

import websockets

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
API_KEY = "<YOUR_AIMLAPI_KEY>"
URL = "wss://api.aimlapi.com/v1/realtime?model=openai/gpt-realtime-2.1"


async def main():
    async with websockets.connect(
        URL, additional_headers={"Authorization": f"Bearer {API_KEY}"}
    ) as ws:
        await ws.send(json.dumps({
            "type": "session.update",
            "session": {
                "type": "realtime",
                "instructions": "You are a friendly assistant. Answer briefly.",
                "audio": {"output": {"voice": "marin"}},
            },
        }))
        await ws.send(json.dumps({
            "type": "conversation.item.create",
            "item": {
                "type": "message",
                "role": "user",
                "content": [{"type": "input_text", "text": "Say hello in five words."}],
            },
        }))
        await ws.send(json.dumps({"type": "response.create"}))

        audio = bytearray()
        async for message in ws:
            event = json.loads(message)
            if event["type"] == "response.output_audio.delta":
                audio += base64.b64decode(event["delta"])
            elif event["type"] == "response.output_audio_transcript.delta":
                print(event["delta"], end="", flush=True)
            elif event["type"] == "response.done":
                print("\nUsage:", event["response"].get("usage"))
                break
            elif event["type"] == "error":
                print("Error:", event["error"])
                break

        # Raw 24 kHz mono PCM16: play it or wrap it in a WAV header.
        with open("reply.pcm", "wb") as f:
            f.write(audio)


asyncio.run(main())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// npm i ws
import fs from "node:fs";
import WebSocket from "ws";

// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
const apiKey = "<YOUR_AIMLAPI_KEY>";
const ws = new WebSocket(
  "wss://api.aimlapi.com/v1/realtime?model=openai/gpt-realtime-2.1",
  { headers: { Authorization: `Bearer ${apiKey}` } },
);

const audio = [];

ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.update",
    session: {
      type: "realtime",
      instructions: "You are a friendly assistant. Answer briefly.",
      audio: { output: { voice: "marin" } },
    },
  }));
  ws.send(JSON.stringify({
    type: "conversation.item.create",
    item: {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "Say hello in five words." }],
    },
  }));
  ws.send(JSON.stringify({ type: "response.create" }));
});

ws.on("message", (data) => {
  const event = JSON.parse(data.toString());
  if (event.type === "response.output_audio.delta") {
    audio.push(Buffer.from(event.delta, "base64"));
  } else if (event.type === "response.output_audio_transcript.delta") {
    process.stdout.write(event.delta);
  } else if (event.type === "response.done") {
    console.log("\nUsage:", event.response.usage);
    // Raw 24 kHz mono PCM16: play it or wrap it in a WAV header.
    fs.writeFileSync("reply.pcm", Buffer.concat(audio));
    ws.close();
  } else if (event.type === "error") {
    console.error("Error:", event.error);
  }
});

// A refused connection answers with an HTTP status and a JSON error body.
ws.on("unexpected-response", (_req, res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => console.error(res.statusCode, body));
});
```
{% endcode %}
{% endtab %}
{% endtabs %}

To stream a microphone instead, send `input_audio_buffer.append` events with base64 PCM16 chunks (up to 256 KiB each). With the default `server_vad` turn detection the model answers when the user stops speaking.

The official OpenAI SDKs work too: set the base URL to `https://api.aimlapi.com/v1` (see the [overview example](../#code-example)).
