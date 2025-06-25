# video-01

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `video-01`
{% endhint %}

## Model Overview

An innovative AI model designed for generating high-quality videos from text prompts or image. Developed by Hailou AI, this model can produce visually striking content with cinematic qualities, allowing users to create engaging videos quickly and efficiently.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas.

</details>

## API Schemas

### Create a video generation task and send it to the server

{% openapi src="video-01.json" path="/v2/generate/video/minimax/generation" method="post" %}
[video-01.json](video-01.json)
{% endopenapi %}

### Retrieve the generated video from the server

{% openapi src="video-01-pair.json" path="/v2/generate/video/minimax/generation" method="get" %}
[video-01-pair.json](video-01-pair.json)
{% endopenapi %}
