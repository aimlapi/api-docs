# Gemini 3.8 Live

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3.8-live`

Alias: `gemini-3.8-live`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Google's Live API model for real-time voice and video conversations: it takes streamed speech, text and camera or screen frames, and answers with speech or text, with function calling. Sessions speak Google's Gemini Live protocol, so the official Google GenAI SDKs work with only the base URL changed.

General information about realtime sessions (authentication, client secrets, billing, limits, close codes) is on the [Realtime Models](../) overview page.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

## Protocol and endpoint

| | |
| --- | --- |
| Protocol | Gemini Live (`BidiGenerateContent`), compatible with the official Google GenAI SDKs (`client.aio.live.connect` in Python, `ai.live.connect` in JavaScript) |
| SDK base URL | `https://api.aimlapi.com` |
| Server endpoint (API key) | `wss://api.aimlapi.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent` (`v1alpha` also works), with the key in `x-goog-api-key` or `Authorization: Bearer` |
| Client secret endpoint | `wss://api.aimlapi.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained` (`v1beta` also works), with the secret as `access_token` or in `Authorization: Token` |
| Max session length | 10 minutes |
| Idle timeout | 300 seconds without any client message |

The model is named in the first `setup` message, which must arrive within 10 seconds of connecting. Accepted forms: `gemini-3.8-live`, `google/gemini-3.8-live`, `models/gemini-3.8-live`, `models/google/gemini-3.8-live`. Another model, or another first message, closes the session with `1008 invalid_first_frame`. The `setup` is sent once.

{% hint style="warning" %}
**JavaScript SDK:** with a plain API key, `@google/genai` sends the key in the URL (`?key=`), which is refused (`400 credential_in_query`). From JavaScript, mint a [client secret](../#browsers-client-secrets) on your server and pass it to the SDK as its API key with `apiVersion: "v1alpha"`, as in the example below. The Python SDK sends the key in a header and works with either.
{% endhint %}

Client secrets for this model are minted with `{"session": {"model": "google/gemini-3.8-live"}}`, come in the form `auth_tokens/aiml_ek_…`, and are valid for at most 60 seconds.

### Client messages

`setup` (first message only), `clientContent` (`turns`, `turnComplete`), `realtimeInput` (`audio`, `video`, `text`, `activityStart`, `activityEnd`, `audioStreamEnd`), `toolResponse` (`functionResponses`). Field names may be camelCase or snake_case.

| Input | Accepted |
| --- | --- |
| Audio | Raw 16-bit PCM at 16 kHz (`audio/pcm` or `audio/pcm;rate=16000`), up to 256 KiB per message |
| Images / video frames | `image/jpeg`, `image/png`, `image/webp`, up to 1 MiB each |
| Text | Up to 32,768 characters per part |

### `setup` options

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

### Platform rules

* **Context compression.** Past 32,000 tokens the conversation is compressed down to 16,000 tokens (your own `contextWindowCompression` is replaced).
* **No resumption.** A session ends at its 10-minute limit; resuming with a `sessionResumption.handle` is refused (`session_resumption_not_supported`). Open a new session instead.
* **Not available:** input audio transcription (`input_transcription_not_supported`), Google Search and every tool other than function declarations, `thinkingConfig`, avatar video and the `VIDEO` response modality, cloned or multi-speaker voices, `safetySettings`, `labels`, proactive audio, and `fileData` parts.

## Pricing

Billed **per turn**, from the token usage Google reports when the turn completes. Each turn is charged for the whole conversation context it re-reads plus its new input. There is no discount for cached input.

| Token type | USD per 1M tokens |
| --- | --- |
| Input text | 0.75 |
| Input audio | 3.00 |
| Input image / video | 1.00 |
| Output text (the answer, its reasoning and the output transcription) | 4.50 |
| Output audio | 12.00 |

If a turn ends without a usage report, it is charged by estimate: 25 tokens per second of audio in each direction. The live price is in [`GET /v1/realtime/models`](../#listing-models-and-prices).

## Code Example

One typed turn with a spoken answer, through the official Google GenAI SDKs.

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
