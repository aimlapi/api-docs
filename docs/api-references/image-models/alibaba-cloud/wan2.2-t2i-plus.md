# wan2.2-t2i-plus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/wan2.2-t2i-plus`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/wan2.2-t2i-plus" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The Professional edition of a text-to-image model, designed for high-quality image generation with rich detail.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="wan2-2-t2i-plus" path="/v1/images/generations" method="post" %}
[OpenAPI wan2-2-t2i-plus](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Alibaba-Cloud/wan2.2-t2i-plus.json)
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
            "model": "alibaba/wan2.2-t2i-plus",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "image_size": {
                "width": 1440,
                "height": 512
            },
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
      model: 'alibaba/wan2.2-t2i-plus',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      image_size: {
        width: 1440,
        height: 512
      },
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
  "created": 1769537248382,
  "data": [
    {
      "url": "https://cdn.aimlapi.com/alpaca/1d/6b/20260128/42f0a931/37d29071-c065-46c7-b5f5-42a2796957743542318529.png?Expires=1769623633&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=qCzOS4JIOE9Y3nuZLvlqm3NHBZU%3D"
    }
  ],
  "meta": {
    "usage": {
      "credits_used": 105000
    }
  }
}
```
{% endcode %}

</details>

We obtained the following 1440x512 image by running this code example:

<div align="left"><figure><img src="../../../.gitbook/assets/alibaba-wan2.2-t2i-plus_output.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure></div>
