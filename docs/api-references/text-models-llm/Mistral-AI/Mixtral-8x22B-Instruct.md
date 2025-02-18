[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* mistralai/Mixtral-8x22B-Instruct-v0.1
{% endhint %}

# Model Overview
A cutting-edge large language model designed for instruction-following tasks. Built on a Mixture of Experts (MoE) architecture, this model is optimized for efficiently processing and generating human-like text based on detailed prompts.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./Mixtral-8x22B-Instruct.json" path="/v2/chat/completions" method="post" %}
./Mixtral-8x22B-Instruct.json
{% endswagger %}

[#references:end]: <> ({})