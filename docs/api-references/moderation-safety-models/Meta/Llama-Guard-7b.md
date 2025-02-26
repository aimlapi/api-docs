[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* Meta-Llama/Llama-Guard-7b
{% endhint %}

# Model Overview
An LLM-based model, particularly the Llama2-7b version, designed to enhance the safety of Human-AI conversations. It incorporates a comprehensive safety risk taxonomy, aiding in the classification of safety risks associated with LLM prompts and responses. This model has been instruction-tuned on a carefully curated high-quality dataset, exhibiting robust performance in benchmarks like the OpenAI Moderation Evaluation dataset and ToxicChat. Its capabilities are on par with, or exceed, those of existing content moderation tools.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./Llama-Guard-7b.json" path="/v1/chat/completions" method="post" %}
./Llama-Guard-7b.json
{% endswagger %}


[#references:end]: <> ({})