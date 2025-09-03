# flux/kontext-pro/text-to-image

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux/kontext-pro/text-to-image`
{% endhint %}

## Model Overview

A new Flux model optimized for faster generation speed.&#x20;

<table data-full-width="false"><thead><tr><th width="190">Model</th><th width="593">Properties of Generated Images</th></tr></thead><tbody><tr><td><code>flux/kontext-pro/text-to-image</code></td><td>Format: <strong>JPEG, PNG</strong><br>Image size can't be set directly — only a preset aspect ratio can be chosen.<br>Default aspect ratio and size: <strong>1:1</strong>, <strong>1024</strong>x<strong>1024</strong></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="flux-kontext-pro-try-3" path="/v1/images/generations" method="post" %}
[OpenAPI flux-kontext-pro-try-3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-kontext-pro.json)
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
            "model": "flux/kontext-pro/text-to-image",
            "aspect_ratio": "21:9"   
        }
    )

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
        model: 'flux/kontext-pro/text-to-image',
        "aspect_ratio": '21:9'
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
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/squirrel/files/penguin/EgskSnirzZYljpVeLSTNR_917caa60fb8f450cbd9576756171cd68.jpg', 'width': 1568, 'height': 672, 'content_type': 'image/jpeg'}], 'timings': {}, 'seed': 146234323, 'has_nsfw_concepts': [False], 'prompt': 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'}
```
{% endcode %}

</details>

We obtained the following 1568x672 image by running this code example:

<figure><img src="../../../.gitbook/assets/EgskSnirzZYljpVeLSTNR_917caa60fb8f450cbd9576756171cd68.jpg" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>
