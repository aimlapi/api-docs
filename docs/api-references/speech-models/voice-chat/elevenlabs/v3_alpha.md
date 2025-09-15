# v3\_alpha

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `elevenlabs/v3_alpha`
{% endhint %}

## Model Overview

The model supports a wide range of output formats and quality levels, text normalization, and over 70 languages.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### :digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](v3_alpha.md#quick-code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Provide your instructions via the `text` parameter and set the model voice in the `voice` parameter.&#x20;

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only  `text` and `voice` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](v3_alpha.md#api-schemas), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds 5 seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../../quickstart/setting-up.md).
{% endhint %}

</details>

## Quick Code Example

Here is an example of generating an audio response to the user input provided in the `text` parameter.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import os
import requests


def main():
    url = "https://api.aimlapi.com/v1/tts"
    headers = {
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    }
    payload = {
        "model": "elevenlabs/v3_alpha",
        "text": "Hi! What are you doing today?",
        "voice": "Alice"
    }

    response = requests.post(url, headers=headers, json=payload, stream=True)
    dist = os.path.abspath("audio.wav")

    with open(dist, "wb") as write_stream:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                write_stream.write(chunk)

    print("Audio saved to:", dist)


main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const fs = require('fs');
const path = require('path');
const url = 'https://api.aimlapi.com/v1/tts';

async function main() {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'elevenlabs/v3_alpha',
        text: 'Hi! What are you doing today?',
        voice: 'Alice'
      })
    });

    const dist = path.resolve(__dirname, 'audio.wav'); // Path to save audio
    const fileStream = fs.createWriteStream(dist);

    // Write audio stream to file
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fileStream.write(value);
    }
    fileStream.end();
    console.log('Audio saved to:', dist);
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Audio saved to: c:\Users\user\Documents\Python Scripts\AUDIOs\audio.wav
```
{% endcode %}

</details>

Listen to the audio response:

{% embed url="https://drive.google.com/file/d/1fAR1OVU26huTfgbhNq6KF205y3hCVgCR/view?usp=sharing" %}

## API Schemas

{% openapi-operation spec="v3-alpha" path="/v1/tts" method="post" %}
[OpenAPI v3-alpha](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/speech-models/ElevenLabs/v3_alpha.json)
{% endopenapi-operation %}
