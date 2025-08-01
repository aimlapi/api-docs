# eleven\_multilingual\_v2

{% hint style="info" %}
This documentation is valid for the following model:  `elevenlabs/eleven_multilingual_v2`
{% endhint %}

## Model Overview

A high-quality text-to-speech model offering natural-sounding intonation, support for **29** languages, and a broad selection of built-in voices. A wide range of output audio formats and quality settings is also available.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="eleven-multilingual-v2" path="/v1/tts" method="post" %}
[OpenAPI eleven-multilingual-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/ElevenLabs/eleven_multilingual_v2.json)
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
         # Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    }
    payload = {
        "model": "elevenlabs/eleven_multilingual_v2",
        "text": '''
        Cities of the future promise to radically transform how people live, work, and move. 
        Instead of sprawling layouts, we’ll see vertical structures that integrate residential, work, and public spaces into single, self-sustaining ecosystems. 
        Architecture will adapt to climate conditions, and buildings will be energy-efficient—generating power through solar panels, wind turbines, and even foot traffic.
    ''',
        "voice": "Alice"
    }

    response = requests.post(url, headers=headers, json=payload, stream=True)
    # result = os.path.join(os.path.dirname(__file__), "audio.wav")  # if you run this code as a .py file
    result = "audio.wav"  # if you run this code in Jupyter Notebook    

    with open(result, "wb") as write_stream:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                write_stream.write(chunk)

    print("Audio saved to:", result)


main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const https = require("https");
const fs = require("fs");

// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
const apiKey = "<YOUR_AIMLAPI_KEY>";

const data = JSON.stringify({
  model: "elevenlabs/eleven_multilingual_v2",
  text: `
Cities of the future promise to radically transform how people live, work, and move. 
Instead of sprawling layouts, we’ll see vertical structures that integrate residential, work, and public spaces into single, self-sustaining ecosystems. 
Architecture will adapt to climate conditions, and buildings will be energy-efficient—generating power through solar panels, wind turbines, and even foot traffic.
  `,
  voice: "Giovanni",
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
    res.on("end", () => {
      console.error(`Error ${res.statusCode}:`, error);
    });
    return;
  }

  const file = fs.createWriteStream("audio.wav");
  res.pipe(file);

  file.on("finish", () => {
    file.close();
    console.log("Audio saved to audio.wav");
  });
});

req.on("error", (e) => {
  console.error("Request error:", e);
});

req.write(data);
req.end();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```
Audio saved to: audio.wav
```

</details>

{% embed url="https://drive.google.com/file/d/1RNL2QPkOXd9uoNp8q6uJesMLWx9Qa5YA/view?usp=sharing" %}
