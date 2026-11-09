# Seed Audio 1.0

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/seed-audio-1-0`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/bytedance/seed-audio-1-0" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Seed Audio 1.0 is a non-streaming audio generation model for speech, sound effects, timbre control, and reference-guided audio creation.

## Setup your API Key

If you don't have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="seed-audio-1-0" path="/v1/tts" method="post" %}
[OpenAPI seed-audio-1-0](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/text-to-speech/ByteDance/seed-audio-1.0.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

def main():
    url = "https://api.aimlapi.com/v1/tts"
    headers = {
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    }
    payload = {
        "model": "bytedance/seed-audio-1-0",
        "text": "Cities of the future promise to radically transform how people live, work, and move.",
        "voice": "en-US-AvaNeural",
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()

        response_data = response.json()
        audio_url = response_data["audio"]["url"]

        audio_response = requests.get(audio_url, stream=True)
        audio_response.raise_for_status()

        # result = os.path.join(os.path.dirname(__file__), "audio.mp3")  # if you run this code as a .py file
        result = "audio.mp3"  # if you run this code in Jupyter Notebook

        with open(result, "wb") as write_stream:
            for chunk in audio_response.iter_content(chunk_size=8192):
                if chunk:
                    write_stream.write(chunk)

        print("Audio saved to:", result)

    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")

if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
const https = require("https");
const fs = require("fs");

// Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
const apiKey = "<YOUR_AIMLAPI_KEY>";

const data = JSON.stringify({
  model: "bytedance/seed-audio-1-0",
  text: "Cities of the future promise to radically transform how people live, work, and move.",
  voice: "en-US-AvaNeural",
});

const options = {
  hostname: "api.aimlapi.com",
  path: "/v1/tts",
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data),
  }
};

const req = https.request(options, (res) => {
  if (res.statusCode >= 400) {
    let error = "";
    res.on("data", chunk => error += chunk);
    res.on("end", () => console.error(`Error ${res.statusCode}:`, error));
    return;
  }

  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => {
    const audioUrl = JSON.parse(body).audio.url;

    https.get(audioUrl, (audioRes) => {
      const file = fs.createWriteStream("audio.mp3");
      audioRes.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Audio saved to audio.mp3");
      });
    });
  });
});

req.on("error", (e) => console.error("Request error:", e));
req.write(data);
req.end();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```
Audio saved to: audio.mp3
```

</details>
