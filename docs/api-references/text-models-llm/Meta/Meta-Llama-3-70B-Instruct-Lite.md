[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* meta-llama/Meta-Llama-3-70B-Instruct-Lite
{% endhint %}

# Model Overview
A large language model developed by Meta, optimized for dialogue and instruction-tuned to improve helpfulness and safety. It is part of the Llama 3 family, which includes models with 8 billion and 70 billion parameters.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./Meta-Llama-3-70B-Instruct-Lite.json" path="/v2/chat/completions" method="post" %}
./Meta-Llama-3-70B-Instruct-Lite.json
{% endswagger %}
[#references:end]: <> ({})