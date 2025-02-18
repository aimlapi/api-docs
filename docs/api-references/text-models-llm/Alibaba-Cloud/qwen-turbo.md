[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* qwen-turbo
{% endhint %}

# Model Overview
This model is designed to enhance both the performance and efficiency of AI agents developed on the Alibaba Cloud Model Studio platform.
Optimized for speed and precision in generative AI application development. Improves AI agent comprehension and adaptation to enterprise data, especially when integrated with Retrieval-Augmented Generation (RAG) architectures. Large context window (1,000,000 tokens).

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./qwen-turbo.json" path="/v2/chat/completions" method="post" %}
./qwen-turbo.json
{% endswagger %}

[#references:end]: <> ({})