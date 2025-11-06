# Speech 2.6 Turbo

{% hint style="info" %}
This documentation is valid for the following model:  &#x20;

* &#x20;`minimax/speech-2.6-turbo`
{% endhint %}

The model generates speech from text prompts and multiple voices, optimized for fast, low-latency synthesis.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Quick Code Example

Here is an example of generating an audio response to the user input provided in the `text` parameter.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import os
import requests


def main():
    url = "https://api.aimlapi.com/v1/tts"
    headers = {
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    }
    payload = {
        "model": " minimax/speech-2.6-turbo",
        "text": "Hi! What are you doing today?",
        "voice_setting": {
          "voice_id": "Wise_Woman"
        }
    }

    response = requests.post(url, headers=headers, json=payload, stream=True)
    dist = os.path.abspath("your_file_name.wav")

    with open(dist, "wb") as write_stream:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                write_stream.write(chunk)

    print("Audio saved to:", dist)


main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
import fs from "fs";
import path from "path";

async function main() {
  const url = "https://api.aimlapi.com/v1/tts";
  const payload = {
    model: " minimax/speech-2.6-turbo",
    text: "Hi! What are you doing today?",
    voice_setting: {
      voice_id: "Wise_Woman"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
      "Authorization": `Bearer <YOUR_AIMLAPI_KEY>`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  // Read response as ArrayBuffer and convert to Buffer
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save audio to file in the current working directory
  const dist = path.join(process.cwd(), "your_file_name.wav");
  fs.writeFileSync(dist, buffer);

  console.log("Audio saved to:", dist);
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```
Audio saved to: c:\Users\user\Documents\Python Scripts\TTSes\your_file_name.wav
```

</details>

**Generation time**: \~ 4.5 s.

{% embed url="https://drive.google.com/file/d/1r16yYPqHP5C1Y4Nsa3ks26XDsNvFkF9H/view" %}

## API Schema

{% openapi-operation spec="speech-2-6-turbo" path="/v1/tts" method="post" %}
[OpenAPI speech-2-6-turbo](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/MiniMax/speech-2.6-turbo.json)
{% endopenapi-operation %}
