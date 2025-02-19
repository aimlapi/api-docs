[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* meta-llama/Llama-Guard-3-11B-Vision-Turbo
{% endhint %}

# Model Overview
11B Llama 3.2 model fine-tuned for content safety, detecting harmful multimodal prompts and text in image reasoning use cases.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./Llama-Guard-3-11B-Vision-Turbo.json" path="/v1/chat/completions" method="post" %}
./Llama-Guard-3-11B-Vision-Turbo.json
{% endswagger %}

[#references:end]: <> ({})