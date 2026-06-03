# MAI-Voice 2

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `microsoft/mai-voice-2`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/microsoft/mai-voice-2" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

MAI-Voice-2 — text-to-speech model from Microsoft. Generates natural and expressive speech with support for multiple languages, voices, and audio formats.

## Setup your API Key

If you don't have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="microsoft-mai-voice-2" path="/v1/tts" method="post" %}
[OpenAPI microsoft-mai-voice-2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/text-to-speech/microsoft/mai-voice-2.json)
{% endopenapi-operation %}

## Quick Example

Let's convert text to speech using MAI-Voice-2.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/tts",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "microsoft/mai-voice-2",
            "text": "Hello! This is a demo of Microsoft MAI-Voice-2 text to speech.",
            "voice": "en-US-AvaNeural",
        }
    )

    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
async function main() {
    const response = await fetch('https://api.aimlapi.com/v1/tts', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'microsoft/mai-voice-2',
        text: 'Hello! This is a demo of Microsoft MAI-Voice-2 text to speech.',
        voice: 'en-US-AvaNeural',
      }),
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "audio": {
    "url": "https://cdn.aimlapi.com/generations/hedgehog/1780519639675-af9220f1-4f1b-407f-8920-814e5d69b46c.mp3"
  },
  "meta": {
    "usage": {
      "credits_used": 3547,
      "usd_spent": 0.0017735
    }
  }
}
```
{% endcode %}

</details>
