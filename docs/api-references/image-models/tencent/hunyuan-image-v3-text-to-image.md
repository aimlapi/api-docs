# Hunyuan Image v3

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `hunyuan/hunyuan-image-v3-text-to-image`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/hunyuan/hunyuan-image-v3-text-to-image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An advanced capabilities of Hunyuan Image 3.0 to generate compelling visuals that seamlessly enhance and communicate your written content.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="hunyuan-image-v3-text-to-image" path="/v1/images/generations" method="post" %}
[OpenAPI hunyuan-image-v3-text-to-image](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Tencent/hunyuan-image-v3-text-to-image.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "hunyuan/hunyuan-image-v3-text-to-image",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "image_size": "landscape_16_9"
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
      model: 'hunyuan/hunyuan-image-v3-text-to-image',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses. Realistic photo.',
      image_size: 'landscape_16_9'
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
    "data": [
        {
            "url": "https://v3b.fal.media/files/b/lion/JdrvNguTlt29LmURRbKKN.png",
            "content_type": "image/png",
            "file_name": null,
            "file_size": null,
            "width": 1280,
            "height": 768
        }
    ],
    "meta": {
        "usage": {
            "tokens_used": 210000
        }
    }
}
```
{% endcode %}

</details>

We obtained the following 1280x768 image by running this code example:

<figure><img src="https://v3b.fal.media/files/b/lion/JdrvNguTlt29LmURRbKKN.png" alt=""><figcaption><p><code>A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.</code></p></figcaption></figure>
