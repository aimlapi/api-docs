# Grok Voice Think Fast 2.0

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-voice-think-fast-2.0`
* `grok-voice-think-fast-2.0`
* `x-ai/grok-voice-latest`
* `grok-voice-latest`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

xAI's voice agent model. It speaks the OpenAI Realtime event names with xAI's own session shape and is billed by session duration; `x-ai/grok-voice-latest` and `grok-voice-latest` always open a session on `x-ai/grok-voice-think-fast-2.0`.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

The model is served over a WebSocket in the xAI realtime voice protocol. Client events, billing, limits and errors are described in [Realtime Sessions](../../../capabilities/realtime-sessions.md#xai-realtime-voice).

| | |
| --- | --- |
| Connection URL | `wss://api.aimlapi.com/v1/realtime?model=x-ai/grok-voice-think-fast-2.0` |
| Authentication | Server: `Authorization: Bearer <YOUR_AIMLAPI_KEY>`. Browser: subprotocols `realtime` and `openai-insecure-api-key.<client secret>` ([client secrets](../../../capabilities/realtime-sessions.md#browsers-client-secrets)) |

Session options (`session.update`):

| Option | Values |
| --- | --- |
| `instructions` | Up to 16,384 characters |
| `voice` | Built-in voices (case-insensitive): `eve`, `ara`, `leo`, `rex`, `sal`, `carina`, `zagan`, `helix`, `orion`, `luna`, `iris`, `altair`, `zenith`, `perseus`, `helios`, `lux`, `kepler`, `rigel`, `cosmo`, `celeste`, `ursa`, `sirius`, `lumen`, `castor`, `naksh`, `atlas` |
| `turn_detection` | `{"type": "server_vad"}`, optionally with `idle_timeout_ms` (1,000 – 600,000) |
| `reasoning.effort` | `high` or `none` |
| `replace` | Up to 100 pronunciation replacements, for example `{"Acme Mobile": "Acme Mobull"}` |
| `audio.input.format`, `audio.output.format` | `type`: `audio/pcm`, `audio/pcmu`, `audio/pcma`, `audio/opus`; `rate`: 8000, 11025, 16000, 22050, 24000, 32000, 44100 or 48000 |
| `audio.input.transport`, `audio.output.transport` | `json` (base64 in events) or `binary` (raw audio in binary WebSocket frames) |
| `audio.input.transcription` | `language_hint`, up to 100 `keyterms` |
| `audio.output.speed` | 0.7 – 1.5 |
| `tools` | Up to 32 function tools in xAI's shape: `{"type": "function", "function": {"name", "description", "parameters"}}` |

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
URL = "wss://api.aimlapi.com/v1/realtime?model=x-ai/grok-voice-think-fast-2.0"

# 100 ms of 24 kHz mono PCM16 silence; send real microphone audio instead.
SILENCE = base64.b64encode(bytes(4800)).decode()


async def keep_streaming(ws):
    while True:
        await ws.send(json.dumps({"type": "input_audio_buffer.append", "audio": SILENCE}))
        await asyncio.sleep(5)


async def main():
    async with websockets.connect(
        URL, additional_headers={"Authorization": f"Bearer {API_KEY}"}
    ) as ws:
        await ws.send(json.dumps({
            "type": "session.update",
            "session": {
                "instructions": "You are a friendly assistant. Answer briefly.",
                "voice": "eve",
                "turn_detection": {"type": "server_vad"},
            },
        }))
        streamer = asyncio.create_task(keep_streaming(ws))
        await ws.send(json.dumps({
            "type": "conversation.item.create",
            "item": {
                "type": "message",
                "role": "user",
                "content": [{"type": "input_text", "text": "Say hello in five words."}],
            },
        }))
        await ws.send(json.dumps({"type": "response.create"}))

        async for message in ws:
            event = json.loads(message)
            print(event["type"])
            if event["type"] == "response.done":
                break
            if event["type"] == "error":
                print("Error:", event["error"])
                break
        streamer.cancel()


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
const ws = new WebSocket(
  "wss://api.aimlapi.com/v1/realtime?model=x-ai/grok-voice-think-fast-2.0",
  { headers: { Authorization: `Bearer ${apiKey}` } },
);

let timer;

ws.on("open", () => {
  ws.send(JSON.stringify({
    type: "session.update",
    session: {
      instructions: "You are a friendly assistant. Answer briefly.",
      voice: "eve",
      turn_detection: { type: "server_vad" },
    },
  }));
  // 100 ms of 24 kHz mono PCM16 silence every 5 s; send real microphone audio instead.
  const silence = Buffer.alloc(4800).toString("base64");
  timer = setInterval(
    () => ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: silence })),
    5_000,
  );
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
  console.log(event.type);
  if (event.type === "response.done") {
    clearInterval(timer);
    ws.close();
  } else if (event.type === "error") {
    console.error("Error:", event.error);
  }
});
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

The example sends one text message (billed as one text item), appends a little audio every few seconds where a real client would stream the microphone, and prints the type of every server event until `response.done`. Values in angle brackets are placeholders.

{% code overflow="wrap" %}
```
<event type>
<event type>
...
response.done
```
{% endcode %}

</details>
