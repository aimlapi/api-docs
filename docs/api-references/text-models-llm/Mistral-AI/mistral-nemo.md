[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* mistralai/mistral-nemo
{% endhint %}

# Model Overview
A state-of-the-art large language model designed for advanced natural language processing tasks, including text generation, summarization, translation, and sentiment analysis. It features a large context window of up to 128k tokens, making it suitable for handling extensive inputs and complex tasks.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./mistral-nemo.json" path="/v2/chat/completions" method="post" %}
./mistral-nemo.json
{% endswagger %}
[#references:end]: <> ({})