[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* abab6.5s-chat
{% endhint %}

# Model Overview
A powerful language model developed by MiniMax AI, designed to excel in tasks requiring extensive context processing and reasoning capabilities. With a total of 456 billion parameters, of which 45.9 billion are activated per token, this model utilizes a hybrid architecture that combines various attention mechanisms to optimize performance across a wide array of applications.
Achieves competitive scores on academic benchmarks, including MMLU and various reasoning tests.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./abab6.5s-chat.json" path="/v2/chat/completions" method="post" %}
./abab6.5s-chat.json
{% endswagger %}

[#references:end]: <> ({})