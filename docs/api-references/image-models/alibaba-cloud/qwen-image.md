# qwen-image

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen-image`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=alibaba/qwen-image&#x26;mode=image" class="button primary">Try in Playground</a>
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
  "images": [
    {
      "url": "https://cdn.aimlapi.com/eagle/files/kangaroo/0WBwo2ruHEK9vpmtxu04G.jpeg",
      "width": 1024,
      "height": 768,
      "content_type": "image/jpeg"
    }
  ],
  "timings": {
    "inference": 5.732342581963167
  },
  "seed": 4128479875,
  "has_nsfw_concepts": [
    false
  ],
  "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."
}
```
{% endcode %}

</details>

We obtained the following 1024x768 image by running this code example:

<figure><img src="../../../.gitbook/assets/qwen-image.jpeg" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
