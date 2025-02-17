[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* mistralai/Mistral-7B-Instruct-v0.2
* mistralai/Mistral-7B-Instruct-v0.1
* mistralai/Mistral-7B-Instruct-v0.3
{% endhint %}

# Model Overview
An advanced version of the Mistral-7B model, fine-tuned specifically for instruction-based tasks. This model is designed to enhance language generation and understanding capabilities.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./Mistral-7B-Instruct.json" path="/v2/chat/completions" method="post" %}
./Mistral-7B-Instruct.json
{% endswagger %}
[#references:end]: <> ({})