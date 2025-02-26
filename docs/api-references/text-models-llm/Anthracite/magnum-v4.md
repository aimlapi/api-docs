[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* anthracite-org/magnum-v4-72b
{% endhint %}

# Model Overview
A large language model fine-tuned on top of Qwen2.5, specifically designed to replicate the prose quality of the Claude 3 models, particularly Sonnet and Opus. It excels in generating coherent and contextually rich text, making it suitable for various applications requiring high-quality language generation.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./magnum-v4.json" path="/v1/chat/completions" method="post" %}
./magnum-v4.json
{% endswagger %}


[#references:end]: <> ({})