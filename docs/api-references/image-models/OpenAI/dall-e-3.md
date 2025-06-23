---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# DALL·E 3

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `dall-e-3`
{% endhint %}

## Model Overview

This model represents a significant leap forward in AI-driven image creation, capable of generating images from text inputs. This model processes prompts with enhanced neural network architectures, resulting in images that are not only relevant but also rich in detail and diversity. DALL·E 3's deep learning techniques analyze and understand complex descriptions, allowing for the generation of visuals across a wide range of styles and subjects.

You can also view [a detailed comparison of this model](https://aimlapi.com/comparisons/flux-1-vs-dall-e-3) on our main website.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="dall-e-3" path="/v1/images/generations" method="post" %}
[OpenAPI dall-e-3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/OpenAI/dall-e-3.json)
{% endopenapi-operation %}

## Quick Example

Let's generate an image using a simple prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests


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
            "model": "dall-e-3",
            "quality": "hd"
        }
    )

    response.raise_for_status()
    data = response.json()

    print("Generation:", data)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  try {
    const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',
        model: 'dall-e-3',
        quality: 'hd'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Generation:', data);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Note that the model applies automatic prompt enhancement, and this behavior cannot be disabled. The enhanced prompt is also returned in the response (see the `revised_prompt` parameter in the response).
{% endhint %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Generation: {'created': 1748502329, 'data': [{'revised_prompt': 'Visualize a T-Rex dinosaur enjoying a leisurely day at a sunny beach. The T-Rex is comfortably lounging on a sunbed and wearing stylish shades, clearly enjoying the warm weather and peaceful setting. The ocean waves gently lap up against the shoreline in the background.', 'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Eo1U9k4AbSJPoV7seW2PDq2d/user-oGBnQp1igcXKlzRsuv3QKfH3/img-4BSO0AAOQo7DPgFCzpzLOibU.png?st=2025-05-29T06%3A05%3A29Z&se=2025-05-29T08%3A05%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T06%3A07%3A56Z&ske=2025-05-30T06%3A07%3A56Z&sks=b&skv=2024-08-04&sig=9J/kIJjZXlDp9feazuudjCHIeR5jrw%2BjrFwOXwPMrfc%3D'}]}
```
{% endcode %}

</details>

<figure><img src="../../../.gitbook/assets/img-4BSO0AAOQo7DPgFCzpzLOibU.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure>
