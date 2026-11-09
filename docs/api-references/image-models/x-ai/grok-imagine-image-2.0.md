# Grok Imagine Image 2.0

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-imagine-image-2.0-2.0`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/x-ai/grok-imagine-image-2.0-2.0" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Grok Imagine Image 2.0 is the second generation of the xAI image model, for image generation and editing. It follows detailed instructions closely, renders small text and typography sharply, and edits from up to 5 reference images. Choose low or medium quality at 1K, 1.5K or 2K resolution.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

{% openapi-operation spec="grok-imagine-image-2-0" path="/v1/images/generations" method="post" %}
[OpenAPI grok-imagine-image-2-0](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/X-AI/grok-imagine-image-2.0.json)
{% endopenapi-operation %}

{% openapi-operation spec="grok-imagine-image-2-0-EDIT" path="/v1/images/edits" method="post" %}
[OpenAPI grok-imagine-image-2-0-EDIT](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/X-AI/grok-imagine-image-2.0-EDIT.json)
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
            "model": "x-ai/grok-imagine-image-2.0",
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
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
      model: 'x-ai/grok-imagine-image-2.0-2.0',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      aspect_ratio: '16:9'
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
  "data": [
    {
      "url": "https://cdn.aimlapi.com/xolmis/xai-imgen/xai-tmp-imgen-7d3be922-98a2-4cd2-b467-87e7dedc816e.png",
      "mime_type": "image/png",
      "revised_prompt": ""
    }
  ],
  "meta": {
    "usage": {
      "credits_used": 52000
    }
  }
}
```
{% endcode %}

</details>

We obtained the following 2816x1536 image by running this code example:
