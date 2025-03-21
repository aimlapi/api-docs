# flux-pro/v1.1-ultra

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `flux-pro/v1.1-ultra`
{% endhint %}

## Model Overview

An advanced AI image generator designed to create high-resolution images rapidly and efficiently. It is optimized for various applications, including content creation, e-commerce, and advertising, providing users with the ability to generate visually appealing images at unprecedented speeds.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="../Black-Forest-Labs/flux-pro-v1.1-ultra.json" path="/v1/images/generations" method="post" %}
[flux-pro-v1.1-ultra.json](../Black-Forest-Labs/flux-pro-v1.1-ultra.json)
{% endopenapi %}

## Quick Example

Let's generate an image using a simple prompt.

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
            "model": "flux-pro/v1.1-ultra",
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
```json5
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/squirrel/files/panda/Xw0w4dVpJk88_d8CBZQas_c2d37af49746421fa848a95df405288a.jpg', 'width': 2752, 'height': 1536, 'content_type': 'image/jpeg'}], 'timings': {}, 'seed': 2704861852, 'has_nsfw_concepts': [False], 'prompt': 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.'}
```
{% endcode %}

</details>

We obtained the following 2752x1536 image by running this code example:

<figure><img src="../../../.gitbook/assets/Xw0w4dVpJk88_d8CBZQas_c2d37af49746421fa848a95df405288a (1).jpg" alt=""><figcaption></figcaption></figure>
