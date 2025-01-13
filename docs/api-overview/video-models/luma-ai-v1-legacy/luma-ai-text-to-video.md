---
description: Generate Videos from Text or Images
icon: code
---

# Luma AI Text-to-Video

## Overview

The Luma AI Dream Machine API allows developers to generate, retrieve, and extend AI-generated content using a variety of inputs. This API is particularly useful for creative applications, such as generating visual content from text prompts.

## Authentication

All API requests require a Bearer token for authentication. Include your token in the `Authorization` header of each request.

## Pricing

Each generation costs 500 000 AI/ML Tokens

## API Reference

{% hint style="info" %}
Ensure you replace `"your-api-key"` with your actual API key before running the code.
{% endhint %}

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/luma-ai/generations" method="post" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

### Example

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

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/luma-ai/generation" method="get" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

### Example

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

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/luma-ai/generations/{taskId}/extend" method="post" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

### Example

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

