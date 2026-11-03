# GPT-Live

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-live-1`

Alias: `gpt-live-1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

OpenAI's live voice model for continuous spoken conversations. A GPT-Live session takes a continuous audio stream, is configured once in its first event, and is billed by its duration rather than by tokens.

General information about realtime sessions (authentication, client secrets, billing, limits, close codes) is on the [Realtime Models](../) overview page.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

## Protocol and endpoint

| | |
| --- | --- |
| Protocol | OpenAI GPT-Live, compatible with the official OpenAI Node.js SDK (`LiveWS`) |
| Server endpoint | `wss://api.aimlapi.com/v1/live/sessions` with `Authorization: Bearer <YOUR_AIMLAPI_KEY>` (no `?model=`: the model is named in `session.start`) |
| Browser endpoint | The same URL, with subprotocols `realtime` and `openai-insecure-api-key.<client secret>`; mint the secret with `"session": {"type": "live", "model": "openai/gpt-live-1"}` |
| SDK base URL | `https://api.aimlapi.com/v1` |
| Max session length | 60 minutes |
| Idle timeout | 120 seconds without any client message (a warning arrives at 100 seconds) |

### Session flow

1. Open the socket and send **`session.start`** as the first event, within 10 seconds. Its `session.model` must be `openai/gpt-live-1` or `gpt-live-1`; any other first event closes the session with `1008 invalid_first_frame`. A `session.start` with a refused option gets an `error` event, and you can send a corrected one.
2. Wait for **`session.started`**, then stream input audio continuously with `session.input_audio.append`.
3. Receive the model's speech in `session.output_audio.delta` and cumulative billed seconds in `session.usage.updated`.
4. Send **`session.close`**; the session ends with `session.closed`, which carries the final usage.

### `session.start` options

| Option | Values |
| --- | --- |
| `model` | `openai/gpt-live-1` or `gpt-live-1` (required) |
| `instructions` | Up to 16,384 characters |
| `input` | Up to 128 history messages to seed the conversation, text only, one part each (`developer`, `user` with `input_text`; `assistant` with `output_text`) |
| `audio.format` | One format for input and output: `{"type": "audio/pcm", "rate": 24000}`, `{"type": "audio/pcm", "rate": 16000}`, `{"type": "audio/pcmu", "rate": 8000}`, `{"type": "audio/pcma", "rate": 8000}` |
| `audio.output.voice` | Built-in voices: `alloy`, `ash`, `ballad`, `beacon`, `bossa`, `brise`, `cedar`, `cinder`, `coral`, `delta`, `echo`, `flitz`, `gleam`, `harema`, `juni`, `marin`, `meridian`, `nira`, `noeul`, `nuri`, `quartz`, `ripple`, `sage`, `shida`, `shimmer`, `sillage`, `stone`, `tempo`, `verse`, `vesper`, `willow` |
| `delegation` | `{"type": "client"}` only (applied automatically) |
| `store` | `false` only (applied automatically) |

### Client events after the start

`session.input_audio.append`, `session.input_audio.mute`, `session.input_audio.unmute`, `session.instructions.append`, `session.thinking.append`, `session.commentary.append` (up to 4,096 characters of `content` each), `session.close`.

### Platform rules

* **The session cannot be changed once started**: `session.update` is refused (`session_immutable`), and a second `session.start` too (`session_already_started`).
* **Not available:** Responses delegation (`delegation.type: "responses"`, `response.create`, `response.item.create`: `delegation_not_supported`), stored sessions (`store: true`: `store_not_supported`), custom voices (`unsupported_voice`), and binary WebSocket frames (closes with `1003`).

## Pricing

**$0.05 per minute** of open session, charged per second from the session seconds OpenAI reports. Idle and muted time is billed; close the session when the conversation ends. The live price is in [`GET /v1/realtime/models`](../#listing-models-and-prices).

## Code Example

Starts a session, streams 10 seconds of audio (silence here, in 100 ms chunks), then closes it in order and prints the billed seconds.

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

With the official OpenAI Node.js SDK, create the client with `baseURL: "https://api.aimlapi.com/v1"` and open the session with its `LiveWS` class; the events are the same.
