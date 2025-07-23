# aura

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `#g1_aura-angus-en`
* `#g1_aura-arcas-en`
* `#g1_aura-asteria-en`
* `#g1_aura-athena-en`
* `#g1_aura-helios-en`
* `#g1_aura-hera-en`
* `#g1_aura-luna-en`
* `#g1_aura-orion-en`
* `#g1_aura-orpheus-en`
* `#g1_aura-perseus-en`
* `#g1_aura-stella-en`
* `#g1_aura-zeus-en`
{% endhint %}

## Model Overview

Deepgram Aura is the first text-to-speech (TTS) AI model designed for real-time, conversational AI agents and applications. It delivers human-like voice quality with unparalleled speed and efficiency. It has dozen natural, human-like voices with lower latency than any comparable voice AI alternative and supports seamless integration with Deepgram's industry-leading Nova speech-to-text API.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="aura-2025-05-28" path="/v1/tts" method="post" %}
[OpenAPI aura-2025-05-28](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/aura.json)
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
        "model": "#g1_aura-athena-en",
        "text": '''
        Cities of the future promise to radically transform how people live, work, and move. 
        Instead of sprawling layouts, we’ll see vertical structures that integrate residential, work, and public spaces into single, self-sustaining ecosystems. 
        Architecture will adapt to climate conditions, and buildings will be energy-efficient—generating power through solar panels, wind turbines, and even foot traffic.
    '''
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
  model: "#g1_aura-athena-en",
  text: `
Cities of the future promise to radically transform how people live, work, and move. 
Instead of sprawling layouts, we’ll see vertical structures that integrate residential, work, and public spaces into single, self-sustaining ecosystems. 
Architecture will adapt to climate conditions, and buildings will be energy-efficient—generating power through solar panels, wind turbines, and even foot traffic.
  `
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

{% embed url="https://drive.google.com/file/d/1DUlxcHSq4iZzDEVG1dbTLGJHMqeMlQpt/view?usp=sharing" %}
