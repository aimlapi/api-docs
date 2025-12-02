# Grok 2 Image

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `x-ai/grok-2-image`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/x-ai/grok-2-image" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

xAI’s flagship image generation model as of summer 2025, producing photorealistic visuals from text prompts.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="grok-2-image" path="/v1/images/generations" method="post" %}
[OpenAPI grok-2-image](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/xAI/grok-2-image.json)
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
            "model": "x-ai/grok-2-image",
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
      model: 'x-ai/grok-2-image',
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
  "data": [
    {
      "url": "https://cdn.aimlapi.com/xolmis/xai-imgen/xai-tmp-imgen-81fc6308-29a8-46c8-8d5a-16060c0724e8.jpeg",
      "revised_prompt": "A high-resolution photograph of a T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses. The T-Rex is facing slightly to the right, with its sunglasses clearly visible. The background features a calm ocean and a few palm trees, set during the day with natural, soft lighting. The beach is relatively empty, focusing attention on the T-Rex. There are no distracting elements like birds or other animals, ensuring the T-Rex remains the central figure in the composition. The overall mood is serene and tranquil, emphasizing the unusual yet peaceful scene."
    }
  ],
  "meta": {
    "usage": {
      "tokens_used": 147000
    }
  }
}
```
{% endcode %}

</details>

We obtained the following 720x960 image by running this code example:

<div align="left"><figure><img src="../../../.gitbook/assets/xai-tmp-imgen-81fc6308-29a8-46c8-8d5a-16060c0724e8.jpeg" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure></div>
