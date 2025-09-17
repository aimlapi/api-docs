# Seedream v4 Edit (Image-to-image)



{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/seedream-v4-edit`
{% endhint %}

## Model Overview

The model supports background replacement, object editing, style and color adjustments, lighting and texture enhancements, and artistic filters, while ensuring character consistency and allowing iterative refinement.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="seedream-v4-edit" path="/v1/images/generations" method="post" %}
[OpenAPI seedream-v4-edit](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/ByteDance/seedream-v4-edit.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/images/generations",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json",
    },
    json={
        "model":"bytedance/seedream-v4-edit",
        "prompt": "Add a crown to the T-rex's head.",
        "image_urls": [ 
             "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
  method: 'POST',
  headers: {
    // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'bytedance/seedream-v4-edit',
    prompt: 'Add a bird to the foreground of the photo.',
    image_urls: [
      'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png'
    ],        
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "images": [
    {
      "url": "https://v3b.fal.media/files/b/kangaroo/nHWHZmeMr-SL4R7uFtvq7_d54b8823cf784f67bcfa43993bdb2179.png",
      "content_type": "image/png",
      "file_name": "d54b8823cf784f67bcfa43993bdb2179.png",
      "file_size": 1033237,
      "width": null,
      "height": null
    }
  ],
  "seed": 623004765,
  "data": [
    {
      "url": "https://v3b.fal.media/files/b/kangaroo/nHWHZmeMr-SL4R7uFtvq7_d54b8823cf784f67bcfa43993bdb2179.png",
      "content_type": "image/png",
      "file_name": "d54b8823cf784f67bcfa43993bdb2179.png",
      "file_size": 1033237,
      "width": null,
      "height": null
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 63000
    }
  }
}
```
{% endcode %}

</details>

<table data-full-width="false"><thead><tr><th>Reference Image</th><th>Generated Image</th></tr></thead><tbody><tr><td><div><figure><img src="../../../.gitbook/assets/flux-dev-t-rex.png" alt=""><figcaption><p>(original)</p></figcaption></figure></div></td><td><div><figure><img src="../../../.gitbook/assets/nHWHZmeMr-SL4R7uFtvq7_d54b8823cf784f67bcfa43993bdb2179.jpg" alt=""><figcaption><p><code>"Add a bird to the foreground of the photo."</code></p></figcaption></figure></div></td></tr></tbody></table>
