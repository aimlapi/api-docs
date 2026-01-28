# octave-2

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `hume/octave-2`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/hume/octave-2" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

An advanced text-to-speech model with improved emotional understanding, support for 11 languages, and sub-200 ms audio generation. It provides more reliable pronunciation of complex and uncommon inputs.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="octave-2" path="/v1/tts" method="post" %}
[OpenAPI octave-2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Hume-AI/octave-2.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>" 
base_url = "https://api.aimlapi.com/v1"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}

data = {
    "model": "hume/octave-2",
    "text": "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
    "voice": "Relaxing ASMR Woman",
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
  model: "inworld/tts-1",
  text: "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
  voice: "Deborah",
};

const main = async () => {
  const response = await axios.post(`${baseURL}/tts`, data, { headers });
  console.log(response);
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
    "url": "https://cdn.aimlapi.com/generations/hippopotamus/1769604037348-b2b0235e-e813-462d-904e-632803a698b4.wav"
  },
  "meta": {
    "usage": {
      "credits_used": 12222
    }
  }
}
```
{% endcode %}

</details>

Listen to the audio sample we generated (\~ 1.8 s):

{% embed url="https://drive.google.com/file/d/1a4dW8Uz4VcxtOsgmcYF-ejzgMsGya0pP/view" %}
