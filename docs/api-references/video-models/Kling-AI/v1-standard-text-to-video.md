# v1-standard/text-to-video

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `kling-video/v1/standard/text-to-video`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/kling-video/v1/standard/text-to-video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This model converts textual descriptions into high-quality video content.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find both corresponding API schemas.

</details>

## API Schemas

### Create a video generation task and send it to the server

{% openapi src="../../../.gitbook/assets/v1-standard-text-to-video.json" path="/v2/generate/video/kling/generation" method="post" %}
[v1-standard-text-to-video.json](../../../.gitbook/assets/v1-standard-text-to-video.json)
{% endopenapi %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more.

{% openapi src="../../../.gitbook/assets/v1.6-pro-effects-pair.json" path="/v2/generate/video/kling/generation" method="get" %}
[v1.6-pro-effects-pair.json](../../../.gitbook/assets/v1.6-pro-effects-pair.json)
{% endopenapi %}
