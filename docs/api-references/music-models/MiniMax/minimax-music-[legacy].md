[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* minimax-music
{% endhint %}

# Model Overview
An advanced AI model that generates diverse high-quality audio compositions by analyzing and reproducing musical patterns, rhythms, and vocal styles from the reference track. Refine the process using a text prompt.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./minimax-music-[legacy].json" path="/v2/generate/audio" method="post" %}
./minimax-music-[legacy].json
{% endswagger %}

{% swagger src="./minimax-music-[legacy]-pair.json" path="/v2/generate/audio" method="get" %}
./minimax-music-[legacy]-pair.json
{% endswagger %}

[#references:end]: <> ({})