[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* qwen/qvq-72b-preview
{% endhint %}

# Model Overview
An experimental research model developed by the Qwen team, focusing on enhancing visual reasoning capabilities. This model integrates advanced multimodal processing to interpret and generate responses based on both text and visual inputs, making it particularly adept at solving complex problems that require understanding visual content.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./qvq-72b-preview.json" path="/v2/chat/completions" method="post" %}
./qvq-72b-preview.json
{% endswagger %}
[#references:end]: <> ({})