# qwen3-tts-flash

{% hint style="info" %}
This documentation is valid for the following model:

* `alibaba/qwen3-tts-flash`
{% endhint %}

The model offers a range of natural, human-like voices with support for multiple languages and dialects. It can produce multilingual speech in a consistent voice, adapting tone and intonation to deliver smooth, expressive narration even for complex text.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="qwen3-tts-flash" path="/v1/tts" method="post" %}
[OpenAPI qwen3-tts-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Alibaba-Cloud/qwen3-tts-flash.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

def main():
    url = "https://api.aimlapi.com/v1/tts"
    headers = {
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    }
    payload = { 
        "model": "alibaba/qwen3-tts-flash",
        "text": "Qwen3 Speech Synthesis offers a range of natural, human-like voices with support for multiple languages and dialects. It can produce multilingual speech in a consistent voice, adapting tone and intonation to deliver smooth, expressive narration even for complex text.",
        "voice": "Cherry"
    }

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "audio": {
    "url": "http://dashscope-result-sgp.oss-ap-southeast-1.aliyuncs.com/1d/18/20251022/cc0d532d/4adfa7be-08fe-4960-96c9-7dd866b24b48.wav?Expires=1761212494&OSSAccessKeyId=LTAI5tBLUzt9WaK89DU8aECd&Signature=CRyPQI%2BtVRQZSfjI5C5QH0VGDwU%3D"
  },
  "usage": {
    "characters": 267
  }
}
```
{% endcode %}

</details>

{% embed url="https://drive.google.com/file/d/15A-Ohkk2D0tDoTuYOOFDGAHrLiv0QUXt/view?usp=sharing" %}
