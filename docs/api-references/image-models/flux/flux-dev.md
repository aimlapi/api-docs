# flux/dev

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/dev`
{% endhint %}

## Model Overview

A state-of-the-art image generation model that utilizes a 12 billion parameter rectified flow transformer architecture. It is designed to generate high-quality images from textual descriptions, making it a powerful tool for developers and creatives.

<table><thead><tr><th width="215" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><code>flux/dev</code></td><td>Format: <strong>PNG</strong><br>Min size: <strong>512</strong>x<strong>512</strong><br>Max size: <strong>1536</strong>x<strong>1536</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:yellow;">For both height and width, the value must be a multiple of 32.</mark></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="flux-dev" path="/v1/images/generations" method="post" %}
[OpenAPI flux-dev](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev.json)
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
            "model": "flux/dev",
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
        model: 'flux/dev'
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
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/eagle/files/monkey/GHx5aT0PR9GXtGi3Cx7CE.png', 'width': 1024, 'height': 768, 'content_type': 'image/png'}], 'timings': {'inference': 2.1296588028781116}, 'seed': 1007384285, 'has_nsfw_concepts': [False], 'prompt': 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'}
```
{% endcode %}

</details>

We obtained the following 1024x768 image by running this code example:

<figure><img src="../../../.gitbook/assets/GHx5aT0PR9GXtGi3Cx7CE.png" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
