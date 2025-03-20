# flux-pro

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux-pro`
* `flux-pro/v1.1`
{% endhint %}

## Model Overview

A new image generation model with inference speed increased sixfold compared to the previous flux-pro. It also features enhanced generation quality and greater accuracy in following prompts.

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
