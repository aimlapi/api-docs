# flux-pro/v1.1

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux-pro/v1.1`
{% endhint %}

## Model Overview

`flux-pro/v1.1`  is a new image generation model with inference speed increased sixfold compared to the previous `flux-pro`. It also features enhanced generation quality and greater accuracy in following prompts.

<table data-full-width="true"><thead><tr><th width="149">Model</th><th width="593">Properties of Generated Images</th></tr></thead><tbody><tr><td><code>flux-pro/v1.1</code></td><td>Format: <strong>JPEG, PNG</strong><br>Min size: <strong>256</strong>x<strong>256</strong><br>Max size: <strong>1440</strong>x<strong>1440</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:orange;">For both height and width, the value must be a multiple of 32.</mark></td></tr></tbody></table>



## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-pro-v1.1.json" path="/v1/images/generations" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-pro-v1.1.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/image-models/flux/flux-pro-v1.1.json)
{% endopenapi %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% hint style="warning" %}
The maximum value for both width and height is `1440`, and the minimum is `256`. \
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
            "prompt": "Rabbit singing",
            "model": "flux-pro/v1.1",
            'image_size': {
                "width": 1024,
                "height": 320
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
        prompt: 'Rabbit singing',
        model: 'flux-pro/v1.1',
        image_size: {
          width: 1024,
          height: 320
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
```json
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/squirrel/files/koala/zWwOGJ84iP1LAkGLSwwpo_68bf71493b78444fb85c8cb6bf250522.jpg', 'width': 1024, 'height': 320, 'content_type': 'image/jpeg'}], 'timings': {}, 'seed': 1878268883, 'has_nsfw_concepts': [False], 'prompt': 'Rabbit singing'}
```
{% endcode %}

</details>

We obtained the following 1024x320 image (JPEG) by running this code example:

<figure><img src="../../../.gitbook/assets/zWwOGJ84iP1LAkGLSwwpo_68bf71493b78444fb85c8cb6bf250522.jpg" alt=""><figcaption><p><code>"Rabbit singing"</code></p></figcaption></figure>
