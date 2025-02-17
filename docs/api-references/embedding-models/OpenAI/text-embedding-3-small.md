[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* text-embedding-3-small
{% endhint %}

# Model Overview
An efficient and compact embedding model designed to enhance performance over its predecessor, text-embedding-ada-002. It transforms text into numerical representations that can be easily processed by machine learning models.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./text-embedding-3-small.json" path="/embeddings" method="post" %}
./text-embedding-3-small.json
{% endswagger %}
[#references:end]: <> ({})