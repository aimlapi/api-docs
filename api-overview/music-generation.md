---
description: Music Generation with Suno v3.5
---

# Music Generation

#### Key Features

* **High-Quality Music Generation**: Create music tracks based on descriptive prompts.
* **Flexible Integration**: Compatible with various programming languages and frameworks.

#### Endpoints for Music Generation

## **Generate Music by Prompt**

**Endpoint**: `POST /generate`

**Description**: Generate music based on a given text prompt using the Suno v3.5 model. Available models include `chirp-v3-5` and `chirp-v3-0`. This endpoint will automatically fill in the lyrics.

* **Audio Files**: 2 audio files will be generated for each request, consuming a total of 200 000 AI/ML Tokens.
* **wait\_audio**:
  * By default (`false`), the request operates in background mode, returning only audio task information. You must call the get API to retrieve detailed audio information.
  * If set to `true`, it simulates synchronous mode, waiting up to 100 seconds for audio generation, and directly returns the audio link and other information. Recommended for use in GPTs and other agents.

**Example Request (Python)**

```python
import requests

url = "https://api.aimlapi.com/generate"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "prompt": "Create a relaxing ambient music track",
    "make_instrumental": True,
    "wait_audio": True
}
response = requests.post(url, json=payload, headers=headers)
print(response.content)

```

**Example Request (Node.js)**

```javascript
const axios = require('axios');

const url = 'https://api.aimlapi.com/generate';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
const payload = {
  'prompt': 'Create a relaxing ambient music track',
  'make_instrumental': true,
  'wait_audio': true
};

axios.post(url, payload, { headers: headers, responseType: 'arraybuffer' })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

```

## **Generate Music in Custom Mode**

**Endpoint**: `POST /custom_generate`

**Description**: Generate music with custom settings using the Suno v3.5 model. Available models include `chirp-v3-5` and `chirp-v3-0`.

* **Audio Files**: 2 audio files will be generated for each request, consuming a total of 200 000 AI/ML Tokens.
*   **wait\_audio**:

    * By default (`false`), the request operates in background mode, returning only audio task information. You must call the get API to retrieve detailed audio information.
    * If set to `true`, it simulates synchronous mode, waiting up to 100 seconds for audio generation, and directly returns the audio link and other information. Recommended for use in GPTs and other agents.



**Example Request (Python)**

```python
import requests

url = "https://api.aimlapi.com/generate/custom-mode"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "prompt": "Create an energetic dance music track",
    "tags": "dance, energetic",
    "title": "Dance Track",
    "make_instrumental": False,
    "wait_audio": True
}
response = requests.post(url, json=payload, headers=headers)
print(response.content)

```

**Example Request (Node.js)**

```javascript
const axios = require('axios');

const url = 'https://api.aimlapi.com/generate/custom-mode';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
const payload = {
  'prompt': 'Create an energetic dance music track',
  'tags': 'dance, energetic',
  'title': 'Dance Track',
  'make_instrumental': false,
  'wait_audio': true
};

axios.post(url, payload, { headers: headers, responseType: 'arraybuffer' })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

```

In order to generate music with your own lyrics use \[Verse], \[Chorus], \[Bridge] indicators in the prompt as shown in the example below

{% code overflow="wrap" %}
```json

{
    "prompt": "[Verse 1]\nCruel flames of war engulf this land\nBattlefields filled with death and dread\nInnocent souls in darkness, they rest\nMy heart trembles in this silent test\n\n[Verse 2]\nPeople weep for loved ones lost\nBattered bodies bear the cost\nSeeking peace and hope once known\nOur grief transforms to hearts of stone\n\n[Chorus]\nSilent battlegrounds, no birds' song\nShadows of war, where we don't belong\nMay flowers of peace bloom in this place\nLet's guard this precious dream with grace\n\n[Bridge]\nThrough the ashes, we will rise\nHand in hand, towards peaceful skies\nNo more sorrow, no more pain\nTogether, we'll break these chains\n\n[Chorus]\nSilent battlegrounds, no birds' song\nShadows of war, where we don't belong\nMay flowers of peace bloom in this place\nLet's guard this precious dream with grace\n\n[Outro]\nIn unity, our strength will grow\nA brighter future, we'll soon know\nFrom the ruins, hope will spring\nA new dawn, we'll together bring",
    "tags": "pop metal male melancholic",
    "title": "Silent Battlefield",
    "make_instrumental": false,
    "wait_audio": true
}

```
{% endcode %}

## Fetch Music Generation Details

**Endpoint**: `GET /`

**Description**: Fetch details of generated music using its ID.

**Example Request (Python)**

```python
import requests

url = "https://api.aimlapi.com/?ids[0]=ID"
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
}
response = requests.get(url, headers=headers)

print(response.text)

```

**Example Request (Node.js)**

```javascript
const axios = require('axios');

const url = 'https://api.aimlapi.com/?ids[0]=ID';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_API_KEY'
};

axios.get(url, { headers: headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

```
