[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* meta-llama/LlamaGuard-2-8b
{% endhint %}

# Model Overview
An 8B-parameter Llama 3-based safeguard model, designed for content classification in LLM inputs (prompt classification) and responses (response classification), similar to Llama Guard. Functioning as an LLM, it generates text outputs that indicate whether a given prompt or response is safe or unsafe, and if deemed unsafe, it specifies the violated content categories.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./LlamaGuard-2-8b.json" path="/v1/chat/completions" method="post" %}
./LlamaGuard-2-8b.json
{% endswagger %}


[#references:end]: <> ({})