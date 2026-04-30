# qwen-image-2.0-pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen-image-2-0-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/qwen-image-2-0-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An advanced text-to-image and image editing model. It supports high-quality generation and precise editing operations including text rendering and style transformations.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="qwen-image-2-0-pro" path="/v1/images/generations" method="post" %}
[OpenAPI qwen-image-2-0-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Alibaba-Cloud/qwen-image-2-0-pro.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% tabs %}
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
            "model": "alibaba/qwen-image-2-0-pro",
            "prompt": "Combine the images so the dino is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.",
            "image_urls": [
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg"
            ],
            "image_size": "landscape_4_3"
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
const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
  method: 'POST',
  headers: {
    // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'alibaba/qwen-image-2-0-pro',
    prompt: 'Combine the images so the dino is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.',
    image_urls: [
      'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',
      'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg'
    ],
    image_size: 'landscape_4_3'         
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
  "created": 1777512067915,
  "data": [
    {
      "url": "https://cdn.aimlapi.com/generations/alligator/1777512066857-61afe36f-4c6e-418b-b621-fba9dd33ca2a.png"
    }
  ],
  "meta": {
    "usage": {
      "credits_used": 195000,
      "usd_spent": 0.0975
    }
  }
}
```
{% endcode %}

</details>

<table data-full-width="true"><thead><tr><th width="442.0667724609375" valign="top">Reference Images</th><th valign="top">Generated Image</th></tr></thead><tbody><tr><td valign="top"><img src="../../../.gitbook/assets/t rex.png" alt="Image #1" data-size="original"></td><td valign="top"><img src="../../../.gitbook/assets/qwen-image-2.0-pro_output (1).png" alt="&#x22;Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.&#x22;" data-size="original"></td></tr><tr><td valign="top"><img src="../../../.gitbook/assets/blue mug.jpg" alt="Image #2" data-size="original"></td><td valign="top"></td></tr></tbody></table>
