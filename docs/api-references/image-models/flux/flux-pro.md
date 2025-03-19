# flux-pro

{% hint style="info" %}
This documentation is valid for the following list of our models:

* flux-pro
* flux-pro/v1.1
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

Let's generate an image of the specified size using a simple prompt:

{% code overflow="wrap" %}
```python
import requests


def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "prompt": "A jellyfish in the ocean",
            "model": "flux-pro",
            "width": 1024,
            "height": 768
        },
    )

    response.raise_for_status()
    data = response.json()

    print("Generation:", data)


if __name__ == "__main__":
    main()

```
{% endcode %}

