# wan2.5-t2i-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/wan2.5-t2i-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/wan2.5-t2i-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A text-to-image model capable of producing high-fidelity, visually accurate images.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="wan2-5-t2i-preview" path="/v1/images/generations" method="post" %}
[OpenAPI wan2-5-t2i-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Alibaba-Cloud/wan2.5-t2i-preview.json)
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
            "model": "alibaba/wan2.5-t2i-preview",
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
      model: 'alibaba/wan2.5-t2i-preview',
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
  "created": 1769537446493,
  "data": [
    {
      "url": "https://cdn.aimlapi.com/alpaca/1d/b0/20260128/f599ada6/50628345-4c1440df-86b3-464b-89f6-3c7b19611f6e.png?Expires=1769623835&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=CWLemI3Pnxxa9XzWGHblYHv9tvg%3D"
    }
  ],
  "meta": {
    "usage": {
      "credits_used": 63000
    }
  }
}
```
{% endcode %}

</details>

We obtained the following 1440x512 image by running this code example:

<div align="left"><figure><img src="../../../.gitbook/assets/alibaba-wan2.5-t2i-preview_output.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure></div>
