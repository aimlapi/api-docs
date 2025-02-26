[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* kling-video/v1/pro/image-to-video
{% endhint %}

# Model Overview
This model transforms static images into dynamic video clips. Offers more advanced camera controls than v1 Standard model, including options for tilt, pan, zoom, and roll movements. Results in richer details and more stable camera movements, enhancing the overall visual quality of the generated videos. Produces significantly sharper and more detailed videos. Enhanced animations make elements like water flow and character movements appear more natural and engaging.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./v1-pro-image-to-video.json" path="/v2/generate/video/kling/generation" method="post" %}
./v1-pro-image-to-video.json
{% endswagger %}

{% swagger src="./v1-pro-image-to-video-pair.json" path="/v2/generate/video/kling/generation" method="get" %}
./v1-pro-image-to-video-pair.json
{% endswagger %}

[#references:end]: <> ({})