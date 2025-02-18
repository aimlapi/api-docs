[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K
{% endhint %}

# Model Overview
An auto-regressive language model that uses an optimized transformer architecture. The tuned versions use supervised fine-tuning (SFT) and reinforcement learning with human feedback (RLHF) to align with human preferences for safety and helpfulness. 

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./Meta-Llama-3.1-8B-Instruct-Turbo-128K.json" path="/v2/chat/completions" method="post" %}
./Meta-Llama-3.1-8B-Instruct-Turbo-128K.json
{% endswagger %}

[#references:end]: <> ({})