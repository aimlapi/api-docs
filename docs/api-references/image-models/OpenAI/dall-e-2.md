# DALL·E 2

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `dall-e-2`
{% endhint %}

## Model Overview

An advanced AI system designed to generate high-quality images and artwork from textual descriptions. It builds upon its predecessor, DALL·E 1, utilizing improved techniques to create images that are more realistic and contextually accurate.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="dall-e-2" path="/v1/images/generations" method="post" %}
[OpenAPI dall-e-2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/OpenAI/dall-e-2.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

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
            "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.",
            "model": "dall-e-2"
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
      model: 'dall-e-2',
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
      quality: 'hd'
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
  created: 1756972085,
  data: [
    {
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-5drZvxmo1TGoMx2jeKKGAGSh/user-eKr1xiaNRxSYqgKrXfgZzSAJ/img-lrG5yb73YupujdUiDfx1sUpo.png?st=2025-09-04T06%3A48%3A05Z&se=2025-09-04T08%3A48%3A05Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=0e2a3d55-e963-40c9-9c89-2a1aa28cb3ac&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-04T03%3A29%3A29Z&ske=2025-09-05T03%3A29%3A29Z&sks=b&skv=2024-08-04&sig=5mTzRo50JWr%2BuoqSOAXW9WZ0%2Bak93/rMwp2sZo3sLYE%3D'
    }
  ]
}
```
{% endcode %}

</details>

We obtained the following 1024x1024 image by running this code example:

<figure><img src="../../../.gitbook/assets/img-tCP6QhZjh49R4YFEEwrJPrtQ.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure>
