---
icon: code
---

# Generate an Audio

## Overview

* **High-Quality Music Generation**: Create music tracks based on descriptive prompts.
* **Flexible Integration**: Compatible with various programming languages and frameworks.

## Consumption

2 audio files will be generated for each request, consuming a total of 157 500 AI/ML Tokens.

## API Reference

{% swagger src="https://api-staging.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27" path="/generate" method="post" %}
[https://api-staging.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27](https://api-staging.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27)
{% endswagger %}

## Examples

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="Python" %}
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
{% endtab %}
{% endtabs %}
