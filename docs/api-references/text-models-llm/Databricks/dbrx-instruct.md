[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* databricks/dbrx-instruct
{% endhint %}

# Model Overview
A powerful, open-source large language model (LLM) developed by Databricks. It utilizes a fine-grained mixture-of-experts (MoE) architecture with 132 billion total parameters, of which 36 billion are active for any given input.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./dbrx-instruct.json" path="/v2/chat/completions" method="post" %}
./dbrx-instruct.json
{% endswagger %}
[#references:end]: <> ({})