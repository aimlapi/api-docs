# flux-pro

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux-pro`
* `flux-pro/v1.1`
{% endhint %}

## Model Overview

Both versions, v.1 and v1.1, generate images of unmatched quality, outperforming popular models like Midjourney v6.0, DALL·E 3 (HD), and SD3-Ultra.&#x20;

`flux-pro/v1.1`  is a new image generation model with inference speed increased sixfold compared to the previous `flux-pro`. It also features enhanced generation quality and greater accuracy in following prompts.

Both versions accept the same set of parameters, generate JPEGs, and have identical minimum, maximum, and default image sizes.

<table data-full-width="true"><thead><tr><th width="149">Model</th><th width="593">Properties of Generated Images</th></tr></thead><tbody><tr><td><code>flux-pro</code></td><td>Format: <strong>JPG</strong><br>Min size: <strong>256</strong>x<strong>256</strong><br>Max size: <strong>1440</strong>x<strong>1440</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:orange;">For both height and width, the value must be a multiple of 32.</mark></td></tr><tr><td><code>flux-pro/v1.1</code></td><td>Format: <strong>JPG</strong><br>Min size: <strong>256</strong>x<strong>256</strong><br>Max size: <strong>1440</strong>x<strong>1440</strong><br>Default size: <strong>1024</strong>x<strong>768</strong><br><mark style="background-color:orange;">For both height and width, the value must be a multiple of 32.</mark></td></tr></tbody></table>



## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="../Black-Forest-Labs/flux-pro.json" path="/v1/images/generations" method="post" %}
[flux-pro.json](../Black-Forest-Labs/flux-pro.json)
{% endopenapi %}

## Quick Example

Let's generate an image of the specified size using a simple prompt.

{% hint style="warning" %}
The maximum value for both width and height is `1440`, and the minimum is `256`. \
The value must be a multiple of 32.
{% endhint %}

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
            "model": "flux-pro",
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

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
Generation: {'images': [{'url': '
https://cdn.aimlapi.com/squirrel/files/penguin/xbv7ajizigDvmBpUEd4Gl_48c13ea3ffda4164b124ac5b84cdf9d3.jpg
', 'width': 1024, 'height': 320, 'content_type': 'image/jpeg'}], 'timings': {}, 'seed': 782392770, 'has_nsfw_concepts': [False], 'prompt': 'Rabbit singing'}
```
{% endcode %}

</details>

We obtained the following nice 1024x320 image by running this code example:

<figure><img src="../../../.gitbook/assets/xbv7ajizigDvmBpUEd4Gl_48c13ea3ffda4164b124ac5b84cdf9d3.jpg" alt=""><figcaption></figcaption></figure>
