[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* minimax-music
{% endhint %}

# Model Overview
An advanced AI model that generates diverse high-quality audio compositions by analyzing and reproducing musical patterns, rhythms, and vocal styles from the reference track. Refine the process using a text prompt.

Warning: This model is deprecated (or planned for deprecation) and may no longer receive updates or support. We recommend switching to music-01 MiniMax model, which offers improved performance and ongoing support. The recommended alternative is faster, more cost-efficient, and supports an extended set of parameters compared to this model.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
{% swagger src="./minimax-music.json" path="/v2/generate/audio" method="post" %}
./minimax-music.json
{% endswagger %}
[#references:end]: <> ({})