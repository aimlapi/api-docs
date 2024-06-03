# API Reference

**Endpoints**

**Chat Completions**

* Endpoint: `POST /chat/completions`
* Description: Generate responses based on given prompts.

**Example Request in Python and JS**

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.aimlapi.com",
)

response = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    messages=[
        {
            "role": "system",
            "content": "You are an AI assistant who knows everything.",
        },
        {
            "role": "user",
            "content": "Tell me, why is the sky blue?"
        },
    ],
)

message = response.choices[0].message.content
print(f"Assistant: {message}")
```

<pre class="language-javascript"><code class="lang-javascript"><strong>const { Configuration, OpenAIApi } = require("openai");
</strong>
const configuration = new Configuration({
  apiKey: "YOUR_API_KEY",
  basePath: "https://api.aimlapi.com/",
});
const openai = new OpenAIApi(configuration);

async function run() {
  const response = await openai.createCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    prompt: "Tell me a joke",
    max_tokens: 50,
  });
  console.log(response.data.choices[0].text);
}

run();
</code></pre>

#### Image Generation

**Endpoint**: `POST /images/generate`\
**Description**: Generate images based on given prompts.

**Example Request in Python and JS**

```python
import requests
import base64


def main():
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
    }

    payload = {
        "prompt": "Hyperrealistic art featuring a cat in costume.",
        "model": "stabilityai/stable-diffusion-2-1",
    }

    response = requests.post(
        "https://api.aimlapi.com/images/generations", headers=headers, json=payload
    )

    image_base64 = response.json()["output"]["choices"][0]["image_base64"]
    image_data = base64.b64decode(image_base64)

    with open("./image.png", "wb") as file:
        file.write(image_data)


main()
```

```javascript
const axios = require('axios');
const fs = require('fs');

const url = 'https://api.aimlapi.com/images/generate';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
const payload = {
  'model': 'dalle-mini',
  'prompt': 'A sunset over a mountain range'
};

axios.post(url, payload, { headers: headers })
  .then(response => {
    fs.writeFileSync('output.png', response.data, 'binary');
  })
  .catch(error => {
    console.error(error);
  });
```

**Speech to Text**

* Endpoint: `POST api.aimlapi.com/stt`
* Description: Convert audio files to text.

Example Request (JS):

```javascript
const axios = require('axios');

const url = 'https://api.aimlapi.com/stt';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
const payload = {
  'model': 'g1_nova-2-general',
  'url': 'https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3'
};

axios.post(url, payload, { headers: headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

Example Request (Python):

```python
import requests

url = "https://api.aimlapi.com/stt"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "model": "#g1_nova-2-general",
    "url": "https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3"
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

**Text to Speech**

* Endpoint: `POST api.aimlapi.com/tts`
* Description: Convert text to audio.
* Example Request (JS):

```javascript
const axios = require('axios');
const fs = require('fs');

const url = 'https://api.aimlapi.com/tts';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
const payload = {
  'model': 'g1_aura-asteria-en',
  'text': 'Hi! I\'m your friendly assistant.'
};

axios.post(url, payload, { headers: headers, responseType: 'arraybuffer' })
  .then(response => {
    fs.writeFileSync('output.wav', response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

Example Request (Python):

<pre class="language-python"><code class="lang-python"><strong>import requests
</strong>
url = "https://api.aimlapi.com/tts"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "model": "#g1_aura-asteria-en",
    "text": "Hi! I'm your friendly assistant."
}
response = requests.post(url, json=payload, headers=headers)
with open("output.wav", "wb") as file:
    file.write(response.content)
</code></pre>

**Response Structure**

**Common Response Fields**

* `id`: Unique identifier for the request.
* `object`: Type of object returned.
* `created`: Timestamp of the request.
* `model`: Model used for the request.
* `choices`: List of completion choices.
* `usage`: Token usage information.

Example Response (Chat Completion):

```json
{
  "id": "cmpl-2zKST3SO0NMoQ",
  "object": "text_completion",
  "created": 1615241840,
  "model": "mistralai/Mistral-7B-Instruct-v0.2",
  "choices": [
    {
      "text": "\n\nSure! Here's a joke for you: Why don't scientists trust atoms? Because they make up everything!",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 23,
    "total_tokens": 28
  }
}
```
