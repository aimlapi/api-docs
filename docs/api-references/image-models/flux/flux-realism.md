# flux-realism

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux-realism`
{% endhint %}

## Model Overview

A state-of-the-art model designed to generate photorealistic images from textual descriptions. \
It allows users to create lifelike visuals without the need for extensive realism-related prompts.

<table><thead><tr><th width="201" valign="top">Model</th><th>Generated image properties</th></tr></thead><tbody><tr><td valign="top"><code>flux-realism</code></td><td>Format: <strong>JPEG, PNG</strong><br>Min size: <strong>512</strong>x<strong>512</strong><br>Max size: <strong>1536</strong>x<strong>1536</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:yellow;">For both height and width, the value must be a multiple of 32.</mark></td></tr></tbody></table>

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-realism.json" path="/v1/images/generations" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-realism.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-realism.json)
{% endopenapi %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% hint style="warning" %}
The maximum value for both width and height is `1536`, and the minimum is `512`. \
The value must be a multiple of 32.
{% endhint %}

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
            "model": "flux-realism",
            "image_size": {
                "width": 1472,
                "height": 512
            }
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
        model: 'flux-realism',
        image_size: {
          width: 1472,
          height: 512
        }
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
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/eagle/files/zebra/ixROrA_D3_AkDwO-Qjgsd_f62b7c411b4945189378bbeb0142d2ed.jpg', 'width': 1472, 'height': 512, 'content_type': 'image/jpeg'}], 'timings': {'inference': 3.874080283101648}, 'seed': 4134117142, 'has_nsfw_concepts': [False], 'prompt': 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'}
```
{% endcode %}

</details>

We obtained the following 1472x512 image by running this code example. The textures look significantly more realistic compared to the earlier FLUX models.

<figure><img src="../../../.gitbook/assets/5UV4TVC75rf4SV-F8us5R_5bb0db3ddf0442b0aa7846760807a585.jpg" alt=""><figcaption><p><code>'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'</code></p></figcaption></figure>

We were also curious how the model would perform with more large-scale scenes. Here's what we got with the prompt `'Epic battle of spaceships'`.

<figure><img src="../../../.gitbook/assets/nUJYdUrH6sLhgw2K2Z3hR_91336d262dc64dce8644c7c6f5adb11b.jpg" alt=""><figcaption><p><code>'Epic battle of spaceships'</code></p></figcaption></figure>
