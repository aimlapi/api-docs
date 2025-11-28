# aura 2

<details>

<summary>This documentation is valid for the following list of our models</summary>

{% hint style="info" %}
* \#g1\_aura-2-amalthea-en
* \#g1\_aura-2-andromeda-en
* \#g1\_aura-2-apollo-en
* \#g1\_aura-2-arcas-en
* \#g1\_aura-2-aries-en
* \#g1\_aura-2-asteria-en
* \#g1\_aura-2-athena-en
* \#g1\_aura-2-atlas-en
* \#g1\_aura-2-aurora-en
* \#g1\_aura-2-callista-en
* \#g1\_aura-2-cora-en
* \#g1\_aura-2-cordelia-en
* \#g1\_aura-2-delia-en
* \#g1\_aura-2-draco-en
* \#g1\_aura-2-electra-en
* \#g1\_aura-2-harmonia-en
* \#g1\_aura-2-helena-en
* \#g1\_aura-2-hera-en
* \#g1\_aura-2-hermes-en
* \#g1\_aura-2-hyperion-en
* \#g1\_aura-2-iris-en
* \#g1\_aura-2-janus-en
* \#g1\_aura-2-juno-en
* \#g1\_aura-2-jupiter-en
* \#g1\_aura-2-luna-en
* \#g1\_aura-2-mars-en
* \#g1\_aura-2-minerva-en
* \#g1\_aura-2-neptune-en
* \#g1\_aura-2-odysseus-en
* \#g1\_aura-2-ophelia-en
* \#g1\_aura-2-orion-en
* \#g1\_aura-2-orpheus-en
* \#g1\_aura-2-pandora-en
* \#g1\_aura-2-phoebe-en
* \#g1\_aura-2-pluto-en
* \#g1\_aura-2-saturn-en
* \#g1\_aura-2-selene-en
* \#g1\_aura-2-thalia-en
* \#g1\_aura-2-theia-en
* \#g1\_aura-2-vesta-en
* \#g1\_aura-2-zeus-en
* \#g1\_aura-2-celeste-es
* \#g1\_aura-2-estrella-es
* \#g1\_aura-2-nestor-es
{% endhint %}

</details>

## Model Overview

Aura 2 produces natural, human-like speech with accurate domain-specific pronunciation — covering drug names, legal terms, alphanumeric strings, and structured inputs such as dates, times, and currency. It also maintains sub-200 ms TTFB latency and offers cost-efficient scalability.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="aura-2" path="/v1/tts" method="post" %}
[OpenAPI aura-2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/Deepgram/aura-2.json)
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
        "model": "#g1_aura-2-helena-en",
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
  model: "#g1_aura-2-helena-en",
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

The generated audio:

{% embed url="https://drive.google.com/file/d/1NaJcoNwVNXGybIK64eMD9qSt9yR4-Nwp/view?usp=sharing" %}

***
