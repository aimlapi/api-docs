# Speech 2.8 Turbo

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/speech-2.8-turbo`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/speech-2-8-turbo" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

The model generates speech from text prompts and multiple voices, optimized for fast, low-latency synthesis.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="speech-2-8-turbo" path="/v1/tts" method="post" %}
[OpenAPI speech-2-8-turbo](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/MiniMax/speech-2.8-turbo.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

def main():
    url = "https://api.aimlapi.com/v1/tts"
    headers = {
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    }
    payload = {
        "model": "minimax/speech-2.6-turbo",
        "text": "Hi! What are you doing today?",
        "voice_setting": {
          "voice_id": "Wise_Woman"
        }
    }

    response = requests.post(url, headers=headers, json=payload, stream=True)
    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))

main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const url = "https://api.aimlapi.com/v1/tts";

  const payload = {
    model: "minimax/speech-2.6-turbo",
    text: "Hi! What are you doing today?",
    voice_setting: {
      voice_id: "Wise_Woman"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
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
    "url": "https://cdn.aimlapi.com/moose/audio%2Ftts-20260417164254-aCnjyyakIzQJdXcd.mp3?Expires=1776501775&OSSAccessKeyId=LTAI5tCpJNKCf5EkQHSuL9xg&Signature=e2Q40UIW6iy6Ye%2BSmxkVQ1Y3Q8w%3D"
  },
  "meta": {
    "usage": {
      "credits_used": 4524,
      "usd_spent": 0.002262
    }
  }
}
```
{% endcode %}

</details>

Listen to the audio sample we generated (\~ 2.2 s):

{% embed url="https://drive.google.com/file/d/1MCCM7XmkBTXyLLsX5X9bYPYybdR-jxoF/view?usp=sharing" %}
