# qwen-image

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen-image`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen-image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A high-performance image generation base model that can handle intricate text rendering and perform accurate image editing.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="qwen-image" path="/v1/images/generations" method="post" %}
[OpenAPI qwen-image](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Alibaba-Cloud/qwen-image.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% tabs %}
{% tab title="Python (AIMLAPI SDK)" %}
{% code overflow="wrap" %}
```python
# pip install aimlapi-sdk-python
from aimlapi import AIMLAPI

client = AIMLAPI(
    api_key="<YOUR_AIMLAPI_KEY>"
)

response = client.images.generate(
    model="alibaba/qwen-image",
    prompt="A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
)

print(response.model_dump_json(indent=2))
```
{% endcode %}
{% endtab %}

{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "alibaba/qwen-image",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
        }
    )

    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
    method: 'POST',
    headers: {
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'alibaba/qwen-image',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
    }),
  });

  const data = await response.json();
  console.log('Generation:', data);
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
{
  "created": 1772589140939,
  "background": null,
  "data": [
    {
      "b64_json": null,
      "revised_prompt": null,
      "url": "https://cdn.aimlapi.com/alpaca/7d/42/20260304/3966e7b0/a2702e5c-587b-4816-b0e9-2799a6cbc3871478259465.png?Expires=1773194933&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=iNxjg4p5f9ozi0U7kYeedVK1Wwg%3D"
    }
  ],
  "output_format": null,
  "quality": null,
  "size": null,
  "usage": null,
  "meta": {
    "usage": {
      "credits_used": 91000
    }
  }
}
```
{% endcode %}

</details>

We obtained the following 1024x768 image by running this code example:

<figure><img src="../../../.gitbook/assets/qwen-image.jpeg" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
