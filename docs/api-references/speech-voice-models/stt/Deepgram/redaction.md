# redaction

{% hint style="info" %}
This documentation is valid for the following list of our models:

* \#g1\_redaction
{% endhint %}

## Model Overview

Model removes sensitive information (credit cards info, personally identifiable information, account numbers, etc) from your transcripts.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

#### Creating and sending a speech-to-text conversion task to the server

{% openapi src="redaction.json" path="/v1/stt" method="post" %}
[redaction.json](redaction.json)
{% endopenapi %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/stt/{generation_id}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29 ](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

