# vibevoice-1.5b

{% hint style="info" %}
This documentation is valid for the following model: `microsoft/vibevoice-1.5b`
{% endhint %}

Designed to produce rich, multi-speaker conversations from text, the model is well-suited for podcasts and other long-form audio content.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="vibevoice-1-5b" path="/v1/tts" method="post" %}
[OpenAPI vibevoice-1-5b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Microsoft/vibevoice-1.5b.json)
{% endopenapi-operation %}

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
        "model": "microsoft/vibevoice-1.5b",
        "script": "Speaker 1: Wow, whats happening, Alice? \nSpeaker 2: Oh, just the usual… a full-blown AI revolution. Nothing to worry about",
        "speakers": [
            {   "preset": "Frank [EN]"   },
            {   "preset": "Alice [EN]"   }
        ]
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

```
Audio saved to: audio.wav
Duration: 8.4 seconds
Sample rate: 24000 Hz
```

</details>

Listen to the dialogue we generated:

{% embed url="https://drive.google.com/file/d/12Cfolhx2jx7QWWfUTNiuXYhPBBtqvdwh/view" %}
