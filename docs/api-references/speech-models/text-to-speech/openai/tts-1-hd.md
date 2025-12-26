# TTS-1 HD

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/tts-1-hd`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/openai/tts-1-hd" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This model is designed for high quality text-to-speech generation.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="tts-1-hd" path="/v1/tts" method="post" %}
[OpenAPI tts-1-hd](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/OpenAI/tts-1-hd.json)
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
    "model": "openai/tts-1-hd",
    "text": "TTS-1 is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
    "voice": "coral",
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
  model: "openai/tts-1-hd",
  text: "TTS-1 is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
  voice: "coral",
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
Audio URL: https://cdn.aimlapi.com/generations/hedgehog/1760948051400-99effd93-a38a-43d5-b4e4-76b42afb6e67.mp3
```
{% endcode %}

</details>

Listen to the audio sample we generated:

{% embed url="https://drive.google.com/file/d/1d-FCR76Q9OXaVN3Or5txh_6sheEy_J4w/view?usp=sharing" %}
