# inworld/tts-1-5-mini

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `inworld/tts-1-5-mini`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/inworld/tts-1-5-mini" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

A low-latency text-to-speech model optimized for real-time and high-throughput scenarios while maintaining high audio quality.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="tts-1-5-mini" path="/v1/tts" method="post" %}
[OpenAPI tts-1-5-mini](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Inworld/tts-1-5-mini.json)
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
    "model": "inworld/tts-1-5-mini",
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
const data = {
  model: "inworld/tts-1-5-mini",
  text: "It is a fast and powerful language model. Use it to convert text to natural sounding spoken text.",
  voice: "Timothy"
};

async function main() {
  const response = await fetch(`https://api.aimlapi.com/v1/tts`, {
    method: "POST",
    headers: {
      // Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>
      Authorization: `Bearer <YOUR_AIMLAPI_KEY>`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const result = await response.json();
  console.log(result);
}

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
    "url": "https://cdn.aimlapi.com/generations/hippopotamus/1770761051591-d3803303-bea0-4d2b-9983-e439c76be7a0.wav"
  },
  "meta": {
    "usage": {
      "credits_used": 1261
    }
  }
}
```
{% endcode %}

</details>

Listen to the audio sample we generated (\~ 3.2 s):

{% embed url="https://drive.google.com/file/d/1GXrAwoR_3ATEyC_jo-WDCd5d0oQdZYb0/view?usp=sharing" %}
