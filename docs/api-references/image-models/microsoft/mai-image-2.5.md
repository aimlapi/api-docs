# MAI-Image 2.5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `microsoft/mai-image-2.5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/microsoft/mai-image-2.5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

MAI-Image 2.5 — image generation model from Microsoft. Produces photorealistic and artistic images from text prompts with support for multiple aspect ratios.

## Setup your API Key

If you don't have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="microsoft-mai-image-2-5" path="/v1/images/generations" method="post" %}
[OpenAPI microsoft-mai-image-2-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/microsoft/mai-image-2.5.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image using a simple text prompt.

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
            "model": "microsoft/mai-image-2.5",
            "prompt": "A futuristic city at night with neon lights reflecting on wet streets",
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
        model: 'microsoft/mai-image-2.5',
        prompt: 'A futuristic city at night with neon lights reflecting on wet streets',
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
  "created": 1780519847349,
  "data": [
    {
      "url": "https://cdn.aimlapi.com/generations/openai-image-generation/1780519847349-43113302-c43a-4d84-9e32-083f33830b44.png"
    }
  ],
  "meta": {
    "usage": {
      "credits_used": 125367,
      "usd_spent": 0.0626835
    }
  }
}
```
{% endcode %}

</details>

We obtained the following image by running this code example:

<figure><img src="https://cdn.aimlapi.com/generations/openai-image-generation/1780519847349-43113302-c43a-4d84-9e32-083f33830b44.png" alt=""><figcaption><p><code>"A futuristic city at night with neon lights reflecting on wet streets"</code></p></figcaption></figure>
