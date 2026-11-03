# Grok Voice Think Fast 2.0

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-voice-think-fast-2.0`

Aliases: `grok-voice-think-fast-2.0`, `x-ai/grok-voice-latest`, `grok-voice-latest`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

xAI's voice agent model. It speaks the OpenAI Realtime event names with xAI's own session shape: a top-level `voice` and `turn_detection`, a choice of JSON or raw binary audio transport, a reasoning effort switch, pronunciation replacements, and scripted lines (`force_message`). It is billed by session duration.

`x-ai/grok-voice-latest` and `grok-voice-latest` are accepted as aliases and always open a session on `x-ai/grok-voice-think-fast-2.0`.

General information about realtime sessions (authentication, client secrets, billing, limits, close codes) is on the [Realtime Models](../) overview page.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

## Protocol and endpoint

| | |
| --- | --- |
| Protocol | xAI realtime voice (OpenAI Realtime event names, xAI session shape) |
| Server endpoint | `wss://api.aimlapi.com/v1/realtime?model=x-ai/grok-voice-think-fast-2.0` with `Authorization: Bearer <YOUR_AIMLAPI_KEY>` |
| Browser endpoint | The same URL, with subprotocols `realtime` and `openai-insecure-api-key.<client secret>` |
| Max session length | 60 minutes |
| Idle timeout | 120 seconds without any client message (a warning arrives at 100 seconds) |

### Client events

`session.update`, `input_audio_buffer.append`, `input_audio_buffer.commit`, `input_audio_buffer.clear`, `conversation.item.create`, `conversation.item.delete`, `conversation.item.truncate`, `response.create`, `response.cancel`.

A `conversation.item.create` accepts `message` items (text and audio parts), `function_call`, `function_call_output` (only as the answer to a function call of the session, once) and `force_message` (one assistant `output_text` line of up to 1,000 characters, spoken verbatim).

### Session options (`session.update`)

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

To send binary audio frames, first set `session.audio.input.transport` to `binary`; events are always JSON text frames.

### Platform rules

* **Server VAD only.** Push-to-talk (`turn_detection: null` or another type) is refused with `turn_detection_locked`, because it would change how xAI bills the session.
* **Not available:** xAI's server tools (`web_search`, `x_search`, `file_search`, remote `mcp`), session resumption (`resumption_not_supported`), custom voices (`unsupported_voice`), and changing the model of a running session (`model_locked`).
* **Text items per window.** Each 30-second billing window covers up to 10 text items; past that, a `conversation.item.create` gets an `error` event `text_item_limit` until the next window starts.

## Pricing

| What | Price |
| --- | --- |
| Session time | **$0.08 per minute**, charged per second of open session, idle time included |
| Each `conversation.item.create` you send (a `function_call_output` excepted) | **$0.004** |

The session time is measured by our clock from connection to close. The live price is in [`GET /v1/realtime/models`](../#listing-models-and-prices).

## Code Example

Sends one text message (billed as one text item) and prints the event types of the reply. A little audio is appended every few seconds as well, where a real client would stream the microphone.

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
