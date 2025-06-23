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
            "model": "dall-e-2",
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
        model: 'dall-e-2',
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

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Generation: {'created': 1748502693, 'data': [{'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-Eo1U9k4AbSJPoV7seW2PDq2d/user-oGBnQp1igcXKlzRsuv3QKfH3/img-tCP6QhZjh49R4YFEEwrJPrtQ.png?st=2025-05-29T06%3A11%3A33Z&se=2025-05-29T08%3A11%3A33Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-29T03%3A22%3A25Z&ske=2025-05-30T03%3A22%3A25Z&sks=b&skv=2024-08-04&sig=kkE0EbC/8uxALfCn0IO7hL7mVD29KEe65bqy65OlLDs%3D'}]}
```
{% endcode %}

</details>

We obtained the following 1024x1024 image by running this code example:

<figure><img src="../../../.gitbook/assets/img-tCP6QhZjh49R4YFEEwrJPrtQ.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure>
