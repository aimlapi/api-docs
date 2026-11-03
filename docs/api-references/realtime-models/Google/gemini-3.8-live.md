# Gemini 3.8 Live

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3.8-live`
* `gemini-3.8-live`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

Google's Live API model for real-time voice and video conversations: it takes streamed speech, text and camera or screen frames, and answers with speech or text, with function calling. Sessions speak Google's Gemini Live protocol, so the official Google GenAI SDKs work with only the base URL changed.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

The model is served over a WebSocket in the Gemini Live protocol. Client messages, billing, limits and errors are described in [Realtime Sessions](../../../capabilities/realtime-sessions.md#gemini-live).

| | |
| --- | --- |
| Connection URL (API key) | `wss://api.aimlapi.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent` (`v1alpha` also works), with the key in `x-goog-api-key` or `Authorization: Bearer` |
| Connection URL (client secret) | `wss://api.aimlapi.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained` (`v1beta` also works), with the secret as `access_token` or in `Authorization: Token` ([client secrets](../../../capabilities/realtime-sessions.md#browsers-client-secrets)) |
| SDK base URL | `https://api.aimlapi.com` |
| JavaScript SDK | `@google/genai` sends a plain API key in the URL, which is refused (`400 credential_in_query`): pass a client secret as its API key with `apiVersion: "v1alpha"`, as in the example below |

Session options (`setup`, the first message, sent once within 10 seconds of connecting; `model` is `gemini-3.8-live`, `google/gemini-3.8-live`, `models/gemini-3.8-live` or `models/google/gemini-3.8-live`):

| Option | Values |
| --- | --- |
| `generationConfig.responseModalities` | `AUDIO` (default) and/or `TEXT` |
| `generationConfig.maxOutputTokens` | Kept between 1,024 and 4,096 (default 4,096); thinking counts inside it |
| `generationConfig.temperature`, `topP`, `topK`, `presencePenalty`, `frequencyPenalty`, `seed` | As in the Gemini API; `candidateCount` 1 only |
| `generationConfig.speechConfig` | `voiceConfig.prebuiltVoiceConfig.voiceName` (a prebuilt voice such as `Puck` or `Kore`), `languageCode` |
| `generationConfig.mediaResolution` | `MEDIA_RESOLUTION_LOW`, `_MEDIUM`, `_HIGH` |
| `systemInstruction` | Up to 8 text parts of 16,384 characters |
| `tools` | `functionDeclarations` only, up to 32 |
| `realtimeInputConfig` | `automaticActivityDetection`, `activityHandling`, `turnCoverage` |
| `outputAudioTranscription` | Transcript of the model's speech |
| `historyConfig.initialHistoryInClientContent` | `true` or `false` |

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
# pip install google-genai
import asyncio

from google import genai
from google.genai import types

client = genai.Client(
    # Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
    api_key="<YOUR_AIMLAPI_KEY>",
    http_options=types.HttpOptions(base_url="https://api.aimlapi.com"),
)


async def main():
    async with client.aio.live.connect(
        model="gemini-3.8-live",
        config=types.LiveConnectConfig(response_modalities=["AUDIO"]),
    ) as session:
        await session.send_client_content(
            turns=types.Content(role="user", parts=[types.Part(text="Say hi in two words.")]),
            turn_complete=True,
        )
        audio = bytearray()
        async for message in session.receive():
            if message.data:
                audio += message.data  # raw PCM16 audio from the model
            if message.usage_metadata:
                print("Usage:", message.usage_metadata)
            if message.server_content and message.server_content.turn_complete:
                break
        print(f"Received {len(audio)} bytes of audio")


asyncio.run(main())
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// npm i @google/genai
import { GoogleGenAI, Modality } from "@google/genai";

// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>.
// Mint this on your server; a browser receives only the secret.
const response = await fetch("https://api.aimlapi.com/v1/realtime/client_secrets", {
  method: "POST",
  headers: {
    Authorization: "Bearer <YOUR_AIMLAPI_KEY>",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ session: { model: "google/gemini-3.8-live" } }),
});
const { value: secret } = await response.json(); // "auth_tokens/aiml_ek_..."

const ai = new GoogleGenAI({
  apiKey: secret,
  httpOptions: { baseUrl: "https://api.aimlapi.com", apiVersion: "v1alpha" },
});

let done;
const turnComplete = new Promise((resolve) => (done = resolve));

const session = await ai.live.connect({
  model: "gemini-3.8-live",
  config: { responseModalities: [Modality.AUDIO] },
  callbacks: {
    onmessage: (message) => {
      if (message.usageMetadata) {
        console.log("Usage:", message.usageMetadata);
      }
      if (message.serverContent?.turnComplete) {
        done();
      }
    },
    onerror: (error) => console.error("Error:", error?.message ?? error),
    onclose: (event) => console.log("Closed", event?.code, event?.reason),
  },
});

session.sendClientContent({ turns: "Say hi in two words.", turnComplete: true });
await turnComplete;
session.close();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

The example sends one typed turn and collects the spoken answer (raw PCM16 audio) until the turn is complete. The Python version prints the token usage Google reports and the size of the received audio. Values in angle brackets are placeholders.

{% code overflow="wrap" %}
```
Usage: <the usage_metadata of the turn>
Received <N> bytes of audio
```
{% endcode %}

</details>
