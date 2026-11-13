---
description: "Model id: openai/gpt-realtime-2.1. API reference for GPT Realtime 2.1: request schema and code examples."
---

# GPT Realtime 2.1

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-realtime-2.1`
* `gpt-realtime-2.1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

OpenAI's speech-to-speech model for live voice agents: it listens to streamed audio, detects the end of the user's turn, and answers with speech and text in the same session, with function calling. For a cheaper, faster variant see [GPT Realtime 2.1 Mini](gpt-realtime-2.1-mini.md).

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

The model is served over a WebSocket in the OpenAI Realtime protocol. Client events, billing, limits and errors are described in [Realtime Sessions](../../../capabilities/realtime-sessions.md#openai-realtime).

| | |
| --- | --- |
| Connection URL | `wss://api.aimlapi.com/v1/realtime?model=openai/gpt-realtime-2.1` |
| Authentication | Server: `Authorization: Bearer <YOUR_AIMLAPI_KEY>`. Browser: subprotocols `realtime` and `openai-insecure-api-key.<client secret>` ([client secrets](../../../capabilities/realtime-sessions.md#browsers-client-secrets)) |
| SDK base URL | `https://api.aimlapi.com/v1` |

Session options (`session.update`):

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

## Code Example

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

<details>

<summary>Response</summary>

The example prints the transcript of the spoken reply (`response.output_audio_transcript.delta`), then the token usage from `response.done`, and saves the audio (`response.output_audio.delta`, base64 PCM16 at 24 kHz) to `reply.pcm`. Values in angle brackets are placeholders.

{% code overflow="wrap" %}
```
<transcript of the spoken reply>
Usage: <the usage object of response.done>
```
{% endcode %}

</details>

The official OpenAI SDKs work too: set the base URL to `https://api.aimlapi.com/v1` (see the [SDK example](../../../capabilities/realtime-sessions.md#code-example-with-the-openai-sdks)).
