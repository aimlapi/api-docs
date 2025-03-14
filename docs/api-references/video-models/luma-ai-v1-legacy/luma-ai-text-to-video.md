---
description: 'Description for Luma AI Text-to-Video model: Pricing, API Reference, Examples.'
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Text-to-Video v1 (legacy)

{% hint style="info" %}
Here is our backward-compatible support for the older Luma AI API.
{% endhint %}

## Overview

The Luma AI Dream Machine API allows developers to generate, retrieve, and extend AI-generated content using a variety of inputs. This API is particularly useful for creative applications, such as generating visual content from text prompts.

Each generation costs <kbd><mark style="background-color:blue;">500 000<mark style="background-color:blue;"></kbd> AI/ML Tokens.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

Generating a video using this model involves making two sequential API calls:

* The first one is for creating and sending a video generation task to the server (returns a generation ID). This can be either a generation from a reference image/prompt or a video extension operation that adds length to an existing video.
* The second one is for requesting the generated or extended video from the server using the generation ID received from the first endpoint.

Below, you can find three corresponding API schemas and examples for all endpoint calls.

## API Schemas

{% hint style="info" %}
Ensure you replace `<YOUR_AIMLAPI_KEY>` with your actual API key before running the code.
{% endhint %}

### Generate Video

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/luma-ai/generations" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Example

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
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
  "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())

```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const axios = require('axios');

const url = "https://api.aimlapi.com/luma-ai/generations";

const payload = {
  aspect_ratio: "16:9",
  expand_prompt: true,
  user_prompt: "Flying jellyfish"
};

const headers = {
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
  "content-type": "application/json"
};

axios.post(url, payload, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```
{% endtab %}
{% endtabs %}

### Fetch Generations

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/luma-ai/generation" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/luma-ai/generation"

querystring = {"ids[0]":"4c9126f3-d9a6-4eaf-aa4c-b64b634f65bd"}

headers = {
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
  "content-type": "application/json"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())

```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const axios = require('axios');

const url = "https://api.aimlapi.com/luma-ai/generation";

const params = {
  "ids[0]": "4c9126f3-d9a6-4eaf-aa4c-b64b634f65bd"
};

const headers = {
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
  "content-type": "application/json"
};

axios.get(url, { headers, params })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```
{% endcode %}
{% endtab %}
{% endtabs %}

### Extend Video

Extend allows you to effortlessly add length to an existing video.

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/luma-ai/generations/{taskId}/extend" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

url = "https://api.aimlapi.com/luma-ai/generations/57a6cb80-6da0-49bd-b29a-3f089b9e55e4/extend"

payload = {
  "aspect_ratio": "16:9",
  "expand_prompt": True,
  "user_prompt": "Flying jellyfish with a hat"
}
headers = {
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
  "content-type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())

```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const axios = require('axios');

const url = "https://api.aimlapi.com/luma-ai/generations/57a6cb80-6da0-49bd-b29a-3f089b9e55e4/extend";

const payload = {
  aspect_ratio: "16:9",
  expand_prompt: true,
  user_prompt: "Flying jellyfish with a hat"
};

const headers = {
  "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
  "content-type": "application/json"
};

axios.post(url, payload, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

```
{% endcode %}
{% endtab %}
{% endtabs %}
