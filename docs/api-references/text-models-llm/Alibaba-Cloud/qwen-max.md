[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* qwen-max
* qwen-max-2025-01-25
{% endhint %}

# Model Overview
A large-scale Mixture-of-Experts (MoE) language model developed by Alibaba Cloud. It excels in language understanding, generation, and task performance across a variety of modalities. Mixture-of-Experts (MoE) Architecture: Uses 64 specialized &quot;expert&quot; networks, activating only relevant ones per task for efficient processing. Extensive Multilingual Support: Supports 29 languages, including Chinese, English, and Arabic. Long-Context Optimization: Supports 32K context windows with 8K generation. High Stability: Demonstrates high stability in maintaining prompt instructions, with no erroneous replies during extensive testing.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./qwen-max.json" path="/v2/chat/completions" method="post" %}
./qwen-max.json
{% endswagger %}

[#references:end]: <> ({})