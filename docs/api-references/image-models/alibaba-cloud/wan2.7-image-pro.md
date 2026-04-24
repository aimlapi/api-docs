# wan2.7-image-pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/wan-2-7-image-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/wan2-7-image-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A text-to-image and image-to-image generator in a single model, with multi-reference support.\
A more advanced and higher-cost model compared to [wan2.7-image](wan2.7-image.md).

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="wan2-7-image-pro" path="/v1/images/generations" method="post" %}
[OpenAPI wan2-7-image-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Alibaba-Cloud/wan2-7-image-pro.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image using two input images and a prompt that defines how they should be edited.

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
            "model": "alibaba/wan-2-7-image-pro",
            "prompt": "Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.",
            "image_urls": [
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",
                "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg"
            ]
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
      model: 'alibaba/wan-2-7-image-pro',
      prompt: 'Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.',
      image_urls: [
          "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png",
          "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/blue-mug.jpg"
      ]
    }),
  });

  const data = await response.json();
  console.log(data);
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
  "created": 1775596314468,
  "data": [
    {
      "url": "https://cdn.aimlapi.com/anaconda/1d/97/20260408/24cd1d9a/e779cb21-6ff7-400a-bfee-bfcc90ba8d2d_0.png?Expires=1775682713&OSSAccessKeyId=LTAI5tPxpiCM2hjmWrFXrym1&Signature=reWLCH4ho8P2PcCJ0X5M3iK%2FriI%3D"
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

<table data-full-width="true"><thead><tr><th width="442.0667724609375" valign="top">Reference Images</th><th valign="top">Generated Image</th></tr></thead><tbody><tr><td valign="top"><img src="../../../.gitbook/assets/t rex.png" alt="Image #1" data-size="original"></td><td valign="top"><img src="../../../.gitbook/assets/wan-2-7-image-pro_output.png" alt="&#x22;Combine the images so the T-Rex is wearing a business suit, sitting in a cozy small café, drinking from the mug. Blur the background slightly to create a bokeh effect.&#x22;" data-size="original"></td></tr><tr><td valign="top"><img src="../../../.gitbook/assets/blue mug.jpg" alt="Image #2" data-size="original"></td><td valign="top"></td></tr></tbody></table>
