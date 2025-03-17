# v1-pro/image-to-video

{% hint style="info" %}
This documentation is valid for the following list of our models:

* kling-video/v1/pro/image-to-video
{% endhint %}

## Model Overview

This model transforms static images into dynamic video clips. Offers more advanced camera controls than v1 Standard model, including options for tilt, pan, zoom, and roll movements. Results in richer details and more stable camera movements, enhancing the overall visual quality of the generated videos. Produces significantly sharper and more detailed videos. Enhanced animations make elements like water flow and character movements appear more natural and engaging.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

Generating a video using this model involves making two sequential API calls:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).&#x20;
* The second one is for requesting the generated or extended video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find both corresponding API schemas.

### API Schema

#### Generate Video

{% hint style="warning" %}
The ratio/aspect\_ratio parameter is deprecated. The aspect ratio of the generated video is solely determined by the aspect ratio of the input reference image.
{% endhint %}

{% openapi src="v1-pro-image-to-video.json" path="/v2/generate/video/kling/generation" method="post" %}
[v1-pro-image-to-video.json](v1-pro-image-to-video.json)
{% endopenapi %}

#### Fetch generation

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more.&#x20;

{% openapi src="v1-pro-image-to-video-pair.json" path="/v2/generate/video/kling/generation" method="get" %}
[v1-pro-image-to-video-pair.json](v1-pro-image-to-video-pair.json)
{% endopenapi %}
