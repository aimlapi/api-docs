# qwen3-tts-flash

{% hint style="info" %}
This documentation is valid for the following model: &#x20;

* &#x20;`alibaba/qwen3-tts-flash`
{% endhint %}

Qwen Speech Synthesis offers a range of natural, human-like voices with support for multiple languages and dialects. It can produce multilingual speech in a consistent voice, adapting tone and intonation to deliver smooth, expressive narration even for complex text.

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
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    }
    payload = { 
        "model": "alibaba/qwen3-tts-flash",
        "text": "Qwen3 Speech Synthesis offers a range of natural, human-like voices with support for multiple languages and dialects. It can produce multilingual speech in a consistent voice, adapting tone and intonation to deliver smooth, expressive narration even for complex text.",
        "voice": "Cherry"
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        
        response_data = response.json()
        audio_url = response_data["audio"]["url"]
        file_name = response_data["audio"]["file_name"]
        
        audio_response = requests.get(audio_url, stream=True)
        audio_response.raise_for_status()
        
        # Save with the original file extension from the API
        # dist = os.path.join(os.path.dirname(__file__), file_name)  # if you run this code as a .py file
        dist = "audio.wav"  # if you run this code in Jupyter Notebook

        with open(dist, "wb") as write_stream:
            for chunk in audio_response.iter_content(chunk_size=8192):
                if chunk:
                    write_stream.write(chunk)

        print("Audio saved to:", dist)
        print(f"Duration: {response_data['duration']} seconds")
        print(f"Sample rate: {response_data['sample_rate']} Hz")
        
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
    except Exception as e:
        print(f"Error: {e}")

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
        "url": "http://dashscope-result-sgp.oss-ap-southeast-1.aliyuncs.com/1d/4c/20251009/534f63ee/99d6a019-a643-4ea1-aa6b-305159fb5aad.wav?Expires=1760081011&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=zLYxBBu34wIrRbvSMX0LsIDv1F8%3D"
    },
    "usage": {
        "characters": 267
    }
}
```
{% endcode %}

</details>

## API Schema

{% openapi-operation spec="qwen3-tts-flash" path="/v1/tts" method="post" %}
[OpenAPI qwen3-tts-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Alibaba-Cloud/qwen3-tts-flash.json)
{% endopenapi-operation %}
