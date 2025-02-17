[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* flux-pro
* flux-pro/v1.1
{% endhint %}

# Model Overview
A new image generation model with inference speed increased sixfold compared to the previous flux-pro. It also features enhanced generation quality and greater accuracy in following prompts.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./flux-pro.json" path="/images/generations/with-url" method="post" %}
./flux-pro.json
{% endswagger %}
[#references:end]: <> ({})