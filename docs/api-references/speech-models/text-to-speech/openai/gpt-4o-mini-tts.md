# gpt-4o-mini-tts

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-4o-mini-tts`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/openai/gpt-4o-mini-tts" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

A text-to-speech model based on [GPT-4o mini](../../../text-models-llm/OpenAI/gpt-4o-mini.md), supporting up to 2,000 input tokens.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="gpt-4o-mini-tts" path="/v1/tts" method="post" %}
[OpenAPI gpt-4o-mini-tts](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/OpenAI/gpt-4o-mini-tts.json)
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
    "model": "openai/gpt-4o-mini-tts",
    "text": "GPT-4o-mini-tts is a small and fast model. Use it to convert text to natural sounding spoken text.",
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
  model: "openai/gpt-4o-mini-tts",
  text: "GPT-4o-mini-tts is a small and fast model. Use it to convert text to natural sounding spoken text.",
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
Audio URL: https://cdn.aimlapi.com/generations/hedgehog/1760948488200-5a500947-2ec2-41b5-b77b-4b75c7913aad.mp3
```
{% endcode %}

</details>

Listen to the audio sample we generated:

{% embed url="https://drive.google.com/file/d/1BhS3jXOt-Fhk3T_io9Mm0f5U-3kB0Srp/view?usp=sharing" %}
