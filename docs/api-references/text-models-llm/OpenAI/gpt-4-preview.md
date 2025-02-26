[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* gpt-4-0125-preview
* gpt-4-1106-preview
{% endhint %}

# Model Overview
Before the release of GPT-4 Turbo, OpenAI introduced two preview models that allowed users to test advanced features ahead of a full rollout. These models supported JSON mode for structured responses, parallel function calling to handle multiple API functions in a single request, and reproducible output, ensuring more consistent results across runs. They provided a glimpse into upcoming improvements in efficiency and functionality, helping developers and businesses adapt to the evolving capabilities of OpenAI&#x27;s language models.
gpt-4-1106-preview has better code generation performance, reduces cases where the model doesn&#x27;t complete a task.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./gpt-4-preview.json" path="/v1/chat/completions" method="post" %}
./gpt-4-preview.json
{% endswagger %}


[#references:end]: <> ({})