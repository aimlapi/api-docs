# inworld/tts-1

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `inworld/tts-1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/inworld/tts-1" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This model is designed for realtime text-to-speech generation.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="inworld-tts-1" path="/v1/tts" method="post" %}
[OpenAPI inworld-tts-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Inworld/tts-1.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>" 
base_url = "https://api.aimlapi.com/v1"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}

data = {
    "model": "inworld/tts-1",
    "text": "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
    "voice": "Deborah",
}

response = requests.post(f"{base_url}/tts", headers=headers, json=data)
response.raise_for_status()

result = response.json()

print("Audio URL:", result["audio"]["url"])
```
{% endcode %}
{% endtab %}

{% tab title="JaveScript" %}
{% code overflow="wrap" %}
```javascript
import axios from "axios";

// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
const apiKey = "<YOUR_API_KEY>";
const baseURL = "https://api.aimlapi.com/v1";

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const data = {
  model: "inworld/tts-1",
  text: "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
  voice: "Deborah",
};

const main = async () => {
  const response = await axios.post(`${baseURL}/tts`, data, { headers });
  console.log("Audio URL:", response.data.audio.url);
};

main().catch(console.error);
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```
Audio URL: https://cdn.aimlapi.com/generations/tts/inworld-tts-00f0415f-c7c5-4ee3-aa2f-7326a738bc87.mp3/1764327112283-f4bc65b8-415c-4388-9094-a5c80e7f7643.mp3
```
{% endcode %}

</details>

Listen to the audio sample we generated (\~ 3 s):

{% embed url="https://drive.google.com/file/d/1QTOQeHzLztjTgWlGq7CeaB2mDbRTmyvf/view" %}
