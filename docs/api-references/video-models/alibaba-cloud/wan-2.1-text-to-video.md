# Wan 2.1 (Text-to-Video)

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `wan/v2.1/1.3b/text-to-video`
{% endhint %}

## Overview

A state-of-the-art video foundation model designed for advanced generative video tasks. Supporting Text-to-Video (T2V), it incorporates groundbreaking innovations to deliver high-quality outputs with exceptional computational efficiency.

Key Features:

* Visual text generation: Generates text in both Chinese and English within videos.
* 3D Variational Autoencoder (Wan-VAE): Encodes and decodes unlimited-length 1080P videos with temporal precision.
* High-quality outputs: Produces visually dynamic and temporally consistent videos at resolutions of up to 720P.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and examples for both endpoint calls.

## API Schemas

### Video Generation

You can generate a video using this API.

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan-v2.1-text-to-video.json" path="/v2/generate/video/alibaba/generation" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan-v2.1-text-to-video.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan-v2.1-text-to-video.json)
{% endopenapi %}

### Fetch the video

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan-v2.1-text-to-video-pair.json" path="/v2/generate/video/alibaba/generation" method="get" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan-v2.1-text-to-video-pair.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan-v2.1-text-to-video-pair.json)
{% endopenapi %}

## Examples

### Video generation

{% code overflow="wrap" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/video/alibaba/generation"
    payload = {
        "model": "wan/v2.1/1.3b/text-to-video",
        "prompt": "A DJ on the stand is playing, around a World War II battlefield, lots of explosions, thousands of dancing soldiers, between tanks shooting, barbed wire fences, lots of smoke and fire, black and white old video: hyper realistic, photorealistic, photography, super detailed, very sharp, on a very white background",
        "aspect_ratio": "16:9",
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
    url = "https://api.aimlapi.com/v2/generate/video/alibaba/generation"
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

