# v1-standard/text-to-video

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `kling-video/v1/standard/text-to-video`
{% endhint %}

This model converts textual descriptions into high-quality video content. Maximum Video Length: 5 s.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find both corresponding API schemas.

</details>

## API Schemas

### Create a video generation task and send it to the server

{% openapi src="v1-standard-text-to-video.json" path="/v2/generate/video/kling/generation" method="post" %}
[v1-standard-text-to-video.json](v1-standard-text-to-video.json)
{% endopenapi %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more.&#x20;



{% openapi src="v1-standard-text-to-video-pair.json" path="/v2/generate/video/kling/generation" method="get" %}
[v1-standard-text-to-video-pair.json](v1-standard-text-to-video-pair.json)
{% endopenapi %}
