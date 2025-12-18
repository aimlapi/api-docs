# v1-pro/image-to-video

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `kling-video/v1/pro/image-to-video`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/kling-video/v1/pro/image-to-video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This model transforms static images into dynamic video clips. Offers more advanced camera controls than [v1 Standard](v1-standard-image-to-video.md) model, including options for tilt, pan, zoom, and roll movements. Results in richer details and more stable camera movements, enhancing the overall visual quality of the generated videos. Enhanced animations make elements like water flow and character movements appear more natural and engaging.

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

{% hint style="success" %}
Now, all of our API schemas for video models use our new universal short URL — `https://api.aimlapi.com/v2/video/generations`. \
However, you can still call this model using the legacy URL that includes the vendor name.
{% endhint %}

### Create a video generation task and send it to the server

{% hint style="info" %}
The aspect ratio of the generated video is solely determined by the aspect ratio of the input reference image.
{% endhint %}

{% openapi-operation spec="v1-pro-image-to-video" path="/v2/video/generations" method="post" %}
[OpenAPI v1-pro-image-to-video](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Kling-AI/v1-pro-image-to-video.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/ByteDance/omnihuman-pair.json)
{% endopenapi-operation %}
