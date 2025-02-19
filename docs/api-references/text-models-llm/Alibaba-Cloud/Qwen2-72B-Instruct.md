[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* Qwen/Qwen2-72B-Instruct
{% endhint %}

# Model Overview
This model is stronger than the last generation of Qwen 1.5. The model&#x27;s linguistic proficiency has been roadened to 27 additional languages, demonstrated state-of-the-art results across a multitude of evaluations, and the context length support was increased up to an impressive 128K tokens. 
This enhancement allows for more comprehensive and contextually rich interactions, making Qwen2 an even more powerful tool for a variety of applications. Qwen2 builds on the Transformer architecture, adding advanced features like SwiGLU activation, attention QKV bias, group query attention, a mixture of sliding window attention, and more for improved efficiency and focus when processing information.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./Qwen2-72B-Instruct.json" path="/v1/chat/completions" method="post" %}
./Qwen2-72B-Instruct.json
{% endswagger %}

[#references:end]: <> ({})