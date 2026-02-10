# inworld/tts-1-5-max

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `inworld/tts-1-5-max`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/inworld/tts-1-5-max" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

A text-to-speech model focused on maximum voice stability and expressiveness, suitable for high-quality production and narrative use cases.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="tts-1-5-max" path="/v1/tts" method="post" %}
[OpenAPI tts-1-5-max](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Inworld/tts-1-5-max.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>" 
base_url = "https://api.aimlapi.com/v1"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}

data = {
    "model": "inworld/tts-1-5-max",
    "text": "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
    "voice": "Timothy",
}

response = requests.post(f"{base_url}/tts", headers=headers, json=data)
response.raise_for_status()

result = response.json()
print(json.dumps(result, indent=2, ensure_ascii=False))
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
  model: "inworld/tts-1-5-max",
  text: "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
  voice: "Timothy",
};

const main = async () => {
  const response = await axios.post(`${baseURL}/tts`, data, { headers });
  console.log(response.data);
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
{
  "audio": {
    "url": "https://cdn.aimlapi.com/generations/hippopotamus/1770761823703-16ec44cb-bd8a-4e1c-916e-e198f71e93e0.wav"
  },
  "meta": {
    "usage": {
      "credits_used": 2522
    }
  }
}
```
{% endcode %}

</details>

Listen to the audio sample we generated (\~ 3.2 s):

{% embed url="https://drive.google.com/file/d/1VbpqLbsKf-cN9lZEXY_GNusihpbLZ8Xx/view?usp=sharing" %}
