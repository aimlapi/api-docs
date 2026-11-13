---
description: "Model id: openai/gpt-live-1. API reference for GPT-Live: request schema and code examples."
---

# GPT-Live

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-live-1`
* `gpt-live-1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

OpenAI's live voice model for continuous spoken conversations. A GPT-Live session takes a continuous audio stream, is configured once in its first event, and is billed by its duration rather than by tokens.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

The model is served over a WebSocket in the OpenAI GPT-Live protocol. The session flow, client events, billing, limits and errors are described in [Realtime Sessions](../../../capabilities/realtime-sessions.md#gpt-live).

| | |
| --- | --- |
| Connection URL | `wss://api.aimlapi.com/v1/live/sessions` (no `?model=`: the model is named in `session.start`) |
| Authentication | Server: `Authorization: Bearer <YOUR_AIMLAPI_KEY>`. Browser: subprotocols `realtime` and `openai-insecure-api-key.<client secret>` ([client secrets](../../../capabilities/realtime-sessions.md#browsers-client-secrets)) |
| SDK base URL | `https://api.aimlapi.com/v1` |

Session options (`session.start`, the first event, sent once):

| Option | Values |
| --- | --- |
| `model` | `openai/gpt-live-1` or `gpt-live-1` (required) |
| `instructions` | Up to 16,384 characters |
| `input` | Up to 128 history messages to seed the conversation, text only, one part each (`developer`, `user` with `input_text`; `assistant` with `output_text`) |
| `audio.format` | One format for input and output: `{"type": "audio/pcm", "rate": 24000}`, `{"type": "audio/pcm", "rate": 16000}`, `{"type": "audio/pcmu", "rate": 8000}`, `{"type": "audio/pcma", "rate": 8000}` |
| `audio.output.voice` | Built-in voices: `alloy`, `ash`, `ballad`, `beacon`, `bossa`, `brise`, `cedar`, `cinder`, `coral`, `delta`, `echo`, `flitz`, `gleam`, `harema`, `juni`, `marin`, `meridian`, `nira`, `noeul`, `nuri`, `quartz`, `ripple`, `sage`, `shida`, `shimmer`, `sillage`, `stone`, `tempo`, `verse`, `vesper`, `willow` |
| `delegation` | `{"type": "client"}` only (applied automatically) |
| `store` | `false` only (applied automatically) |

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
URL = "wss://api.aimlapi.com/v1/live/sessions"

# 100 ms of 24 kHz mono PCM16 silence; send real microphone audio instead.
CHUNK = base64.b64encode(bytes(4800)).decode()


async def stream_audio(ws):
    for _ in range(100):
        await ws.send(json.dumps({"type": "session.input_audio.append", "audio": CHUNK}))
        await asyncio.sleep(0.1)
    await ws.send(json.dumps({"type": "session.close"}))


async def main():
    async with websockets.connect(
        URL, additional_headers={"Authorization": f"Bearer {API_KEY}"}
    ) as ws:
        await ws.send(json.dumps({
            "type": "session.start",
            "session": {
                "model": "openai/gpt-live-1",
                "instructions": "Greet the user in one short sentence.",
                "audio": {
                    "format": {"type": "audio/pcm", "rate": 24000},
                    "output": {"voice": "marin"},
                },
            },
        }))

        async for message in ws:
            event = json.loads(message)
            if event["type"] == "session.started":
                asyncio.create_task(stream_audio(ws))
            elif event["type"] == "session.output_audio.delta":
                pass  # the model's speech: play it
            elif event["type"] == "session.closed":
                print("Final usage:", event.get("usage"))
            elif event["type"] == "error":
                print("Error:", event["error"])


asyncio.run(main())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// npm i ws
import WebSocket from "ws";

// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
const apiKey = "<YOUR_AIMLAPI_KEY>";
const ws = new WebSocket("wss://api.aimlapi.com/v1/live/sessions", {
  headers: { Authorization: `Bearer ${apiKey}` },
});

ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.start",
    session: {
      model: "openai/gpt-live-1",
      instructions: "Greet the user in one short sentence.",
      audio: {
        format: { type: "audio/pcm", rate: 24000 },
        output: { voice: "marin" },
      },
    },
  }));
});

const streamAudio = () => {
  // 100 ms of 24 kHz mono PCM16 silence; send real microphone audio instead.
  const chunk = Buffer.alloc(4800).toString("base64");
  const timer = setInterval(
    () => ws.send(JSON.stringify({ type: "session.input_audio.append", audio: chunk })),
    100,
  );
  setTimeout(() => {
    clearInterval(timer);
    ws.send(JSON.stringify({ type: "session.close" }));
  }, 10_000);
};

ws.on("message", (data) => {
  const event = JSON.parse(data.toString());
  if (event.type === "session.started") {
    streamAudio();
  } else if (event.type === "session.closed") {
    console.log("Final usage:", event.usage);
  } else if (event.type === "error") {
    console.error("Error:", event.error);
  }
});

ws.on("close", (code, reason) => console.log("Closed", code, reason.toString()));
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

The example streams 10 seconds of audio (silence, in 100 ms chunks), closes the session with `session.close`, and prints the final usage that `session.closed` carries. Values in angle brackets are placeholders.

{% code overflow="wrap" %}
```
Final usage: <the usage object of session.closed>
```
{% endcode %}

</details>

With the official OpenAI Node.js SDK, create the client with `baseURL: "https://api.aimlapi.com/v1"` and open the session with its `LiveWS` class; the events are the same.
