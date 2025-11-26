# Seedream v4 (Text-to-Image)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/seedream-v4-text-to-image`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=bytedance/seedream-v4-text-to-image&#x26;mode=image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Ultra-fast, consistent in character rendering, and matching [Gemini 2.5 Flash Image (Nano Banana)](../google/gemini-2.5-flash-image.md) in quality.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="seedream-v4-text-to-image" path="/v1/images/generations" method="post" %}
[OpenAPI seedream-v4-text-to-image](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/ByteDance/seedream-v4-text-to-image.json)
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
            "model": "bytedance/seedream-v4-text-to-image",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "image_size": {
                "width": 4096,
                "height": 4096
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
      model: 'bytedance/seedream-3.0',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      image_size: {
        width: 4096,
        height: 4096
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
  "images": [
    {
      "url": "https://v3b.fal.media/files/b/lion/O0byJzpkMBsjWFUMSRelX_ae55fef23aa54a1cad92c3abdf8f5337.png",
      "content_type": "image/png",
      "file_name": "ae55fef23aa54a1cad92c3abdf8f5337.png",
      "file_size": 3282232,
      "width": null,
      "height": null
    }
  ],
  "seed": 1367947822,
  "data": [
    {
      "url": "https://v3b.fal.media/files/b/lion/O0byJzpkMBsjWFUMSRelX_ae55fef23aa54a1cad92c3abdf8f5337.png",
      "content_type": "image/png",
      "file_name": "ae55fef23aa54a1cad92c3abdf8f5337.png",
      "file_size": 3282232,
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

We obtained the following 4096x4096 image by running this code example:

<figure><img src="../../../.gitbook/assets/bytedance-seedream-v4-text-to-image_output.jpg" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure>
