[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* meta-llama/Llama-3-8b-chat-hf
* meta-llama/Llama-3-70b-chat-hf
{% endhint %}

# Model Overview
The Llama 3 family consists of pretrained and instruction-tuned generative text models available in 8B and 70B sizes. These models are optimized for dialogue use cases and outperform many existing open-source chat models on common industry benchmarks.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./Llama-3-chat-hf.json" path="/v2/chat/completions" method="post" %}
./Llama-3-chat-hf.json
{% endswagger %}

[#references:end]: <> ({})