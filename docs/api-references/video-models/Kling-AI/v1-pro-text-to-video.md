[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* kling-video/v1/pro/text-to-video
{% endhint %}

# Model Overview
This model converts textual descriptions into high-quality video content. Provides advanced camera control options, including more sophisticated movements and stabilization. Maximum Video Length: 10 s.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./v1-pro-text-to-video.json" path="/v2/generate/video/kling/generation" method="post" %}
./v1-pro-text-to-video.json
{% endswagger %}

{% swagger src="./v1-pro-text-to-video-pair.json" path="/v2/generate/video/kling/generation" method="get" %}
./v1-pro-text-to-video-pair.json
{% endswagger %}

[#references:end]: <> ({})