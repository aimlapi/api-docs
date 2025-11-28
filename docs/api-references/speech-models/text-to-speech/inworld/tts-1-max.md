# inworld/tts-1-max

{% hint style="info" %}
This documentation is valid for the following model:

* `inworld/tts-1-max`
{% endhint %}

This model is designed for realtime text-to-speech generation. A larger, more expressive variant of [inworld/tts-1](tts-1.md).

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="inworld-tts-1-max" path="/v1/tts" method="post" %}
[OpenAPI inworld-tts-1-max](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Inworld/tts-1-max.json)
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
    "model": "inworld/tts-1-max",
    "text": "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
    "voice": "Timothy",
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
  model: "inworld/tts-1-max",
  text: "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
  voice: "Timothy",
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
Audio URL: https://cdn.aimlapi.com/generations/tts/inworld-tts-fc718c97-12b3-42dc-919c-518c48ace59a.mp3/1764327592881-89e9ea63-935c-42d0-b769-8290ad769b7c.mp3
```
{% endcode %}

</details>

Listen to the audio sample we generated (\~ 3.2 s):

{% embed url="https://drive.google.com/file/d/1qPJZfzsvqsEliyVS9SZsjT-R6B_KFhNE/view" %}
