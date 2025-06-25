# Veo2 (Text-to-Video)

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `veo2`
{% endhint %}

## Overview

Google’s cutting-edge AI model designed to generate highly realistic and cinematic video content from textual prompts or a combination of text and images. Leveraging advanced machine learning techniques, Veo2 excels in creating videos with natural motion, realistic physics, and professional-grade visual fidelity.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and examples for both endpoint calls.

</details>

## API Schemas

### Video Generation

You can generate a video using this API. In the basic setup, you only need a prompt, the aspect ratio, and the desired duration (5, 6, 7, or 8 seconds).

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Text-to-Video.json" path="/v2/generate/video/google/generation" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Text-to-Video.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Text-to-Video.json)
{% endopenapi %}

### Fetch the video

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Text-to-Video-pair.json" path="/v2/generate/video/google/generation" method="get" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Text-to-Video-pair.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Text-to-Video-pair.json)
{% endopenapi %}

## Examples

### Video generation

{% code overflow="wrap" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/video/google/generation"
    payload = {
        "model": "veo2",
        "prompt": "A DJ on the stand is playing, around a World War II battlefield, lots of explosions, thousands of dancing soldiers, between tanks shooting, barbed wire fences, lots of smoke and fire, black and white old video: hyper realistic, photorealistic, photography, super detailed, very sharp, on a very white background",
        "aspect_ratio": "16:9",
        "duration": "5",
    }
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endcode %}

### Fetch the video

{% code overflow="wrap" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/video/google/generation"
    params = {
        "generation_id": "<YOUR_GENERATION_ID>",
    }
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endcode %}

