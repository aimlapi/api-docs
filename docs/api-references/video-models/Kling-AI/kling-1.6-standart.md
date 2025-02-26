[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* kling-video/v1.6/standard/image-to-video
{% endhint %}

# Model Overview
An advanced AI video generation model developed by Kuaishou Technology, designed to create high-quality videos from text prompts and images. This version introduces significant improvements in prompt adherence, visual quality, and dynamic action rendering, enabling users to generate more consistent and visually appealing results compared to its predecessor, Kling 1.5.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./kling-1.6-standart.json" path="/v2/generate/video/kling/generation" method="post" %}
./kling-1.6-standart.json
{% endswagger %}

{% swagger src="./kling-1.6-standart-pair.json" path="/v2/generate/video/kling/generation" method="get" %}
./kling-1.6-standart-pair.json
{% endswagger %}

[#references:end]: <> ({})