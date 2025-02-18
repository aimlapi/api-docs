[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* voyage-code-2
{% endhint %}

# Model Overview
This embedding model is designed for semantic retrieval of code and related text from both natural language and code-based queries. In a comprehensive evaluation across 11 code retrieval tasks—sourced from popular datasets like HumanEval and MBPP—it achieved a significant 14.52% improvement in recall over competitors, including OpenAI and Cohere. Additionally, it demonstrated consistent gains, averaging 3.03%, across various general-purpose text datasets.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./voyage-code-2.json" path="/embeddings" method="post" %}
./voyage-code-2.json
{% endswagger %}

[#references:end]: <> ({})