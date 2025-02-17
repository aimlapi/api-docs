[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* claude-3-5-sonnet-20240620
* claude-3-5-sonnet-20241022
* claude-3-5-sonnet-latest
{% endhint %}

# Model Overview
Claude 3.5 Sonnet sets a new standard in the AI industry, raising the bar for intelligence and performance. Operating at twice the speed of its predecessor, Claude 3 Opus, Claude 3.5 Sonnet outperforms it across a range of evaluations, making it a superior choice for complex AI tasks.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./claude-3-5-sonnet.json" path="/v2/chat/completions" method="post" %}
./claude-3-5-sonnet.json
{% endswagger %}
[#references:end]: <> ({})