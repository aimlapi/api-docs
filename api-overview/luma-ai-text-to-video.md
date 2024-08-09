---
description: Generate Videos from Text or Images
---

# Luma AI Text-to-Video

The Luma AI Dream Machine API allows developers to generate, retrieve, and extend AI-generated content using a variety of inputs. This API is particularly useful for creative applications, such as generating visual content from text prompts.

## Authentication

All API requests require a Bearer token for authentication. Include your token in the `Authorization` header of each request.

## Pricing

Each generation costs 500 000 AI/ML Tokens

## Endpoints

### 1. Generate Content

**Endpoint:** `POST /luma-ai/generations`

This endpoint allows you to generate content based on a user-defined prompt.

**Request Parameters:**

* `aspect_ratio` (string, optional): Specify the aspect ratio for the generated content (e.g., `16:9`).
* `expand_prompt` (boolean, optional): If `True`, the system will expand the given prompt for more creative outputs.
* `user_prompt` (string, required): The text prompt describing the content to be generated.

**Example:**

{% tabs %}
{% tab title="Python" %}
```python
import requests

url = "https://api.aimlapi.com/luma-ai/generations"

payload = {
  "aspect_ratio": "16:9",
  "expand_prompt": True,
  "user_prompt": "Flying jellyfish"
}
headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())

```
{% endtab %}

{% tab title="JS" %}
```javascript
const axios = require('axios');

const url = "https://api.aimlapi.com/luma-ai/generations";

const payload = {
  aspect_ratio: "16:9",
  expand_prompt: true,
  user_prompt: "Flying jellyfish"
};

const headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
};

axios.post(url, payload, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```
{% endtab %}
{% endtabs %}

### 2. Retrieve Generated Content

**Endpoint:** `GET /luma-ai/generation`

This endpoint retrieves previously generated content using its unique ID.

**Request Parameters:**

* `ids[]` (string, required): The unique ID of the content you wish to retrieve.

**Example:**

{% tabs %}
{% tab title="Python" %}
```python
import requests

url = "https://api.aimlapi.com/luma-ai/generation"

querystring = {"ids[0]":"4c9126f3-d9a6-4eaf-aa4c-b64b634f65bd"}

headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())

```
{% endtab %}

{% tab title="JS" %}
```javascript
const axios = require('axios');

const url = "https://api.aimlapi.com/luma-ai/generation";

const params = {
  "ids[0]": "4c9126f3-d9a6-4eaf-aa4c-b64b634f65bd"
};

const headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
};

axios.get(url, { headers, params })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```
{% endtab %}
{% endtabs %}

### 3. Upload Image for Generation

**Endpoint:** `POST /luma-ai/generations/file-upload`

This endpoint allows you to upload an image for generating content based on the image's context.

**Request Parameters:**

* `url` (string, required): The URL of the image to be uploaded.

{% tabs %}
{% tab title="Python" %}
```python
import requests

url = "https://api.aimlapi.com/luma-ai/generations/file-upload"

payload = { "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDozQhfHZ0SUoYPxSsIp7FXZmwHcSBijueGg&s" }
headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())

```
{% endtab %}

{% tab title="JS" %}
```javascript
const axios = require('axios');

const url = "https://api.aimlapi.com/luma-ai/generations/file-upload";

const payload = { 
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDozQhfHZ0SUoYPxSsIp7FXZmwHcSBijueGg&s" 
};

const headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
};

axios.post(url, payload, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```
{% endtab %}
{% endtabs %}

### 4. Extend Generated Content

**Endpoint:** `POST /luma-ai/generations/{id}/extend`

This endpoint extends or modifies previously generated content by providing additional prompts.

**Request Parameters:**

* `id` (string, required): The unique ID of the content to extend.
* `aspect_ratio` (string, optional): Specify the aspect ratio for the extended content (e.g., `16:9`).
* `expand_prompt` (boolean, optional): If `True`, the system will further expand the prompt.
* `user_prompt` (string, required): The additional prompt for extending the content

{% tabs %}
{% tab title="Python" %}
```python
import requests

url = "https://api.aimlapi.com/luma-ai/generations/57a6cb80-6da0-49bd-b29a-3f089b9e55e4/extend"

payload = {
  "aspect_ratio": "16:9",
  "expand_prompt": True,
  "user_prompt": "Flying jellyfish with a hat"
}
headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())

```
{% endtab %}

{% tab title="JS" %}
```javascript
const axios = require('axios');

const url = "https://api.aimlapi.com/luma-ai/generations/57a6cb80-6da0-49bd-b29a-3f089b9e55e4/extend";

const payload = {
  aspect_ratio: "16:9",
  expand_prompt: true,
  user_prompt: "Flying jellyfish with a hat"
};

const headers = {
  "Authorization": "Bearer your-api-key",
  "content-type": "application/json"
};

axios.post(url, payload, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```
{% endtab %}
{% endtabs %}

Ensure you replace `"your-api-key"` with your actual API key before running the code.

