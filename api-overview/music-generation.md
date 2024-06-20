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

* **Audio Files**: 2 audio files will be generated for each request, consuming a total of 10 credits.
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

* **Audio Files**: 2 audio files will be generated for each request, consuming a total of 10 credits.
*   **wait\_audio**:

    * By default (`false`), the request operates in background mode, returning only audio task information. You must call the get API to retrieve detailed audio information.
    * If set to `true`, it simulates synchronous mode, waiting up to 100 seconds for audio generation, and directly returns the audio link and other information. Recommended for use in GPTs and other agents.



**Example Request (Python)**

```python
import requests

url = "https://api.aimlapi.com/custom_generate"
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

const url = 'https://api.aimlapi.com/custom_generate';
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

## **Extend Audio Length**

**Endpoint**: `POST /extend_audio`

**Description**: Extend the length of an existing audio file using the Suno v3.5 model.

**Example Request (Python)**

```python
import requests

url = "https://api.aimlapi.com/extend_audio"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "audio_id": "ID",
    "prompt": "Continue the relaxing ambient music",
    "continue_at": "109.96",
    "title": "Extended Ambient Track",
    "tags": "ambient, relaxing"
}
response = requests.post(url, json=payload, headers=headers)
print(response.content)

```

**Example Request (Node.js)**

```javascript
const axios = require('axios');

const url = 'https://api.aimlapi.com/extend_audio';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
const payload = {
  'audio_id': 'ID',
  'prompt': 'Continue the relaxing ambient music',
  'continue_at': '109.96',
  'title': 'Extended Ambient Track',
  'tags': 'ambient, relaxing'
};

axios.post(url, payload, { headers: headers, responseType: 'arraybuffer' })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

```

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
