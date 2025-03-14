---
description: Not supported yet.
hidden: true
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# redaction \[offline]

{% hint style="info" %}
This documentation is valid for the following list of our models:

* \#g1\_redaction
{% endhint %}

{% hint style="warning" %}
Note:&#x20;

Previously, our STT models operated via a single API call to POST `https://api.aimlapi.com/v1/stt`. You can view the API schema [here](../../../speech-models/speech-to-text/stt-legacy.md).

Now, we are switching to a new two-step process:

* `POST https://api.aimlapi.com/v1/stt/create` – Creates and submits a speech-to-text processing task to the server. This method accepts the same parameters as the old version but returns a `generation_id` instead of the final transcript.
* `GET https://api.aimlapi.com/v1/stt/{generation_id}` – Retrieves the generated transcript from the server using the `generation_id` obtained from the previous API call.

This approach helps prevent generation failures due to timeouts. \
We've prepared [a couple of examples](redaction.md#quick-code-examples) below to make the transition to the new STT API easier for you.
{% endhint %}

## Model Overview

Model removes sensitive information (credit cards info, personally identifiable information, account numbers, etc) from your transcripts.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

#### Creating and sending a speech-to-text conversion task to the server

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/stt/create" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

#### Requesting the result of the task from the server using the generation\_id

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/stt/{generation_id}" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29 ](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

