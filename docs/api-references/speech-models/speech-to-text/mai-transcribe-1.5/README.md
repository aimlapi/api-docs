---
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# MAI-Transcribe 1.5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `microsoft/mai-transcribe-1.5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/microsoft/mai-transcribe-1.5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

MAI-Transcribe 1.5 — speech-to-text model from Microsoft. Supports multilingual transcription, automatic language detection, and punctuation restoration.

## Setup your API Key

If you don't have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

[OpenAPI microsoft--mai-transcribe-1-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/microsoft/mai-transcribe-1.5.json)

{% openapi-operation spec="microsoft-mai-transcribe-1-5" path="/v1/stt/create" method="post" %}
[OpenAPI microsoft-mai-transcribe-1-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/microsoft/mai-transcribe-1.5.json)
{% endopenapi-operation %}

## Quick Example

Let's transcribe an audio file using MAI-Transcribe 1.5.

{% tabs %}
{% tab title="Python" %}
```python
import requests
import json

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/stt/create",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "microsoft/mai-transcribe-1.5",
            "url": "https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3",
        }
    )

    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
```
{% endtab %}

{% tab title="JS" %}
```javascript
async function main() {
    const response = await fetch('https://api.aimlapi.com/v1/stt/create', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'microsoft/mai-transcribe-1.5',
        url: 'https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3',
      }),
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json5
// Insert real response here after testing in Playground
```

</details>
