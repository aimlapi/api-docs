# Imagen 4 Fast Generate

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/imagen-4.0-fast-generate-001`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/google/imagen-4-0-fast-generate-001" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview <a href="#model-overview" id="model-overview"></a>

This model is optimized for speed, offering faster image generation compared to other Imagen 4 variants like [Imagen 4 Generate 001](imagen-4-generate.md) (standard) and [Imagen 4 Ultra Generate 001](imagen-4-ultra-generate.md) (higher quality, slower).

## Setup your API Key <a href="#setup-your-api-key" id="setup-your-api-key"></a>

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="imagen-4-0-fast-generate-001" path="/v1/images/generations" method="post" %}
[OpenAPI imagen-4-0-fast-generate-001](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/Google/imagen-4.0-fast-generate-001.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified aspect ratio using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "prompt": "Racoon eating ice-cream",
            "model": "google/imagen-4.0-fast-generate-001",
            "aspect_ratio": "16:9"
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
      model: 'google/imagen-4.0-fast-generate-001',
      prompt: 'Racoon eating ice-cream',
      aspect_ratio: '16:9'
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
      "mime_type": "image/png",
      "url": "https://cdn.aimlapi.com/generations/guepard/1758236595733-514db8bc-7cba-4d7b-8d6b-237c20375995.png",
      "prompt": "A raccoon, with a mischievous grin, holds a melting cone of mint chocolate chip ice cream in its front paws, enjoying a warm summer day in a picturesque park. The sunlight creates a gentle, golden glow around the raccoon, illuminating the soft, fluffy fur. The cone is dripping with ice cream, creating a scene of playful chaos. A detailed, high-quality photo with a shallow depth of field, blurring the background foliage, creating a soft and dreamy aesthetic. The vibrant green trees and lush grass provide a beautiful and tranquil setting for the raccoon's treat."
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 42000
    }
  }
}
```
{% endcode %}

</details>

So we obtained the following 1408x768 image by running this code example:

<figure><img src="../../../.gitbook/assets/1758236595733-514db8bc-7cba-4d7b-8d6b-237c20375995.png" alt=""><figcaption><p>In reality, raccoons shouldn’t be given ice cream or chocolate—it’s harmful to their metabolism. <br>But in the AI world, raccoons party like there’s no tomorrow.</p></figcaption></figure>
