# Stable Diffusion v3 Medium

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `stable-diffusion-v3-medium`
{% endhint %}

## Model Overview

An advanced text-to-image generation model that utilizes a Multimodal Diffusion Transformer (MMDiT) architecture to produce high-quality images from textual descriptions.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi src="stable-diffusion-v3-medium.json" path="/v1/images/generations" method="post" %}
[stable-diffusion-v3-medium.json](stable-diffusion-v3-medium.json)
{% endopenapi %}

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
            "model": "stable-diffusion-v3-medium",
            "image_size": "landscape_16_9"
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
        model: 'stable-diffusion-v3-medium',
        image_size: 'landscape_16_9'
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
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/squirrel/files/panda/RCbeYSssFwxdkEX2tWd6i.png', 'width': 1024, 'height': 576, 'content_type': 'image/jpeg'}], 'timings': {'inference': 1.174231035867706}, 'seed': 2587699048419330600, 'has_nsfw_concepts': [False], 'prompt': 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.', 'num_images': 1}
```
{% endcode %}

</details>

We obtained the following 1024x576 image by running this code example:

<figure><img src="../../../.gitbook/assets/RCbeYSssFwxdkEX2tWd6i.png" alt=""><figcaption><p><code>"A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."</code></p></figcaption></figure>
