# Veo2 (Image-to-Video)

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `veo2/image-to-video`
{% endhint %}

## Overview

An advanced AI model that transforms static images into high-quality, dynamic video content. It builds upon the success of Google's [Veo2 text-to-video](veo2-text-to-video.md) model, offering unprecedented control and realism in video generation from still images.

Key Features:

* Faithful content preservation from source images.
* Intuitive motion generation with physics-aware movement.
* High-resolution output up to 4K.
* Multimodal input processing (image + text).

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

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Image-to-Video.json" path="/v2/generate/video/google/generation" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Image-to-Video.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Image-to-Video.json)
{% endopenapi %}

### Fetch the video

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Image-to-Video-pair.json" path="/v2/generate/video/google/generation" method="get" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Image-to-Video-pair.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Image-to-Video-pair.json)
{% endopenapi %}

## Examples

### Video generation

{% code overflow="wrap" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/video/google/generation"
    payload = {
        "model": "veo2/image-to-video",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "image_url": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
        "aspect_ratio": "16:9",
        "duration": "5",
    }
    headers = {"Authorization": "Bearer <YOUR_API_KEY>", "Content-Type": "application/json"}

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
    headers = {"Authorization": "Bearer <YOUR_API_KEY>", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endcode %}
