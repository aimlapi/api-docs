[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* #g1_redaction
{% endhint %}

# Model Overview
Model removes sensitive information (credit cards info, personally identifiable information, account numbers, etc) from your transcripts.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./redaction.json" path="/v1/stt" method="post" %}
./redaction.json
{% endswagger %}


[#references:end]: <> ({})