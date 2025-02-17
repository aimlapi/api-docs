[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* cohere/command-r-plus
{% endhint %}

# Model Overview
A cutting-edge large language model designed for enterprise applications, focusing on advanced capabilities such as Retrieval-Augmented Generation (RAG) and multi-step tool use. It is built to enhance efficiency and accuracy in real-world business scenarios.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./command-r.json" path="/v2/chat/completions" method="post" %}
./command-r.json
{% endswagger %}
[#references:end]: <> ({})