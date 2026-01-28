# Speech 2.5 HD Preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/speech-2-5-hd-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/speech-2-5-hd-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

A high-definition text-to-speech model with enhanced multilingual expressiveness, more precise voice replication, and expanded support for 40 languages.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Code Example

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
        "model": "minimax/speech-2.5-turbo-preview",
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
    model: "minimax/speech-2.5-hd-preview",
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

{% code overflow="wrap" %}
```
Audio saved to: c:\Users\user\Documents\Python Scripts\TTSes\your_file_name.wav
```
{% endcode %}

</details>

{% embed url="https://drive.google.com/file/d/1y1mFt6P-PTHRUW2Rzxkc2TRXR27XP9Gd/view?usp=sharing" %}

## API Schema

{% openapi-operation spec="speech-2-5-hd-preview" path="/v1/tts" method="post" %}
[OpenAPI speech-2-5-hd-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/MiniMax/speech-2.5-hd-preview.json)
{% endopenapi-operation %}
