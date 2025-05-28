# flux/dev/image-to-image

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/dev/image-to-image`
{% endhint %}

## Model Overview

A state-of-the-art image generation model that utilizes a 12 billion parameter rectified flow transformer architecture. It is designed to generate high-quality images from textual descriptions, making it a powerful tool for developers and creatives.

<table><thead><tr><th width="220" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><code>flux/dev/image-to-image</code></td><td>Format: <strong>PNG</strong><br>Fixed size: Matches the dimensions of the reference image.</td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev-image-to-image.json" path="/v1/images/generations" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev-image-to-image.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-dev-image-to-image.json)
{% endopenapi %}

## Quick Example

Let's generate a new image using the one from the [flux/dev Quick Example](flux-dev.md#quick-example) as a reference — and make a simple change to it with a prompt.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

# URL of the reference picture
img_url = "https://zovi0.github.io/public_misc/flux-dev-t-rex.png"

def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "prompt": "Add a bird to the foreground of the photo.",
            "model": "flux/dev/image-to-image",
            "image_url": img_url,
            "strength": 0.8
        }
    )

    # response.raise_for_status()
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
        prompt: 'Add a bird to the foreground of the photo.',
        model: 'flux/dev/image-to-image',
        image_url: 'https://zovi0.github.io/public_misc/flux-dev-t-rex.png',
        strength: 0.8
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
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/eagle/files/lion/EyuGvQzlsBoVUB8qjV776.png', 'width': 1024, 'height': 768, 'content_type': 'image/png'}], 'timings': {'inference': 2.544010079000145}, 'seed': 2819715747, 'has_nsfw_concepts': [False], 'prompt': 'Add a bird to the foreground of the photo.'}
```
{% endcode %}

</details>

| Reference Image                                                           | Generated Image                                                                                            |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![](https://cdn.aimlapi.com/eagle/files/monkey/GHx5aT0PR9GXtGi3Cx7CE.png) | <img src="https://cdn.aimlapi.com/eagle/files/lion/EyuGvQzlsBoVUB8qjV776.png" alt="" data-size="original"> |
