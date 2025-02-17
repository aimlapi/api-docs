[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* claude-3-opus-20240229
* anthropic/claude-3-opus-20240229
* anthropic/claude-3-opus
* claude-3-opus-latest
{% endhint %}

# Model Overview
A highly capable AI model designed to process and analyze both text and image data. It excels in tasks requiring complex reasoning, mathematical problem-solving, coding, and multilingual text understanding.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./claude-3-opus.json" path="/v2/chat/completions" method="post" %}
./claude-3-opus.json
{% endswagger %}
[#references:end]: <> ({})